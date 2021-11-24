const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  img: { type: String, required: true },
  date :{type:Date , default: new Date() },
  // default: new Date(year, month).format("MMM")
  //new Date().toLocaleString('default', { month: 'long' }) 
  describe : {type:String , default:"" } , 
  hashtags : [{type:String}], 
  postedBy : {type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("post", postSchema);