const initalState = {
  isLoggedIn: false,
  me: null, 
  signUpdata: {},
  loginData: {}
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