import axios from "axios";
import { baseUrl } from "../../utils/tools";

export default {
  findAll: () => {
    return axios.get(baseUrl + `/api/members`).then((res) => {
      if (res.status !== 200) {
        return null;
      }
      console.debug(res);
      return res.data;
    });
  },
  findOne: (id: string) => {
    return axios.get(baseUrl);
  },
  create: (id: string) => {
    return axios.post(baseUrl);
  },
  updateById: (id: string) => {
    return axios.put(baseUrl);
  },
  deleteById: (id: string) => {
    return axios.delete(baseUrl);
  },
};
