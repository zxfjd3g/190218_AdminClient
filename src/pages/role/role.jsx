import React, { PureComponent } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message,
} from 'antd'

import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from "../../utils/constants"
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'

/*
角色路由
 */
export default class Role extends PureComponent {

  state = {
    roles: [], // 所有角色的列表
    isShowAdd: false, // 是否显示添加界面
    isShowAuth: false, // 是否显示设置权限界面
  }

  constructor (props) {
    super(props)

    this.authRef = React.createRef()
  }

  /* 
  初始化table列数组
  */
  initColumn = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: auth_time => formateDate(auth_time)
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
      {
        title: '操作',
        render: (role) => <LinkButton onClick={() => this.showAuth(role)}>设置权限</LinkButton> 
      },
    ]
  }

  /* 
  显示权限设置界面
  */
  showAuth = (role) => {
    this.role = role
    this.setState({
      isShowAuth: true
    })
  }

  /* 
  异步获取角色列表显示
  */
  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }

  /*
  添加角色
   */
  addRole = () => {
    // 进行表单验证, 只能通过了才向下处理
    this.form.validateFields(async (error, values) => {
      if (!error) {
        
        this.setState({
          isShowAdd: false
        })

        // 清除输入
        this.form.resetFields()

        // 请求添加role
        const result = await reqAddRole(values.roleName)

        // 成功后, 更新显示角色列表
        if (result.status===0) {
          message.success('保存角色成功')
          const role = result.data
          const roles = this.state.roles
         
          // roles.push(role)
          // this.setState({roles})

          this.setState({
            roles: [...roles, role]
          })
        }
      }
    })
  }

  /*
  给角色授权
   */
  updateRole = async () => {

    this.setState({
      isShowAuth: false
    })
    // 更新user对象的属性
    const role = this.role
    role.menus = this.authRef.current.getMenus()
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username
    // 发请求更新用户
    const result = await reqUpdateRole(role)
    if (result.status === 0) {
      message.success('授权成功')
      this.getRoles()
    }

  }

  componentWillMount() {
    this.initColumn()
  }

  componentDidMount() {
    this.getRoles()
  }

  render() {
    console.log('role render()')
    const { roles, isShowAdd, isShowAuth } = this.state
    const role = this.role || {}

    const title = (
      <Button type='primary' onClick={() => this.setState({ isShowAdd: true })}>
        创建角色
      </Button>
    )

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />

        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isShowAdd: false })
            this.form.resetFields()
          }}
        >
          <AddForm
            setForm={(form) => this.form = form}
          />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false })
          }}
        >
          <AuthForm ref={this.authRef} role={role} />
        </Modal>
      </Card>
    )
  }
}
