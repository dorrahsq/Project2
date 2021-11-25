import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { BsHeartFill } from "react-icons/bs";
import logoo from "../../imges/logoo.jpeg";

const Header = () => {
  let navigate = useNavigate();
  const logOut = () => {
    navigate(`/`);
    localStorage.clear();
    window.location.reload(false);
    console.log("log out");
  };

  return (
    <>
      <div className="nav">
        <ul>
          {/* <li id="logo">
            <img className="logoo" src={logoo} />
          </li> */}
          <li className="lie" id="homeNav">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          {/* <span className="spann">/</span> */}

          <li className="lie">
            <Link className="link" to="/posts">
              explore
            </Link>
          </li>
          {/* <span className="spann">/</span> */}
          <li id="myPro" className="lie">
            <Link className="link" to="/profile">
              {" "}
              my Profile
            </Link>
          </li>
          {/* <li className="lie">
            <Link className="link" to="/mylikes">
              My likes
            </Link>
          </li> */}
          <li id="logOut">
            <p className="link" onClick={logOut}>
              {" "}
              log out{" "}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
