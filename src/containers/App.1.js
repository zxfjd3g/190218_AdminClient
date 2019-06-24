import {connect} from 'react-redux'

import {
  increment,
  decrement,
  incrementAsync
} from '../redux/actions'

import Counter from '../components/counter'

/* 
容器组件: 通过connect包装UI组件生成容器组件
容器组件的责任: 向UI组件传入特定的属性
*/
/* 
回调函数
接收的参数为store的state值
返回值为一个对象, 对象中的所有属性会传递给UI组件
*/
const mapStateToProps = state => ({count: state, name: 'atguigu'})

/* 
回调函数
接收的参数为store的dispatch属性值
返回值为一个对象, 对象中的所有属性会传递给UI组件
*/
const mapDispatchToProps = (dispatch) => ({
  increment: number => dispatch(increment(number)),
  decrement: number => dispatch(decrement(number)),
  incrementAsync: number => dispatch(incrementAsync(number))
})

const ContainerComp = connect(
  // 将store中的state数据映射成一般属性传递UI组件
  mapStateToProps,
  // 将包含dispatch()的函数映射成函数属性传递UI组件
  mapDispatchToProps
)(Counter)

export default ContainerComp

