import axios from "axios";
import { baseUrl } from "../../utils/tools";

export default {
  findAll: () => {
    return axios.get(baseUrl + `/members`).then((res) => {
      if (res.status !== 200) {
        return null;
      }
      console.debug(res);
      return res.data;
    });
  },
  findOne: (num: string) => {
    return axios.get(baseUrl + `/members/${num}`);
  },
  findById: (id: string) => {
    return axios.get(baseUrl + `/members/id/${id}`);
  },
  create: (user: User) => {
    return axios.post(baseUrl + `/members`, user);
  },
  updateById: (num: string, user: User) => {
    return axios.put(baseUrl + `/members/${num}`, user);
  },
  deleteById: (num: string) => {
    return axios.delete(baseUrl + `/members/${num}`);
  },
};
