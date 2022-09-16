import axios from "axios";
import { baseUrl } from "../../utils/tools";

export default {
  findAll: () => {},
  findByPnum: (pnum: number) => {
    return axios.get(`${baseUrl}/likes/pnum/${pnum}`);
  },
  create: (pnum: number, mnum: number) => {
    const formData = new FormData();
    formData.append("pnum", String(pnum));
    formData.append("mnum", String(mnum));
    return axios.post(`${baseUrl}/likes`, formData);
  },
  delete: (pnum: number, mnum: number) => {
    return axios.delete(`${baseUrl}/likes/${pnum}`, {
      data: {
        mnum: mnum,
      },
    });
  },
};
