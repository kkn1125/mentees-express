import { Box, Container, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { BRAND_NAME } from "../../utils/tools";

function Footer() {
  return (
    <Fragment>
      <Box component='footer'>
        <Box
          sx={{
            backgroundColor: "#00000012",
            p: 5,
          }}>
          <Container maxWidth={"lg"}>
            <Typography>
              Copyright {new Date().getFullYear()}. Project {BRAND_NAME}. All
              rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </Fragment>
  );
}

export default Footer;
