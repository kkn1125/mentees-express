import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Toolbar,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { api } from "../../apis";
import useSnack from "../../hooks/useSnack";
import { emailValidation, passwordValidation } from "../../utils/tools";

const genderRadios = [
  {
    labelname: "Other",
    value: 0,
  },
  {
    labelname: "Male",
    value: 1,
  },
  {
    labelname: "Female",
    value: 2,
  },
];

const inputs: Inputs[] = [
  {
    label: "id",
    name: "id",
    type: "text",
    placeholder: "dobby123",
    require: true,
  },
  {
    label: "email",
    name: "email",
    type: "email",
    placeholder: "sample@naver.com",
    require: true,
  },
  {
    label: "password",
    name: "pw",
    type: "password",
    require: true,
  },
  {
    label: "name",
    name: "name",
    type: "text",
    placeholder: "kimson",
    require: true,
  },
  {
    label: "address",
    name: "address",
    type: "text",
    placeholder: "서울시 가리봉동 ...",
  },
  {
    label: "zip",
    name: "zip",
    type: "text",
    placeholder: "서울시 가리봉동 ...",
  },
  {
    label: "gender",
    name: "gender",
    type: "select",
  },
];

function Signup() {
  const navigate = useNavigate();
  const { successSnack, errorSnack } = useSnack();
  const validationSchema = yup.object({
    id: yup.string().required("필수 항목 입니다."),
    email: emailValidation,
    pw: passwordValidation,
  });
  const formik = useFormik({
    initialValues: {
      id: "",
      email: "",
      pw: "",
      name: "",
      address: "",
      zip: 0,
      msg: "",
      jumin: "",
      gender: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // console.debug(values);
      api.members
        .create(values as unknown as User)
        .then((result) => {
          const { data } = result;
          const { payload } = data;
          if (data.ok) {
            successSnack("회원가입에 성공하였습니다 😁");
            navigate("/auth/signin");
          }
        })
        .catch((e) => {
          errorSnack(e.message);
        });
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
            {inputs.map(({ label, name, type, placeholder, require }, idx) =>
              type === "select" ? (
                <FormControl key={idx}>
                  <FormLabel id='genders'>Gender</FormLabel>
                  <RadioGroup
                    aria-labelledby='genders'
                    defaultValue='other'
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    name={"gender"}>
                    {genderRadios.map(({ labelname, value }) => (
                      <FormControlLabel
                        key={value}
                        value={value}
                        control={<Radio />}
                        label={labelname}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              ) : (
                <Box key={idx}>
                  <TextField
                    fullWidth
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    type={type}
                    required={Boolean(require)}
                    id={name}
                    name={name}
                    label={label}
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
              )
            )}
          </Stack>
          <Button color='info' variant='contained' type='submit'>
            회원가입
          </Button>
          <Button
            component={Link}
            to='/'
            color='secondary'
            variant='contained'
            type='button'>
            메인으로
          </Button>
          <Link to='/auth/signin'>go to Sign in</Link>
        </Stack>
      </Container>
    </Box>
  );
}

export default Signup;
