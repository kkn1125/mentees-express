import { Typography } from "@mui/material";
import React from "react";

const limit = 100;

function TextOverflow({ children }: { children: string }) {
  const cutText = (str: string) =>
    str.length > limit ? str.slice(0, limit) + " ..." : str;
  return <Typography component="span" variant='body2'>{cutText(children)}</Typography>;
}

export default TextOverflow;
