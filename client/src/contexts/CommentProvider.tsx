import React, { createContext, memo, useReducer } from "react";

const initialValue = [];

const LOAD = "comment/load";

export const commentsLoad = (comments: Comments[]): CommentAction => ({
  type: LOAD,
  comments,
});

const reducer = (state: Comments[], action: CommentAction) => {
  switch (action.type) {
    case LOAD:
      return action.comments;
    default:
      break;
  }
};

export const CommentContext = createContext(initialValue);
export const CommentDispatchContext =
  createContext<React.Dispatch<CommentAction>>(null);

const CommentProvider = ({ children }: { children: React.ReactElement }) => {
  const [comment, dispatch] = useReducer(reducer, initialValue);

  return (
    <CommentDispatchContext.Provider value={dispatch}>
      <CommentContext.Provider value={comment}>
        {children}
      </CommentContext.Provider>
    </CommentDispatchContext.Provider>
  );
};

export default memo(CommentProvider);
