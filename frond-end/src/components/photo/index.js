import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { saveAs } from "file-saver";

const BASE_URL = "http://localhost:5000";

const Photo = () => {
  let navigate = useNavigate();
  const id = useParams().id;
  const [likesCount, setLikesCount] = useState();
  const [photo, setPhoto] = useState("");
  const [text, setText] = useState("Add to Favorite");
  const [userid, setuserid] = useState();
  const [found, setFound] = useState();

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const posts = await axios.get(`${BASE_URL}/posts/`);
    setPhoto(posts.data.find((ele) => ele._id == id));
    const onPostt = posts.data.find((ele) => ele._id == id);
    const onPost = onPostt._id;
    // console.log(onPost);

    //likes count
    const likesCount = await axios.get(
      `${BASE_URL}/likes/count?onPost=${onPost}`
    );
    // console.log(likesCount.data);
    setLikesCount(likesCount.data);

    //check if the user like this post or not
    const likes = await axios.get(`${BASE_URL}/likes/allLikes`);
    // console.log(likes.data);
    let userId = JSON.parse(localStorage.getItem("userId"));
    setuserid(userId);

    const elm = likes.data.find(
      (ele) => ele.by == userId && ele.onPost == onPost
    );
    console.log("elm", elm);
    setFound(elm);
    if (elm) {
      setText(<IoHeartSharp />);
    } else {
      setText(<IoHeartOutline />);
    }
  };

  const Fav = (photoId) => {
    let obj = {
      by: userid,
      onPost: photoId,
    };
    console.log("found", found);

    if (found) {
      axios
        .delete(`${BASE_URL}/likes/unlike?by=${userid}&onPost=${photoId}`)
        .then(() => console.log(" removed secc.... "))
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log("not found, then its time to add ");
      axios
        .post(`${BASE_URL}/likes/`, obj)
        .then(() => console.log(" added  "))
        .catch((err) => {
          console.error(err);
        });
    }
    getAllPosts();
  };

  const person = (userId) => {
    navigate(`/profile/${userId}`);
  };
  const deletePost = (idd) => {
    const _id = idd;
    console.log(idd);
    axios
      .delete(`${BASE_URL}/posts/delete?_id=${_id}`)
      .then(() => console.log(" removed secc.... "))
      .catch((err) => {
        console.error(err);
      });
  };

  const downloadImage = (url) => {
    saveAs(url, "image.jpg"); // Put your image url here.
  };

  return (
    <>
      {photo ? (
        <>
          {<img className="imgg" src={photo.postedBy.img} />}
          <div className="photoContener">
            <p className="postedBy">
              <span
                onClick={() => {
                  person(photo.postedBy._id);
                }}
              >
                {photo.postedBy.username}
              </span>{" "}
              <span className="hovver">
                <span
                  className="clickDown"
                  onClick={() => {
                    downloadImage(photo.img);
                  }}
                >
                  {" "}
                  click here to download{" "}
                </span>
              </span>
            </p>
            <img src={photo.img} alt="" />
            <p className="left">
              <button
                className="heartBtn"
                onClick={() => {
                  Fav(photo._id);
                }}
              >
                {text}
              </button>
              <span className="count"> {likesCount} </span>
              <span className="date">
                {" "}
                published: {photo.date.slice(0, 10)}
              </span>
            </p>
            <p className="prgg">
              <span
                className="username"
                onClick={() => {
                  person(photo.postedBy._id);
                }}
              >
                {" "}
                {photo.postedBy.username}{" "}
              </span>

              {photo.describe}
              <span className="hashh"> #{photo.hashtags} </span>
            </p>

            {userid == photo.postedBy._id ? (
              <div className="deleteBtnContener">
                <button
                  onClick={() => {
                    deletePost(photo._id);
                  }}
                  className="deleteBtn"
                >
                  Delete this post
                </button>
              </div>
            ) : (
              console.log("f")
            )}
          </div>
        </>
      ) : (
        <h1>loading ...</h1>
      )}
    </>
  );
};

export default Photo;
