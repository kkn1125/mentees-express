import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import React, { useEffect, useState } from "react";
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
  const [users, setUsers] = useState([
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
      url: "/auth/logout",
      show: true,
    },
  ]);

  useEffect(() => {
    setUsers(
      users.map((u) => ({
        ...u,
        show: !u.show,
      }))
    );
  }, []);

  return (
    <AppBar position='fixed' color='inherit'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Logo size='Desktop' />

          {/* Mobile Menu List */}
          <ResponsiveMenuList
            size='Mobile'
            menuList={pages.filter((li) => li.show)}
          />

          {/* Mobile Logo */}
          <Logo size='Mobile' />
          {/* Desktop Menu List */}
          <ResponsiveMenuList
            size='Desktop'
            menuList={pages.filter((li) => li.show)}
          />

          {/* 회원 정보 */}
          <UserMenuList menuList={users.filter((li) => li.show)} />
        </Toolbar>
      </Container>

      {/* scroll top */}
      <ScrollTop />
    </AppBar>
  );
};
export default Header;
