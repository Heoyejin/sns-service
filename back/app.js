const express = require('express');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');

const db = require('./models');

const passport = require('passport');
const passportConfig = require('./passport');
const dotenv = require('dotenv');
const morgan = require('morgan');

const path = require('path');

var cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// 보안을 위해 .env 설정하기
dotenv.config();

const app = express();

db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

// passport 실행
passportConfig();
app.use(morgan('dev'));

// 브라우저와 서버의 도메인이 다르기 때문에 cors모듈을 이용하여 허용해줘야함.
// AccessControl
app.use(cors({
  origin: 'http://localhost:3033',
  credentials: true,
}));
app.use('/', express.static(path.join(__dirname, 'uploads')));
// 미들웨어는 순차적으로 실행되기 때문에 먼저 수행해줘야하는 것은 위에 선언하기
// front에서 받아온 json데이터를 encoding해주는 로직
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 백엔드 서버에서 로그인 정보 전체를(session) 암호화한 문자열을(cookie) 프론트 쪽에 보내줌 
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});


// 첫번째 인자는 prefix!!
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행중..!');
});

/*
 * express에서 자주쓰는 api
 * get: 가져오다
 * post: 생성하다
 * put: 전체 수정
 * patch: 부분 수정
 * delete: 제거
 * options: 찔러보기(?)
 * head: 헤더만 가져오기
 */