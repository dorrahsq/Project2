import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const Profile = () => {
  const [users, setusers] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const allusers = await axios.get(`${BASE_URL}/users/`);
    setusers(allusers.data);
    // console.log(allusers.data);
    // let userid = JSON.parse(localStorage.getItem("userId"))
    // let profile = users.find((ele)=>ele._id == userid)
    // setUserProfile(profile);
    // console.log(profile);
  };

  let userid = JSON.parse(localStorage.getItem("userId"));
  let profile = users.find((ele) => ele._id == userid);
  // console.log(profile);
  return (
    <div>
      {profile ? (
        <>
          <img src={profile.img} />
          <h3> {profile.username} </h3>
          <p> {profile.Bio} </p>
        </>
      ) : (
        <h1>loading ...</h1>
      )}
    </div>
  );
};
export default Profile;
