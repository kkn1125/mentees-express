import axios from "axios";
import { authorizeEndpoint, serverBaseUrl } from "../../../utils/tools";

const authorize = (redirect_uri: string) => {
  axios.get(`${serverBaseUrl}/${authorizeEndpoint}`, {
    params: {
      redirect_uri,
    },
  });
};

export default authorize;
