const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Image, User, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// fs를 사용하여 폴더 생성하기
try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('업로드 폴더가 생성됩니다.');
  fs.mkdirSync('uploads');
}


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
          model: User,  // 댓글 작성자
          attributes: ['id', 'nickname'],
        }]
      }, {
        model: User,  // 게시물 작성자
        attributes: ['id', 'nickname'],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }]
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/* multer를 이용하여 이미지 업로드 하기  */
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) { // ex) 호예진.png
      // 중복된 파일 명 처리
      const ext = path.extname(file.originalname);  // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 호예진
      done(null, basename + '_' + new Date().getTime() + ext);  // 호예진15184712891.png
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB로 제한..
});

/*
  * 요청을 두번 보내는 방식
  * 1. 첫번째 요청때 이미지를 보내서 파일명을 return
  * 2. 그동안 프론트 단에서 미리보기, 리사이징 같은 처리를 하고 마지막에 content를 보내는 요청을 다시 보냄
*/
router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => { // upload.single('image') - 단일 이미지
  // 이미지 업로드 후에 실행됨
  console.log('router', req.files);
  res.json(req.files.map((v) => v.filename));
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId }});
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch(error) {
    console.error(error);
    next(error);
  }
})
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
  
router.delete('/:postId', isLoggedIn, async (req, res, next) => {    //Delete /post
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch(error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;