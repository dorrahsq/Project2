import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const BASE_URL = "http://localhost:5000";

const Likes = () => {
  let navigate = useNavigate();

  const [userLikes, setUserLikes] = useState();

  useEffect(() => {
    getAllLikes();
  }, []);

  const getAllLikes = async () => {
    const likes = await axios.get(
      `${BASE_URL}/likes/userLikes?by=${JSON.parse(
        localStorage.getItem("userId")
      )}`
    );
    setUserLikes(likes.data);
  };

  const goInside = (id) => {
    // navigate(`/posts/${id}`);
  };

  return (
    <div>
      {userLikes ? (
        <>
          {userLikes.map((ele) => {
            console.log(ele.onPost.img);
            return <img src={ele.onPost.img} />;
          })}
        </>
      ) : (
        <h1>loading ...</h1>
      )}
    </div>
  );
};

export default Likes;
