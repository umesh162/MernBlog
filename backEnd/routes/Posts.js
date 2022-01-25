const express = require('express')
const { createPost, updatePost, deletePost, getPost, getAllPosts } = require('../controller/Post')
const router = express()

//create Post
router.post('/',createPost)

//update Post
router.put('/:id',updatePost)

//delete Post
router.delete('/:id',deletePost)

//get Post
router.get('/:id',getPost)

//get all Post
router.get('/',getAllPosts)

module.exports =  router