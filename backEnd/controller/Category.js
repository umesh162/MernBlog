const Category = require("../models/Category");

exports.createCategory = (req, res) => {
  const newCategory = new Category(req.body);
  newCategory.save((err, savedCategory) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json(savedCategory);
  });
};

exports.getAllCategories = (req, res) => {
  Category.find().then((foundCategories, err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json(foundCategories);
  });
};