import { Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";
import { BRAND_NAME } from "../../utils/tools";

const desktopStyle: ResponsiveStyles = {
  font: "h6",
  iconStyle: { display: { xs: "none", md: "flex" }, mr: 1 },
  styles: {
    display: { xs: "none", md: "flex" },
  },
};

const mobileStyle: ResponsiveStyles = {
  font: "h5",
  iconStyle: { display: { xs: "flex", md: "none" }, mr: 1 },
  styles: {
    display: { xs: "flex", md: "none" },
    flexGrow: 1,
  },
};

const responsive = (size: Size) =>
  size === "Desktop" ? desktopStyle : mobileStyle;

function Logo({ size }: Responsive) {
  const responsiveStyle = responsive(size);
  return (
    <Typography
      component={Link}
      variant={responsiveStyle.font}
      noWrap
      to={"/"}
      sx={{
        ...responsiveStyle.styles,
        textDecoration: "none",
        color: green[800],
        textTransform: "uppercase",
        fontWeight: 700,
      }}>
      {BRAND_NAME}
    </Typography>
  );
}

export default Logo;
