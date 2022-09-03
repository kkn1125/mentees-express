import axios from "axios";

const { REACT_APP_SERVER_HOST, REACT_APP_SERVER_PORT } = process.env;

const findAll = () => {
  return axios
    .get(`http://${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}/api/members`)
    .then((res) => {
      if (res.status !== 200) {
        return null;
      }
      console.log(res);
      return res.data;
    });
};

const findOne = (id: string) => {
  return axios.get(`http://localhost:`);
};

export default { findAll };
