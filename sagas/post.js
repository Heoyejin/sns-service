import { all, fork, put, call, delay, takeLatest } from "@redux-saga/core/effects";
import axios from 'axios';
import { 
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE
} from '../reducers/post';

/****** AddPost ******/
function addPostAPI() {
  return axios.post('/api/addpost');
}

function* addPost(action) {
  try {
    // 서버 요청 결과를 받아서 success/failure 로 Action을 나눠 주는 구간
    // put - dispatch와 비슷한 역할을 하는 effects라고 생각 하면 됨
    // call - 비동기 함수 호출, fork - 동기 함수 호출
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data
    }); 
  }
}

function* addComment(action) {
  try {
    // 서버 요청 결과를 받아서 success/failure 로 Action을 나눠 주는 구간
    // put - dispatch와 비슷한 역할을 하는 effects라고 생각 하면 됨
    // call - 비동기 함수 호출, fork - 동기 함수 호출
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data
    }); 
  }
} 
  
function* watchAddPost() {
  // yield throttle(ADD_POST_REQUEST, addPost, 10000);
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  // yield throttle(ADD_POST_REQUEST, addPost, 10000);
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
  
export default function* postSaga (){
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
  ])
}