import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { api } from "../../apis";
import {
  UserContext,
  UserDispatchContext,
  userReset,
} from "../../contexts/UserProvider";
import useSnack from "../../hooks/useSnack";
import { clientBaseUrl, serverBaseUrl } from "../../utils/tools";
import Logo from "../atoms/Logo";
import ScrollTop from "../atoms/ScrollTop";
import ResponsiveMenuList from "../molecules/MenuList";
import UserMenuList from "../molecules/UserMenuList";

const pages: MenuItems[] = [
  {
    name: "Mentees 프로그램",
    url: "/mentees",
    show: true,
  },
  {
    name: "추천 피드백",
    url: "/mentees/feedback",
    show: true,
  },
  {
    name: "About",
    url: "/about",
    show: true,
  },
];

const Header = () => {
  const { successSnack, errorSnack } = useSnack();
  const userDispatch = useContext(UserDispatchContext);
  const users = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userMenu = [
    {
      name: "Profile",
      url: "/mentees/profile",
      show: isLoggedIn,
    },
    {
      name: "Signin",
      url: "/auth/signin",
      show: !isLoggedIn,
    },
    {
      name: "Logout",
      show: isLoggedIn,
      handler: () => {
        if (cookies.token.access_token) {
          // kakao logout
          api.kakao
            .logout(
              process.env.NODE_ENV !== "production"
                ? clientBaseUrl
                : serverBaseUrl
            )
            .then((result) => {
              const { data } = result;
              if (data.ok) {
                successSnack(data.message);
                removeCookie("token", {
                  path: "/",
                });
                userDispatch(userReset());
              } else {
                throw new Error("카카오 로그아웃에 실패했습니다.");
              }
            })
            .catch((e) => {
              errorSnack(e.message || "카카오 로그아웃에 실패했습니다.");
            });
        } else {
          successSnack("로그아웃 되었습니다.");
          removeCookie("token", {
            path: "/",
          });
          userDispatch(userReset());
        }
      },
    },
  ];

  useEffect(() => {
    setIsLoggedIn(Boolean(users) && Boolean(cookies.token));
  }, [users, cookies.token]);

  return (
    <AppBar position='fixed' color='inherit'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Logo size='Desktop' />

          {/* Mobile Menu List */}
          <ResponsiveMenuList
            size='Mobile'
            menuList={pages.filter((menu) => menu.show)}
          />

          {/* Mobile Logo */}
          <Logo size='Mobile' />
          {/* Desktop Menu List */}
          <ResponsiveMenuList
            size='Desktop'
            menuList={pages.filter((menu) => menu.show)}
          />

          {users.id && (
            <Typography component='div' sx={{ mr: 2 }}>
              <Typography component='span' sx={{ fontWeight: 700 }}>
                {users.id}
              </Typography>
              님
            </Typography>
          )}
          {/* 회원 정보 */}
          <UserMenuList menuList={userMenu.filter((menu) => menu.show)} />
        </Toolbar>
      </Container>

      {/* scroll top */}
      <ScrollTop />
    </AppBar>
  );
};
export default Header;
