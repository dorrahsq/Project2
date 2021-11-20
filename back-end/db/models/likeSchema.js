const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  onpost: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
});

module.exports = mongoose.model("like", likeSchema);
