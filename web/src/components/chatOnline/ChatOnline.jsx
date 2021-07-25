import axios from "axios";
import React, { useEffect, useState } from "react";
import "./chatOnline.css";

function ChatOnline({ setConversations, currentId, setCurrentChat }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const[newChat,setNewChat]=useState({})
  const[memberOne,setMemberOne]=useState('')
  const[memberTwo,setMemberTwo]=useState('')

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("https://social-network-happy.herokuapp.com/api/users/friends/" + currentId);
      setFriends(res.data);
      console.log('FRIENDS',friends)
    };

    getFriends();
  }, [currentId]);

  // useEffect(() => {
  //   setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  // }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    const conversation={
     senderId:currentId,
     receiverId:user._id
  }
    try {
      const res = await axios.get(
        `https://social-network-happy.herokuapp.com/api/conversations/find/${currentId}/${user._id}`
      );

      if(!res.data){
       const res=await axios.post("https://social-network-happy.herokuapp.com/api/conversations",conversation)
      
       setMemberOne(res.data.members[0])
       setMemberTwo(res.data.members[1])
        setNewChat(res.data);
      
      }
      setCurrentChat(res.data);
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async()=>{
    try {
    
      const res = await axios.get(
        `https://social-network-happy.herokuapp.com/api/conversations/find/${memberOne}/${memberTwo}`
      )

      setCurrentChat(res.data);
      const res2 = await axios.get("https://social-network-happy.herokuapp.com/api/conversations/" + currentId);
        setConversations(res2.data)
      
    } catch (err) {
      console.log(err);
    }

  },[newChat])

  return (
    <div className="chatOnline">
      <div style={{"text-align":"center","font-weight":"500"}}>Friends</div>
      {friends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImage"
              src={
                o?.profilePicture
                  ? o.profilePicture
                  : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
              }
              alt=""
            />
            {/* <div className="chatOnlineBadge"></div> */}
          </div>
          <span className="chatOnlineName">{o.username}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;
