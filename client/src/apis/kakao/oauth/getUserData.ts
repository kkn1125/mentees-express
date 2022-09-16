import axios from "axios";
import { baseUrl, getUserEndpoint } from "../../../utils/tools";

const getUserData = (accessToken: string, propertyKeys: string) => {
  const formData = new FormData();
  formData.append("accessToken", accessToken);
  formData.append("propertyKeys", propertyKeys);
  return axios.post(`${baseUrl}${getUserEndpoint}`, formData);
};

export default getUserData;
