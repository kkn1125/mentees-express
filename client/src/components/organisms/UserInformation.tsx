import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import OptionProgress from "../molecules/OptionProgress";
import UserInterest from "../molecules/UserInterest";

function UserInformation() {
  return (
    <Stack
      component={Paper}
      elevation={5}
      sx={{
        p: 5,
        backgroundColor: "#00000008",
      }}>
      <Stack direction='row' justifyContent='space-between'>
        <Typography
          sx={{
            fontWeight: 700,
          }}>
          user님의 정보
        </Typography>
        <Button variant='outlined' color='success'>
          Settings
        </Button>
      </Stack>

      <Divider
        sx={{
          my: 2,
        }}
      />

      <Stack direction={{ xs: "column", md: "row" }} sx={{ gap: 3 }}>
        <OptionProgress title={"test1"} count={2} progress={50} />
        <OptionProgress title={"test2"} count={3} progress={75} />
      </Stack>

      <Divider
        sx={{
          my: 2,
        }}
      />

      <UserInterest />
    </Stack>
  );
}

export default UserInformation;
