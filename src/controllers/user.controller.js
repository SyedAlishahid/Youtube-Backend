const User = require("../models/user.model.js");
const mongoose = require("mongoose");

const createUser = async (requestAnimationFrame, res) => {
  try {
    const UserData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      fullname: req.body.fullname,
      avator: req.body.avatar,
      history: req.body.history,
      refreshtoken: req.body.refreshtoken,
    };
    const NewUser = new User(UserData);
    const saveUser = await NewUser.save();
    if (!saveUser) {
      res.status(400).json({
        message: "User creation failed",
        success: false,
      });
    }
    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: saveUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const ViewUser = async (req, res) => {
  try {
    const users = await User.find(); // ✅ await query result

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No users found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All user info is below:",
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error in ViewUser:", error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const deleteUser = async (req, res) => {
  
    console.log("dwwd")
  try {
    const { id } = req.params;
    const Delete = await User.findByIdAndDelete(id);
    if(!Delete){
      res.status(400).json({
        message: "User not found!",
        success: false,
      })
    }
    return res.status(200).json({
      message: `Successfully deleted!: ${Delete}`,
      success: true,
      
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { createUser, ViewUser, deleteUser };
