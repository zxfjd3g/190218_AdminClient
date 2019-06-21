import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ProductHome from './home'
import ProductDetail from './detail'
import ProductAddUpdate from './add-update'

import './product.less'

/**
 * 商品管理(二级路由)
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        {/* 如果为 true，则只有在路径完全匹配 location.pathname 时才匹配。 */}
        <Route exact path="/product" component={ProductHome}/>
        <Route path="/product/detail" component={ProductDetail}/>
        <Route path="/product/addupdate" component={ProductAddUpdate}/>
        <Redirect to="/product"></Redirect>
      </Switch>
    )
  }
}
