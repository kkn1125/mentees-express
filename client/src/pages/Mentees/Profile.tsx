import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import * as yup from "yup";
import { api } from "../../apis";
import { fileUpload } from "../../apis/members/fileUpload";
import {
  UserContext,
  UserDispatchContext,
  userSave,
} from "../../contexts/UserProvider";
import useSnack from "../../hooks/useSnack";
import {
  FILE_NAME_REGEXP,
  FILE_TYPE_ERROR,
  FILE_TYPE_REGEXP,
  orElseImage,
} from "../../utils/tools";

const validationSchema = yup.object({
  email: yup.string().notRequired(),
  id: yup.string().notRequired(),
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
});

function Profile() {
  const users = useContext(UserContext);
  const userDispatch = useContext(UserDispatchContext);
  const { successSnack, warningSnack } = useSnack();
  const [cookies] = useCookies(["token"]);
  const [rerender, setRerender] = useState(false);
  const formik: any = useFormik({
    initialValues: {
      email: "",
      id: "",
      cover: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const { email, id, cover } = values;
      if (email !== users.email || id !== users.id || cover !== users.cover) {
        api.members
          .update(
            String(users.num),
            {
              email,
              id,
              cover,
            },
            cookies.token.token
          )
          .then(() => {
            api.members.findOne(String(users.num)).then((result) => {
              const { data } = result;
              if (data) {
                const foundUser = data.payload[0];
                delete foundUser["pw"];
                userDispatch(userSave(foundUser));
                successSnack("프로필을 수정했습니다.");
              }
            });
          })
          .catch((e) => {
            const { response } = e;
            warningSnack(response.data.message);
          });
      } else {
        warningSnack("기존 데이터와 동일합니다.");
      }
    },
  });

  useEffect(() => {
    if (Object.keys(users).length > 0) {
      formik.values.email = users.email;
      formik.values.id = users.id;
      formik.values.cover = users.cover;
    }
    setRerender(!rerender);
  }, [users]);

  const handleFileupload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files[0];
    if (!files) return;
    formik.values.cover = files;
    fileUpload(files, users.num).then(() => {
      api.members.findOne(String(users.num)).then((result) => {
        const { data } = result;
        if (data) {
          const foundUser = data.payload[0];
          delete foundUser["pw"];
          userDispatch(userSave(foundUser));
        }
      });
    });
  };

  return (
    <Box>
      <Toolbar />
      <Container maxWidth='md'>
        <Stack
          component={FormPaper}
          onSubmit={formik.handleSubmit}
          alignItems='center'
          sx={{
            p: 5,
          }}>
          <Box
            sx={{
              position: "relative",
            }}>
            <Avatar
              src={orElseImage(users.cover)}
              sx={{ width: 250, height: 250, mb: 3 }}
            />
            <Button
              component='label'
              variant='contained'
              sx={{
                position: "absolute",
                top: 0,
                left: "100%",
                minWidth: "auto",
                px: 1,
              }}>
              <EditIcon />
              <Box
                component='input'
                type='file'
                sx={{ mb: 1, display: "none" }}
                id='cover'
                name='cover'
                onChange={handleFileupload}
              />
            </Button>
          </Box>
          <Typography variant='h5' sx={{ fontWeight: 700 }}>
            {users.email}
          </Typography>
          <Typography variant='h6'>{users.id}</Typography>
          <Toolbar />
          <Container maxWidth='sm'>
            <TextField
              size='small'
              fullWidth
              sx={{ mb: 2 }}
              id='email'
              name='email'
              type='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              label='email'
            />
            <TextField
              size='small'
              fullWidth
              sx={{ mb: 2 }}
              id='id'
              name='id'
              value={formik.values.id}
              onChange={formik.handleChange}
              label='id'
            />
            <Button type='submit' variant='contained' sx={{ float: "right" }}>
              저장
            </Button>
          </Container>
        </Stack>
      </Container>
    </Box>
  );
}

const FormPaper = (props: any) => <Paper component='form' {...props} />;

export default Profile;
