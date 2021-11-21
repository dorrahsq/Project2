import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./components/home";
import Login from "./components/login";
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
