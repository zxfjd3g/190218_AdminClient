/* 
redux最核心的管理对象: store
*/
import {createStore} from 'redux'
import reducer from './reducer'


const store = createStore(reducer) // 根据指定的reducer生成store对象, 内部会调用reducer函数(第一次)

export default store