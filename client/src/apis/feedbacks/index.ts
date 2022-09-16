import axios from "axios";
import { baseUrl, getFormData } from "../../utils/tools";

export default {
  findAll: () => {
    return axios.get(baseUrl + "/feedbacks");
  },
  findOne: (num: string) => {
    return axios.get(baseUrl + `/feedbacks/${num}`);
  },
  create: (feedback: Feedback) => {
    const formData = getFormData(feedback);
    return axios.post(baseUrl + `/feedbacks`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateByNum: (num: string, feedback: Feedback) => {
    const formData = getFormData(feedback);
    return axios.put(baseUrl + `/feedbacks/${num}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteByNum: (num: string) => {
    return axios.delete(baseUrl + `/feedbacks/${num}`);
  },
};
