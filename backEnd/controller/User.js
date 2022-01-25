const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(11);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).then((updatedUser, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      updatedUser.password = undefined;
      return res.status(200).json(updatedUser);
    });
  } else {
    return res.status(400).json({
      error: "You can update only your account",
    });
  }
};

exports.deleteUser = (req, res) => {
  if (req.body.userId === req.params.id) {
    User.findById(req.params.id).then((foundUser, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      Post.deleteMany({ username: foundUser.username });
    });
    User.findByIdAndDelete(req.params.id).then((deletedUser, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        message: "user deleted",
      });
    });
  } else {
    return res.status(400).json({
      error: "You can delete only your account",
    });
  }
};

exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      user.password = undefined;
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(400).json({
        error: "user not found",
      });
    });
};