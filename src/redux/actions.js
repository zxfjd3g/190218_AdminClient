/* 
包含n个action creator的模块
*/
import {
  SET_HEADER_TITLE
} from './action-types'
/* 
设置头部标题的同步action
*/
export const setHeaderTitle = (headerTitle) => ({type: SET_HEADER_TITLE, headerTitle})