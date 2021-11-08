const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');


var cors = require('cors');
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

app.use(cors({
  origin: '*',
}));
// 미들웨어는 순차적으로 실행되기 때문에 먼저 수행해줘야하는 것은 위에 선언하기
// front에서 받아온 json데이터를 encoding해주는 로직
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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