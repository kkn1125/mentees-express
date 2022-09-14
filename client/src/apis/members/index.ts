import axios from "axios";
import { baseUrl, getFormData } from "../../utils/tools";

export default {
  findAll: () => {
    return axios.get(baseUrl + `/members`);
  },
  findOne: (num: string) => {
    return axios.get(baseUrl + `/members/${num}`);
  },
  findById: (id: string) => {
    return axios.get(baseUrl + `/members/id/${id}`);
  },
  create: (user: User) => {
    const formData = getFormData(user);
    return axios.post(baseUrl + `/members`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateById: (num: string, user: User, token: string) => {
    const formData = getFormData(user);
    return axios.put(baseUrl + `/members/${num}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteById: (num: string) => {
    return axios.delete(baseUrl + `/members/${num}`);
  },
};
