import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

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
          <li>
            <Link to="/">Home</Link>
          </li>

          {/* <li>
            <Link to="/search">Search</Link>
          </li> */}

          <li>
            <Link to="/posts">ِexplore</Link>
          </li>

          <li>
            <Link to="/profile"> my Profile</Link>
          </li>

          <li>
            <Link to="/mylikes"> likes</Link>
          </li>
          <li>
            <p onClick={logOut}> log out </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
