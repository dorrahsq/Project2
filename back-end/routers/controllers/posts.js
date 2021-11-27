const postsModel = require("../../db/models/postSchema");

//get all posts sorted by date
const getAllPosts = (req, res) => {
  postsModel
    .find({})
    .sort({ date: -1 })
    .populate("postedBy")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//get all post in hashtag
const getAllPostsHash = (req, res) => {
  const { hashtags } = req.query;
  console.log(hashtags);
  postsModel
    .find({ hashtags })
    .sort({ date: 1 })
    .exec()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//create post
const createPost = (req, res) => {
  const { img, describe, hashtags, postedBy } = req.body;
  const post = new postsModel({
    img,
    describe,
    hashtags,
    postedBy,
  });

  post
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
//delete post
const deletePost = (req, res) => {
  const { _id } = req.query;
  postsModel.deleteOne({ _id }, function (err) {
    if (err) return handleError(err);
  });
  postsModel
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//get all posts for one user sorted by date
// const getUserPosts = (req, res) => {
//   const { postedBy } = req.body;
//   postsModel
//     .find({ postedBy })
//     .sort({ date: 1 })
//     .exec(function (err, posts) {
//       if (err) return handleError(err);
//       res.json(posts);
//       // console.log(posts[0].img);
//     });
// };
//another way
const getUserPosts = (req, res) => {
  const { postedBy } = req.query;
  postsModel
    .find({})
    .populate("postedBy")
    .where("postedBy")
    .equals(postedBy)
    .sort({ date: -1 })
    .exec(function (err, posts) {
      if (err) return handleError(err);
      res.json(posts);
    });
};

module.exports = {
  getAllPosts,
  createPost,
  getUserPosts,
  deletePost,
  getAllPostsHash,
};
