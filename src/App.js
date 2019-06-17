import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'
/* 
应用根组件
*/
export default class App extends Component {

  /* 
    默认:请求路由不需要与路由的路径进行完全匹配: 请求路径以路由的path开头即可
        一旦匹配到一个路由组件, 就进入它, 可能还需要进行子匹配
    ／login/xxx:  Login
    /home: ==> 匹配到Admin ==> 进入Admin ===> 进行子匹配, 匹配到Home ===> 进入home

    
  */
  render () {
    return (
     <BrowserRouter>

     
       <Switch>
         {/* 注册路由 */}
         <Route path="/login" component={Login}></Route>
         <Route path="/" component={Admin}></Route>
       </Switch>
     </BrowserRouter>
    )
  }
}