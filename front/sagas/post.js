import { all, fork, put, call, delay, takeLatest } from "@redux-saga/core/effects";
import axios from 'axios';
import { 
  LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  generateDummyPost
} from '../reducers/post';
import { ADD_POST_OF_ME, REMOVE_POST_OF_ME } from '../reducers/user';
import shortid from 'shortid';

function loadPostAPI() {
  return axios.post('/api/loadpost');
}

function* loadPost(action) {
  try {
    // 서버 요청 결과를 받아서 success/failure 로 Action을 나눠 주는 구간
    // put - dispatch와 비슷한 역할을 하는 effects라고 생각 하면 됨
    // call - 비동기 함수 호출, fork - 동기 함수 호출
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    yield put({
      type: LOAD_POST_FAILURE,
      data: err.response
    }); 
  }
}

function addPostAPI(data) {
  return axios.post('/post', { content: data });
}

function* addPost(action) {
  try {
    // 서버 요청 결과를 받아서 success/failure 로 Action을 나눠 주는 구간
    // put - dispatch와 비슷한 역할을 하는 effects라고 생각 하면 됨
    // call - 비동기 함수 호출, fork - 동기 함수 호출
    const result = yield call(addPostAPI, action.data);
    // yield delay(1000);
    const id = shortid.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: result.data
      }
    });
    yield put({
      type: ADD_POST_OF_ME,
      data: result.data.id
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response
    }); 
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);  // POST /post/1/comment
}

function* addComment(action) {
  try {
    // 서버 요청 결과를 받아서 success/failure 로 Action을 나눠 주는 구간
    // put - dispatch와 비슷한 역할을 하는 effects라고 생각 하면 됨
    // call - 비동기 함수 호출, fork - 동기 함수 호출
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response
    }); 
  }
} 

function removePostAPI() {
  return axios.post('/api/addcomment');
}

function* removePost(action) {
  try {
    console.log('action', action.data);
    // const result = yield call(removePostAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response,
    });
  }
}

function* watchLoadPost() {
  // yield throttle(ADD_POST_REQUEST, addPost, 10000);
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

  
export default function* postSaga (){
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
  ])
}