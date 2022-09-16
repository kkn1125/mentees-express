import { Avatar, ListItemText } from "@mui/material";
import React, { Fragment } from "react";
import { orElseImage } from "../../utils/tools";

interface FeedbackUserProps {
  author: string;
  user: User;
}

function FeedbackUser({ author, user }: FeedbackUserProps) {
  return (
    <Fragment>
      <Avatar
        src={orElseImage(user ? user.cover : "")}
        alt='sample'
        sx={{
          width: 25,
          height: 25,
        }}
      />
      <ListItemText
        secondary={author}
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
