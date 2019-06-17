import store from 'store'

/* 
用来进行local数据存储的工具模块
*/

/* export default {
  saveUser (user) {

  },

  getUser () {
    return user对象
  }
} */

/* 
保存user
*/
export function saveUser(user) {
  // localStorage.setItem('USER-KEY', JSON.stringify(user))
  store.set('USER-KEY', user)
}

/* 
读取保存的user
*/
export function getUser() {
  // return JSON.parse(localStorage.getItem('USER-KEY') || '{}')
  return store.get('USER-KEY') || {}
}

/* 
删除保存的user
*/
export function removeUser() {
  store.remove('user')
}