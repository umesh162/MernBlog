const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controller/Auth");

//SIGN UP

router.post("/signup", signUp);

//SIGN IN

router.post("/signin", signIn);

module.exports = router;