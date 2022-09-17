import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import SubdirectoryArrowRightOutlinedIcon from "@mui/icons-material/SubdirectoryArrowRightOutlined";
import {
  Box,
  Button,
  Grow,
  IconButton,
  Paper,
  Stack,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { Fragment, useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { api } from "../../apis";
import { UserContext } from "../../contexts/UserProvider";
import useSnack from "../../hooks/useSnack";
import UserProfile from "../molecules/UserProfile";

type Type = "products" | "feedbacks";

interface CommentItemProps {
  counts?: number;
  pnum: number;
  cnum: number;
  order: number;
  layer: number;
  type: Type;
  comment?: Comments;
}

const validationSchema = yup.object({
  pnum: yup.number().required("필수항목 입니다."),
  cnum: yup.number().required("필수항목 입니다."),
  order: yup.number().required("필수항목 입니다."),
  layer: yup.number().required("필수항목 입니다."),
  author: yup.string().required("필수항목 입니다."),
  type: yup.string().required("필수항목 입니다."),
  content: yup.string(),
  visible: yup.number(),
});

function CommentItem({
  counts,
  pnum,
  cnum,
  order,
  layer,
  type,
  comment,
}: CommentItemProps) {
  const users = useContext(UserContext);
  const [owner, setOwner] = useState(null);
  const { successSnack, warningSnack } = useSnack();
  const [writeMode, setWriteMode] = useState(false);
  const formik = useFormik({
    initialValues: {
      pnum: null,
      cnum: null,
      order: 0,
      layer: 0,
      author: "",
      type: "",
      content: "",
      visible: 1,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (values.content.length === 0) {
        warningSnack("내용을 입력해야합니다.");
        return;
      }
      try {
        if (comment) {
          formik.values.layer = comment.layer + 1;
          const lastOrder = await api.comment.getLastOrderNumber(comment.cnum);
          formik.values.order = lastOrder.data.payload + 1;
        }

        const { data } = await api.comment.create(values);

        if (data.ok) {
          successSnack("댓글이 등록되었습니다.");
          setWriteMode(false);
        }
      } catch (e: any) {
        const { response } = e;
        warningSnack(response.data.message);
      } finally {
        // 초기화
        resetForm();
      }
    },
  });

  useEffect(() => {
    if (users.num) {
      formik.values.author = users.id;
      formik.values.pnum = pnum;
      formik.values.cnum = cnum;
      formik.values.order = order;
      formik.values.layer = layer;
      formik.values.type = type;
    }

    if (comment) {
      api.members
        .findById(comment.author)
        .then((result) => {
          const { data } = result;
          const { payload } = data;
          setOwner(payload[0]);
        })
        .catch((e) => {
          const { response } = e;
          warningSnack(response.data.message);
        });
    }
  }, [users]);

  const handleWriteMode = () => {
    if (!users.num) {
      setWriteMode(false);
      warningSnack("로그인 후 사용 해주세요.");
      return;
    }
    setWriteMode(!writeMode);
  };

  const handleRemoveComment = () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      api.comment
        .deleteByNum(String(comment.num))
        .then(() => {
          successSnack("댓글이 삭제되었습니다.");
        })
        .catch((e) => {
          warningSnack(e.message);
        });
    }
  };

  return (
    <Box
      component={comment ? Paper : "div"}
      {...(comment && { elevation: 5 })}
      sx={{
        p: comment ? 3 : 0,
        ml: layer * 5,
        position: "relative",
      }}>
      {layer > 0 && (
        <SvgIcon
          sx={{
            position: "absolute",
            top: "1rem",
            right: "101%",
            fontSize: (theme) => theme.typography.pxToRem(30),
            fontWeight: 700,
          }}>
          <SubdirectoryArrowRightOutlinedIcon />
        </SvgIcon>
      )}
      <Stack sx={{ gap: 1, mt: 2, flex: 1 }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          sx={{ flex: 1, mb: 3 }}>
          {comment && (
            <UserProfile
              nickname={comment.author}
              src={owner?.cover || ""}
              time={new Date(comment.regdate)}
            />
          )}
          <Stack direction='row' alignItems='center' sx={{ gap: 1, flex: 1 }}>
            <Stack
              direction={"row"}
              justifyContent={
                counts !== undefined ? "space-between" : "flex-end"
              }
              alignItems='center'
              sx={{ flex: 1 }}>
              {counts !== undefined && (
                <Typography
                  variant='h6'
                  component='div'
                  sx={{ fontWeight: 700 }}>
                  {counts} comment{counts > 1 && "s"}
                </Typography>
              )}
              <Stack direction='row' sx={{ gap: 1 }}>
                {comment && users.id === comment.author && (
                  <Fragment>
                    <SwitchButton
                      isIconButton={Boolean(comment)}
                      color={!comment ? "primary" : "warning"}
                      onClick={handleWriteMode}
                      variant='contained'
                      sx={{ float: "right" }}>
                      {comment ? <RateReviewOutlinedIcon /> : "댓글 작성"}
                    </SwitchButton>
                    <Box>
                      <Tooltip title='삭제하기' placement='bottom'>
                        <IconButton color='error' onClick={handleRemoveComment}>
                          <DeleteForeverIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Fragment>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        {comment && <Typography gutterBottom>{comment.content}</Typography>}
        {writeMode && (
          <Grow in={writeMode} style={{ transformOrigin: "0 0 0" }}>
            <Box component={Paper} elevation={5} sx={{ p: 3 }}>
              <Stack
                component='form'
                onSubmit={formik.handleSubmit}
                sx={{ gap: 1, mt: 2, flex: 1 }}>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  sx={{ flex: 1 }}>
                  <UserProfile nickname='kimson' src={users.cover || ""} />
                  <Box>
                    <Button variant='outlined' type='submit'>
                      등록
                    </Button>
                  </Box>
                </Stack>

                <TextField
                  name='content'
                  fullWidth
                  multiline
                  rows={5}
                  value={formik.values.content}
                  onChange={formik.handleChange}
                />
              </Stack>
            </Box>
          </Grow>
        )}
      </Stack>
    </Box>
  );
}

const SwitchButton = (props) => {
  const { isIconButton, ...rest } = props;
  return isIconButton ? (
    <Tooltip title='댓글 작성' placement='bottom'>
      <IconButton {...rest} />
    </Tooltip>
  ) : (
    <Button {...rest} />
  );
};

export default CommentItem;
