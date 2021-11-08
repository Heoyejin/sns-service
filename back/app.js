const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const db = require('./models');

const passport = require('passport');
const passportConfig = require('./passport');

var cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

// passport 실행
passportConfig();

app.use(cors({
  origin: '*',
}));
// 미들웨어는 순차적으로 실행되기 때문에 먼저 수행해줘야하는 것은 위에 선언하기
// front에서 받아온 json데이터를 encoding해주는 로직
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 백엔드 서버에서 로그인 정보 전체를(session) 암호화한 문자열을(cookie) 프론트 쪽에 보내줌 
// 
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

app.get('/', (req, res) => {
  res.send('hello api');
});

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'ddochee__u1' },
    { id: 2, content: 'ddochee__u2' },
    { id: 3, content: 'ddochee__u3' },
  ])
});

// 첫번째 인자는 prefix!!
app.use('/post', postRouter);
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