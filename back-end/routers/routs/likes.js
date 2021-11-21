const express = require("express");
const {
  likePost,
  unlikePost,
  likeCount,
  userLikes,
} = require("./../controllers/likes");

const likesRouter = express.Router();

likesRouter.post("/", likePost);
likesRouter.delete("/unlike", unlikePost);
likesRouter.get("/count", likeCount);
likesRouter.get("/userLikes", userLikes);

module.exports = likesRouter;