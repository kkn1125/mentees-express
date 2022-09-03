import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";

interface OptionCountProps {
  title: string;
  count: number;
}

function OptionCount({ title, count }: OptionCountProps) {
  return (
    <Stack direction='row' sx={{ gap: 1 }}>
      <Typography
        sx={{
          fontWeight: 700,
        }}>
        {title}
      </Typography>
      <Typography
        variant='body2'
        sx={{
          px: 1,
          py: 0.3,
          borderRadius: 2,
          color: "#ffffff",
          backgroundColor: (theme) => theme.palette.success.main,
        }}
        children={count}
      />
    </Stack>
  );
}

export default OptionCount;
