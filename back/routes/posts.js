const express = require('express');

const router = express.Router();

const { Post, User, Image, Comment } = require('../models');

router.get('/', async (req, res, next) => { //GET /posts
  try {
    const posts = await Post.findAll({
      // where: { id: lastId },
      limit: 10,
      // offset: 0, // 0 ~ 10 가져오는데 게시글 추가, 삭제 할 때 문제가 생기므로 이 방법은 잘 사용하지 않음
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }]
      }]
    });
    res.status(200).json(posts);
  } catch(error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;