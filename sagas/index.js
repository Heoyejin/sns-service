import { all, fork } from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';

export default function* rootSaga() {
  // all은 함수를 배열로 받아 동시에 실행할 수 있게 해줌
  yield all([
   fork(postSaga),
   fork(userSaga),
  ]);
}