/* 
包含n个用于创建action的工厂函数的模块

同步action: 对象  {type: '标识名称', number}
异步action: 函数  dispatch => {1. 执行异步代码 2. 分发同步action}
*/

import {
  INCREMENT,
  DECREMENT
} from './action-types'
import axios from 'axios';

/* 
增加的action
用于创建增加的action的actionCreator
*/
export const increment = number => ({type: INCREMENT, number})

/* 
减小的action
*/
export const decrement = number => ({type: DECREMENT, number})


/* 
异步增加的action
*/
export function incrementAsync(number) {
  return dispatch => {
    // 1. 执行异步代码
    setTimeout(() => {
      // 2. 结束后, 分发同步action
      dispatch(increment(number))
    }, 1000);
  }
}