import { all, fork, call, take, takeEvery, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

/****** LogIn ******/
// 서버에 실제 Login 요청을 보내는 함수
function logInAPI(data) {
  return axios.post('/api/login', data);
}

function* logIn(action) {
  try {
    // 서버 요청 결과를 받아서 success/failure 로 Action을 나눠 주는 구간
    // put - dispatch와 비슷한 역할을 하는 effects라고 생각 하면 됨
    // call - 비동기 함수 호출, fork - 동기 함수 호출
    // yield를 붙여주는 이유는 
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data
    }); 
  }
}

/****** LogOut ******/
function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    // 서버 요청 결과를 받아서 success/failure 로 Action을 나눠 주는 구간
    // put - dispatch와 비슷한 역할을 하는 effects라고 생각 하면 됨
    // call - 비동기 함수 호출, fork - 동기 함수 호출
    const result = yield call(logOutAPI);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data
    }); 
  }
}

/****** AddPost ******/
function addPostAPI() {
  return axios.post('/api/addpost');
}

function* addPost(action) {
  try {
    // 서버 요청 결과를 받아서 success/failure 로 Action을 나눠 주는 구간
    // put - dispatch와 비슷한 역할을 하는 effects라고 생각 하면 됨
    // call - 비동기 함수 호출, fork - 동기 함수 호출
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data
    }); 
  }
}

// 이벤트 리스너 같은 느낌인데 재사용을 못함
// 그래서 while문으로 계속 재사용 할수 있게 해줘야하는데 직관적이지 않기 때문에 takeEvery 사용
function* watchLogIn() {
  // while (true) {
    // yield takeEvery('LOG_IN_REQUEST', logIn);
    yield takeLatest('LOG_IN_REQUEST', logIn);
  // }
}

// takeLatest로 하면 완료되지 않는 것들 중에 마지막에 실행된 take만 실행함
// 응답만 취소하는 거지 요청을 취소하는것이 아니라서 서버단에서 검사를 해줄 필요가 있음
// 그래서 처음에는 하나만 출력되지만 백 단에 요청한 만큼의 데이터가 갔기 때문에 refresh하면 두개가 로딩됨
function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost() {
  // yield throttle('ADD_POST_REQUEST', addPost, 10000);
  yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* rootSaga() {
  // all은 함수를 배열로 받아 동시에 실행할 수 있게 해줌
  yield all([
    // 함수를 실행
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchAddPost)
  ]);
}