import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

interface UserProfileProps {
  nickname: string;
  src: string;
  time: Date;
}

function UserProfile({ nickname, src, time }: UserProfileProps) {
  return (
    <Stack direction='row' alignItems='center' sx={{ gap: 1.5 }}>
      <Avatar src={src} alt={nickname + "'s profile"} />
      <Stack sx={{ gap: 0.5 }}>
        <Typography variant='body1' sx={{ fontWeight: 700 }}>
          {nickname}
        </Typography>
        <Typography variant='body2'>{time.toLocaleString()}</Typography>
      </Stack>
    </Stack>
  );
}

export default UserProfile;
