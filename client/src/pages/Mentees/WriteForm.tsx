import {
  Avatar,
  Box,
  Button,
  Divider,
  FormHelperText,
  Stack,
  TextField,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Container } from "@mui/system";
import dayjs, { Dayjs } from "dayjs";
import { useFormik } from "formik";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import SunEditorCore from "suneditor/src/lib/core";
import * as yup from "yup";
import { api } from "../../apis";
import SelectBox from "../../components/molecules/SelectBox";
import TagField from "../../components/molecules/TagField";
import PointDatePicker from "../../components/organisms/PointDatePicker";
import { FeedbackContext } from "../../contexts/FeedbackProvider";
import { ProductContext } from "../../contexts/ProductProvider";
import { UserContext } from "../../contexts/UserProvider";
import useSnack from "../../hooks/useSnack";
import {
  convertDateToTimezoneString,
  FILE_NAME_REGEXP,
  FILE_TYPE_ERROR,
  FILE_TYPE_REGEXP,
  orElseImage,
} from "../../utils/tools";

type Type = "products" | "feedbacks";

interface WriteFormprops {
  mode: "create" | "update";
  type: Type;
}

interface DayjsSet {
  start: Dayjs | null;
  end: Dayjs | null;
  until: Dayjs | null;
}

const validationSchema = (type: Type) =>
  yup.object({
    [type === "feedbacks" ? "author" : "id"]: yup.string(),
    title: yup.string().required("제목은 필수항목입니다."),
    content: yup.string(),
    tags: yup.string().notRequired(),
    ...(type !== "feedbacks" && {
      address: yup.string().required("필수항목 입니다."),
      start: yup.string().required("필수항목 입니다."),
      end: yup.string().required("필수항목 입니다."),
      until: yup.string().required("필수항목 입니다."),
      type: yup.string().required("필수항목 입니다."),
      capacity: yup.number().required("참여 인원은 필수 항목입니다."),
      cover: yup.lazy((value) => {
        switch (typeof value) {
          case "object":
            return yup
              .object({
                type: yup.string().matches(FILE_TYPE_REGEXP, {
                  exclideEmptyString: false,
                  message: FILE_TYPE_ERROR,
                }),
                name: yup.string().matches(FILE_NAME_REGEXP, {
                  exclideEmptyString: false,
                  message: FILE_TYPE_ERROR,
                }),
                size: yup.number(),
                lastModified: yup.number(),
                lastModifiedDate: yup.string(),
                webkitRelativePath: yup.string(),
                insertTime: yup.number(),
                insertDate: yup.string(),
              })
              .nullable();
          case "string":
            return yup.string().required("필수입력");
          default:
            return yup.string();
        }
      }),
    }),
  });

