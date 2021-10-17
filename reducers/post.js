import shortid from 'shortid';
import produce from 'immer';

export const initalState = {
  mainPosts: [{
    id: shortid.generate(),
    User: {
      id: shortid.generate(),
      nickname: '호예진',
    },
    content: '첫 번째 게시글 #또치 #고양이',
    Images: [{
      id: shortid.generate(),
      src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    }, {
      id: shortid.generate(),
      src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
    }, {
      id: shortid.generate(),
      src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
    }],
    Comments: [{
      id: shortid.generate(),
      User: {
        nickname: 'dooch___u',
      },
      content: '또치 너무 귀여워요',
    }, {
      id: shortid.generate(),
      User: {
        nickname: 'dooch___u',
      },
      content: '또치 넘넘 이뽀요',
    }]
  }],
  imagePaths: [], // 이미지 업로드 경로
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

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '호예진',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortid.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '제로초',
  },
});

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

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

const reducer = (state = initalState, action) => produce(state, (draft) => {
  // immer가 알아서 불변성을 지켜서 return 해줌
  switch (action.type) {
    case ADD_POST_REQUEST: 
      draft.addPostLoading = true,
      draft.addPostDone = false,
      draft.addPostError = null
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false,
      draft.addPostDone = true,
      draft.mainPosts.unshift((dummyPost(action.data)))
      break;
    case ADD_POST_FAILURE: 
      draft.addPostLoading = false,
      draft.addPostError = action.error
      break;
    case ADD_COMMENT_REQUEST: 
      draft.addCommentLoading = true,
      draft.addCommentDone = false,
      draft.addCommentError = null
      break;
    case ADD_COMMENT_SUCCESS:
      // 불변성 하나 지키려고 구현한 로직이 너무 복잡함
      const post = draft.mainPosts.find((v) => v.id === action.data.postId);
      post.Comments.unshift(dummyComment(action.data.content));
      draft.addCommentLoading = false,
      draft.addCommentDone = true
      break;
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
