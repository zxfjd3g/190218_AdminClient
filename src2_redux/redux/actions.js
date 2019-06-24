/* 
包含n个用于创建action的工厂函数的模块
*/

import {
  INCREMENT,
  DECREMENT
} from './action-types'

/* 
增加的action
用于创建增加的action的actionCreator
*/
export const increment = number => ({type: INCREMENT, number})

/* 
减小的action
*/
export const decrement = number => ({type: DECREMENT, number})