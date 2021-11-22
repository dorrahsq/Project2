import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const Home = () => {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const posts = await axios.get(`${BASE_URL}/posts/hash?hashtags=coffe`);

    console.log(posts.data);
    // setPost(posts.data);
  };

  return <div>winner in this week in #coffe</div>;
};

export default Home;
