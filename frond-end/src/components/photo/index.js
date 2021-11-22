import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const Photo = () => {
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
      setText("Remove from Favorite");
    } else {
      setText("Add to Favorite");
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

  return (
    <>
      {photo ? (
        <>
          <img src={photo.img} alt="" />
          <p> {photo.describe}</p>
          <p> published: {photo.date}</p>
          <p> hashtags {photo.hashtags}</p>
          <p> postedBy {photo.postedBy.username}</p>
          <button
            onClick={() => {
              Fav(photo._id);
            }}
          >
            {text}
          </button>
          <p> likes {likesCount}</p>
        </>
      ) : (
        <h1>loading ...</h1>
      )}
    </>
  );
};

export default Photo;
