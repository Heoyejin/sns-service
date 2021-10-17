import produce from 'immer'

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
  changeNicknameLoaging: false,
  changeNicknameDone: false,
  changeNicknameError: false,
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

export const ADD_POST_OF_ME = 'ADD_POST_OF_ME';
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

const reducer = (state = initalState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      draft.logInLoading = true,
      draft.logInError = null
      break;
    case LOG_IN_SUCCESS:
      draft.logInLoading = false,
      draft.logInDone = true,
      draft.me = dummyUser(action.data)
      break;
    case LOG_IN_FAILURE: 
      draft.logInLoading = false,
      draft.logInError = action.error
      break;
    case LOG_OUT_REQUEST: 
      draft.logOutLoaging = true,
      draft.logOutDone = false,
      draft.logOutError = null
      break;
    case LOG_OUT_SUCCESS: 
      draft.logOutLoaging = false,
      draft.logOutDone = true
      draft.me = null
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoaging = false,
      draft.logOutError = action.error
      break;
    case SIGN_UP_REQUEST: 
      draft.signUpLoaging = true,
      draft.signUpDone = false,
      draft.signUpError = null
      break;
    case SIGN_UP_SUCCESS: 
      draft.signUpLoaging = false,
      draft.signUpDone = true,
      draft.me = null
      break;
    case SIGN_UP_FAILURE: 
      draft.signUpLoaging = false,
      draft.signUpError = action.error
      break;
    case CHANGE_NICKNAME_REQUEST: 
      draft.changeNicknameLoaging = true,
      draft.changeNicknameDone = false,
      draft.changeNicknameError = null
      break;
    case CHANGE_NICKNAME_SUCCESS: 
      draft.changeNicknameLoaging = false,
      draft.changeNicknameDone = true,
      draft.me = null
      break;
    case CHANGE_NICKNAME_FAILURE: 
      draft.changeNicknameLoaging = false,
      draft.changeNicknameError = action.error
      break;
    case ADD_POST_OF_ME:
      draft.me.Posts.unshift({id: action.data})
      break;
    case REMOVE_POST_OF_ME:
      draft.me.Posts = draft.me.Posts.filter((v) => v.id != action.data)
      break;
    default:
      break;
  }
});

export default reducer;