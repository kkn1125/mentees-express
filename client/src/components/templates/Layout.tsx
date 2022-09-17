import { Box, Stack, Toolbar } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { memo, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import { api } from "../../apis";
import {
  CommentDispatchContext,
  commentsLoad,
} from "../../contexts/CommentProvider";
import {
  FeedbackDispatchContext,
  feedbacksLoad,
} from "../../contexts/FeedbackProvider";
import {
  ProductDispatchContext,
  productsLoad,
} from "../../contexts/ProductProvider";
import { SnackContext } from "../../contexts/SnackbarProvider";
import {
  UserContext,
  UserDispatchContext,
  userSave,
} from "../../contexts/UserProvider";
import useQuery from "../../hooks/useQuery";
import useSnack from "../../hooks/useSnack";
import { serverBaseUrl } from "../../utils/tools";
import StackableSnackbar from "../molecules/StackableSnackbar";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  const navigate = useNavigate();
  const { errorSnack } = useSnack();
  const snacks = useContext(SnackContext);
  const { successSnack } = useSnack();
  const users = useContext(UserContext);
  const userDispatch = useContext(UserDispatchContext);
  const [cookies, setCookie] = useCookies(["token"]);
  const productDispatch = useContext(ProductDispatchContext);
  const feedbackDispatch = useContext(FeedbackDispatchContext);
  const commentDispatch = useContext(CommentDispatchContext);
  const query = useQuery();

  useEffect(() => {
    AOS.init();
    const sse = new EventSource(serverBaseUrl + "/sse/broadcast");

    const productBroadcast = (e) => {
      const products = JSON.parse(e.data);
      productDispatch(productsLoad(products));
    };
    const feedbackBroadcast = (e) => {
      const feedbacks = JSON.parse(e.data);
      feedbackDispatch(feedbacksLoad(feedbacks));
    };
    const commentBroadcast = (e) => {
      const comments = JSON.parse(e.data);
      commentDispatch(commentsLoad(comments));
    };

    sse.addEventListener("product", productBroadcast);
    sse.addEventListener("feedback", feedbackBroadcast);
    sse.addEventListener("comment", commentBroadcast);

    const kakaoLogin = async () => {
      const { data } = await api.kakao.token(query.code);
      if (data.ok) {
        setCookie("token", data.payload, { path: "/" });
        navigate("/");
        successSnack("카카오 계정 로그인에 성공했습니다.");
      }
      return data;
    };

    if (query.code) {
      kakaoLogin().catch((e) => {
        errorSnack(e.message);
        navigate("/auth/signin");
      });
    }

    return () => {
      sse.removeEventListener("product", productBroadcast);
      sse.removeEventListener("feedback", productBroadcast);
      sse.removeEventListener("comment", commentBroadcast);
    };
  }, []);

  useEffect(() => {
    const { token } = cookies;
    document.body.scrollIntoView(true);

    const checkToken = () => Boolean(token);
    const checkUser = () => Boolean(users.num);
    if (!checkUser() && checkToken()) {
      if (!token.access_token) {
        api.members.findOne(token.user_num).then((foundUser) => {
          userDispatch(userSave(foundUser.data.payload[0]));
        });
      } else {
        api.kakao
          .getUserData(
            cookies.token.access_token,
            `["kakao_account.profile", "kakao_account.name", "kakao_account.email"]`
          )
          .then((result) => {
            const { payload } = result.data;
            const kakaouser = {
              num: payload.id,
              cover: payload.kakao_account.profile.thumbnail_image_url,
              email: payload.kakao_account.email,
              id: payload.kakao_account.profile.nickname,
              regdate: payload.connected_at,
            };
            userDispatch(userSave(kakaouser));
          });
      }
    }
  }, [location.href, cookies.token]);

  return (
    <Stack sx={{ overflow: "hidden", minHeight: "100%" }}>
      <Box
        sx={{
          position: "fixed",
          top: 50,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1300,
        }}>
        <Stack
          sx={{
            gap: 1,
            position: "relative",
          }}>
          {snacks.snacks.map(({ id, message, done, color }) => (
            <StackableSnackbar
              key={id}
              id={id}
              message={message}
              color={color}
            />
          ))}
        </Stack>
      </Box>
      {/* header */}
      <Header />

      {/* divider */}
      <Toolbar id='back-to-top-anchor' />
      {/* content */}
      <Box sx={{ height: "100%", flex: 1, px: "0 !important" }}>
        <Outlet />
      </Box>

      {/* divider */}
      <Toolbar />

      {/* footer */}
      <Footer />
    </Stack>
  );
}

export default memo(Layout);
