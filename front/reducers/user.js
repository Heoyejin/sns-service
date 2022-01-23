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
  followLoading: false,
  followDone: false,
  followError: null, 
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  loadFollowLoading: false,
  loadFollowDone: false,
  loadFollowError: null, 
  loadUnfollowLoading: false,
  loadUnfollowDone: false,
  loadUnfollowError: null,
  me: null, 
  signUpdata: {},
  loginData: {}
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';
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
    case LOAD_MY_INFO_REQUEST: 
      draft.loadUserLoading = true;
      draft.loadUserError = null;
      draft.loadUserDone = false;
      break;
    case LOAD_MY_INFO_SUCCESS: 
      draft.loadUserLoading = false;
      draft.me = action.data;
      draft.loadUserDone = true;
      break;
    case LOAD_MY_INFO_FAILURE: 
      draft.loadUserLoading = false;
      draft.loadUserError = action.error;
      break;
    case LOAD_FOLLOWINGS_REQUEST: 
      draft.loadFollowingsLoading = true;
      draft.loadFollowingsError = null;
      draft.loadFollowingsDone = false;
      break;
    case LOAD_FOLLOWINGS_SUCCESS: 
      draft.loadFollowingsLoading = false;
      draft.me.Followings = action.data;
      draft.loadFollowingsDone = true;
      break;
    case LOAD_FOLLOWINGS_FAILURE: 
      draft.loadFollowingsLoading = false;
      draft.loadFollowingsError = action.error;
      break;
    case LOAD_FOLLOWERS_REQUEST: 
      draft.loadFollowersLoading = true;
      draft.loadFollowersError = null;
      draft.loadFollowersDone = false;
      break;
    case LOAD_FOLLOWERS_SUCCESS: 
      draft.loadFollowersLoading = false;
      draft.me.Followers = action.data;
      draft.loadFollowersDone = true;
      break;
    case LOAD_FOLLOWERS_FAILURE: 
      draft.loadFollowersLoading = false;
      draft.loadFollowersError = action.error;
      break;
    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInError = null;
      break;
    case LOG_IN_SUCCESS:
      draft.logInLoading = false;
      draft.logInDone = true;
      draft.me = action.data;
      break;
    case LOG_IN_FAILURE: 
      draft.logInLoading = false;
      draft.logInError = action.error;
      break;
    case LOG_OUT_REQUEST: 
      draft.logOutLoaging = true;
      draft.logOutDone = false;
      draft.logOutError = null;
      break;
    case LOG_OUT_SUCCESS: 
      draft.logOutLoaging = false;
      draft.logOutDone = true
      draft.me = null;
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoaging = false;
      draft.logOutError = action.error;
      break;
    case SIGN_UP_REQUEST: 
      draft.signUpLoaging = true;
      draft.signUpDone = false;
      draft.signUpError = null;
      break;
    case SIGN_UP_SUCCESS: 
      draft.signUpLoaging = false;
      draft.signUpDone = true;
      draft.me = null;
      break;
    case SIGN_UP_FAILURE: 
      draft.signUpLoaging = false;
      draft.signUpError = action.error;
      break;
    case CHANGE_NICKNAME_REQUEST: 
      draft.changeNicknameLoaging = true;
      draft.changeNicknameDone = false;
      draft.changeNicknameError = null;
      break;
    case CHANGE_NICKNAME_SUCCESS: 
      draft.me.nickname = action.data.nickname;
      draft.changeNicknameLoaging = false;
      draft.changeNicknameDone = true;
      break;
    case CHANGE_NICKNAME_FAILURE: 
      draft.changeNicknameLoaging = false;
      draft.changeNicknameError = action.error;
      break;
    case FOLLOW_REQUEST: 
      draft.followLoading = true;
      draft.followDone = false;
      draft.followError = null;
      break;
    case FOLLOW_SUCCESS: 
      draft.followLoading = false;
      draft.me.Followings.push({ id: action.data.UserId });
      draft.followDone = true;
      break;
    case FOLLOW_FAILURE: 
      draft.followLoading = false;
      draft.followError = action.error;
      break;
    case UNFOLLOW_REQUEST: 
      draft.unfollowLoading = true;
      draft.unfollowDone = false;
      draft.unfollowError = null;
      break;
    case UNFOLLOW_SUCCESS: 
      draft.unfollowLoading = false;
      draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
      draft.unfollowDone = true;
      break;
    case UNFOLLOW_FAILURE: 
      draft.unfollowLoading = false;
      draft.unfollowError = action.error;
      break;
    case ADD_POST_OF_ME:
      draft.me.Posts.unshift({id: action.data});
      break;
    case REMOVE_POST_OF_ME:
      draft.me.Posts = draft.me.Posts.filter((v) => v.id != action.data);
      break;
    default:
      break;
  }
});

export default reducer;