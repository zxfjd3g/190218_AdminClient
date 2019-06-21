import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal, message } from 'antd'
import {reqDeleteImg} from '../../api'
import {BASE_IMG_URL} from '../../utils/constants'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {

  static propTypes = {
    imgs: PropTypes.array
  }
  
  state = {
    previewVisible: false, // 是否显示大图
    previewImage: '', // 大图的地址
    fileList: [ // 所有已上传图片信息对象的数组
      /* {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }, */
    ],
  }



  /* 
  返回所有已上传图片文件名的数组
  */
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  // 关闭大图预览
  handleCancel = () => this.setState({ previewVisible: false });

  /* 
  打开大图预览
  */
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  /* 
  文件对象的状态发生改变时回调函数
  */
  handleChange = async ({ file, fileList }) => {
    console.log('handleChange', file.status, file===fileList[fileList.length-1])
    if (file.status==='done') {
      // 得到图片文件名/url
      const result = file.response
      if (result.status===0) {
        const name = result.data.name
        const url = result.data.url
        // 不能直接更新file, 而需要更新fileList中的最后一个file
        fileList[fileList.length - 1].name = name
        fileList[fileList.length - 1].url = url
      } else {
        message.error('上传图片失败')
      }
    } else if (file.status==='removed') { // 删除图片
      const result = await reqDeleteImg(file.name)
      if (result.status===0) {
        message.success('删除图片成功')
      } else {
        message.error('删除图片失败')
      }
    }

    // 更新fileList状态数据
    this.setState({ fileList })
  }

  componentWillMount () {
    // 如果传入了imgs, 更新fileList为imgs对应的值
    const {imgs} = this.props
    if (imgs && imgs.length>0) {
      const fileList = imgs.map((img, index) => ({
        uid: -index + '',
        name: img,
        url: BASE_IMG_URL + img,
        status: 'done'
      }))
      this.setState({
        fileList
      })
    }
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    
    return (
      <div>
        <Upload
          action="/manage/img/upload"  /* 上传地址 */
          listType="picture-card"
          fileList={fileList}  // 已经上传的文件列表
          name="image" // 请求参数名为: image
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
