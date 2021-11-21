import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const Photo = () => {
  const id = useParams().id;
  const [photo, setPhoto] = useState("");
  //   const [photoPublisher, setPhotoPublisher] = useState("");
  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const posts = await axios.get(`${BASE_URL}/posts/`);
    setPhoto(posts.data.find((ele) => ele._id == id));
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
        </>
      ) : (
        <h1>loading ...</h1>
      )}
    </>
  );
};

export default Photo;
