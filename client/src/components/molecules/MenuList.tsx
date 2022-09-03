import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MenuListProps {
  menuList: MenuItems[];
  size: Size;
}

interface DesktopListProps {
  list: MenuItems[];
  handleOpenNavMenu?: (event: React.MouseEvent<HTMLElement>) => void;
  anchorElNav?: Element | ((element: Element) => Element) | null | undefined;
  handleCloseNavMenu: (url: string) => void;
}

const MobileList = ({
  list,
  handleOpenNavMenu,
  anchorElNav,
  handleCloseNavMenu,
}: DesktopListProps) => (
  <Fragment>
    <IconButton
      size='large'
      aria-label='account of current user'
      aria-controls='menu-appbar'
      aria-haspopup='true'
      onClick={handleOpenNavMenu}
      color='inherit'>
      <MenuIcon />
    </IconButton>
    <Menu
      id='menu-appbar'
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
      sx={{
        display: { xs: "block", md: "none" },
      }}>
      {list.map(({ name, url, handler }) => (
        <MenuItem
          key={name}
          onClick={() =>
            url ? handleCloseNavMenu(url) : (handler as () => void)()
          }>
          <Typography textAlign='center'>{name}</Typography>
        </MenuItem>
      ))}
    </Menu>
  </Fragment>
);

const DesktopList = ({ list, handleCloseNavMenu }: DesktopListProps) => (
  <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 3 }}>
    {list.map(({ name, url, handler }) => (
      <Button
        key={name}
        onClick={() =>
          url ? handleCloseNavMenu(url) : (handler as () => void)()
        }
        sx={{ my: 2, color: "inherit", display: "block" }}>
        {name}
      </Button>
    ))}
  </Box>
);

function ResponsiveMenuList({ menuList, size }: MenuListProps) {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (url: string) => {
    setAnchorElNav(null);
    navigate(url);
  };

  const display = {
    Mobile: {
      xs: "flex",
      md: "none",
    },
    Desktop: {
      xs: "none",
      md: "flex",
    },
  };

  return (
    <Box sx={{ flexGrow: 1, display: display[size] }}>
      {size === "Desktop" ? (
        <DesktopList list={menuList} handleCloseNavMenu={handleCloseNavMenu} />
      ) : (
        <MobileList
          list={menuList}
          handleOpenNavMenu={handleOpenNavMenu}
          anchorElNav={anchorElNav}
          handleCloseNavMenu={handleCloseNavMenu}
        />
      )}
    </Box>
  );
}

export default ResponsiveMenuList;
