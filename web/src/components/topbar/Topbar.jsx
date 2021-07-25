import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Feed from "../feed/Feed";
import axios from "axios";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [postSearch, setPostSearch] = useState("");
  const [input, setInput] = useState("");
  const history = useHistory();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/login");
  };

  const searchPost = async (e) => {
    if (e.key === "Enter") {
      try {
        const desc = e.target.value;
        const res = await axios.get(`https://social-network-happy.herokuapp.com/api/posts?desc=${desc}`);
        console.log(res.data);
        if (res.data.length>0) {
          setPostSearch("We found posts!");
          history.push("/profileSearch/" + desc);
        }else{
          setPostSearch("Posts not found");
        }
      } catch (err) {
        setPostSearch("Posts not found");
        console.log(postSearch);
      }
    }
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social network</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={searchPost}
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
        <div
          style={{
            height: "10px",
            width: "100%",
            margin: "1px",
            color: "white",
            fontSize: "small",
          }}
        >
          {!postSearch ? "" : postSearch}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span
            onClick={() => {
              history.push("/");
            }}
            className="topbarLink"
          >
            Homepage
          </span>
          <span
            onClick={() => {
              history.push("/");
            }}
            className="topbarLink"
          >
            Timeline
          </span>
        </div>
        <div className="topbarIcons">
          <div
            onClick={() => {
              history.push("/messenger");
            }}
            className="topbarIconItem"
          >
            <Person />
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
          <div
            onClick={() => {
              history.push("/messenger");
            }}
            className="topbarIconItem"
          >
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div
            onClick={() => {
              history.push("/messenger");
            }}
            className="topbarIconItem"
          >
            <Notifications />
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
        </div>

        <ul>
          <li>
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                }
                alt=""
                className="topbarImg"
              />{" "}
            </Link>
          </li>
          <li>
            <div onClick={logout} className="logout">
              <p>Log out</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
