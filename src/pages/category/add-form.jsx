import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option

/*
添加分类的Form组件
 */
class AddForm extends Component {

  static propTypes = {
    categorys: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {

    const { getFieldDecorator } = this.props.form
    const { categorys, parentId } = this.props
    return (
      <Form>
        <Item label='所属分类'>
          {
            getFieldDecorator('parentId', {
              initialValue: parentId
            })(
              <Select>
                <Option key='0' value='0'>一级分类</Option>
                {
                  categorys.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
                }
              </Select>
            )
          }
        </Item>

        <Item label='分类名称'>
          {
            getFieldDecorator('categoryName', {
              initialValue: ''
            })(
              <Input placeholder='请输入分类名称' />
            )
          }
        </Item>
      </Form>
    )
  }
}

export default AddForm = Form.create()(AddForm)
