import { useContext } from "react";
import {
  snackAdd,
  SnackContext,
  SnackDispatchContext,
} from "../contexts/SnackbarProvider";

function useSnack() {
  const snack = useContext(SnackContext);
  const dispatch = useContext(SnackDispatchContext);

  return {
    successSnack: (message: string) =>
      dispatch(
        snackAdd({
          id: snack.count,
          message: message,
          done: false,
          color: "success",
        })
      ),
    infoSnack: (message: string) =>
      dispatch(
        snackAdd({
          id: snack.count,
          message: message,
          done: false,
          color: "info",
        })
      ),
    warningSnack: (message: string) =>
      dispatch(
        snackAdd({
          id: snack.count,
          message: message,
          done: false,
          color: "warning",
        })
      ),
    errorSnack: (message: string) =>
      dispatch(
        snackAdd({
          id: snack.count,
          message: message,
          done: false,
          color: "error",
        })
      ),
  };
}

export default useSnack;
