import { Box, Stack, Toolbar } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { memo, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useLocation } from "react-router-dom";
import { api } from "../../apis";
import {
  ProductContext,
  ProductDispatchContext,
  productsLoad,
} from "../../contexts/ProductProvider";
import { SnackContext } from "../../contexts/SnackbarProvider";
import {
  UserContext,
  UserDispatchContext,
  userSave,
} from "../../contexts/UserProvider";
import {
  REACT_APP_SERVER_HOST,
  REACT_APP_SERVER_PORT,
} from "../../utils/tools";
import StackableSnackbar from "../molecules/StackableSnackbar";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  const locate = useLocation();
  const snacks = useContext(SnackContext);
  const users = useContext(UserContext);
  const userDispatch = useContext(UserDispatchContext);
  const [cookies, setCookie] = useCookies(["token"]);
  const productDispatch = useContext(ProductDispatchContext);

  useEffect(() => {
    AOS.init();
    const sse = new EventSource(
      `http://${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}` +
        "/sse/broadcast"
    );

    sse.addEventListener("broadcast", (e) => {
      const products = JSON.parse(e.data);
      productDispatch(productsLoad(products));
    });
  }, []);

  useEffect(() => {
    const { token } = cookies;
    document.body.scrollIntoView(true);

    const checkToken = () => Boolean(token);
    const checkUser = () => Boolean(users);
    if (!checkUser() && checkToken()) {
      api.members.findOne(token.user_num).then((foundUser) => {
        userDispatch(userSave(foundUser.data.payload[0]));
      });
    }
  }, [locate.pathname]);

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
