const initalState = {
  isLoggedIn: false,
  me: null, 
  signUpdata: {},
  loginData: {}
};

// redux-thunk는 하나의 Action에서 여러개의 dispatch를 할 수 있는 기능
export const loginAction = (data) => {
  return (dispath, getState) => {
    // const state = getState();
    dispath(loginRequestAction());
    axios.post('/api/login')
      .then((res) => {
        dispath(loginSuccessAction(res.data));
      })
      .catch((err) => {
        dispath(loginFaliureAction(err));
      })
  }
};

export const loginRequestAction = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
    data
  }
};

export const loginSuccessAction = (data) => {
  return {
    type: 'LOG_IN_ACTION',
    data
  }
};

export const loginFaliureAction = (data) => {
  return {
    type: 'LOG_IN_FALIURE',
    data
  }
};

export const logoutAction = () => {
  return {
    type: 'LOG_OUT'
  }
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case 'LOG_IN' : 
      return {
        ...state,
        isLoggedIn: true,
        user: action.data
      }
    case 'LOG_OUT' : 
      return {
        ...state,
          isLoggedIn: false,
          user: null
      }
    default:
      return state;
  }
}

export default reducer;