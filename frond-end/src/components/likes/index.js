import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

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
    navigate(`/posts/${id}`);
  };

  return (
    <div>
      {userLikes ? (
        <>
          {userLikes.map((ele) => {
            return (
              <img
                onClick={() => {
                  goInside(ele.onPost._id);
                }}
                src={ele.onPost.img}
              />
            );
          })}
        </>
      ) : (
        <h1>loading ...</h1>
      )}
    </div>
  );
};

export default Likes;
