import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
// import Photos from "./components/home";
import Home from "./components/home";
import Likes from "./components/likes";
import Login from "./components/login";
import Photo from "./components/photo";
import Photos from "./components/photos";
import Profile from "./components/profile";
import SignUp from "./components/registration";

function App() {
  let userId = JSON.parse(localStorage.getItem("userId"));
  return (
    <>
      {userId ? (
        <>
          <Header />

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/posts" element={<Photos />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/mylikes" element={<Likes />} />
            <Route exact path="/posts/:id" element={<Photo />} />
          </Routes>

          <Footer />
        </>
      ) : (
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default App;
