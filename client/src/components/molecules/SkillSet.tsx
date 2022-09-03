import { Box, Chip, Paper, Stack, SvgIcon, Typography } from "@mui/material";
import React from "react";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";

function SkillSet() {
  return (
    <Stack
      component={Paper}
      elevation={5}
      sx={{
        p: 3,
        gap: 3,
        borderRadius: 3,
      }}>
      <Box>
        <Typography variant='body1' gutterBottom sx={{ fontWeight: 700 }}>
          관심 분야 스킬
        </Typography>
        <Typography variant='body2'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque rerum
          molestiae dolore repudiandae, consequuntur animi exercitationem error
          a quod. Iste dolores atque, illum facere doloribus nam dolorem dolore
          doloremque reprehenderit.
        </Typography>
      </Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          backgroundColor: "#00000008",
          color: "GrayText",
          borderRadius: 3,
          p: 3,
          gap: 5,
        }}>
        <Box>
          <SvgIcon fontSize='large'>
            <PersonalVideoIcon />
          </SvgIcon>
        </Box>
        <Stack
          sx={{
            gap: 3,
          }}>
          <Box>
            <Typography
              variant='h6'
              sx={{ fontWeight: 700, textTransform: "capitalize" }}>
              category
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
              ad perspiciatis magni voluptates facere beatae soluta adipisci
              quibusdam dicta delectus id, obcaecati quod atque sunt est dolore
              quae eligendi sit?
            </Typography>
          </Box>
          <Box>
            <Typography
              gutterBottom
              sx={{
                fontWeight: 700,
              }}>
              보유 스킬
            </Typography>
            <Stack direction='row' sx={{ gap: 2 }}>
              <Chip
                label={"test"}
                sx={{
                  backgroundColor: (theme) => theme.palette.grey[600],
                  color: "#ffffff",
                  fontWeight: 700,
                  [`& .MuiChip-label::before`]: {
                    content: '"#"',
                    mr: 0.5,
                  },
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default SkillSet;
