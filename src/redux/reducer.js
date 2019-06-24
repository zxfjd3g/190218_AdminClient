/* 
包含所有管理状态数据的reducer函数的模块
*/
import {combineReducers} from 'redux'
import {getUser} from '../utils/storageUtils'
import {
  SET_HEADER_TITLE
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

// 管理登陆用户信息的reducer函数
const initUser = getUser()  // 初始值为local中存储的user

function user(state = initUser, action) {
  switch (action.type) {

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