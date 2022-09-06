import axios from "axios";
import { baseUrl } from "../../utils/tools";

export default {
  findAll: () => {
    return axios.get(baseUrl + "/products");
  },
  findOne: (num: string) => {
    return axios.get(baseUrl + `/products/${num}`);
  },
};
