import React, { createContext, memo, useReducer } from "react";

const initialValue = [];

const LOAD = "feedback/load";

export const feedbacksLoad = (feedbacks: Feedback[]): FeedbackAction => ({
  type: LOAD,
  feedbacks,
});

const reducer = (state: Feedback[], action: FeedbackAction) => {
  switch (action.type) {
    case LOAD:
      return action.feedbacks;
    default:
      break;
  }
};

export const FeedbackContext = createContext(initialValue);
export const FeedbackDispatchContext =
  createContext<React.Dispatch<FeedbackAction>>(null);

const FeedbackProvider = ({ children }: { children: React.ReactElement }) => {
  const [feedback, dispatch] = useReducer(reducer, initialValue);

  return (
    <FeedbackDispatchContext.Provider value={dispatch}>
      <FeedbackContext.Provider value={feedback}>
        {children}
      </FeedbackContext.Provider>
    </FeedbackDispatchContext.Provider>
  );
};

export default memo(FeedbackProvider);
