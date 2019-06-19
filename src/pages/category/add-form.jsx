import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Select} from 'antd'


/* 
用于添加分类的form组件
*/
class AddForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired,
    categorys: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired,
  }

  componentWillMount () {
    // 将form交给父组件(Category)保存
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const {categorys, parentId} = this.props
    return (
      <Form>

        <Form.Item>
          {
            getFieldDecorator('parentId', {
              initialValue: parentId,
              rules: [
                { required: true, message: '分类名称必须指定' }
              ]
            })(
              <Select>
                <Select.Option value="0">一级分类</Select.Option>
                {
                  categorys.map((c, index)=> <Select.Option key={index} value={c._id}>{c.name}</Select.Option>)
                }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: '',
              rules: [
                {required: true, message: '分类名称必须指定'}
              ]
            })(
              <Input placeholder="请输入分类名称" />
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)
