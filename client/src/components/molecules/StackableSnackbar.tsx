import { Alert, AlertColor, Fade, Grow, Slide, Snackbar } from "@mui/material";
import React, { useContext, useState } from "react";
import {
  SnackDispatchContext,
  snackUpdate,
} from "../../contexts/SnackbarProvider";

interface StackableSnackbarProps {
  id: number;
  message: string;
  color: AlertColor;
}

function SlideTransition(props) {
  return <Slide {...props} direction='down' />;
}
function GrowTransition(props) {
  return <Grow {...props} />;
}

function StackableSnackbar({ id, message, color }: StackableSnackbarProps) {
  const [open, setOpen] = useState(true);
  const dispatch = useContext(SnackDispatchContext);
  const handleClose = (e: any, reason?: string) => {
    if (reason === "clickaway") return;

    setOpen(false);
    setTimeout(() => {
      dispatch(snackUpdate(id));
    }, 250);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
      TransitionComponent={Fade}
      autoHideDuration={5000}
      sx={{
        position: "relative",
      }}
      children={
        <Alert onClose={handleClose} severity={color} sx={{ width: "100%" }}>
          {message}
        </Alert>
      }
    />
  );
}

StackableSnackbar.defaultProps = {
  color: "info",
};

export default StackableSnackbar;
