import React, { Component } from 'react'
import {
  Card,
  Icon,
  Form,
  Input,
  Button,
  Cascader,
} from 'antd'

import LinkButton from '../../components/link-button'

import { reqCategorys } from '../../api'

const { Item } = Form
const { TextArea } = Input

/* 
商品的添加/修改子路由组件
*/
class ProductAddUpdate extends Component {

   state = {
     options: []
  }
  
  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('验证通过', values);
      }
    })
  }

  /* 
  对价格进行验证
  */
  validatePrice = (rule, value, callback) => {
    console.log('validatePrice', value, typeof value)
    if (value < 0) {
      callback('价格不能小于0')
    } else {
      callback()
    }
  }

  /* 
  选择某个一级项的回调
  请求获取对应的二级列表并显示
  */
  loadData = async selectedOptions => {
    console.log('loadData()', selectedOptions)
    // 得到选中的一级项的数据对象
    const targetOption = selectedOptions[0]  // {value, label, isLeaf}
    // 显示Loading效果
    targetOption.loading = true

    // 异步获取二级的分类列表数据
    const pCategoryId = targetOption.value
    const subCategorys = await this.getCategorys(pCategoryId)
    // 隐藏Loading
    targetOption.loading = false
    if (!subCategorys || subCategorys.length===0) { // 没有二级分类
      targetOption.isLeaf = true
    } else {
      // 给option对象添加children, 就会自动显示为二级列表
      targetOption.children = subCategorys.map(c => ({
        label: c.name,
        value: c._id,
        isLeaf: true
      }))
    }

    // 更新options列表数据
    this.setState({
      options: [...this.state.options],
    })

    /* setTimeout(() => {
      // 隐藏Loading
      targetOption.loading = false;
      // 给option对象添加children, 就会自动显示为二级列表
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ]

      // 更新options列表数据
      this.setState({
        options: [...this.state.options],
      });
    }, 1000); */
  }

  /* 
  根据分类的数组更新options显示
  */
  initOptions = (categorys) => {

    // option={value, label, isLeaf}
    const options = categorys.map(c => ({
      label: c.name,
      value: c._id,
      isLeaf: false
    }))

    // 更新options状态
    this.setState({
      options
    })
  }


  /* 
  获取一级/二级分类列表显示
  */
  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)
    if (result.status===0) {
      const categorys = result.data
      if (parentId==='0') { // 获取的一级分类列表
        this.initOptions(categorys)
      } else { // 获取的二级分类列表
        return categorys // 返回值作为async函数返回的promise对象的成功的value
      }
    }
  }


  componentDidMount () {
    // 获取一级分类列表显示
    this.getCategorys("0")
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' style={{ fontSize: 20 }} />
        </LinkButton>
        添加商品
      </span>
    )

    // 指定form的item布局的对象
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    }

    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label="商品名称">
            {
              getFieldDecorator('name', {
                initialValue: '',
                rules: [
                  { required: true, message: '商品名称必须输入' }
                ]
              })(
                <Input placeholder='请输入商品名称' />
              )
            }
          </Item>
          <Item label="商品描述">
            {
              getFieldDecorator('desc', {
                initialValue: '',
                rules: [
                  { required: true, message: '商品描述必须输入' }
                ]
              })(
                <TextArea placeholder="请输入商品描述" autosize />
              )
            }
          </Item>

          <Item label="商品价格">
            {
              getFieldDecorator('price', {
                initialValue: '',
                rules: [
                  { required: true, message: '商品价格必须输入' },
                  { validator: this.validatePrice}
                ]
              })(
                <Input type='number' placeholder='请输入商品价格' addonAfter="元"/>
              )
            }
          </Item>
          <Item label="商品分类">
            <Cascader
              options={this.state.options}
              loadData={this.loadData}
            />
          </Item>
          <Item label="商品图片">
            <span>商品图片列表</span>
          </Item>
          <Item
            label="商品详情"
          >
            <span>商品详情信</span>
          </Item>
          <Button type='primary' onClick={this.submit}>提交</Button>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)