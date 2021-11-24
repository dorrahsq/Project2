import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
// import ModalUnstyled from '@mui/core/ModalUnstyled';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import firebase from "firebase";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import UseStorage from "../../hocks/useStorage";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDj1lY-4dscxPsq1LLD8WYIsElYFW3tkXY",
//   authDomain: "react-8c1e0.firebaseapp.com",
//   projectId: "react-8c1e0",
//   storageBucket: "react-8c1e0.appspot.com",
//   messagingSenderId: "1004752010317",
//   appId: "1:1004752010317:web:46d0546c1d277154563004",
//   measurementId: "G-REVB4NPM0X"
// };

// const dataB = () =>{
//   const db = firebase.firestore();
// }

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BASE_URL = "http://localhost:5000";

const Input = styled("input")({
  display: "none",
});

const Profile = () => {
  let navigate = useNavigate();

  const [users, setusers] = useState([]);
  const [userProfile, setUserProfile] = useState();
  const [userPostss, setUserPostss] = useState([]);
  const [describe, setDescribe] = useState("");
  const [tag, setTag] = useState("");
  const [img, setImg] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const goInside = (id) => {
    navigate(`/posts/${id}`);
  };

  // const postIt = () => {
  //   console.log(
  //     `post with dec: ${describe} with tag: ${tag} by: ${userProfile._id} with img: ${img}`
  //   ); ///
  //   setOpen(false);
  //   //backend
  // };

  return (
    <>
      <div>
        {userProfile ? (
          <>
            <div className="contenerImg">
              <img className="othersImg" src={userProfile.img} />
              <h3 className="name"> {userProfile.username} </h3>
              <p className="bio">
                {userProfile.Bio}
                {/* <button>change </button> */}
              </p>
            </div>

            <div className="newPostBtn">
              <Button
                onClick={() => {
                  handleOpen();
                }}
              >
                New post +
              </Button>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor="icon-button-file">
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={(e) => {
                          /////////
                          setImg(e.target.files[0]);
                        }}
                      />

                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </Stack>
                  {/* {img ? <div> {img.name}</div> : ""} */}
                  {/* {console.log(img)} */}
                  /////////
                  <input
                    onChange={(e) => {
                      setDescribe(e.target.value);
                    }}
                    type="text"
                    placeholder="disc"
                  />
                  <br />
                  <input
                    onChange={(e) => {
                      setTag(e.target.value);
                    }}
                    type="text"
                    placeholder="tags"
                  />
                  {img ? (
                    <div>
                      <UseStorage
                        img={img}
                        describe={describe}
                        hashtags={tag}
                        postedBy={userProfile._id}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </Typography>
              </Box>
            </Modal>
          </>
        ) : (
          <h1>loading ...</h1>
        )}
      </div>

      <div>
        {userPostss ? (
          <>
            {userPostss.length ? (
              <div className="allImg">
                <ImageList variant="masonry" cols={3} gap={10}>
                  {userPostss.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        onClick={() => {
                          goInside(item._id);
                        }}
                        className="photo"
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        // alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
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
