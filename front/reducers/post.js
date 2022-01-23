import produce from 'immer';

export const initalState = {
  mainPosts: [],
  imagePaths: [], // 이미지 업로드 경로
  hasMorePost: true,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => {
  return {
    type: ADD_POST_REQUEST,
    data
  }
};

export const addComment = (data) => {
  return {
    type: ADD_COMMENT_REQUEST,
    data
  }
};

// redux-toolkit - reducer 코드 줄이는데 유용함
// https://redux-toolkit.js.org/
const reducer = (state = initalState, action) => produce(state, (draft) => {
  // immer가 알아서 불변성을 지켜서 return 해줌
  switch (action.type) {
    case LOAD_POST_REQUEST: 
      draft.loadPostLoading = true,
      draft.loadPostDone = false,
      draft.loadPostError = null
      break;
    case LOAD_POST_SUCCESS:
      draft.loadPostLoading = false,
      draft.loadPostDone = true,
      draft.mainPosts = action.data.concat(draft.mainPosts);
      // 보여질 게시물을 50개로 한정
      draft.hasMorePost = draft.mainPosts.length < 50;
      break;
    case LOAD_POST_FAILURE: 
      draft.loadPostLoading = false,
      draft.loadPostError = action.error
      break;
    case ADD_POST_REQUEST: 
      draft.addPostLoading = true,
      draft.addPostDone = false,
      draft.addPostError = null
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false,
      draft.addPostDone = true,
      draft.mainPosts.unshift(action.data);
      break;
    case ADD_POST_FAILURE: 
      draft.addPostLoading = false,
      draft.addPostError = action.error
      break;
    case LIKE_POST_REQUEST: 
      draft.likePostLoading = true,
      draft.likePostDone = false,
      draft.likePostError = null
      break;
    case LIKE_POST_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id == action.data.PostId);
      post.Likers.push({ id: action.data.UserId });
      draft.likePostLoading = false,
      draft.likePostDone = true
      break;
    }
    case LIKE_POST_FAILURE:
      draft.likePostLoading = false,
      draft.likePostError = action.error
      break;
    case UNLIKE_POST_REQUEST:      
      draft.unlikePostLoading = true,
      draft.unlikePostDone = false,
      draft.unlikePostError = null
      break;
    case UNLIKE_POST_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id == action.data.PostId);
      post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
      draft.unlikePostLoading = false,
      draft.unlikePostDone = true
      break;
    }
    case UNLIKE_POST_FAILURE: 
      draft.unlikePostLoading = false,
      draft.unlikePostError = action.error
      break;
    case ADD_COMMENT_REQUEST: 
      draft.addCommentLoading = true,
      draft.addCommentDone = false,
      draft.addCommentError = null
      break;
    case ADD_COMMENT_SUCCESS: {
      // 불변성 하나 지키려고 구현한 로직이 너무 복잡함
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Comments.unshift(action.data);
      draft.addCommentLoading = false,
      draft.addCommentDone = true
      break;
    }
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false,
      draft.addCommentError = action.error
      break;
    case REMOVE_POST_REQUEST: 
      draft.removePostLoading = true,
      draft.removePostDone = false,
      draft.removePostError = null
      break;
    case REMOVE_POST_SUCCESS:
      draft.removePostLoading = false,
      draft.removePostDone = true
      draft.mainPosts = draft.mainPosts.filter((v) => v.id != action.data)
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false,
      draft.removePostError = action.error
      break;
    default:
      break;
  }
});

export default reducer;
