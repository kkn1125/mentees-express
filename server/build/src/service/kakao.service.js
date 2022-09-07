import axios from "axios";
import qs from "qs";
import { objectToQueryString } from "../utils/tools.js";
const authorize = (req, res) => {
    res.redirect(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REST_API_KEY}&${objectToQueryString(req.query)}`);
};
const token = async (req, res) => {
    try {
        const { data } = await axios.post(`https://kauth.kakao.com/oauth/token`, qs.stringify({
            ...req.body,
            grant_type: "authorization_code",
            client_id: process.env.REST_API_KEY,
        }), {
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        res.status(200).json({
            ok: true,
            payload: data,
        });
    }
    catch (e) {
        res.status(500).json({
            ok: false,
            message: e.message,
        });
    }
};
const me = async (req, res) => {
    const { accessToken, propertyKeys } = req.body;
    try {
        const { data } = await axios.post(`https://kapi.kakao.com/v2/user/me`, qs.stringify({
            property_keys: propertyKeys,
        }), {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (data.status === 401) {
            res.status(401).json({
                ok: false,
                message: "잘못된 요청입니다.",
            });
        }
        res.status(200).json({
            ok: true,
            payload: data,
        });
    }
    catch (e) {
        console.debug(e);
        res.status(e.status).json({
            ok: false,
            message: e.status === 401 ? "잘못된 요청입니다." : e.message,
        });
    }
};
const logout = (req, res) => {
    const { logoutRedirectUri } = req.body;
    axios
        .get(`https://kauth.kakao.com/oauth/logout?logout_redirect_uri=${logoutRedirectUri}&client_id=${process.env.REST_API_KEY}`)
        .then((result) => {
        const { data } = result;
        console.debug(data);
        res.status(200).json({
            ok: true,
            message: "카카오 계정이 정상 로그아웃 되었습니다.",
        });
    })
        .catch((e) => {
        console.debug(e);
        res.status(500).json({
            ok: false,
            message: "서버에 오류가 발생했습니다.",
        });
    });
};
export { authorize, token, me, logout };
