/* 
包含所有管理状态数据的reducer函数的模块
reducer函数内部不要直接改变状态数据对象内部的数据, 而是返回一个新的数据
*/
import {combineReducers} from 'redux'
import {getUser} from '../utils/storageUtils'
import {
  SET_HEADER_TITLE,
  RECEIVE_USER,
  ERROR_MSG,
  RESET_USER
} from './action-types'

// 管理头部标题的reducer函数
const initHeaderTitle = '首页'
function headerTitle(state=initHeaderTitle, action) {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return action.headerTitle
    default:
      return state
  }
}

// 管理登陆用户信息的reducer函数   {_id: 'aaa', errorMsg: 'xxxx'}
const initUser = getUser()  // 初始值为local中存储的user

function user(state = initUser, action) {  
  switch (action.type) {
    case RECEIVE_USER:
      return action.data
    case ERROR_MSG:
      // state.errorMsg = action.data
      // return state
      return {...state, errorMsg: action.data}
    case RESET_USER:
      return {}
    default:
      return state
  }
}

/* 
合并多个reducer生成一个总的reducer函数
管理的总state的结构:
  {
    headerTitle: "xxx",
    user: {}
  }
*/
const reducer = combineReducers({
  headerTitle, // headerTitle函数返回的状态: "xxx"
  user // user函数返回的状态: {}
})
export default reducer