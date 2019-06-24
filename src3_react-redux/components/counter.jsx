import React, { Component } from 'react'
import PropTypes from 'prop-types'

/* 
UI组件: 显示界面
不包含任何redux相关的代码
*/
export default class App extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired, // 一般属性
    increment: PropTypes.func.isRequired, // 函数属性
    decrement: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.numberRef = React.createRef()
  }

  increment = () => {
    const number = this.numberRef.current.value * 1
    // 更新redux中的count状态数据
    this.props.increment(number)
  }

  decrement = () => {
    const number = this.numberRef.current.value * 1
    this.props.decrement(number)
  }

  incrementIfOdd = () => {
    const number = this.numberRef.current.value * 1
    if (this.props.count % 2===1) {
      this.props.increment(number)
    }
    
  }

  incrementAsync = () => {
    const number = this.numberRef.current.value * 1
    setTimeout(() => {
      this.props.increment(number)
    }, 1000)
  }
  
  render () {
    const count = this.props.count
    return (
     <div>
       <p>click {count} times </p>

       <select ref={this.numberRef}>
         <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
       </select>

        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.incrementIfOdd}>increment if odd</button>
        <button onClick={this.incrementAsync}>increment async </button>
     </div>
    )
  }
}