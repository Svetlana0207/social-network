import React from 'react'
import './message.css'
import {format} from 'timeago.js'
import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";

function Message({message,own,sender}) {
    const[profilePicture,setProfilePicture]=useState('')

    useEffect(async()=>{
        const res=await axios.get(`https://social-network-happy.herokuapp.com/api/users?userId=${sender}`)
        setProfilePicture(res.data.profilePicture)
    },[sender])
    return (
        <div className={own?"message own":"message"}>
            <div className="messageTop">
                <img className="messageImage"
                src={profilePicture?profilePicture:"https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"} alt="" />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}

export default Message
