const initalState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null, 
  logOutLoaging: false,
  logOutDone: false,
  logOutError: false,
  signUpLoaging: false,
  signUpDone: false,
  signUpError: false,
  me: null, 
  signUpdata: {},
  loginData: {}
};


export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

const dummyUser = (data) => ({
  ...data,
  nickname: '호예진',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ nickname: '또치' }, { nickname: 'ddochee__u' }, { nickname: 'uzinee' }],
  Followers: [{ nickname: '또치' }, { nickname: 'ddochee__u' }, { nickname: 'uzinee' }],
});

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data
  }
};

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST
  }
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: 
      return {
        ...state,
        logInLoading: true,
        loginError: null
      }
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: dummyUser(action.data),
      }
    case LOG_IN_FAILURE : 
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      }
    case LOG_OUT_REQUEST : 
      return {
        ...state,
        logOutLoaging: true,
        logOutDone: false,
        logOutError: null
      }
    case LOG_OUT_SUCCESS : 
      return {
        ...state,
        logOutLoaging: false,
        logOutDone: true,
        me: null
      }
    case LOG_OUT_FAILURE : 
      return {
        ...state,
        logOutLoaging: false,
        logOutError: action.error,
      }
    case SIGN_UP_REQUEST : 
      return {
        ...state,
        signUpLoaging: true,
        signUpDone: false,
        signUpError: null
      }
    case SIGN_UP_SUCCESS : 
      return {
        ...state,
        signUpLoaging: false,
        signUpDone: true,
        me: null
      }
    case SIGN_UP_FAILURE : 
      return {
        ...state,
        signUpLoaging: false,
        signUpError: action.error,
      }
    case CHANGE_NICKNAME_REQUEST : 
      return {
        ...state,
        changeNicknameLoaging: true,
        changeNicknameDone: false,
        changeNicknameError: null
      }
    case CHANGE_NICKNAME_SUCCESS : 
      return {
        ...state,
        changeNicknameLoaging: false,
        changeNicknameDone: true,
        me: null
      }
    case CHANGE_NICKNAME_FAILURE : 
      return {
        ...state,
        changeNicknameLoaging: false,
        changeNicknameError: action.error,
      }
    case ADD_POST_TO_ME:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: [{ id: action.data}, state.me.Posts],
        }
      }
    case REMOVE_POST_OF_ME:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: state.Posts.filter((v) => v.id != action.data),
        }
      }
    default:
      return state;
  }
}

export default reducer;