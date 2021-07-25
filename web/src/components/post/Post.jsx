import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post,picture}) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`https://social-network-happy.herokuapp.com/api/users?userId=${post.userId}`);
      setUser(res.data);
    };

    fetchPosts();
  }, [post.userId,picture]);

  const likeHandler = () => {
    try {
      axios.put("https://social-network-happy.herokuapp.com/api/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={`profile/${user.username}`}
              style={{ textDecoration: "none" }}
            >
              {user.profilePicture===currentUser.profilePicture?  
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? picture?picture:user.profilePicture
                    : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                }
                alt=""
              />:
              <img
              className="postProfileImg"
              src={
                user.profilePicture
                  ? user.profilePicture
                  : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
              }
              alt=""
            />
              }
            
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="https://firebasestorage.googleapis.com/v0/b/upload-files-17b2a.appspot.com/o/images%2Flike.png?alt=media&token=0598f50e-4328-4f62-8b57-008ba52675e6"
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src="https://firebasestorage.googleapis.com/v0/b/upload-files-17b2a.appspot.com/o/images%2Fheart.png?alt=media&token=73e38c95-d8b2-4a92-b94a-7769ba252511"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
