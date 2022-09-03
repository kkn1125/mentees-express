import { AlertColor } from "@mui/material";
import React, { useContext, useEffect } from "react";
import {
  snackAdd,
  SnackDispatchContext,
  SnackIdxContext,
} from "../contexts/SnackbarProvider";

function useSnack() {
  const snackId = useContext(SnackIdxContext);
  const dispatch = useContext(SnackDispatchContext);

  return {
    successSnack: (message: string) =>
      dispatch(
        snackAdd({
          id: snackId,
          message: message,
          done: false,
          color: "success",
        })
      ),
    infoSnack: (message: string) =>
      dispatch(
        snackAdd({
          id: snackId,
          message: message,
          done: false,
          color: "info",
        })
      ),
    warningSnack: (message: string) =>
      dispatch(
        snackAdd({
          id: snackId,
          message: message,
          done: false,
          color: "warning",
        })
      ),
    errorSnack: (message: string) =>
      dispatch(
        snackAdd({
          id: snackId,
          message: message,
          done: false,
          color: "error",
        })
      ),
  };
}

export default useSnack;
