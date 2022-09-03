import { AlertColor } from "@mui/material";
import React, { createContext, useContext, useReducer, useRef } from "react";

const ADD = "snack/add";
const UPDATE = "snack/update";

const initialValues = {
  count: 0,
  snacks: [],
};

interface Snacks {
  count: number;
  snacks: Snack[];
}

interface Snack {
  id: number;
  message: string;
  done: boolean;
  color: AlertColor;
}

type ActionType = typeof ADD | typeof UPDATE;

interface Action {
  id?: number;
  type?: ActionType;
  snack?: Snack;
}

export const snackAdd = (
  snack: Snack
): {
  type: ActionType;
  snack: Snack;
} => ({
  type: ADD,
  snack,
});

export const snackUpdate = (
  id: number
): {
  type: ActionType;
  id: number;
} => ({
  type: UPDATE,
  id,
});

const reducer = (state: Snacks, action: Action) => {
  switch (action.type) {
    case ADD:
      state.count++;
      return {
        count: state.count,
        snacks: state.snacks.concat(action.snack),
      };
    case UPDATE:
      return {
        count: state.count,
        snacks: state.snacks
          .map((snack) => {
            if (snack.id === action.id) {
              snack.done = true;
            }
            return snack;
          })
          .filter((_) => !_.done),
      };
    default:
      break;
  }
};

export const SnackContext = createContext(initialValues.snacks);
export const SnackIdxContext = createContext(initialValues.count);
export const SnackDispatchContext = createContext<React.Dispatch<Action>>(null);

const SnackbarProvider = ({ children }: { children: React.ReactElement }) => {
  const [snacks, dispatch] = useReducer(reducer, initialValues);

  return (
    <SnackDispatchContext.Provider value={dispatch}>
      <SnackIdxContext.Provider value={snacks.count}>
        <SnackContext.Provider value={snacks.snacks}>
          {children}
        </SnackContext.Provider>
      </SnackIdxContext.Provider>
    </SnackDispatchContext.Provider>
  );
};

export default SnackbarProvider;
