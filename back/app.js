const express = require('express');
const postRouter = require('./routes/post');
const db = require('./models');

const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

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