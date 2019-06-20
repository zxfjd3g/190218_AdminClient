/* 
1. async 函数
  函数的返回值为promise对象
  返回promise对象的结果由async函数执行的返回值决定
2. await 表达式
  await右侧的表达式一般为promise对象, 但也可以是其它的值
  如果表达式是promise对象, await返回的是promise成功的值
  如果表达式是其它值, 直接将此值作为await的返回值
3. 注意: 
  await必须写在async函数中, 但async函数中可以没有await
  如果await的promise失败了, 就会抛出异常, 需要通过try...catch来捕获处理
*/

function fn1() {
  return Promise.resolve(1)
}
function fn2() {
  return 2
}

function fn3() {
  // return fn3.test() // 程序运行会抛出异常
  return Promise.reject(3)
}

async function fn4() {
  return 4
}

async function fn() {
  // const result = await fn1()
  const result = await fn3()
  console.log('result: ', result)
  return result+10
}

async function test() {
  try {
    const result2 = await fn()
    console.log('result2', result2)
  } catch (error) {
    console.log('error', error)
  }

  const result4 = await fn4()
  console.log('result4', result4)
  
}

test()

