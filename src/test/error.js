/* 
目标: 进一步理解JS中的错误(异常)和错误处理
mdn文档: https: //developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error

1. 错误的类型
  Error: 所有错误的父类型
  ReferenceError: 引用的变量不存在
  TypeError: 数据类型不正确的错误
  RangeError: 数据值不在其所允许的范围内
  SyntaxError: 语法错误
2. 错误处理
  捕获错误: try ... catch
  抛出错误: throw error
3. 错误对象
  message属性: 错误相关信息
  stack属性: 函数调用栈记录信息

*/
/* 1. 常见的异常错误 */
// 1. ReferenceError: a1 is not defined
// console.log(a1)

// 2. TypeError: Cannot read property 'xxx' of null
// let a2 = null
// console.log(a2.xxx())

// 2. TypeError: a3.xxx is not a function
// let a3 = 'abc'
// a3.xxx()

// 3. RangeError: Maximum call stack size exceeded

/* function fn() {
  fn()
}
fn() */

// 4. SyntaxError: Unexpected string
// const a = """"  // 注意在浏览器中直接测试


/* 2. 错误处理 */

// 捕获错误: try ... catch
/* try {
  let a2 = null
  debugger
  console.log(a2.xxx())
} catch (error) {
  console.log('出错了', error.message)
  console.log(error.stack)
}
console.log('catch()之后') */


 // 抛出错误: throw error
 
function fn() {
  if (Date.now()%2===0) {
    throw new Error('不能在时间是偶数时处理')
  } else {
    console.log('处理任务')
  }
}

fn()
try {
  fn()
} catch (error) {
  console.log('捕获到异常:', error.message)
}





