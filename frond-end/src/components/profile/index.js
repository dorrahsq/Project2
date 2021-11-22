import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const Profile = () => {
  const [users, setusers] = useState([]);
  const [userProfile, setUserProfile] = useState();
  const [userPostss, setUserPostss] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const allusers = await axios.get(`${BASE_URL}/users/`);
    setusers(allusers.data);
    let userid = JSON.parse(localStorage.getItem("userId"));
    setUserProfile(allusers.data.find((ele) => ele._id == userid));

    const userPosts = await axios.get(
      `${BASE_URL}/posts/userPost?postedBy=${userid}`
    );
    console.log(userPosts.data);
    setUserPostss(userPosts.data);
  };

  return (
    <>
      <div>
        {userProfile ? (
          <>
            <img src={userProfile.img} />
            <h3> {userProfile.username} </h3>
            <p> {userProfile.Bio} </p>
          </>
        ) : (
          <h1>loading ...</h1>
        )}
      </div>

      <div>
        {userPostss ? (
          <>
            <h2>Posts </h2>

            {userPostss.length ? (
              userPostss.map((ele) => {
                return <img src={ele.img} />;
              })
            ) : (
              <p>no posted yet </p>
            )}
          </>
        ) : (
          <h1>loading ...</h1>
        )}
      </div>
    </>
  );
};
export default Profile;
