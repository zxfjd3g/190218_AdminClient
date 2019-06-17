import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Menu, Icon } from 'antd'

import menuList from "../../config/menuConfig"   // ===> [<Item/>, <SubMenu/>>]
import logo from '../../assets/images/logo.png'
import './index.less'

const { SubMenu, Item } = Menu

/* 
adin的左侧导航组件
*/
export default class LeftNav extends Component {


  /* 
  根据menu中数据中数组生成包含<Item> / <SubMenu>的数组
  关键技术: array.map() + 递归调用
  */
  getMenusNodes = (menuList) => {
    
    /* 
    {
      title: '首页', // 菜单标题名称
      key: '/home', // 对应的path
      icon: 'home', // 图标名称
      children: []
    }
    */
    return menuList.map(item => {

      // 返回<Item></Item>
      if (!item.children) {
        return (
          <Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      } else {  // 返回<SubMenu></SubMenu>
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {
              this.getMenusNodes(item.children)
            }
          </SubMenu>
        )
      }

     

      return 1
    })
  }

  render() {
    return (
      <div className="left-nav">
        <Link to="/home" className="left-nav-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理</h1>
        </Link>

        <Menu
          mode="inline"
          theme="dark"
        >
          {
            this.getMenusNodes(menuList)
          }

          {/* <Item key="/home">
            <Link to="/home">
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Item>
          
          <SubMenu
            key="/products"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Item key="/category">
              <Link to="/category">
                <Icon type="home" />
                <span>分类管理</span>
              </Link>
            </Item>
            <Item key="/product">
              <Link to="/product">
                <Icon type="home" />
                <span>商品管理</span>
              </Link>
            </Item>
          </SubMenu> */}
          
        </Menu>
      </div>
    )
  }
}
