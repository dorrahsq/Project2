import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const Login = () => {
  const [users, setusers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const users = await axios.get(`${BASE_URL}/users/`);
    setusers(users.data);
  };

  return (
    <>
      Login
      <input
        type="text"
        placeholder=" email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder=" password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={() => {
          let found = users.find((ele) => {
            return ele.email == email;
          });
          if (found) {
            localStorage.setItem("userId", JSON.stringify(found._id));
            console.log("your in ");
            window.location.reload(false);
          } else {
            setMessage(`you don't have an acount, sign up and join us `); //link to sign up component
          }
        }}
      >
        log in now
      </button>
      <div>{message} </div>
    </>
  );
};

export default Login;
