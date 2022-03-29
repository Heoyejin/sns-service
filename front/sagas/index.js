import axios from 'axios';
import { all, fork } from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';
import { backURL } from '../config/config';
// 공통 url
axios.defaults.baseURL = backURL;
axios.defaults.withCredentials = true;  // 서버와의 쿠키 전달을 위한 설정

export default function* rootSaga() {
  // all은 함수를 배열로 받아 동시에 실행할 수 있게 해줌
  yield all([
   fork(postSaga),
   fork(userSaga),
  ]);
}