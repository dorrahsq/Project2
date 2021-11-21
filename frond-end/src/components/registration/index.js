import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const BASE_URL = "http://localhost:5000";

const SignUp = () => {
  const [users, setusers] = useState([]);
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const users = await axios.get(`${BASE_URL}/users/`);
    setusers(users.data);
  };

  const createNew = () => {
    let obj = {
      username,
      email,
      password,
    };
    axios.post(`${BASE_URL}/users/create`, obj).then(function (response) {
      console.log(response.data._id);
      setUser(response.data);
      localStorage.setItem("userId", JSON.stringify(response.data._id));
      window.location.reload(false);
    });
  };

  return (
    <>
      <div className="signUpInput">
        Sign Up
        <input
          type="text"
          placeholder=" username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
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
              console.log(found);
              <p className="accountText">
                {setMessage(
                  "This email already have an account! log in or change your email"
                )}
              </p>;
            } else {
              createNew();
            }
          }}
        >
          Sign up now
        </button>
      </div>
      <div>
        already have an account? <Link to="/login">log in </Link>
      </div>
      {message}
    </>
  );
};

export default SignUp;
