import axios from "axios";
import { baseUrl } from "../../utils/tools";

export const fileUpload = (file: any, num: number) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("num", String(num));
  return axios.post(`${baseUrl}/fileupload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
