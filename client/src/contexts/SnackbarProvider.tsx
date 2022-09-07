import React, { createContext, useReducer } from "react";

const ADD = "snack/add";
const UPDATE = "snack/update";

const initialValues = {
  count: 0,
  snacks: [],
};

export const snackAdd = (snack: Snack): SnackAction => ({
  type: ADD,
  snack,
});

export const snackUpdate = (id: number): SnackAction => ({
  type: UPDATE,
  id,
});

const reducer = (state: Snacks, action: SnackAction) => {
  switch (action.type) {
    case ADD:
      action.snack.id = state.count + 1;
      return {
        count: action.snack.id,
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
          .filter((snack) => snack.done || snack.id < action.id),
      };
    default:
      break;
  }
};

export const SnackContext = createContext(initialValues);
export const SnackDispatchContext =
  createContext<React.Dispatch<SnackAction>>(null);

const SnackbarProvider = ({ children }: { children: React.ReactElement }) => {
  const [snacks, dispatch] = useReducer(reducer, initialValues);

  return (
    <SnackDispatchContext.Provider value={dispatch}>
      <SnackContext.Provider value={snacks}>{children}</SnackContext.Provider>
    </SnackDispatchContext.Provider>
  );
};

export default SnackbarProvider;
