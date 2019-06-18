import React, { Component } from 'react'
import {Card, Table, Button, Icon} from 'antd'


import {reqCategorys} from '../../api'
import LinkButton from '../../components/link-button'

/* 
Admin的分类管理子路由
*/
export default class Category extends Component {

  state = {
    parentId: '0', // 当前分类列表的parentId
    parentName: '', // 当前分类列表的父分类名称
    categorys: [], // 一级分类数组
    subCategorys: [], // 二级分类数组
    loading: false, // 是否显示loading界面
  }

  /* 
  获取一级或者二级列表显示
  */
  getCategorys = async () => {
    // 发请求前, 显示loading
    this.setState({ loading: true })
    const {parentId} = this.state
    const result = await reqCategorys(parentId)
    // 请求结束后, 隐藏loading
    this.setState({loading: false})
    if (result.status===0) {
      // 得到的分类数组可能是一级的, 也可能是二级的
      const categorys = result.data
      if (parentId==='0') {
        this.setState({
          categorys
        })
      } else {
        this.setState({
          subCategorys: categorys
        })
      }
      
    }
  }

  /* 
  显示指定分类的子分类列表
  */
  showSubCategorys = (category) => {

    /* 
    setState()是异步更新的状态数据, 在setState()的后面直接读取状态数据是旧的数据
    利用setState({}, callback): callback在状态数据更新且界面更新后执行
    */

    // 更新parentId为当前指定分类的id
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {
        // 获取对应的列表显示
        this.getCategorys()
    })

    
  }

  /* 
  初始化指定表格列的数组
  */
  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => {// 参数为当前行的数据
          return (
            <span>
              <LinkButton>修改分类</LinkButton>
              <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton>
            </span>
          )
        }
      },
    ];
  }


  /* 
    回退显示一级列表
  */
  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  componentWillMount () {
    this.initColumns()
  }

  componentDidMount () {
    // 获取一级分类列表显示
    this.getCategorys()
  }
  
  render() {

    // 读取状态数据
    const { categorys, subCategorys, loading, parentId, parentName} = this.state

    // 定义Card的左侧标题
    const title = parentId==='0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type="arrow-right"></Icon>&nbsp;&nbsp;
        <span>{parentName}</span>
      </span>
    )
    // 定义Card的右侧内容
    const extra = (
      <Button type="primary">
        <Icon type="plus"/>
        添加
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          columns={this.columns}
          dataSource={parentId==='0' ? categorys : subCategorys}
          pagination={{ defaultPageSize: 5, showQuickJumper: true}}
        />
      </Card>
    )
  }
}
