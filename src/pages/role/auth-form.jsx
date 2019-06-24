import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Tree
} from 'antd'

import menuList from '../../config/menuConfig'

const { TreeNode } = Tree

const Item = Form.Item

/*
添加分类的form组件
 */
export default class AuthForm extends PureComponent {

  static propTypes = {
    role: PropTypes.object
  }

  /* state = {
    checkedKeys: []
  } */

  constructor (props) {
    super(props)
    // 读取当前角色的权限
    const menus = this.props.role.menus
    // 初始化状态
    this.state = {
      checkedKeys: menus
    }
  }

  /* 
  获取当前选中所有key的数组
  */
  getMenus = () => this.state.checkedKeys


  initTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      // 添加一个<TreeNode>
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.initTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  }

  // 点击勾选框的回调
  onCheck = (checkedKeys) => {
    this.setState({
      checkedKeys
    })
  }

  componentWillMount () {
    this.treeNodes = this.initTreeNodes(menuList)
  }

  /* 
  当接收到新的属性时自动调用(初始化不会执行)
  当前组件将要更新
  */
  componentWillReceiveProps (nextProps) {
    const menus = nextProps.role.menus
    // 更新状态
    this.setState({
      checkedKeys: menus
    })
  }

  render() {
    console.log('auth-form render()')

    const { checkedKeys } = this.state 
    const { role } = this.props

    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <div>
        <Item label='角色名称' {...formItemLayout}>
          <Input value={role.name} disabled/>
        </Item>

        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    )
  }
}