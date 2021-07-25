import { createContext, useReducer } from "react";
import PostReducer from './PostReducer'

const INITIAL_STATE = {
  post: [],
  isFetching: false,
  error: false,
};

export const PostContext = createContext(INITIAL_STATE);

export const PostContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(PostReducer, INITIAL_STATE);

  return (
    <PostContext.Provider
      value={{
        post: state.post,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
        {children}
    </PostContext.Provider>
  );
};
