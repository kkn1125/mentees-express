import axios from "axios";
import { Request, Response } from "express-serve-static-core";
import qs from "qs";
import { errorMessage, throwException } from "../utils/customException.js";
import { objectToQueryString } from "../utils/tools.js";

const authorize = (req, res) => {
  res.redirect(
    `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
      process.env.REST_API_KEY
    }&${objectToQueryString(req.query)}`
  );
};

const token = async (
  req: Request<{}, any, any, qs.ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>, number>
) => {
  try {
    const { data } = await axios.post(
      `https://kauth.kakao.com/oauth/token`,
      qs.stringify({
        ...req.body,
        grant_type: "authorization_code",
        client_id: process.env.REST_API_KEY,
      }),
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    res.status(200).json({
      ok: true,
      payload: data,
    });
  } catch (e: any) {
    res.status(500).json({
      ok: false,
      message: errorMessage[500],
    });
  }
};

const me = async (
  req: Request<{}, any, any, qs.ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>, number>
) => {
  const { accessToken, propertyKeys } = req.body;
  try {
    const { data } = await axios.post(
      `https://kapi.kakao.com/v2/user/me`,
      qs.stringify({
        property_keys: propertyKeys,
      }),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    if (data.status === 401) {
      throwException(errorMessage[400]("kakao"), 400, false);
    }
    res.status(200).json({
      ok: true,
      payload: data,
    });
  } catch (e: any) {
    res.status(e.status).json({
      status: e.status,
      ok: e.ok,
      message: e.message,
    });
  }
};

const logout = (
  req: Request<{}, any, any, qs.ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>, number>
) => {
  const { logoutRedirectUri } = req.body;
  axios
    .get(
      `https://kauth.kakao.com/oauth/logout?logout_redirect_uri=${logoutRedirectUri}&client_id=${process.env.REST_API_KEY}`
    )
    .then((result) => {
      const { data } = result;
      res.status(200).json({
        ok: true,
        message: errorMessage.kakao.signout,
      });
    })
    .catch((e) => {
      res.status(500).json({
        ok: false,
        message: errorMessage[500],
      });
    });
};

export { authorize, token, me, logout };
