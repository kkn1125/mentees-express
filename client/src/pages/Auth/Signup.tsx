import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormHelperText,
  Stack,
  TextField,
  Toolbar,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { emailValidation, passwordValidation } from "../../utils/tools";

const inputs: Inputs[] = [
  {
    name: "id",
    type: "text",
    placeholder: "dobby123",
  },
  {
    name: "email",
    type: "email",
    placeholder: "sample@naver.com",
  },
  {
    name: "password",
    type: "password",
  },
  {
    name: "name",
    type: "text",
    placeholder: "kimson",
  },
  {
    name: "address",
    type: "text",
    placeholder: "서울시 가리봉동 ...",
  },
];

function Signup() {
  const validationSchema = yup.object({
    email: emailValidation,
    password: passwordValidation,
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.debug(values);
    },
  });

  return (
    <Box>
      <Toolbar />

      <Container
        component={Stack}
        direction='row'
        maxWidth={"sm"}
        sx={{ gap: 5 }}>
        <Stack
          component='form'
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{
            flex: 1,
            gap: 3,
          }}>
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
          <Button color='info' variant='contained' type='submit'>
            회원가입
          </Button>
          <Link to='/auth/signin'>go to Sign in</Link>
        </Stack>
      </Container>
    </Box>
  );
}

export default Signup;
