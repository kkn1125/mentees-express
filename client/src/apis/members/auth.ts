import axios from "axios";
import { baseUrl } from "../../utils/tools";

export default {
  signin: (payload: SigninPayload) => {
    const { email, pw } = payload;
    return axios.post(baseUrl + `/auth/signin`, {
      email,
      pw,
    });
  },
};
