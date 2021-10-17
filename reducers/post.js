export const initalState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '호예진',
    },
    content: '첫 번째 게시글 #또치 #고양이',
    Images: [{
      src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    }, {
      src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
    }, {
      src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
    }],
    Comments: [{
      User: {
        nickname: 'dooch___u',
      },
      content: '또치 너무 귀여워요',
    }, {
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
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: '호예진',
  },
  Images: [],
  Comments: [],
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

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

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST: 
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE: 
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.eror,
      };
    case ADD_COMMENT_REQUEST: 
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        // mainComments: [dummyComment, ...state.mainComments],
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE: 
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
