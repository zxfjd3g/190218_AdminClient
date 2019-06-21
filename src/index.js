/* 
入口js
*/

import React from 'react'
import ReactDOM from 'react-dom'

import {getUser} from './utils/storageUtils'
import memeoryUtils from './utils/memoryUtils'
import App from './App' // 自定义的模块引入必须以.开头

// import './test/async'
// import './test/error'

// 读取local中保存user, 缓存到内存中
const user = getUser()
memeoryUtils.user = user

ReactDOM.render( < App /> , document.getElementById('root'))

