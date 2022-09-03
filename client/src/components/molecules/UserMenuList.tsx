import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserMenuList({ menuList }: { menuList: MenuItems[] }) {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (url: string) => {
    setAnchorElUser(null);
    navigate(url);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        {menuList.map(({ name, url, handler }) => (
          <MenuItem
            key={name}
            onClick={() =>
              url ? handleCloseUserMenu(url) : (handler as () => void)()
            }>
            <Typography textAlign='center'>{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default UserMenuList;
