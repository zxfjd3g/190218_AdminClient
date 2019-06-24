/* 
入口js
*/

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import App from './containers/App'

import store from './redux/store'

console.log('store', store)


ReactDOM.render( (
  <Provider store={store} > {/* 向所有的容器组件提供store对象 */}
    <App />
  </Provider>
) , document.getElementById('root'))
