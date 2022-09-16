import axios from "axios";
import { baseUrl, getFormData } from "../../utils/tools";

export default {
  getLastOrderNumber: (cnum: number) => {
    return axios.get(baseUrl + `/comments/lastorder/${cnum}`);
  },
  findAll: () => {
    return axios.get(baseUrl + "/comments");
  },
  findOne: (num: string) => {
    return axios.get(baseUrl + `/comments/${num}`);
  },
  findByPnum: (pnum: string) => {
    return axios.get(baseUrl + `/comments/pnum/${pnum}`);
  },
  findByFnum: (fnum: string) => {
    return axios.get(baseUrl + `/comments/fnum/${fnum}`);
  },
  create: (comment: Comments) => {
    const formData = getFormData(comment);
    return axios.post(baseUrl + `/comments`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateByNum: (num: string, comment: Comments) => {
    const formData = getFormData(comment);
    return axios.put(baseUrl + `/comments/${num}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteByNum: (num: string) => {
    return axios.delete(baseUrl + `/comments/${num}`);
  },
};
