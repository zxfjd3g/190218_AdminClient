import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Modal } from 'antd'

import LinkButton from "../../components/link-button"
import {reqWeather} from '../../api'
import {removeUser} from "../../utils/storageUtils"
import memoryUtils from "../../utils/memoryUtils"
import {formateDate} from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import './index.less'

/* 
Admin头部界面
*/
class Header extends Component {

  static propTypes = { // 给Header(类对象)添加的属性

  }
  // 初始化状态
  state = { // 给Header的实例(组件对象)添加属性
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
        const cItem = item.children.find(item => path.indexOf(item.key)===0)
        if (cItem) {
          title = cItem.title
        }
      }
    })

    return title
  }

  /* 
  获取天气信息显示
  */
  getWeather = async () => {
    const { dayPictureUrl, weather} = await reqWeather('北京')
    // 更新状态
    this.setState({
       dayPictureUrl, 
       weather 
    })
  }

  /* 
  退出登陆
  */
  logout = () => {

    // 显示确认框, 点击确定后再退出
    Modal.confirm({
      title: '确定退出吗?',
      onOk: () => {
        console.log('OK')
        // 清除保存user数据
        removeUser()  // local中的
        memoryUtils.user = {} // 内存中的
        // 跳转到登陆
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
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
    // 获取天气信息显示
    this.getWeather()
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
          {/* <a href="javascript:" onClick={this.logout}>登出</a> */}
          <LinkButton onClick={this.logout}>登出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            {!!dayPictureUrl && <img src={dayPictureUrl} alt="weather" />}
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)

/* 
console.log(a.b)
先查找a(变量), 沿着作用域链
  没找到, 抛出异常 (ReferenceError: a is not defined)
  找到了, 得到它的值
    基本类型的值
      undefined/null
      number值/string值/boolean值
    地址值
接着.b
    undefined/null: 抛出异常 (TypeError: Cannot read property 'xxx' of null)
    number值/string值/boolean值: 自动创建对应的包装类型的对象, 查找对象上的b属性
    地址值: 找到堆空间中对应的对象, 查找对象上的b属性
查找b属性:
    先在对象自身上查找, 如果不存在, 去原型链上依次查找
    找不到, 返回undefined
*/