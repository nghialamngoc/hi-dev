import { SET_USER_LOGIN } from '../type'

const setUserLogin = (userData) => {
  return {
    type: SET_USER_LOGIN,
    payload: userData
  }
}

export { setUserLogin }