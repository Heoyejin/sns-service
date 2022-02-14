import produce from 'immer';

export const initalState = {
  singlePost: null,
  mainPosts: [],
  imagePaths: [], // 이미지 업로드 경로
  hasMorePost: true,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
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
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
};

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';


export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGES = 'REMOVE_IMAGES';

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

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

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
      draft.singlePost = action.data.concat(draft.mainPosts);
      break;
    case LOAD_POST_FAILURE: 
      draft.loadPostLoading = false,
      draft.loadPostError = action.error
      break;
    case LOAD_POSTS_REQUEST:
    case LOAD_HASHTAG_POSTS_REQUEST:
      draft.loadPostsLoading = true,
      draft.loadPostsDone = false,
      draft.loadPostsError = null
      break;
    case LOAD_POSTS_SUCCESS:
    case LOAD_HASHTAG_POSTS_SUCCESS:
      draft.loadPostsLoading = false,
      draft.loadPostsDone = true,
      draft.mainPosts = action.data.concat(draft.mainPosts);
      // 보여질 게시물을 50개로 한정
      draft.hasMorePost = draft.mainPosts.length === 10;
      break;
    case LOAD_POSTS_FAILURE:
    case LOAD_HASHTAG_POSTS_FAILURE:
      draft.loadPostsLoading = false,
      draft.loadPostsError = action.error
      break;
    case ADD_POST_REQUEST: 
      draft.addPostLoading = true,
      draft.addPostDone = false,
      draft.addPostError = null
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false,
      draft.addPostDone = true,
      draft.mainPosts.unshift(action.data),
      draft.imagePaths = null
      break;
    case ADD_POST_FAILURE: 
      draft.addPostLoading = false,
      draft.addPostError = action.error
      break;
    case UPLOAD_IMAGES_REQUEST: 
      draft.uploadImagesLoading = true,
      draft.uploadImagesDone = false,
      draft.uploadImagesError = null
      break;
    case UPLOAD_IMAGES_SUCCESS:
      draft.uploadImagesLoading = false,
      draft.uploadImagesDone = true,
      draft.imagePaths = action.data;
      break;
    case UPLOAD_IMAGES_FAILURE: 
      draft.uploadImagesLoading = false,
      draft.uploadImagesError = action.error
      break;
    case REMOVE_IMAGES:
      draft.imagePaths = draft.imagePaths.filter((v, i) => i != action.data)
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
      draft.mainPosts = draft.mainPosts.filter((v) => v.id != action.data.PostId)
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false,
      draft.removePostError = action.error
      break;
    case RETWEET_REQUEST: 
      draft.retweetLoading = true,
      draft.retweetDone = false,
      draft.retweetError = null
      break;
    case RETWEET_SUCCESS:
      draft.retweetLoading = false,
      draft.retweetDone = true,
      draft.mainPosts.unshift(action.data);
      break;
    case RETWEET_FAILURE:
      draft.retweetLoading = false,
      draft.retweetError = action.error
      break;
    default:
      break;
  }
});

export default reducer;
