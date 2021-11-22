const usersModel = require("../../db/models/userSchema");

//get all users
const getAllUsers = (req, res) => {
  usersModel
    .find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//create new user
const createUser = (req, res) => {
  const { name, username, email, password, img, Bio } = req.body;
  const user = new usersModel({
    name,
    username,
    email,
    password,
    img,
    Bio,
  });

  user
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//update user's photo
const updateUserPhoto = (req, res) => {
  const { id, img } = req.body;
  if (img.length) {
    usersModel.updateOne({ id }, { $set: { img } }, function (err) {
      if (err) return handleError(err);
    });
  }
  //edge case - no img > change nothing
  else res.status(400).json("you need to insert a photo !");
  usersModel
    .find({ id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//update user's Bio
const updateUserBio = (req, res) => {
  const { id, Bio } = req.body;
  usersModel.updateOne({ id }, { $set: { Bio } }, function (err) {
    if (err) return handleError(err);
  });
  usersModel
    .find({ id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { getAllUsers, createUser, updateUserPhoto, updateUserBio };
