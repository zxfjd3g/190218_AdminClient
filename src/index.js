/* 
入口js
*/

import React from 'react'
import ReactDOM from 'react-dom'

import {getUser} from './utils/storageUtils'
import memeoryUtils from './utils/memoryUtils'
import App from './App' // 自定义的模块引入必须以.开头

import './api'


// 读取local中保存user, 缓存到内存中
  // const c = a || b   // 如果a有值, c的值就为a, 否则c的值为b
const user = getUser()
memeoryUtils.user = user

ReactDOM.render( < App /> , document.getElementById('root'))

