const express = require('express');

const { Post, Comment } = require('../models');
const router = express.Router();
router.post('/', async (req, res, next) => {        //Post /post
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
  
router.delete('/', (req, res) => {    //Delete /post
  res.json([
    { id: 1 },
  ])
});

module.exports = router;