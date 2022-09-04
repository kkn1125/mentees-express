import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormHelperText,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { api } from "../../apis";
import useSnack from "../../hooks/useSnack";
import { emailValidation, passwordValidation } from "../../utils/tools";

const inputs: Inputs[] = [
  {
    name: "email",
    type: "email",
    placeholder: "sample@naver.com",
  },
  {
    name: "password",
    type: "password",
  },
];

const validationSchema = yup.object({
  email: emailValidation,
  password: passwordValidation,
});

function Signin() {
  const navigate = useNavigate();
  const [cover, setCover] = useState(false);
  const { successSnack, errorSnack } = useSnack();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setCover(true);
      api.auth
        .signin({ email: values.email, password: values.password })
        .then((result) => {
          successSnack("");
          navigate("/");
        })
        .catch((e) => {
          errorSnack("로그인에 실패하였습니다.");
          setCover(false);
        });
    },
  });

  return (
    <Box>
      <Toolbar />

      <Stack
        component={Container}
        direction='row'
        maxWidth={"lg"}
        sx={{ gap: cover ? 0 : 5 }}>
        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            maxHeight: 556,
            position: "relative",
          }}>
          <Box
            component='img'
            src='/assets/login-cover.jpg'
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {cover && (
            <Stack
              component='span'
              alignItems='center'
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                height: 0,
                textAlign: "center",
                color: "#ffffff",
                opacity: cover ? 1 : 0,
                transition: "750ms ease",
              }}>
              <Typography
                gutterBottom
                variant='h3'
                sx={{
                  display: "inline-block",
                  color: "inherit",
                  fontWeight: 700,
                }}>
                계정을 확인 중 입니다...
              </Typography>

              <CircularProgress size={55} color='inherit' />
            </Stack>
          )}
        </Box>

        <Box
          component='form'
          sx={{
            flex: !cover ? 1 : 0,
            overflow: "hidden",
            transition: "750ms ease",
            whiteSpace: "nowrap",
          }}
          noValidate
          onSubmit={formik.handleSubmit}>
          <Stack
            justifyContent='center'
            sx={{
              width: 556,
              height: "100%",
              gap: 3,
              float: "right",
            }}>
            <Stack justifyContent='center' sx={{ gap: 1 }}>
              {inputs.map(({ name, type, placeholder }, idx) => (
                <Box key={idx} sx={{ whiteSpace: "normal" }}>
                  <TextField
                    fullWidth
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    type={type}
                    required
                    id={name}
                    name={name}
                    label={name}
                    placeholder={placeholder}
                    size={"medium"}
                    autoFocus
                  />
                  {formik.errors[name] && (
                    <FormHelperText error={true}>
                      {formik.errors[name]}
                    </FormHelperText>
                  )}
                </Box>
              ))}
            </Stack>
            <Button variant='contained' type='submit' disabled={cover}>
              로그인
            </Button>
            <Link to='/auth/signup'>go to Sign up</Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default Signin;
