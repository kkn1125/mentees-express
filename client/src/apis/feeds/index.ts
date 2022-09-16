import axios from "axios";
import { baseUrl } from "../../utils/tools";

export default {
  findAll: () => {},
  findByFnum: (fnum: number) => {
    return axios.get(`${baseUrl}/feeds/fnum/${fnum}`);
  },
  create: (fnum: number, mnum: number) => {
    const formData = new FormData();
    formData.append("fnum", String(fnum));
    formData.append("mnum", String(mnum));
    return axios.post(`${baseUrl}/feeds`, formData);
  },
  delete: (fnum: number, mnum: number) => {
    return axios.delete(`${baseUrl}/feeds/${fnum}`, {
      data: {
        mnum: mnum,
      },
    });
  },
};
