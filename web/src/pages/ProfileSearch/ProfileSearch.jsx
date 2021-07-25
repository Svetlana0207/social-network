import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../components/feed/feed.css";
import Rightbar from "../../components/rightbar/Rightbar";
import "../home/home.css"
import {useParams} from 'react-router'
import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Post from "../../components/post/Post";
import Share from "../../components/share/Share"

export default function ProfileSearch() {

  const desc=useParams().desc
  const [postsSearch, setPostsSearch] = useState([])

  useEffect(() => {
    
    const fetchPosts=async()=>{
      const resPosts=await axios.get(`https://social-network-happy.herokuapp.com/api/posts?desc=${desc}`)
      setPostsSearch(resPosts.data)  
      console.log("data",resPosts.data)
    }
   
    fetchPosts()
  }, [desc])
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div className="feed">
        <div className="feedWrapper">
         <Share />
          {postsSearch.map((p) => (
            <Post key={p._id} post={p} />
          ))}
        </div>
      </div>
        <Rightbar/>
      </div>
    </>
  );
}