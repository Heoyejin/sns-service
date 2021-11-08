import { all, fork, put, call, delay, takeLatest } from "@redux-saga/core/effects";
import { 
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, 
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, 
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE
} from "../reducers/user";
import axios from 'axios';

/****** LogIn ******/
// 서버에 실제 Login 요청을 보내는 함수
function logInAPI(data) {
  return axios.post('/api/login', data);
}

function* logIn(action) {
  console.log('sagas-user-login');
  try {
    // 서버 요청 결과를 받아서 success/failure 로 Action을 나눠 주는 구간
    // put - dispatch와 비슷한 역할을 하는 effects라고 생각 하면 됨
    // call - 비동기 함수 호출, fork - 동기 함수 호출
    // yield를 붙여주는 이유는 
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data
    });
  } catch (err) {
    console.log('sagas-user-err', err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data
    }); 
  }
}

/****** LogOut ******/
function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  console.log('sagas-user-logout');
  try {
    // 서버 요청 결과를 받아서 success/failure 로 Action을 나눠 주는 구간
    // put - dispatch와 비슷한 역할을 하는 effects라고 생각 하면 됨
    // call - 비동기 함수 호출, fork - 동기 함수 호출
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      err: err.response.data
    }); 
  }
}

function signUpAPI(data) {
  return axios.post('/user', data);
}

function* signUp(action) {
  const result = yield call(signUpAPI, action.data);
  console.log("signUp Result", result);
  try {
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      err: err.response.data
    }); 
  }
}

function followAPI(data) {
  return axios.post('/api/follow', data);
}

function* follow(action) {
  // const result = yield call(followAPI);
  try {
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      err: err.response
    }); 
  }
}

function unfollowAPI(data) {
  return axios.post('/api/unfollow', data);
}

function* unfollow(action) {
  // const result = yield call(unfollowAPI);
  try {
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      err: err.response
    }); 
  }
}

// 이벤트 리스너 같은 느낌인데 재사용을 못함
// 그래서 while문으로 계속 재사용 할수 있게 해줘야하는데 직관적이지 않기 때문에 takeEvery 사용
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

// takeLatest로 하면 완료되지 않는 것들 중에 마지막에 실행된 take만 실행함
// 응답만 취소하는 거지 요청을 취소하는것이 아니라서 서버단에서 검사를 해줄 필요가 있음
// 그래서 처음에는 하나만 출력되지만 백 단에 요청한 만큼의 데이터가 갔기 때문에 refresh하면 두개가 로딩됨
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([
    // 함수를 실행
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ])
}