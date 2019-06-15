/*
包含n个接口请求函数的模块
根据接口文档编写
调用自定义ajax请求函数发请求
每个函数的返回值都是promise对象
*/
import ajax from "./ajax";
// const BASE = 'http://localhost:3001'
const BASE = ''

// 1. 登陆
/*
export function reqLogin(username, password) {
  return ajax(BASE + '/login', {username, password}, 'POST')
}
*/
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')


// 简单测试一下
reqLogin('admin', 'admin').then(result => {
  console.log('result', result)
})


