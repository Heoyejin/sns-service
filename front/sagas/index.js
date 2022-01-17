import axios from 'axios';
import { all, fork } from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';

// 공통 url
axios.defaults.baseURL = "http://localhost:3065";
axios.defaults.withCredentials = true;  // 서버와의 쿠키 전달을 위한 설정

export default function* rootSaga() {
  // all은 함수를 배열로 받아 동시에 실행할 수 있게 해줌
  yield all([
   fork(postSaga),
   fork(userSaga),
  ]);
}