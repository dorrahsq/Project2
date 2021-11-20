const express = require("express");
const {
  getAllUsers,
  createUser,
  updateUserPhoto,
  updateUserBio,
} = require("./../controllers/users");

const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.post("/create", createUser);
usersRouter.put("/updatePhoto", updateUserPhoto);
usersRouter.put("/updateBio", updateUserBio);

module.exports = usersRouter;
