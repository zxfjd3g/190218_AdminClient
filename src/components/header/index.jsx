import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import memoryUtils from "../../utils/memoryUtils"
import {formateDate} from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import './index.less'

/* 
Admin头部界面
*/
class Header extends Component {

  // 初始化状态
  state = {
    currentTime: formateDate(Date.now()), // 当前时间字符串
    dayPictureUrl: '', // 天气图片的url
    weather: '', // 天气的文本
  }

  /* 
  每隔1s更新时间的显示
  */
  showCurrentTime = () => {
    this.itervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      // 更新状态
      this.setState({
        currentTime
      })
    }, 1000);
  }

  /* 
  得到当前请求路径对应的title
  */
  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname
    let title = ''
    menuList.forEach(item => {
      if (item.key===path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(item => item.key===path)
        if (cItem) {
          title = cItem.title
        }
      }
    })

    return title
  }

  /* 
  组件即将销毁之前
  做一些收尾的工作: 清除定时器
  */
  componentWillUnmount () {
    clearInterval(this.itervalId)
  }

  componentDidMount () {
    // 每隔1s更新时间的显示
    this.showCurrentTime()
  }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state

    // 得到当前登陆的用户
    const { user } = memoryUtils
    // 得到当前请求路径对应的title
    const title = this.getTitle()



    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {user.username}</span>
          <a href="javascript:">登出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)