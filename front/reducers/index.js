import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

// 이전 상태와 action을 통해서 다음 상태를 만들어 내는 함수
// (이전 상태, 액션) => 다음상태
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE: {
      return action.payload;
    }
    default: {
      const combineReducer = combineReducers({
        user,
        post,
      });
      return combineReducer(state, action);
    }
  }
  // index는 없어도 되는데 서버사이드 렌더링을 위해  HYDRATE를 넣어주기 위해 index reducer를 추가해줌
};

export default rootReducer;