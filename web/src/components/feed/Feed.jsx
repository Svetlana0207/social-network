import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { PostContext } from "../../context/PostContext";

export default function Feed({ username, picture }) {
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const { post } = useContext(PostContext);

  const [posts, setPosts] = useState([]);

  useEffect(()=>{
   
          const fetchPosts = async () => {
            const res = username
              ? await axios.get("https://social-network-happy.herokuapp.com/api/posts/profile/" + username)
              : await axios.get("https://social-network-happy.herokuapp.com/api/posts/timeline/" + user?._id);
            setPosts(
              res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
              })
            );
          };
    
           fetchPosts();     
      },[username, user?._id, post,picture])

    return (
      <div className="feed">
        <div className="feedWrapper">
          {(!username || username === user.username) && <Share picture={picture} />}
          {posts.map((p) => (
            <Post key={p._id} picture={picture} post={p} />
          ))}
        </div>
      </div>
    );

}


