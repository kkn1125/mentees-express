import React, { createContext, useReducer } from "react";

const initialValue: User = {};

const SAVE = "user/save";
const RESET = "user/reset";

export const userSave = (user: User | KakaoUser): UserAction => ({
  type: SAVE,
  user,
});

export const userReset = (): UserAction => ({
  type: RESET,
});

const reducer = (state: User, action: UserAction) => {
  switch (action.type) {
    case SAVE:
      return action.user;
    case RESET:
      return null;
    default:
      break;
  }
};

export const UserContext = createContext(initialValue);
export const UserDispatchContext =
  createContext<React.Dispatch<UserAction>>(null);

const UserProvider = ({ children }: { children: React.ReactElement }) => {
  const [user, dispatch] = useReducer(reducer, initialValue);

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </UserDispatchContext.Provider>
  );
};

export default UserProvider;
