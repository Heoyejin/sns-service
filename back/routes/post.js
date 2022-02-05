const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Image, User, Comment, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// fs를 사용하여 폴더 생성하기
try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('업로드 폴더가 생성됩니다.');
  fs.mkdirSync('uploads');
}

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

// 이미지, 파일인 경우 req.file, req.files 가 전달
// 그냥 text는 req.body.key 이런 식으로 전달됨
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {        //Post /post
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() 
      }})));  // ['#노드', true], ['#리액트', true]
      await post.addHashtags(result.map((v) => v[0]));
    }

    // 이미지 갯수에 따른 처리
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(req.body.image.map((img) => Image.create({ src: img })));
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }

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

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {    //Delete /post
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [{
        model: Post,
        as: 'Retweet'
      }]
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글 입니다.');
    }
    if (req.user.id == post.UserId || (post.Retweet && post.Retweet.UserId == req.user.id)) {
      return res.status(403).send('자신의 글은 리트윗 할 수 없습니다.');
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      }
    });
    if (exPost) {
      return res.status(403).send('이미 리트윗한 게시물 입니다.');
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });
    // 나중에 include가 너무 복잡해지면 db에서 불러오는 속도 느려지니까 주의 *
    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [{
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          as: ['id', 'nickname'],
        }, {
          model: Image,
        }]
      }, {
        model: Image,
      }, {
        model: User,
        as: ['id', 'nickname'],
      }, {
        model: Comment,
        include: [{
          model: User,
          as: ['id', 'nickname'],
        }]
      }]
    })
    res.status(201).send(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;