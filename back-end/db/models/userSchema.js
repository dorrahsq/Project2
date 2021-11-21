const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: {
    type: String,
    default:
      "https://i.pinimg.com/564x/e7/c3/f4/e7c3f4a076b8472e0b1bd9c00a847f7f.jpg",
  },
  Bio: { type: String, default: "my Bio", maxlength: 130 },
});

module.exports = mongoose.model("user", userSchema);
