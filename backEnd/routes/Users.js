const express = require("express");
const { updateUser, deleteUser, getUser } = require("../controller/User");
const router = express();
const User = require("../models/User");

//update route
router.put("/:id", updateUser);

//delete route
router.delete("/:id", deleteUser);

//get user

router.get('/:id',getUser)

module.exports = router;