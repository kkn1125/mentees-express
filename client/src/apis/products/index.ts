import axios from "axios";
import { baseUrl, getFormData } from "../../utils/tools";

export default {
  findAll: () => {
    return axios.get(baseUrl + "/products");
  },
  findOne: (num: string) => {
    return axios.get(baseUrl + `/products/${num}`);
  },
  create: (product: Product) => {
    const formData = getFormData(product);
    return axios.post(baseUrl + `/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateByNum: (num: string, product: Product) => {
    const formData = getFormData(product);
    return axios.post(baseUrl + `/products/${num}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteByNum: (num: string) => {
    return axios.post(baseUrl + `/products/${num}`);
  },
};
