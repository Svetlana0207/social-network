import "./register.css";
import {useRef} from 'react'
import axios from "axios";
import {useHistory} from 'react-router-dom'

export default function Register() {
  const email=useRef()
  const password=useRef()
  const username=useRef()
  const passwordAgain=useRef()
  const history=useHistory()

  const handleClick=async (e)=>{
    e.preventDefault()
   if(passwordAgain.current.value!==password.current.value){
     password.current.setCustomValidity("Passwords don't match!")
   }else{
     const user={
       username:username.current.value,
       email:email.current.value,
       password:password.current.value
     }
     try {
      const res=await axios.post("https://social-network-happy.herokuapp.com/api/auth/register",user)
      history.push("/login")
     } catch (err) {
       console.log(err)
     }

   }
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
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Email" required ref={email} type="email" className="loginInput" />
            <input placeholder="Password" required ref={password} type="password" minLength="6" className="loginInput" />
            <input placeholder="Password Again" required ref={passwordAgain} type="password" className="loginInput" />
            <button className="loginButton" type="submit" >Sign Up</button>
            <button onClick={()=>{history.push("/login")}}className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
