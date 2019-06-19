import React, { Component } from 'react'
import { List, Icon, Card } from 'antd'

import LinkButton from "../../components/link-button"

/* 
商品的详情子路由组件
*/
export default class ProductDetail extends Component {
  render() {

    const title = (
      <span>
        <LinkButton>
          <Icon type="arrow-left" style={{ fontSize: 20 }} />
        </LinkButton>
        &nbsp;&nbsp;商品详情
      </span>
    )

    return (
      <Card title={title}>
        <List>
          <List.Item>
            <span>商品名称:</span>
            <span>xxx</span>
          </List.Item>
          <List.Item>
            <span>商品描述:</span>
            <span>yyy</span>
          </List.Item>
          <List.Item>
            <span>商品价格:</span>
            <span>100元</span>
          </List.Item>
          <List.Item>
            <span>所属分类:</span>
            <span>图书 --> 你不知道的JS</span>
          </List.Item>
          <List.Item>
            <span>商品图片:</span>
            <span>
              图片列表
            </span>
          </List.Item>
          <List.Item>
            <span>商品详情:</span>
            <div>网页界面</div>
          </List.Item>
        </List>
      </Card>
    )
  }
}
