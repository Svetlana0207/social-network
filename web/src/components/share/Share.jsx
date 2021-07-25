import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { postCall } from "../../apiCalls";
import { PostContext } from "../../context/PostContext";
import { AuthContext } from "../../context/AuthContext";
import { storage } from "../../firebase/index";

export default function Share({picture}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const { dispatch } = useContext(PostContext);
  const { user, isFetching, error } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      // const data = new FormData();
      // const fileName = Date.now() + file.name;
      // data.append("name", fileName);
      // data.append("file", file);
      //newPost.img = fileName;
      //console.log(newPost);
      // try {
      //   await axios.post("/upload", data);

      // } catch (err) {
      //   console.log(err)
      // }
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
            .then((url) => {
              newPost.img = url;
              try {
                postCall(newPost, dispatch);
              } catch (err) {
                console.log(err);
              }
              setFile(null);
            });
        }
      );
    }else{
    try {
      postCall(newPost, dispatch);
    } catch (err) {
      console.log(err);
    }
  }
}

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? picture?picture:user.profilePicture
                : "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
