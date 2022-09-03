import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Stack, SvgIcon, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function LikeIcon() {
  const [count, setCount] = useState<number>(0);
  const [own, setOwn] = useState<boolean>(false);

  useEffect(() => {
    // api 사용해야 함
    setCount(5);
  }, []);

  const handleCount = () => {
    if (!own) {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }
    setOwn(!own);
  };

  return (
    <Stack direction='row' alignItems='center' sx={{ gap: 0.5 }}>
      <IconButton onClick={handleCount}>
        <SvgIcon fontSize='small' color={own ? "error" : "inherit"}>
          <FavoriteIcon />
        </SvgIcon>
      </IconButton>
      <Typography variant='body2'>{count}</Typography>
    </Stack>
  );
}

export default LikeIcon;
