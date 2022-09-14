import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

const imgSize = 200;

function About() {
  return (
    <Stack component={Container} maxWidth={"lg"}>
      <Toolbar />
      <Typography
        variant='h3'
        gutterBottom
        sx={{
          color: (theme) => theme.palette.success.main,
          fontWeight: 700,
          textTransform: "uppercase",
        }}>
        about
      </Typography>
      <Stack
        component={Paper}
        elevation={10}
        sx={{
          p: 5,
          gap: 5,
          backgroundColor: (theme) => theme.palette.success.light + 56,
        }}>
        <Typography
          variant='h4'
          sx={{
            color: (theme) => theme.palette.success.main,
            fontWeight: 700,
            textTransform: "uppercase",
          }}>
          mentees project
        </Typography>
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{ gap: 3 }}>
          <Avatar
            src={"/assets/about01.png"}
            alt=''
            sx={{
              width: imgSize,
              height: imgSize,
            }}
          />
          <SvgIcon
            color='success'
            sx={{
              fontSize: 100,
            }}>
            <KeyboardDoubleArrowRightIcon />
          </SvgIcon>
          <Avatar
            src={"/assets/about02.jpg"}
            alt=''
            sx={{
              width: imgSize,
              height: imgSize,
            }}
          />
        </Stack>
        <Typography
          sx={{
            p: 3,
            borderLeftWidth: 5,
            borderLeftStyle: "solid",
            borderLeftColor: (theme) => theme.palette.success.main,
            backgroundColor: "#ffffffaf",
          }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          repudiandae reprehenderit obcaecati beatae fugit odio rem sed debitis
          minima voluptatem dolor, error qui provident nihil modi! Eveniet quos
          nemo perspiciatis!
        </Typography>
        <Typography
          sx={{
            p: 3,
            borderLeftWidth: 5,
            borderLeftStyle: "solid",
            borderLeftColor: (theme) => theme.palette.success.main,
            backgroundColor: "#ffffffaf",
          }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          repudiandae reprehenderit obcaecati beatae fugit odio rem sed debitis
          minima voluptatem dolor, error qui provident nihil modi! Eveniet quos
          nemo perspiciatis!
        </Typography>
      </Stack>
      <Divider
        sx={{
          my: 3,
        }}
      />
      <Stack
        sx={{
          pl: 3,
          py: 2,
          borderLeftWidth: 5,
          borderLeftStyle: "solid",
          borderLeftColor: (theme) => theme.palette.success.main,
        }}>
        <Typography
          variant='h5'
          gutterBottom
          sx={{
            color: (theme) => theme.palette.success.main,
            fontWeight: 700,
          }}>
          더 알아보기
        </Typography>
        <Stack direction='row' sx={{ gap: 2 }}>
          <Button variant='contained' color='success'>
            블로그
          </Button>
          <Button variant='contained' color='success'>
            포트폴리오
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default About;
