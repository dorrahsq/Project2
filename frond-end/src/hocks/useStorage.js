import React, { useState, useEffect } from "react";
import { porjectSto } from "../components/firebase/config";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const UseStorage = (props) => {
  console.log(
    "img",
    props.img,
    "describe",
    props.describe,
    props.hashtags,
    props.postedBy
  );
  // const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const [tryy, setTryy] = useState("");

  useEffect(() => {
    // console.log("HERE");
    const storageRef = porjectSto.ref(props.img.name);
    storageRef.put(props.img).on("state_changed", async () => {
      const URL = await storageRef.getDownloadURL();
      setUrl(URL);
    });
  }, []);
  const postIt = () => {
    console.log(url);
    const obj = {
      img: url,
      describe: props.describe,
      hashtags: props.hashtags,
      postedBy: props.postedBy,
    };
    axios
      .post(`${BASE_URL}/posts/create`, obj)
      .then(() => console.log("addedddddddd"))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {url && (
        <button
          onClick={() => {
            postIt();
          }}
        >
          post{" "}
        </button>
      )}
    </>
  );
};

export default UseStorage;
