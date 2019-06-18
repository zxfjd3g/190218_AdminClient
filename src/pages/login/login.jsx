import React from 'react'
import { 
  Form, 
  Icon, 
  Input,
  Button, 
  message
} from 'antd'
import { Redirect } from "react-router-dom";

import { reqLogin } from "../../api";
import logo from "../../assets/images/logo.png"
import './login.less'
import memoryUtils from '../../utils/memoryUtils'
import {saveUser} from '../../utils/storageUtils'

const Item = Form.Item
/* 
登陆的一级路由组件
*/
class Login extends React.Component {

  handleSubmit = (event) => {
    // 阻止默认行为
    event.preventDefault()

    // 统一进行所有表单项的验证
    this.props.form.validateFields(async (err, values) => {
      if (!err) { // 验证成功了
        // console.log('发登陆ajax请求: ', values)
        const {username, password} = values
        const result = await reqLogin(username, password) // {status: 0, data: user对象} | {status: 1, msg: 'xxx'}
        // 如果登陆成功了
        if (result.status===0) {
          // 保存用户信息
          const user = result.data
          saveUser(user)// 保存了local文件中
          memoryUtils.user = user // 保存在内存中
          // 跳转到admin界面
          this.props.history.replace('/')
        } else { // 如果登陆失败了
          message.error(result.msg, 2)
        }
      }
    })

    // 收集输入的数据
    // const username = this.props.form.getFieldValue('username') // 取出字段的值
    // const password = this.props.form.getFieldValue('password')
    // const values = this.props.form.getFieldsValue() // 取出所有字段的值
    // console.log(username, password, values)

  }

  /*
  对密码进行自定义验证
  1). 必须输入
  2). 必须大于等于4位
  3). 必须小于等于12位
  4). 必须是英文、数字或下划线组成
  */
  validatePwd = (rule, value='', callback) => {
    // console.log(rule, value)
    value = value.trim()
    if (!value) {
      callback('必须输入密码')  // 指定要显示的提示内容 
    } else if (value.length<4) {
      callback('密码长度不能小于4位') 
    } else if (value.length > 12) {
      callback('密码长度不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成!')
    } else {
      callback() // 验证通过
    }
  }

  render () {

    const { getFieldDecorator } = this.props.form

    // 访问login界面, 如果已经登陆, 自动跳转到admin
    if (memoryUtils.user._id) {
      return <Redirect to="/"/>
    }

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                getFieldDecorator('username', {// 配置对象(options): 属性名是特定名称
                  // 指定初始值为空串
                  initialValue: '',
                  // 声明式验证: 使用已有验证规则进行验证
                  rules: [
                    { required: true, whitespace: true, message: '请输入用户名!' },
                    { min: 4, message: '用户名不能小于4位!' },
                    { max: 12, message: '用户名不能大于12位!' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成!' },
                  ],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }
              
            </Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  // initialValue: '',
                  rules: [
                    { validator: this.validatePwd}
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
              
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登 陆
              </Button>
            </Form.Item>
          </Form>
          
        </section>
      </div>
    )
  }
}

/*
Form组件: 包含了<Form>的组件
Form.create()返回函数包装一个Form组件生成一个新的组件: Form(Login)
Login会接收到一个form属性对象
*/
const WrapperLogin = Form.create()(Login)
export default WrapperLogin


/*
高阶函数: 
  返回值是函数
高阶组件:
  本质是一个函数
  接收一个组件, 返回一个新的组件
  新的组件会给被包装组件传递特定的属性

  function fn(Component) {
    const form = {

      test1 () {},
      test2 () {},
    }
    return class WrapperComp extends React.Component {

      render () {
        return <Component form={form}></Component>
      }
    }
  }

  const WrapperComp = fn(Login)

  <WrapperComp/>
*/
