import React from 'react'
import "./index.less";

/* 
通用的看似链接的一个button组件
props: 包含所有标签属性的对象
一个组件会接收到一个特别的属性: children, 值为标签体, 如果是空标签, 就没有children
  1). 字符串
  2). 标签对象
  3). 标签对象的数组
*/
export default function LinkButton(props) {
  return <button className="link-button" {...props}/>
}