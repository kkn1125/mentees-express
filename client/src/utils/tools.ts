import * as yup from "yup";

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
    cover: `/assets/sample.jpg`,
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
    cover: `/assets/sample.jpg`,
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
    cover: `/assets/sample.jpg`,
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

export const orElseImage = (src: string) => {
  if (src && src.startsWith("http")) return src;

  return !src || src.trim() === "" || src.startsWith("/assets")
    ? "/assets/sample.jpg"
    : `${
        process.env.NODE_ENV === "production" ? "/resources" : ""
      }/uploads/${src}`;
};

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
      .filter((param) => param.trim())
      .map((q) => q.split("="))
  );

export const fileToBase64Data = (files) => {
  const reader = new FileReader();
  let result = null;
  reader.readAsDataURL(files);
  reader.onload = function () {
    result = reader.result;
  };
  reader.onerror = function (err) {
    console.log("Error: ", err);
  };
  return result;
};

export const getFormData = (data: any): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  return formData;
};

export const dateFormat = (date: Date, format: string) =>
  format.replace(/yyyy|MM|dd|HH|mm|ss|SSS|AP/g, ($1) => {
    const h = date.getHours();
    const isOver12 = h > 12;
    const is24 = format.indexOf("AP") > -1;
    switch ($1) {
      case "yyyy":
        return date.getFullYear().toString().padStart(2, "0");
      case "MM":
        return (date.getMonth() + 1).toString().padStart(2, "0");
      case "dd":
        return date.getDate().toString().padStart(2, "0");
      case "HH":
        return (is24 && isOver12 ? h - 12 : h).toString().padStart(2, "0");
      case "mm":
        return date.getMinutes().toString().padStart(2, "0");
      case "ss":
        return date.getSeconds().toString().padStart(2, "0");
      case "SSS":
        return date.getMilliseconds().toString().padStart(3, "0");
      case "AP":
        return (isOver12 ? "PM" : "AP") as string;
    }
  });

export const convertDateToTimezoneString = (date: Date) => {
  return dateFormat(
    new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    "yyyy-MM-ddTHH:mm:ss.SSS"
  );
};

// yup 에러 메세지
export const AVAILABLE_FILE_TYPE = ["JPG", "PNG", "GIF", "MP4", "WEBM"];

export const REQUIRED_ERROR = "필수항목 입니다.";
export const FILE_MODIFIED_ERROR = "파일의 수정시간이 잘못 되었습니다.";
export const FILE_WEBKIT_PATH_ERROR = "상대경로가 잘못 되었습니다.";
export const FILE_INSERT_TIME_ERROR = "파일 등록 일자가 잘못 되었습니다.";

export const FILE_NAME_REGEXP = /(?=.+)\.(jp.?g|png|gif|webm|mp4)/i;
export const FILE_TYPE_REGEXP = /image\/(jpg|jpeg|png|gif|mp4|webm)/i;
export const FILE_NAME_ERROR = "파일명은 문자여야 합니다.";
export const FILE_SIZE_ERROR = "파일 크기가 잘못되었습니다.";
export const FILE_TYPE_ERROR = `파일형식이 다릅니다. 가능한 형식은 ${AVAILABLE_FILE_TYPE.join(
  ", "
)} 입니다.`;
