import axios from "axios";
import { baseUrl, getUserEndpoint } from "../../../utils/tools";

const getUserData = (accessToken: string, propertyKeys: string) => {
  return axios.post(`${baseUrl}${getUserEndpoint}`, {
    accessToken,
    propertyKeys,
  });
};

export default getUserData;
