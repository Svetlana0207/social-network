import React, { useEffect, useState,useContext, useRef  } from "react";
import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../conversations/Conversation";
import Message from "../message/Message";
import ChatOnline from "../chatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { NextWeekRounded } from "@material-ui/icons";
import {io} from 'socket.io-client'
import {useHistory} from 'react-router-dom'
import Pusher from 'pusher-js'

function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const[newMessage, setNewMessage]=useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef=useRef()
  const [userSearch, setUserSearch] = useState('')
  const[input,setInput]=useState('')
  const history=useHistory()

  // useEffect(()=>{
  
  //   //  socket.current=io("https://socket0207.herokuapp.com")
  //   // socket.current.on("getMessage",data=>{
  //       setArrivalMessage({
  //         sender:data.senderId,
  //         text:data.text,
  //         createdAt:Date.now()
  //   //     })
  //   // })
  // },[])

  useEffect(()=>{
    const pusher = new Pusher('7aded96a34a4c0405962', {
      cluster: 'ap3'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(arrivalMessage) {
      //alert(JSON.stringify(newMessage));
      // setMessages([...messages,newMessage])
      
     arrivalMessage&&currentChat?.members.includes(arrivalMessage.sender)&&
     setMessages(prev=>[...prev,arrivalMessage])
    })

    return ()=>{
      channel.unbind_all()
      channel.unsubscribe()
    }

  },[arrivalMessage,currentChat])
 

  // useEffect(()=>{
  //   socket.current.emit("addUser",user._id)
  //   socket.current.on("getUsers",users=>{
  //     setOnlineUsers(user.followings.filter(f=>users.some(u=>u.userId===f)))
  //   })
  // },[user])



  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("https://social-network-happy.herokuapp.com/api/conversations/" + user._id);
        setConversations(res.data)
      } catch (err) {
        console.log(err);
      }
    };

    getConversations()
  }, [user]);

  useEffect(()=>{
     const getMessages=async()=>{
         try {
            const res= await axios.get("https://social-network-happy.herokuapp.com/api/messages/"+currentChat?._id)
            setMessages(res.data)
            console.log(res)
         } catch (err) {
             console.log(err)
         }
     }
     getMessages()
  },[currentChat])

  useEffect(()=>{
      scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  const searchFriend=async(e)=>{
    if (e.key === 'Enter'){
    try{
    const username=e.target.value
    const res=await axios.get(`https://social-network-happy.herokuapp.com/api/users?username=${username}`)
       if(res.data){
      setUserSearch('We found your friend!')
      history.push('/profile/'+username)
       }
      }catch(err){
        setUserSearch('User not found')
        console.log(userSearch)
      }
    }

  }

const handleSubmit=async(e)=>{
    e.preventDefault()
    const message={
        sender:user._id,
        text:newMessage,
        conversationId:currentChat._id
    }

    // const receiverId=currentChat.members.find(member=>member!==user._id)

    // socket.current.emit("sendMessage",{
    //   senderId:user._id,
    //   receiverId,
    //   text:newMessage
    // })

    try {
     await axios.post("https://social-network-happy.herokuapp.com/api/messages",message)
   
        setNewMessage("")
    } catch (err){
        console.log(err)
    }
}

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input onChange={(e)=>{setInput(e.target.value)}} onKeyDown={searchFriend} placeholder="Search For Friends" className="chatMenuInput" />
            <div style={{"height":"30px","width":"100%"}}>{!userSearch?"":userSearch}</div>
            {conversations.map(c=>(
                <div onClick={()=>setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user}/>
                </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
              {currentChat?
              <>
              <div className="chatBoxTop">
              {messages.map(m=>(
                  <div ref={scrollRef}>
                   <Message message={m} sender={m.sender} own={m.sender===user._id}/>
                   </div>
              ))}
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something.."
                onChange={(e)=>{setNewMessage(e.target.value)}}
                value={newMessage}
              />
              <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
            </div></>:<span className="noConversationText">Open a new conversation.</span>}
            
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline setConversations={setConversations} currentId={user._id} setCurrentChat={setCurrentChat}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
