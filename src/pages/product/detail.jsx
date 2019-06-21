import React, { Component } from 'react'
import { List, Icon, Card } from 'antd'

import LinkButton from "../../components/link-button"
import { BASE_IMG_URL } from '../../utils/constants'
import { reqCategory } from '../../api'


/* 
商品的详情子路由组件
*/
export default class ProductDetail extends Component {
  state = {
    cName1: '', // 一级分类名称
    cName2: '', // 二级分类名称
  }

  async componentDidMount () {
    // 得到分类id
    const { pCategoryId, categoryId } = this.props.location.state
    // 一级分类下的商品
    if (pCategoryId === '0') {
      const result = await reqCategory(categoryId)
      const cName1 = result.data.name
      // 更新状态
      this.setState({
        cName1
      })
    } else { // 二级商品

      /* 
      用await发多个请求:
        第二个请求是在第一请求成功后才发送
      */
      // const result1 = await reqCategory(pCategoryId)
      // const result2 = await reqCategory(categoryId) 
      // const cName1 = result1.data.name
      // const cName2 = result2.data.name


      /* const p1 = reqCategory(pCategoryId)
      const p2 = reqCategory(categoryId)
      const result1 = await p1
      const result2 = await p2 */

      /* 
      使用Promise.all()一次发送多个请求
      只有当都成功了, 整体才成功, 并返回包含所有成功数据的数组
      */
      const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId) ])
      const cName1 = results[0].data.name
      const cName2 = results[1].data.name

      this.setState({
        cName1,
        cName2
      })
    }
  }

  render() {
    // 读取跳转时传递的state数据
    const { name, desc, price, imgs, detail} = this.props.location.state
    const { cName1, cName2 } = this.state

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left" style={{ fontSize: 20 }} />
        </LinkButton>
        &nbsp;&nbsp;商品详情
      </span>
    )

    return (
      <Card title={title} className="detail">
        <List>
          <List.Item>
            <span className="detail-left">商品名称:</span>
            <span>{name}</span>
          </List.Item>
          <List.Item>
            <span className="detail-left">商品描述:</span>
            <span>{desc}</span>
          </List.Item>
          <List.Item>
            <span className="detail-left">商品价格:</span>
            <span>{price}元</span>
          </List.Item>
          <List.Item>
            <span className="detail-left">所属分类:</span>
            <span>{cName1} --> {cName2}</span>
          </List.Item>
          <List.Item>
            <span className="detail-left">商品图片:</span>
            <span>
              {
                imgs.map(img => <img src={BASE_IMG_URL + img} alt="img" key={img} style={{width: 150, height: 150}}></img>)
              }
            </span>
          </List.Item>
          <List.Item>
            <span className="detail-left">商品详情:</span>
            <div dangerouslySetInnerHTML={{ __html: detail }}></div>
          </List.Item>
        </List>
      </Card>
    )
  }
}
