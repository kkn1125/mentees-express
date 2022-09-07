import axios from "axios";
import {
  baseUrl,
  clientBaseUrl,
  serverBaseUrl,
  tokenEndpoint,
} from "../../../utils/tools";

const token = (code: string) => {
  return axios.post(`${baseUrl}${tokenEndpoint}`, {
    redirect_uri:
      process.env.NODE_ENV !== "production" ? clientBaseUrl : serverBaseUrl,
    code,
  });
};

export default token;
