const Post = require("../models/Post");

exports.createPost = (req, res) => {
  const newPost = new Post(req.body);
  newPost.save((err, createdPost) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      post: createdPost,
    });
  });
};

exports.updatePost = async (req, res) => {
  Post.findById(req.params.id)
    .then((foundPost, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (req.body.username === foundPost.username) {
        Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
          .then((updatedPost, err) => {
            if (err) {
              return res.status(400).json({
                error: err,
              });
            }

            return res.status(200).json({
              update: updatedPost,
            });
          })
          .catch((err) => {
            return res.status(400).json({
              unableToUpdate: err,
            });
          });
      } else {
        return res.status(400).json({
          error: "You can only update your posts",
        });
      }
    })
    .catch((err) => {
      return res.status(404).json({
        error: "post not found",
      });
    });
};

exports.deletePost = (req, res) => {
  Post.findById(req.params.id)
    .then((foundPost, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (req.body.username === foundPost.username) {
        foundPost
          .delete()
          .then((deletedPost, err) => {
            if (err) {
              return res.status(400).json({
                errorInDeleteing: err,
              });
            }
            return res.status(200).json({
              deleted: deletedPost,
            });
          })
          .catch((err) => {
            return res.status(400).json({
              unableToDelete: err,
            });
          });
      } else {
        return res.status(400).json({
          error: "you can delete only your posts",
        });
      }
    })
    .catch((err) => {
      return res.status(404).json({
        error: "post not found",
      });
    });
};

exports.getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((foundPost, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json(foundPost);
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Post not found",
      });
    });
};

exports.getAllPosts = (req, res) => {
  const username = req.query.user;
  const category = req.query.category;

  if (username) {
    Post.find({ username })
      .then((post, err) => {
        if (err) {
          return res.status(400).json({
            errorInFind: err,
          });
        }
        return res.status(200).json(post);
      })
      .catch((err) => {
        return res.status(400).json({
          error : "Post not found"
        });
      });
  } else if (category) {
    Post.find({
      categories: {
        $in: [category],
      },
    })
      .then((post, err) => {
        if (err) {
          return res.status(400).json({
            errorInFind: err,
          });
        }
        return res.status(200).json(post);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  } else {
    Post.find()
      .then((post, err) => {
        if (err) {
          return res.status(400).json({
            errorInAllPost: err,
          });
        }
        return res.status(200).json(post);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
};