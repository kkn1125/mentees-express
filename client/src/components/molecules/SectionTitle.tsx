import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface SectionTitleProps {
  title: string;
  more?: string;
  tooltip?: string;
}

function SectionTitle({ title, more, tooltip }: SectionTitleProps) {
  return (
    <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Stack
        direction='row'
        alignItems='center'
        sx={{
          gap: 2,
        }}>
        <Typography
          component='div'
          variant='h6'
          sx={{
            fontWeight: 700,
          }}>
          {title}
        </Typography>
        {tooltip && (
          <Tooltip title={tooltip} placement='right'>
            <Button
              variant='contained'
              sx={{
                minWidth: 35,
                backgroundColor: (theme) => theme.palette.text.primary,
                [`&:hover`]: {
                  backgroundColor: (theme) => theme.palette.text.secondary,
                },
              }}>
              ?
            </Button>
          </Tooltip>
        )}
      </Stack>
      {more && (
        <Box>
          <Button component={Link} to={more} variant='outlined' color='success'>
            더 보기
          </Button>
        </Box>
      )}
    </Stack>
  );
}

SectionTitle.defaultProps = {
  more: false,
};

export default SectionTitle;
