import {connect} from 'react-redux'

import {increment, decrement} from '../redux/actions'
import Counter from '../components/counter'

/* 
容器组件: 通过connect包装UI组件生成容器组件
容器组件的责任: 向UI组件传入特定的属性
*/

export default connect(
  state => ({count: state}),
  {
    increment, 
    decrement
  }
)(Counter)

