import React from 'react'
import {Redirect} from 'react-router-dom'

import memoryUtils from "../../utils/memoryUtils";

/* 
后台管理的一级路由组件
*/
export default class Admin extends React.Component {

  render() {

    // 如果当前没有登陆(内存的user中没有_id)
    const user = memoryUtils.user
    if (!user._id) {
      // this.props.history.replace('/login')
      return <Redirect to="/login"/>
    }

    return (
      <div>Hello, {user.username}</div>
    )
  }
}