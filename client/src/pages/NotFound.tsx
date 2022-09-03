import {
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  const theme = useTheme();
  const isMdSize = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Container maxWidth='lg'>
      <Stack
        sx={{
          mt: 15,
          gap: 5,
          alignItems: isMdSize ? "flex-start" : "center",
        }}>
        <Typography
          component='h3'
          sx={{
            fontSize: theme.typography.pxToRem(64),
          }}>
          404
        </Typography>
        <Typography
          component='div'
          sx={{
            fontSize: theme.typography.pxToRem(30),
          }}>
          Not found
        </Typography>
        <Typography
          component='div'
          sx={{
            fontSize: theme.typography.pxToRem(16),
            textAlign: isMdSize ? "left" : "center",
          }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
          voluptatibus amet illo repellat error officia quisquam enim quaerat
          ipsum, vitae ducimus ea natus odio excepturi aliquam reprehenderit
          libero, veritatis animi!
        </Typography>
        <Button component={Link} to='/' variant='contained'>
          Home
        </Button>
      </Stack>
    </Container>
  );
}

export default NotFound;
