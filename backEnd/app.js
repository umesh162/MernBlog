const express = require("express");
const App = express();
require("dotenv").config();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const authRoute = require("./routes/Auth");
const userRoute = require("./routes/Users");
const postRoute = require("./routes/Posts");
const categoryRoute = require("./routes/Categories");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("db Connected"))
  .catch((err) => console.log(err));

//uploading image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name + ".jpg"); //"file.jpeg for postMan testing as req.body and image togather cannot be sent"
  },
});

const upload = multer({ storage: storage });

App.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json({
    message: "file has been uploaded",
  });
});


App.use(express.json());
App.use("/images",express.static(path.join(__dirname,"/images")))
App.use("/api/auth", authRoute);
App.use("/api/users", userRoute);
App.use("/api/posts", postRoute);
App.use("/api/categories", categoryRoute);

App.listen(process.env.PORT || 8000, () => {
  console.log("server running");
});