import * as yup from "yup";
import { AnyObject } from "yup/lib/object";

export const {
  REACT_APP_SERVER_HOST,
  REACT_APP_SERVER_PORT,
  REACT_APP_KAKAO_AUTHORIZE_PATHNAME,
  REACT_APP_KAKAO_TOKEN_PATHNAME,
  REACT_APP_KAKAO_GET_USER_PATHNAME,
  REACT_APP_KAKAO_LOGOUT_PATHNAME,
  REACT_APP_KAKAO_API_HOST,
  REACT_APP_HOST,
  REACT_APP_PORT,
} = process.env;

export const baseUrl = `http://${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}/api`;

export const serverBaseUrl = `http://${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}`;
export const clientBaseUrl = `http://${REACT_APP_HOST}:${REACT_APP_PORT}`;

export const authorizeEndpoint = REACT_APP_KAKAO_AUTHORIZE_PATHNAME;
export const tokenEndpoint = REACT_APP_KAKAO_TOKEN_PATHNAME;
export const getUserEndpoint = REACT_APP_KAKAO_GET_USER_PATHNAME;
export const logoutEndpoint = REACT_APP_KAKAO_LOGOUT_PATHNAME;
export const kapiUrl = REACT_APP_KAKAO_API_HOST;

export const BRAND_NAME = "mentees";

export const dummyProducts = [
  {
    num: 1,
    cover: "http://localhost:8050/resources/img/cover/sample.jpg",
    title: "mentees programs",
    view: 5,
    type: "semina",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident porro, aut impedit quae beatae, vel dolorem eos accusantium omnis possimus exercitationem ullam, quibusdam commodi sit cum eaque eligendi quasi pariatur.",
    start: new Date(),
    end: new Date(),
  },
  {
    num: 2,
    cover: "http://localhost:8050/resources/img/cover/sample.jpg",
    title: "mentees programs2",
    view: 5,
    type: "semina",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident porro, aut impedit quae beatae, vel dolorem eos accusantium omnis possimus exercitationem ullam, quibusdam commodi sit cum eaque eligendi quasi pariatur.",
    start: new Date(),
    end: new Date(),
  },
  {
    num: 3,
    cover: "http://localhost:8050/resources/img/cover/sample.jpg",
    title: "mentees programs2",
    view: 5,
    type: "semina",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident porro, aut impedit quae beatae, vel dolorem eos accusantium omnis possimus exercitationem ullam, quibusdam commodi sit cum eaque eligendi quasi pariatur.",
    start: new Date(),
    end: new Date(),
  },
];

export const dummyFeedbacks = [
  {
    num: 1,
    view: 5,
    title: "Lorem ipsum dolor sit amet.",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In nemo alias laboriosam earum cumque, doloribus odio animi facere expedita officia fugiat minus suscipit voluptatem aliquam! Assumenda vitae atque rem itaque facilis commodi sunt quia cum veniam quisquam? Aut fuga iure a pariatur! Minus optio provident possimus odit natus cum, delectus ipsum neque nisi doloremque molestiae! Veritatis quae, quo similique, adipisci provident animi dolorem at eos, laboriosam ea dignissimos nostrum eius nam corrupti nobis voluptatibus veniam soluta. Dignissimos qui consequuntur nemo! Quidem nam, fuga rem nisi optio quas nihil! Saepe excepturi asperiores, nostrum labore animi laboriosam quae molestias odit itaque neque.",
    author: "kimson",
    tags: "test_wow",
    regdate: new Date(),
    updates: new Date(),
  },
];

export const orElseImage = (src: string) =>
  !src || src.trim() === "" ? "/assets/sample.jpg" : src;

export const emailValidation = yup
  .string()
  .matches(
    /^([A-z_.\-0-9]+)+\@[A-z]{2,}(\.[A-z]{2,}){1,}$/g,
    "이메일 형식과 맞지 않습니다."
  )
  .required("이메일은 필수 항목 입니다.");
export const passwordValidation = yup
  .string()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
    "비밀번호는 숫자 + 소문자 + 대문자 + 특수문자로 구성되어야 합니다. (대문자 및 특수문자는 최소 1자 이상 포함되어야 합니다."
  )
  .required("비밀번호는 필수 항목 입니다.");

export const objectToQueryString = (obj: object): string =>
  Object.entries(obj).reduce(
    (acc, cur, cid, o) =>
      (acc +=
        cur[0] +
        "=" +
        encodeURIComponent(cur[1]) +
        (cid !== o.length - 1 ? "&" : "")),
    ""
  );

export const queryStringToObject = (query: string) =>
  Object.fromEntries(
    (query.startsWith("?") ? query.slice(1) : query)
      .split("&")
      .map((q) => q.split("="))
  );
