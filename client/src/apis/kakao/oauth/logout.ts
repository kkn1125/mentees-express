import axios from "axios";
import { baseUrl, logoutEndpoint } from "../../../utils/tools";

const logout = (logoutRedirectUri: string) => {
  return axios.post(baseUrl + logoutEndpoint, {
    logoutRedirectUri,
  });
};

export default logout;
