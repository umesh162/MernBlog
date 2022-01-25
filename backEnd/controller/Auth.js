const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const salt = await bcrypt.genSalt(11);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  newUser.save((err, createdUser) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    createdUser.password = undefined;
    res.json(createdUser);
  });
};

exports.signIn = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (err, returnedUser) => {
    if (err || !returnedUser) {
      return res.status(400).json({
        error: "Wrong credentials",
      });
    }
    bcrypt
      .compare(password, returnedUser.password)
      .then((result) => {
        if (!result) {
          return res.status(400).json({
            error: "Wrong credentails",
          });
        }
        returnedUser.password = undefined;
        return res.status(200).json(returnedUser);
      })
      .catch((err) => {
        return res.status(400).json({
          error: err,
        });
      });
  });
};