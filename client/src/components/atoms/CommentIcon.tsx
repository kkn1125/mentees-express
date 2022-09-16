import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import { IconButton, Stack, Tooltip } from "@mui/material";
import React from "react";

function CommentIcon({ count }: { count: number }) {
  return (
    <Stack direction='row' alignItems='center'>
      <Tooltip title='댓글' placement='bottom'>
        <IconButton>
          <SmsOutlinedIcon />
        </IconButton>
      </Tooltip>
      {count}
    </Stack>
  );
}

export default CommentIcon;
