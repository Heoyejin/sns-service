import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

// 이전 상태와 action을 통해서 다음 상태를 만들어 내는 함수
const rootReducer = combineReducers({
  // index는 없어도 되는데 서버사이드 렌더링을 위해  HYDRATE를 넣어주기 위해 index reducer를 추가해줌
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE: 
        return {...state, ...action.payload}
      default:
        return state;
    }
  },
  user, 
  post,
});

export default rootReducer;