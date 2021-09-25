export const initalState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '호예진',
    },
    content: '첫 번째 게시글',
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
  postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
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

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true
      }
    default:
      return state;
  }
};

export default reducer;