function WriteForm({ mode, type }: WriteFormprops) {
  const theme = useTheme();
  const params = useParams();
  const { num } = params;
  const editor = useRef<SunEditorCore>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product & Feedback>({});
  const users = useContext(UserContext);
  const products = useContext(ProductContext);
  const feedbacks = useContext(FeedbackContext);
  const [preview, setPreview] = useState(null);
  const autoCompleteList = useRef<string[]>([]);
  const { successSnack, warningSnack, errorSnack } = useSnack();
  const [tags, setTags] = useState([]);
  const [dates, setDates] = useState<DayjsSet>({
    start: null,
    end: null,
    until: null,
  });
  const formik = useFormik({
    initialValues: {
      [type === "feedbacks" ? "author" : "id"]: "",
      title: "",
      content: "",
      tags: "",
      ...(type !== "feedbacks" && {
        cover: null,
        address: "",
        start: "",
        end: "",
        until: "",
        type: "",
        capacity: 0,
      }),
    },
    validationSchema: validationSchema(type),
    onSubmit: (values) => {
      if (editor.current.getText().length === 0) {
        errorSnack("내용은 필수항목입니다.");
        return;
      }
      formik.values.content = editor.current.getContents(true);
      const { title, content } = values;
      if (Boolean(title) && Boolean(content)) {
        (mode === "create"
          ? api[type]["create"](values)
          : api[type]["update"](String(product.num), values)
        )
          .then((result) => {
            const { data } = result;
            // console.log(data);
            if (mode === "create") {
              successSnack("프로그램이 등록 되었습니다.");
              navigate("./../");
            } else {
              successSnack("프로그램이 수정 되었습니다.");
              navigate("./../../");
            }
          })
          .catch((e) => {
            const { response } = e;
            errorSnack(response.data.message);
          });
      }
    },
  });

  useEffect(() => {
    if (mode === "update") {
      if (Object.keys(product).length > 0) {
        formik.values[type === "feedbacks" ? "author" : "id"] =
          product[type === "feedbacks" ? "author" : "id"];
        formik.values.title = product.title;
        formik.values.content = product.content;
        formik.values.tags = product.tags;
        if (type === "products") {
          formik.values.address = product.address;
          formik.values.start = convertDateToTimezoneString(
            new Date(product.start)
          );
          formik.values.end = convertDateToTimezoneString(
            new Date(product.end)
          );
          formik.values.until = convertDateToTimezoneString(
            new Date(product.until)
          );
          formik.values.type = product.type;
          formik.values.cover = product.cover;
          formik.values.capacity = product.capacity;
          setPreview(orElseImage(product.cover));
          setDates({
            start: dayjs(new Date(product.start)),
            end: dayjs(new Date(product.end)),
            until: dayjs(new Date(product.until)),
          });
        }
        setTags(product.tags.split("_"));
      }
    }
  }, [product]);

  useEffect(() => {
    const foundProduct = (type === "products" ? products : feedbacks).find(
      (prod) => prod.num === Number(num)
    );
    if (foundProduct && Object.keys(product).length === 0) {
      setProduct(foundProduct);
    }
  }, [products, feedbacks]);

  useEffect(() => {
    formik.values[type === "feedbacks" ? "author" : "id"] = users.id;
  }, [users]);

  const handleDateChange = (name, newValue, setValue?: any) => {
    if (name === "start") {
      const isBefore =
        new Date(convertDateToTimezoneString(new Date())).getTime() >
        newValue.$d.getTime();
      if (isBefore) {
        warningSnack("진행 시작이 오늘 날짜보다 작을 수 없습니다!");
        setValue(null);
        setDates({ ...dates, [name]: null });
        return;
      }
    }

    if (formik.values.start) {
      if (
        name === "end" &&
        new Date(formik.values.start).getTime() > newValue.$d.getTime()
      ) {
        warningSnack("진행 마감 기간이 시작일보다 작을 수 없습니다!");
        setValue(null);
        setDates({ ...dates, [name]: null });
      } else if (
        name === "until" &&
        new Date(formik.values.start).getTime() <= newValue.$d.getTime()
      ) {
        warningSnack("접수 마감 기간이 시작일보다 클 수 없습니다!");
        setValue(null);
        setDates({ ...dates, [name]: null });
      } else {
        setDates({ ...dates, [name]: newValue });
        formik.values[name] = convertDateToTimezoneString(newValue.$d);
        delete formik.errors[name];
      }
    } else {
      setDates({ ...dates, [name]: newValue });
      formik.values[name] = convertDateToTimezoneString(newValue.$d);
      delete formik.errors[name];
    }
  };

  const handleFileupload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files[0];
    if (!files) return;
    formik.values.cover = files;
    setPreview(URL.createObjectURL(files));
  };

  const handleTagChange = (tags: string[]) => {
    formik.values.tags = tags.join("_");
  };

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  return (
    <Container maxWidth={"lg"}>
      <Toolbar />
      <Container maxWidth='lg'>
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          justifyContent='center'
          sx={{ gap: 5 }}>
          <Stack
            sx={{
              flex: {
                xs: 1,
                md: 0.25,
              },
              gap: 3,
            }}>
            {type !== "feedbacks" && (
              <Fragment>
                {/* 프로그램 시작 */}
                <PointDatePicker
                  label='프로그램 시작'
                  name='start'
                  dates={dates}
                  handleChange={handleDateChange}
                />
                {formik.errors.start && (
                  <FormHelperText error={true}>
                    {formik.errors.start}
                  </FormHelperText>
                )}

                {/* 프로그램 종료 */}
                <PointDatePicker
                  label='프로그램 종료'
                  name='end'
                  dates={dates}
                  handleChange={handleDateChange}
                />
                {formik.errors.end && (
                  <FormHelperText error={true}>
                    {formik.errors.end}
                  </FormHelperText>
                )}

                {/* 모집 마감 */}
                <PointDatePicker
                  label='모집 마감일'
                  name='until'
                  dates={dates}
                  handleChange={handleDateChange}
                />
                {formik.errors.until && (
                  <FormHelperText error={true}>
                    {formik.errors.until}
                  </FormHelperText>
                )}
              </Fragment>
            )}

            {/* 태그 등록란 */}
            <TagField
              autoCompleteList={autoCompleteList}
              id='tags'
              name='tags'
              values={tags}
              handleTagChange={handleTagChange}
            />

            {type !== "feedbacks" && (
              <Fragment>
                {/* 위치/장소 지정 */}
                <TextField
                  size='small'
                  variant='outlined'
                  id='address'
                  name='address'
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  label='장소'
                  placeholder='서울시 송파구 ...'
                />

                {/* 프로그램 타입 */}
                <SelectBox name='type' label='프로그램 타입' formik={formik} />

                {/* 프로그램 참여 인원 수 */}
                <TextField
                  label='총 인원'
                  name='capacity'
                  type='number'
                  size='small'
                  value={formik.values.capacity || 0}
                  onChange={formik.handleChange}
                  inputProps={{
                    min: 1,
                    max: 100,
                  }}
                />

                {/* 커버 이미지 등록 버튼 */}
                {preview && (
                  <Avatar
                    variant='rounded'
                    src={preview}
                    sx={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                )}
                <Button component='label'>
                  커버 이미지 등록
                  <Box
                    component='input'
                    type='file'
                    sx={{ mb: 1, display: "none" }}
                    id='cover'
                    name='cover'
                    onChange={handleFileupload}
                  />
                </Button>
              </Fragment>
            )}
          </Stack>

          <Divider
            orientation={
              useMediaQuery(theme.breakpoints.up("md"))
                ? "vertical"
                : "horizontal"
            }
            flexItem
          />

          <Stack
            component='form'
            onSubmit={formik.handleSubmit}
            sx={{
              gap: 1,
              flex: {
                xs: 1,
                md: 0.75,
              },
            }}>
            <Box sx={{ mb: 2 }}>
              <TextField
                size='medium'
                fullWidth
                id='title'
                name='title'
                label='Title'
                value={formik.values.title}
                onChange={formik.handleChange}
                sx={{
                  [`input.MuiInputBase-input`]: {
                    fontSize: (theme) => theme.typography.pxToRem(18),
                  },
                }}
              />
              {formik.errors.title && (
                <FormHelperText error={true}>
                  {formik.errors.title}
                </FormHelperText>
              )}
            </Box>
            <SunEditor
              lang='ko'
              name='content'
              width='100%'
              height='500'
              setAllPlugins={true}
              setOptions={{
                katex: "window.katex",
                buttonList: [
                  [
                    "undo",
                    "redo",
                    "font",
                    "fontSize",
                    "formatBlock",
                    "paragraphStyle",
                    "blockquote",
                    "bold",
                    "underline",
                    "italic",
                    "strike",
                    "subscript",
                    "superscript",
                    "fontColor",
                    "hiliteColor",
                    "textStyle",
                    "removeFormat",
                    "outdent",
                    "indent",
                    "align",
                    "horizontalRule",
                    "list",
                    "lineHeight",
                    "table",
                    "link",
                    "image",
                    "video",
                    "audio",
                    "math",
                    "imageGallery",
                    "fullScreen",
                    "showBlocks",
                    "codeView",
                    "preview",
                    "print",
                    "save",
                    "template",
                  ],
                ],
              }}
              setContents={formik.values["content"]}
              getSunEditorInstance={getSunEditorInstance}
              // onKeyUp={handleContentChange}
            />
            {formik.errors.content && (
              <FormHelperText error={true}>
                {formik.errors.content}
              </FormHelperText>
            )}
            <Stack direction='row' justifyContent='flex-end' sx={{ gap: 1 }}>
              <Button variant='contained' color='success' type='submit'>
                {mode === "create" ? "작성하기" : "수정하기"}
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={() => {
                  navigate(-1);
                }}>
                취소하기
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Container>
  );
}

WriteForm.defaultProps = {
  mode: "create",
  type: "products",
};

export default WriteForm;
