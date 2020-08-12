import createAction from '../../utils/createAction';

const initState = {
  user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
}

// 登录
export const setUserAction = (user) => {
  return {
    type: 'setUser',
    payload: user
  }
}

// 改变数据
function reducer(state = initState, action) {
  switch (action.type) {
    // 存储user
    case 'setUser':
      sessionStorage.setItem('user', JSON.stringify(action.payload))
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
}

// 用户信息
export const getUser = state => state.user.user;

export default reducer
