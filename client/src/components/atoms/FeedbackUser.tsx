import { Avatar, ListItemText } from "@mui/material";
import React, { Fragment } from "react";
import { orElseImage } from "../../utils/tools";

function FeedbackUser({ cover }: { cover: string }) {
  return (
    <Fragment>
      <Avatar
        src={orElseImage(cover)}
        alt='sample'
        sx={{
          width: 25,
          height: 25,
        }}
      />
      <ListItemText
        secondary='nickname'
        sx={{
          [`.MuiTypography-root.MuiListItemText-secondary`]: {
            fontWeight: 700,
          },
        }}
      />
    </Fragment>
  );
}

export default FeedbackUser;
