import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table
} from 'antd'
import LinkButton from '../../components/link-button'
import { reqProducts } from '../../api'
import { PAGE_SIZE } from '../../utils/constants' 

const { Option } = Select

/* 
商品的首页子路由组件
*/
export default class ProductHome extends Component {

  state = {
    loading: false, // 是否显示请求中的loading
    products: [], // 当前页的商品数组
    total: 0, // 所有商品的总个数
  }

  /* 
  初始化table的所有列信息的数组
  */
 initColumns = () => {
   this.columns = [
     {
       title: '商品名称',
       dataIndex: 'name',
     },
     {
       title: '商品描述',
       dataIndex: 'desc',
     },
     {
       title: '价格',
       dataIndex: 'price',
       render: (price) => '¥' + price
     },
     {
       title: '状态',
       dataIndex: 'status',
       render: (status) => (
        <span>
          <Button type="primary">下架</Button>
          <span>在售</span>
        </span>
       )
     },
     {
       title: '操作',
       render: (product) => (
        <span>
          <LinkButton>详情</LinkButton>
          <LinkButton>修改</LinkButton>
        </span>
       )
     },
   ]
 }

 /* 
 获取指定页码的商品列表数据
 */
  getProducts = async (pageNum) => {
    this.setState({ loading: true })
    const result = await reqProducts({ pageNum, pageSize: PAGE_SIZE})
    this.setState({ loading: false })
    if (result.status===0) {
      const {total, list} = result.data
      // 更新状态
      this.setState({
        total,
        products: list
      })
    }
  }

  componentWillMount () {
    this.initColumns()
  }

  componentDidMount () {
    this.getProducts(1)
  }

  render() {

    const { loading, products, total } = this.state

    const title = (
      <span>
        <Select value="1" style={{ width: 150 }}>
          <Option value="1">按名称搜索</Option>
          <Option value="2">按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" style={{margin: '0 15px', width: 150}}></Input>
        <Button type="primary">搜索</Button>
      </span>
    )

    const extra = (
      <Button type="primary">
        <Icon type="plus" />
        添加商品
      </Button>
    )


    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          columns={this.columns}
          dataSource={products}
          pagination={{ 
            defaultPageSize: PAGE_SIZE, 
            showQuickJumper: true, 
            total,
            // 监视页码改变的监听
            // onChange: (pageNum) => {this.getProducts(pageNum)}
            onChange: this.getProducts
          }}
        />
      </Card>
    )
  }
}
