import { createContext, useReducer } from "react";
import AuthReducer from './AuthReducer'


const INITIAL_STATE = {
  user:null,
  isFetching: false,
  error: false,
};

// {
//   _id:"60ae437497eae936d0e280ba",
//   username:"kate",
//   email:"kate@gmail.com",
//   profilePicture:"",
//   coverPicture:"",
//   isAdmin:false,
//   follower:[],
//   followings:[]
//   }

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
        {children}
    </AuthContext.Provider>
  );
};
