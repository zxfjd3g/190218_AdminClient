import React, { Component } from 'react'
import {
  Card,
  Icon,
  Form,
  Input,
  Button,
  Cascader,
  message
} from 'antd'

import LinkButton from '../../components/link-button'
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'

import { reqCategorys, reqAddOrUpdateProduct } from '../../api'

const { Item } = Form
const { TextArea } = Input

/* 
商品的添加/修改子路由组件
*/
class ProductAddUpdate extends Component {

   state = {
     options: []
  }

  constructor(props) {
    super(props);
    // 创建一个ref对象容器
    this.pwRef = React.createRef()
    this.editorRef = React.createRef()
  }
  
  submit = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // 1. 根据输入, 准备一个product对象
        const { name, desc, price, categoryIds } = values
        let categoryId, pCategoryId
        if (categoryIds.length==1) {
          pCategoryId = '0'
          categoryId = categoryIds[0]
        } else {
          pCategoryId = categoryIds[0]
          categoryId = categoryIds[1]
        }
        // 读取所有上传图片文件名数组
        const imgs = this.pwRef.current.getImgs()
        // 读取富文本内容(html格式字符串)
        const detail = this.editorRef.current.getDetail()
        console.log('验证通过', values, imgs, detail)

        const product = {
          name,
          desc,
          price,
          categoryId,
          pCategoryId,
          imgs,
          detail
        }
        // 如果是更新, 需要指定_id属性
        if (this.isUpdate) {
          product._id = this.product._id
        }

        // 2. 发送添加/更新的请求
        const result = await reqAddOrUpdateProduct(product)

        // 3. 根据结果, 进行响应
        if (result.status===0) {
          message.success((this.isUpdate ? '更新' : '添加') + '商品成功')
          this.props.history.goBack()
        }

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
  initOptions = async (categorys) => {

    // option={value, label, isLeaf}
    const options = categorys.map(c => ({
      label: c.name,
      value: c._id,
      isLeaf: false
    }))

    // 如果当前是更新二级分类的商品, 需要, 获取对应的二级分类列表显示
    const { product, isUpdate } = this
    if (isUpdate && product.pCategoryId!=='0') {
      const subCategorys = await this.getCategorys(product.pCategoryId)
      if (subCategorys && subCategorys.length>0) {
        // options中找到当前商品对应的option
        const targetOption = options.find(option => option.value===product.pCategoryId)
        // 给option添加children来确定二级列表
        targetOption.children = subCategorys.map(c => ({
          label: c.name,
          value: c._id,
          isLeaf: true
        }))
      }
    }

    

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

  componentWillMount () {
    // 保存商品对象
    this.product = this.props.location.state || {}
    // 保存是否是更新的标识
    this.isUpdate = !!this.product._id
  }


  componentDidMount () {
    // 获取一级分类列表显示
    this.getCategorys("0")
  }

  render() {
    const { getFieldDecorator } = this.props.form

    // 读取指定的product
    const { product, isUpdate} = this
    if (product._id) { // 修改
      if (product.pCategoryId==='0') {
        product.categoryIds = [product.categoryId]
      } else {
        product.categoryIds = [product.pCategoryId, product.categoryId]
      }
    } else { // 添加
      product.categoryIds = []
    }

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' style={{ fontSize: 20 }} />
        </LinkButton>
        {isUpdate ? '更新商品' : '添加商品'}
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
                initialValue: product.name,
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
                initialValue: product.desc,
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
                initialValue: product.price,
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
            {
              getFieldDecorator('categoryIds', {
                initialValue: product.categoryIds,
                rules: [
                  { required: true, message: '商品分类必须指定' },
                ]
              })(
                <Cascader
                  options={this.state.options}
                  loadData={this.loadData}
                />
              )
            }
            
          </Item>
          <Item label="商品图片">
            <PicturesWall ref={this.pwRef} imgs={product.imgs}/>
          </Item>
          <Item
            label="商品详情"
            wrapperCol={{ span: 18 }}
        >
            <RichTextEditor ref={this.editorRef} detail={product.detail}/>
          </Item>
          <Button type='primary' onClick={this.submit}>提交</Button>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)


/* 
1. 子组件调用父组件的方法?  父组件通过标签属性将方法传递给子组件, 子组件就可以调用
2. 父组件调用子组件的方法?  在父组件中通过ref得到子组件对象, 进而调用其方法

*/