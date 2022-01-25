const express = require('express')
const { createCategory, getAllCategories } = require('../controller/Category')
const router = express()

//create Category
router.post('/',createCategory)

//getAll Categories
router.get('/',getAllCategories)


module.exports = router