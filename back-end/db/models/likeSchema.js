const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  date: {type:Date , default: new Date()} , 
  by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  onPost: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
});

module.exports = mongoose.model("like", likeSchema);

