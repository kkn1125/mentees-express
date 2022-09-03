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

function MenteeCard() {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      component={Paper}
      elevation={5}
      data-aos='fade-left'>
      <Stack direction='row' justifyContent='center' sx={{ p: 2 }}>
        <Avatar
          src='http://localhost:8050/resources/img/cover/sample.jpg'
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
        }}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h6' color='primary' sx={{ fontWeight: 700 }}>
            chaplet01@gmail.com
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eaque
            voluptatem rerum qui soluta tenetur aliquid odio fugiat accusamus,
            modi numquam commodi quibusdam reprehenderit, eligendi sapiente quam
            ipsa aliquam hic.
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
