import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { storage } from "../../firebase/index";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const {dispatch}=useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const username = useParams().username;
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const[cover,setCover]=useState('')
  const[picture,setPicture]=useState('')
  const [filePicture, setFilePicture] = useState(null);
  

  useEffect(() => {

  const handleChange=()=>{
      const uploadTask = storage.ref(`images/${file.name}`).put(file);
      uploadTask.on(
        "state changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then(async(url) => {
              try {
                await axios.put(`https://social-network-happy.herokuapp.com/api/users/${user._id}/cover`, {
                  coverPicture:url,
                  userId: user._id,
                });
                setCover(url)
              } catch (err) {
                console.log(err);
              }
            });
        }
      );
  }

  if(file){
    handleChange()
  }
}, [file]);


useEffect(() => {

  const handlePictureChange=()=>{
      const uploadTask = storage.ref(`images/${filePicture.name}`).put(filePicture);
      uploadTask.on(
        "state changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(filePicture.name)
            .getDownloadURL()
            .then(async(url) => {
              try {
                await axios.put(`https://social-network-happy.herokuapp.com/api/users/${user._id}/profilePicture`, {
                  profilePicture:url,
                  userId: user._id,
                });
                dispatch({type:"PROFILE",payload:url})
                setPicture(url)
              } catch (err) {
                console.log(err);
              }
            });
        }
      );
  }

  if(filePicture){
    handlePictureChange()
  }
}, [filePicture]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`https://social-network-happy.herokuapp.com/api/users?username=${username}`);
      setUser(res.data);
   
    };

    fetchPosts();
  }, [username,picture]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <label htmlFor="file">
                  <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? cover?cover:user.coverPicture
                    : "https://firebasestorage.googleapis.com/v0/b/upload-files-17b2a.appspot.com/o/images%2FnoCover.jpg?alt=media&token=ab9b33dd-63a6-455d-9582-cbcb4db4cc4a"
                }
                alt=""
              />
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e)=>{setFile(e.target.files[0])}}
              />
            </label>
            <label htmlFor="filePicture">
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? picture?picture:user.profilePicture
                    : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"}
                alt=""
              />
                 <input
                style={{ display: "none" }}
                type="file"
                id="filePicture"
                accept=".png,.jpeg,.jpg"
                onChange={(e)=>{setFilePicture(e.target.files[0])}}
              />
            </label>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed picture={picture} username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
