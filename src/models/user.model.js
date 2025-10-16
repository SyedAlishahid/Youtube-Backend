const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const userSchema = new mongoose.Schema(
  {
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
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (oldPassword) {
  return await bcrypt.compare(oldPassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.SECRET_ACCESS_KEY,
    {
      expiresIn: ACCESS_KEY_EXPIRE,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_KEY,
    {
      expiresIn: REFRESH_TOKEN_EXPIRE,
    }
  );
};
const Userdata = mongoose.model("User", userSchema);

module.exports = Userdata;
