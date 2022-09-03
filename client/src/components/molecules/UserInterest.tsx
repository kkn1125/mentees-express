import { Chip, Stack, Typography } from "@mui/material";
import React from "react";

function UserInterest() {
  return (
    <Stack
      sx={{
        gap: 1,
      }}>
      <Typography
        sx={{
          fontWeight: 700,
        }}>
        관심 분야
      </Typography>
      <Stack
        direction='row'
        sx={{
          gap: 1,
        }}>
        {[1, 2, 3].map((item, idx) => (
          <Chip
            key={idx}
            size='small'
            label='test'
            color='warning'
            sx={{
              [`& .MuiChip-label::before`]: {
                content: '"#"',
                mr: 0.5,
              },
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default UserInterest;
