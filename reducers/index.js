// store - 전역에서 공통으로 사용할 변수 모음
const initalState = {
  user: {
    isLoggedIn: false,
    user: null, 
    signUpdata: {},
    loginData: {}
  },
  post: {
    mainPosts: {}
  }
};

export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data
  }
};

export const logoutAction = () => {
  return {
    type: 'LOG_OUT'
  }
};
/*
 * nickname을 변경하는 함수로 만들어서 중복 동작을 처리 하기
 * 아래와 같이 변경할 때마다 변수를 선언해 주는건 오바
 * const changeNickname = {
    type: 'CHANGE_NICKNAME',
    data: 'yeeeeeeeeah'
  }
  * store.dispatch(changeNickname('yeeeeeeah'))
  * const changeNickname = (name) => {
      return {
        type: 'CHANGE_NICKNAME',
        name
      }
    };
*/

// 이전 상태와 action을 통해서 다음 상태를 만들어 내는 함수
const rootReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'LOG_IN' : 
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data
        }
      }
    case 'LOG_OUT' : 
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null
        }
      }
  }
}

export default rootReducer;