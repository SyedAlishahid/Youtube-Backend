const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  fullname: {
    type: String,
    required: false,
    lowercase: true,
    trim: true,
    unique: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  videohistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
  refreshtoken: {
    type: String,
  }
},{
    timestamps: true,
});

const Userdata = mongoose.model("User", userSchema);

module.exports = Userdata;
