import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  UserContext,
  UserDispatchContext,
  userReset,
} from "../../contexts/UserProvider";
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
  const userDispatch = useContext(UserDispatchContext);
  const user = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [userMenu, setUserMenu] = useState([
    {
      name: "Profile",
      url: "/profile",
      show: true,
    },
    {
      name: "Signin",
      url: "/auth/signin",
      show: false,
    },
    {
      name: "Logout",
      // url: "/auth/logout",
      show: true,
      handler: () => {
        console.log(1);
        removeCookie("token", {
          path: "/",
        });
        userDispatch(userReset());
      },
    },
  ]);

  useEffect(() => {
    setUserMenu(
      userMenu.map((u) => ({
        ...u,
        show: !u.show
      }))
    );
  }, [user]);

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
