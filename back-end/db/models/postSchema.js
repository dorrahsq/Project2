const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  img: { type: String, required: true },
  date: { type: Date, default: new Date() },
  describe: { type: String, default: "" },
  hashtags: [{ type: String }],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("post", postSchema);
