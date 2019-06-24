/* 
一个根据当前state和指定的action返回一个新的state的函数
*/

// 管理count状态数据的reducer函数
const initCount = 2
export default function count(state = initCount, action) { // {type, number}
  console.log('count()', state, action)
  switch (action.type) {
    case 'INCREMENT':
      return state + action.number
    case 'DECREMENT':
      return state - action.number
    default:  // 初始显示时使用
      return state
  }
}
