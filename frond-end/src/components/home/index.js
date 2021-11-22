import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const Home = () => {
  let navigate = useNavigate();
  const [posts, setPost] = useState([]);
  const [maxx, setMaxx] = useState();
  const [moreLikesPostt, setMoreLikesPostt] = useState("");

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const posts = await axios.get(`${BASE_URL}/posts/hash?hashtags=coffe`);

    posts.data.map((ele) => {
      countLike(ele);
    });
  };

  let max = 0;

  let moreLikesPost;
  const countLike = async (ele) => {
    const likesCount = await axios.get(
      `${BASE_URL}/likes/count?onPost=${ele._id}`
    );
    if (likesCount.data > max) {
      max = likesCount.data;
      moreLikesPost = ele._id;
      setMaxx(max);
      setMoreLikesPostt(moreLikesPost);
      setPost(ele);
    }

    console.log(` max ${max} the post id ${moreLikesPost}`);
    console.log(
      ` post with id : ${ele._id}   have likes count  ${likesCount.data}`
    );
  };

  const goInside = (id) => {
    navigate(`/posts/${id}`);
  };
  return (
    <div>
      {posts ? (
        <>
          winner post in this week #coffe
          <img
            src={posts.img}
            onClick={() => {
              goInside(posts._id);
            }}
          />
        </>
      ) : (
        <h1>loading ...</h1>
      )}
    </div>
  );
};

export default Home;
