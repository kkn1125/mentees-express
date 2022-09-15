import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { orElseImage } from "../../utils/tools";
import LikeIcon from "../atoms/LikeIcon";
import TextOverflow from "../atoms/TextOverflow";
import ViewIcon from "../atoms/ViewIcon";

interface ProgramCard {
  contents: Product;
  idx: number;
}

function ProgramCard({ contents, idx }: ProgramCard) {
  const {
    num,
    tags,
    cover,
    address,
    view,
    type,
    id,
    title,
    content,
    capacity,
    start,
    end,
    until,
    regdate,
    updates,
  } = contents;

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      component={Paper}
      elevation={5}
      data-aos='fade-left'
      data-aos-delay={100 * idx}>
      <Box
        sx={{
          width: (theme) => ({
            xs: theme.typography.pxToRem(800),
            md: theme.typography.pxToRem(350),
          }),
          maxWidth: "100%",
          overflow: "hidden",
        }}>
        <Box
          component='img'
          src={orElseImage(cover)}
          alt='sample'
          sx={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
      <Stack
        sx={{
          p: 3,
          gap: 2,
          flex: 1,
        }}>
        <Box>
          <Stack direction='row' justifyContent='space-between'>
            <Typography
              component={Link}
              to={`/mentees/${num}`}
              variant='h6'
              color='primary'
              sx={{
                fontWeight: 700,
                textTransform: "capitalize",
                textDecoration: "none",
                color: "inherit",
                transition: `150ms ease-in-out`,
                [`&:hover`]: {
                  color: (theme) => theme.palette.primary.main,
                },
              }}>
              {title}
            </Typography>
            <Stack direction='row' sx={{ gap: 2 }}>
              <LikeIcon pnum={num} />
              <ViewIcon count={view} />
            </Stack>
          </Stack>
          <Typography variant='body2'>{type}</Typography>
        </Box>

        <Typography variant='body1' sx={{ fontWeight: 700 }}>
          {id}
        </Typography>

        <TextOverflow>
          {
            new DOMParser().parseFromString(content, "text/html").body
              .textContent
          }
        </TextOverflow>
        <Stack direction='row' sx={{ gap: 1 }}>
          {tags.split("_").map((tag, idx) => (
            <Chip key={tag + idx} label={tag} />
          ))}
        </Stack>
        <Typography variant='body2'>
          {new Date(start)?.toLocaleString("ko")}
        </Typography>
        <Typography variant='body2'>
          {new Date(end)?.toLocaleString("ko")}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ProgramCard;
