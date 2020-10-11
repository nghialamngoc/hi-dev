import { SET_USER_LOGIN } from '../type'

const getDefaultState = () => {
  const userData = JSON.parse(localStorage.getItem('userLogin'));
  if ( userData == null ) {
    return {
      isLogin: false
    }
  } else {
    return userData;
  }
}

const initialState = {
  userLoginData: getDefaultState()
};

const userReducer = (previousState = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOGIN:
      return {
        ...previousState,
        userLoginData: action.payload
      }
    default:
      return previousState;
  }
}

export default userReducer;