const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Post } = require('../models');
const db = require('../models');

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
