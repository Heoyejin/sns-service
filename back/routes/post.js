const express = require('express');

const { Post, Image, User, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();
router.post('/', isLoggedIn, async (req, res, next) => {        //Post /post
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }]
      }, {
        model: User,
        attributes: ['id', 'nickname'],
      }]
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:postId/comment/', isLoggedIn, async (req, res, next) => {        //Post /post/1/comment
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글 입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      UserId: req.user.id,
      PostId: parseInt(req.params.postId, 10),
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include:[{
        model: User,
        attributes: ['id', 'nickname'],
      }]
    });
    console.log(fullComment);
    res.status(201).json(fullComment);
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