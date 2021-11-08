const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post } = require('../models');
const db = require('../models');

// 미들웨어 확장 - passport.authenticate는 원래 req, res, next를 사용할 수 없는데 다음과 같이 확장하여 사용가능함
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // callback 함수
    if (err) {
      console.error(err);
      next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    req.login(user, async (loginErr) => {
      // passport login 에러시 
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        // 이렇게 지정가능 아래처럼 제외가능
        // attributes: ['id', 'nickname', 'email']
        attributes: {
          exclude: ['password']
        },
        // user 데이터에 추가 해주는 로직
        include: [{
          model: Post
        }, {
          model: User,
          as: 'Followings'
        }, {
          model: User,
          as: 'Followers'
        }]
      })
      return res.status(200).json(fullUserWithoutPassword);
    })
  })(req, res, next);
});

router.post('/', async (req, res, next) => {  // POST /user/
  try {
    // 아이디 중복 처리
    const exUser = await User.findOne({
      // 조건
      where: {
        email: req.body.email,
      }
    });

    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }

    // 데이터를 해쉬화 하는 라이브러리
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // 순차적으로 실행하기 위해 await 해줘야함
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword
    });
    // 이렇게 브라우저에서 허용해주던가
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send('ok');
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.post('/user/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

module.exports = router;