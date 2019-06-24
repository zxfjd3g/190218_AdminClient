/* 
入口js
*/

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import App from './App' // 自定义的模块引入必须以.开头
import store from './redux/store'

// import './test/async'
// import './test/error'

ReactDOM.render( (
  <Provider store={store}>{/* 向容器组件提供store对象 */}
    <App />
  </Provider>
) , document.getElementById('root'))

