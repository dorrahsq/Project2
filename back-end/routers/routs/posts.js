const express = require("express");
const {
  getAllPosts,
  createPost,
  getUserPosts,
  deletePost,
  getAllPostsHash,
} = require("./../controllers/posts");

const postsRouter = express.Router();

postsRouter.get("/", getAllPosts);
postsRouter.get("/hash", getAllPostsHash);
postsRouter.get("/userPost", getUserPosts);
postsRouter.post("/create", createPost);
postsRouter.delete("/delete", deletePost);

module.exports = postsRouter;
