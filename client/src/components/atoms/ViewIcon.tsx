import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Stack, SvgIcon, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function ViewIcon({ count }: { count: number }) {
  // const [count, setCount] = useState<number>(0);

  // useEffect(() => {
  //   // api 사용해야 함
  //   setCount(5);
  // }, []);

  return (
    <Stack direction='row' alignItems='center' sx={{ gap: 0.5 }}>
      <IconButton>
        <SvgIcon fontSize='small'>
          <VisibilityIcon />
        </SvgIcon>
      </IconButton>
      <Typography variant='body2'>{count}</Typography>
    </Stack>
  );
}

export default ViewIcon;
