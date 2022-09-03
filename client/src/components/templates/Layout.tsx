import { Box, Stack, Toolbar } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SnackContext } from "../../contexts/SnackbarProvider";
import StackableSnackbar from "../molecules/StackableSnackbar";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  const locate = useLocation();
  const snacks = useContext(SnackContext);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    document.body.scrollIntoView(true);
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
          {snacks.map(({ id, message, done, color }) => (
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

export default Layout;
