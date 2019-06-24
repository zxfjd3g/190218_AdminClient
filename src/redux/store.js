/* 
redux最核心的管理对象: store
*/
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk))) // 根据指定的reducer生成store对象, 内部会调用reducer函数(第一次)

export default store