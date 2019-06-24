/* 
包含n个action creator的模块
*/
import {
  SET_HEADER_TITLE,
  RECEIVE_USER,
  ERROR_MSG,
  RESET_USER
} from './action-types'

import {
  reqLogin
} from '../api'
import { removeUser } from "../utils/storageUtils";

/* 
设置头部标题的同步action
*/
export const setHeaderTitle = (headerTitle) => ({type: SET_HEADER_TITLE, headerTitle})

/* 
接收用户的同步action
 */
export const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
/* 
显示错误信息的同步action
 */
export const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})

/* 
退出登陆的同步action
*/
export const logout = () => {
  // 清除local中的user
  removeUser()
  // 清除state中的user
  return { type: RESET_USER }
}


/* 
登陆的异步action
*/
export function login(username, password) {
  return async dispatch => {
    // 1. 发送登陆的ajax请求
    const result = await reqLogin(username, password)
    // 2.1.  如果登陆成功了, 分发一个接收用户的同步action
    if (result.status===0) {
      const user = result.data
      dispatch(receiveUser(user))
    } else { // 2.2. 如果登陆失败了, 分发显示错误提示的同步action
      const msg = result.msg
      dispatch(errorMsg(msg))
    }
    
  }
}