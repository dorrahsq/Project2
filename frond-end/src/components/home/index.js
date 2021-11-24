import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Fade } from "react-awesome-reveal";

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
      <div className="main"> main animation </div>

      {posts ? (
        <>
          <Fade>
            <div className="winner">
              Winner post in this week <span className="hash">#COFFE</span>
            </div>

            <div className="bg">
              why?
              <span className="why">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque vitae iaculis leo. Cras interdum, risus id tempor
                ullamcorper, ipsum leo interdum ligula, ut scelerisque enim
                lectus ac dolor. Suspendisse elit lectus, vehicula non commodo
                sed, porttitor vitae mi. Aenean odio ipsum, hendrerit ut
                eleifend ac, mollis sed dui. In hac habitasse platea dictumst.
                Proin at porta erat. Curabitur a risus nec odio sollicitudin
                consectetur. Pellentesque posuere tellus et auctor elementum{" "}
              </span>
            </div>

            <div className="imgContener">
              <img
                src={posts.img}
                onClick={() => {
                  goInside(posts._id);
                }}
              />
            </div>
          </Fade>
        </>
      ) : (
        <h1>loading ...</h1>
      )}
    </div>
  );
};

export default Home;
