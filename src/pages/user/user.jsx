import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
} from 'antd'

import LinkButton from '../../components/link-button'
import UserForm from './user-form'
import {
  reqUsers,
  reqAddOrUpdateUser,
  reqDeleteUser
} from '../../api'
import { formateDate } from '../../utils/dateUtils'
import { PAGE_SIZE } from "../../utils/constants";

/*
后台管理的用户管理路由组件
 */
export default class User extends Component {

  state = {
    isShow: false, // 是否显示对话框
    users: [], // 所有用户的列表
    roles: [], // 所有角色的列表
  }

  /*
  初始化Table的字段列表
   */
  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        // render: (role_id) => this.state.roles.find(role => role._id===role_id).name // 每显示一个都需要遍历
        render: (role_id) => this.rolesObj[role_id].name // 不需要遍历
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            &nbsp;&nbsp;
            <LinkButton onClick={() => this.clickDelete(user)}>删除</LinkButton>
          </span>
        )
      },
    ]
  }

  /* 
  role1 = {id: 1, name: 'a'},
  role2 = {id: 2, name: 'b'},
  role3 = {id: 3, name: 'c'},

  role_id = 2
  [role1, role2, role3]
  {
    1: role1,
    2: role2,
    3: role3,
  }
  
  */

  /*
  响应点击删除用户
   */
  clickDelete = (user) => {
    Modal.confirm({
      content: `确定删除${user.username}吗?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          this.getUsers()
        }
      }
    })
  }

  /*
  显示修改用户的界面
   */
  showUpdate = (user) => {
    // 保存user
    this.user = user
    this.setState({
      isShow: true
    })
  }

  /*
  异步获取所有用户列表
   */
  getUsers = async () => {
    const result = await reqUsers()
    if (result.status === 0) {
      const { users, roles } = result.data
      // 得到一个包含所有role对象的容器对象, 并保存
      this.rolesObj = roles.reduce((pre, role) => {
        // 添加一个属性
        pre[role._id] = role
        return pre
      } , {})    // {role._id值: roleName}

      this.setState({
        users,
        roles
      })
    }
  }


  /*
  显示添加用户的界面
   */
  showAddUser = () => {
    this.user = null
    this.setState({
      isShow: true
    })
  }

  /*
  添加/更新用户
   */
  AddOrUpdateUser = async () => {
    this.form.validateFields(async (error, user) => {
      if (!error) {
        
        this.form.resetFields()
        if (this.user) {
          user._id = this.user._id
        }
        this.setState({
          isShow: false
        })

        const result = await reqAddOrUpdateUser(user)
        if (result.status === 0) {
          this.getUsers()
        }
      }
    })
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {

    const { users, roles, isShow } = this.state
    const user = this.user || {}

    const title = <Button type="primary" onClick={this.showAddUser}>创建用户</Button>

    return (
      <div>
        <Card title={title}>
          <Table
            bordered
            rowKey='_id'
            columns={this.columns}
            dataSource={users}
            pagination={{ defaultPageSize: PAGE_SIZE }}
          />
          <Modal
            title={user._id ? '修改用户' : '添加用户'}
            visible={isShow}
            onCancel={() => this.setState({ isShow: false })}
            onOk={this.AddOrUpdateUser}
          >
            <UserForm
              setForm={(form) => this.form = form}
              user={user}
              roles={roles}
            />
          </Modal>
        </Card>
      </div>
    )
  }
}
