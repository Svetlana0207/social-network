import React, { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";

function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
 
    const getUser = async () => {
      try {
        const res = await axios.get("https://social-network-happy.herokuapp.com/api/users?userId=" + friendId);
        setUser(res.data);
        console.log('RES',res.data)
      } catch (err) {
        console.log(err);
      }
    };
    console.log('friend',user)
    getUser();
  }, [currentUser, conversation]);
 

  return (
    <div className="conversation">
      <img
        className="conversationImage"
        src={
          user?.profilePicture
            ? user.profilePicture
            : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}

export default Conversation;
