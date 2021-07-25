import "./login.css";
import {useRef} from 'react'
import {loginCall} from '../../apiCalls'
import { AuthContext } from "../../context/AuthContext";
import React, { useContext } from 'react';
import { CircularProgress } from '@material-ui/core';
import {useHistory} from 'react-router-dom'

export default function Login() {

  const email=useRef()
  const password=useRef()
  const {user,isFetching,error,dispatch}=useContext(AuthContext)
  const history=useHistory()

  console.log(user)

  const handleClick=(e)=>{
    e.preventDefault()
    loginCall({email:email.current.value,password:password.current.value},dispatch)
   
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social network</h3>
          <span className="loginDesc">
            Connect with friends and the world around you.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" type="email" className="loginInput" required ref={email}/>
            <input placeholder="Password" type="password" className="loginInput" required minLength="6" ref={password} />
            <button type="submit" className="loginButton" disabled={isFetching}>{isFetching?<CircularProgress color="white" size="20px"/>:"Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button onClick={()=>{history.push("/register")}} className="loginRegisterButton">
            {isFetching?<CircularProgress color="white" size="20px"/>:"Create a New Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
