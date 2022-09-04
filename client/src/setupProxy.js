const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config({
  path: `.env`,
});

const { REACT_APP_SERVER_HOST, REACT_APP_SERVER_PORT } = process.env;

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      changeOrigin: true,
      target: `http://${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}}`,
    })
  );
};
