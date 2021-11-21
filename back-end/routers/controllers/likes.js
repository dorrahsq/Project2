const likesModel = require("../../db/models/likeSchema");

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
  const { by, onPost } = req.body;
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
  const { onPost } = req.body;
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
  const { by } = req.body;
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

// Display more likes

// Display more likes for one tag ( winner in this week)
//we take the hashtag here and ...........

module.exports = { likePost, unlikePost, likeCount, userLikes };
