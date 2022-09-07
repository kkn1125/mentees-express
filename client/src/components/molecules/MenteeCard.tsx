import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { orElseImage } from "../../utils/tools";

interface MenteeCardProps {
  user: User;
}

function MenteeCard({ user }: MenteeCardProps) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      component={Paper}
      elevation={5}
      data-aos='fade-left'>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        sx={{ p: 2 }}>
        <Avatar
          src={orElseImage(user.cover)}
          alt='sample'
          sx={{
            width: 150,
            height: 150,
          }}
        />
      </Stack>
      <Stack
        sx={{
          p: 3,
          gap: 2,
          flex: 1,
        }}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h6' color='primary' sx={{ fontWeight: 700 }}>
            {user.email}
          </Typography>
          <Chip color='primary' label={1} />
        </Stack>

        <Box>
          <Typography
            variant='body1'
            sx={{ fontWeight: 700, textTransform: "capitalize" }}>
            message
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant='body2'>
            {user.msg || "등록된 메세지가 없습니다 😮"}
          </Typography>
        </Box>

        <Stack direction='row' justifyContent='flex-end'>
          <Button color='success' variant='outlined'>
            추천
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default MenteeCard;
