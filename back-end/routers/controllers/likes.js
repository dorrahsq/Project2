const likesModel = require("../../db/models/likeSchema");

//get all likes
const getAllLikes = (req, res) => {
  likesModel
    .find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

// like post
const likePost = (req, res) => {
  const { by, onPost } = req.body;
  const like = new likesModel({
    by,
    onPost,
  });
  like
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//unlike post
const unlikePost = (req, res) => {
  const { by, onPost } = req.query;
  likesModel.deleteOne({ by, onPost }, function (err) {
    if (err) return handleError(err);
  });
  likesModel
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//Display count of likes on one post
const likeCount = (req, res) => {
  //we take post id then count how much users there
  const { onPost } = req.query;
  likesModel
    .find({ onPost })
    .count()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

// Display user’s likes on fav part
const userLikes = (req, res) => {
  //note: the front cant take from the body if its get or delete
  const { by } = req.query;
  //we take user id and then populate to take all post
  likesModel
    .find({})
    .populate("onPost")
    .where("by")
    .equals(by)
    .sort({ date: 1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};


//delete all likes on post 
const deleteAllLikes = (req, res) => {
    const { onPost } = req.query;
    likesModel.deleteMany({ onPost }, function (err) {
      if (err) return handleError(err);
    });
    likesModel
      .find({})
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.send(err);
      });
  };


//get all post in hashtag sorted by likes

// Display more likes

module.exports = {
  likePost,
  unlikePost,
  likeCount,
  userLikes,
  getAllLikes,
  deleteAllLikes
};
