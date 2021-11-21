import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const logOut = () => {
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

          <li>
            <Link to="/search">Search</Link>
          </li>

          <li>
            <Link to="/photos">Photos</Link>
          </li>

          <li>
            <Link to="/profile">my Profile</Link>
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
