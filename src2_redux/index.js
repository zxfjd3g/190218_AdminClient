/* 
入口js
*/

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import store from './redux/store'

console.log('store', store)


ReactDOM.render( < App store={store} /> , document.getElementById('root'))

// 给store绑定监听(状态变化的)
store.subscribe(() => {
  // 状态数据变化 , 我们需要去重新渲染组件
  ReactDOM.render( < App store={store} /> , document.getElementById('root'))
})

