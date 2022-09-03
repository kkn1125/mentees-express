import {
  Box,
  Button,
  Container,
  FormHelperText,
  Stack,
  TextField,
  Toolbar,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
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
  const [cover, setCover] = useState(false);
  const { successSnack, errorSnack } = useSnack();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      setCover(true);
    },
  });

  return (
    <Box>
      <Toolbar />

      <Stack
        component={Container}
        direction='row'
        maxWidth={"lg"}
        sx={{ gap: 5 }}>
        <Box
          sx={{
            flex: 1,
          }}>
          <Box
            component='img'
            src='/assets/login-cover.jpg'
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <Box
          component='form'
          sx={{
            flex: !cover ? 1 : 0,
            overflow: "hidden",
          }}
          noValidate
          onSubmit={formik.handleSubmit}
          onError={() => {
            errorSnack("로그인에 실패하였습니다.");
            setCover(false);
          }}>
          <Stack justifyContent='center' sx={{ height: "100%", gap: 3 }}>
            <Stack justifyContent='center' sx={{ gap: 1 }}>
              {inputs.map(({ name, type, placeholder }, idx) => (
                <Box key={idx}>
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
            <Button variant='contained' type='submit'>
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
