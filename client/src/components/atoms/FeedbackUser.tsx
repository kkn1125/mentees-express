import { Avatar, ListItemText } from "@mui/material";
import React, { Fragment } from "react";

function FeedbackUser() {
  return (
    <Fragment>
      <Avatar
        src='http://localhost:8050/resources/img/cover/sample.jpg'
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
