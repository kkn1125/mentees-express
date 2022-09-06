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
import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { api } from "../../apis";
import { UserDispatchContext, userSave } from "../../contexts/UserProvider";
import useSnack from "../../hooks/useSnack";
import ALERT_COMMENT from "../../utils/alertComment";
import {
  authorizeEndpoint,
  baseUrl,
  clientBaseUrl,
  emailValidation,
  passwordValidation,
} from "../../utils/tools";

const { SIGN_IN } = ALERT_COMMENT;
const authorizeUrl = `${baseUrl}${authorizeEndpoint}`;

const inputs: Inputs[] = [
  {
    label: "email",
    name: "email",
    type: "email",
    placeholder: "sample@naver.com",
  },
  {
    label: "password",
    name: "pw",
    type: "password",
  },
];

const validationSchema = yup.object({
  email: emailValidation,
  pw: passwordValidation,
});

function Signin() {
  const locate = useLocation();
  const userDispatch = useContext(UserDispatchContext);
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [cover, setCover] = useState(false);
  const { successSnack, errorSnack } = useSnack();
  const formik = useFormik({
    initialValues: {
      email: "",
      pw: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setCover(true);
      setTimeout(() => {
        api.auth
          .signin(values)
          .then((result: any) => {
            const { data } = result;
            const { payload } = data;
            successSnack(SIGN_IN.SUCCESS);
            userDispatch(userSave(payload.user));
            setCookie(
              "token",
              {
                token: payload.token,
                user_num: payload.user_num,
              },
              {
                path: "/",
              }
            );
            navigate("/");
          })
          .catch((e) => {
            errorSnack(e.message);
            setCover(false);
          });
      }, 1000);
    },
  });

  const kakaoLogin = () => {
    location.href = `${authorizeUrl}?redirect_uri=${clientBaseUrl}`;
  };

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
            height: "100%",
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
              backgroundColor: "#00000008",
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
              {inputs.map(({ label, name, type, placeholder }, idx) => (
                <Box key={idx} sx={{ whiteSpace: "normal" }}>
                  <TextField
                    fullWidth
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    type={type}
                    required
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
              ))}
            </Stack>
            <Stack sx={{ gap: 1 }}>
              <Button variant='contained' type='submit' disabled={cover}>
                로그인
              </Button>
              <Button
                variant='contained'
                color='warning'
                type='button'
                disabled={cover}
                onClick={kakaoLogin}>
                카카오 로그인
              </Button>
            </Stack>
            <Button
              component={Link}
              to='/'
              color='inherit'
              variant='contained'
              type='button'>
              메인으로
            </Button>
            <Link to='/auth/signup'>go to Sign up</Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default Signin;
