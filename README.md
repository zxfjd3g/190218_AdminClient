# day01
## 1. 项目开发准备
    1). 描述项目
    2). 技术选型 
    3). API接口/接口文档/测试接口
    
## 2. 启动项目开发
    1). 使用react脚手架创建项目: create-react-app app_name
    2). 开发环境运行: yarn start
    3). 生产环境打包运行: yarn run build   serve build

## 3. git管理项目
    1). 创建远程仓库
    2). 创建本地仓库
        a. 配置.gitignore
        b. git init
        c. git add .
        d. git commit -m "init"
    3). 将本地仓库推送到远程仓库
        git remote add origin url
        git push origin master
    4). 在本地创建dev分支, 并推送到远程
        git checkout -b dev
        git push origin dev
    5). 如果本地有修改
        git add .
        git commit -m "xxx"
        git push origin dev
    6). 新的同事: 克隆仓库
        git clone url
        git checkout -b dev origin/dev
        git pull origin dev
    7). 如果远程修改
        git pull origin dev
        
## 4. 创建项目的基本结构
    api: ajax请求的模块
    components: 非路由组件
    pages: 路由组件
    App.js: 应用的根组件
    index.js: 入口js
    
## 5 引入antd
    下载antd的包
    按需打包: 只打包import引入组件的js/css
        下载工具包
        config-overrides.js
        package.json
    自定义主题
        下载工具包
        config-overrides.js
    使用antd的组件
        根据antd的文档编写
        
## 6. 引入路由
    下载包: react-router-dom
    拆分应用路由:
      Login: 登陆
      Admin: 后台管理界面
    注册路由:
      <BrowserRouter>
      <Switch>
      <Route path='' component={}/>
      
## 7. Login的静态组件
    1). 自定义了一部分样式布局
    2). 使用antd的组件实现登陆表单界面
      Form  / Form.Item
      Input
      Icon
      Button


# day02
## 1. 收集表单数据和表单的前台验证
    1). form对象
        如何让包含<Form>的组件得到form对象?  WrapLoginForm = Form.create()(LoginForm)
        WrapLoginForm是LoginForm的父组件, 它给LoginForm传入form属性
        用到了高阶函数和高阶组件的技术
    2). 操作表单数据
        form.getFieldDecorator('标识名称', {initialValue: 初始值, rules: []})(<Input/>)包装表单项组件标签
        form.getFieldsValue(): 得到包含所有输入数据的对象
        form.getFieldValue(id): 根据标识得到对应字段输入的数据
    
    3). 前台表单验证
        a. 声明式实时表单验证:
            form.getFieldDecorator('标识名称', {rules: [{min: 4, message: '错误提示信息'}]})(<Input/>)
        b. 自定义表单验证
            form.getFieldDecorator('标识名称', {rules: [{validator: this.validatePwd}]})(<Input/>)
            validatePwd = (rule, value, callback) => {
              if(有问题) callback('错误提示信息') else callack()
            } 
        c. 点击提示时统一验证
            form.validateFields((error, values) => {
              if(!error) {通过了验证, 发送ajax请求}
            })
            
## 2. 高阶函数与高阶组件
    1. 高阶函数
1). 一类特别的函数
    a. 接受函数类型的参数
    b. 返回值是函数
2). 常见
    a. 定时器: setTimeout()/setInterval()
    b. Promise: Promise(() => {}) then(value => {}, reason => {})
    c. 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
    d. 函数对象的bind()
    e. Form.create()() / getFieldDecorator()()
3). 高阶函数更新动态, 更加具有扩展性
    
    2. 高阶组件
        1). 本质就是一个函数
        2). 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
        3). 常见的高阶组件
            react-router-dom库: withRouter(非路由组件)
            antd组件库: Form.create()(Form组件)
            react-reudx库: connect()(UI组件)
        4). 大概实现
            function higherOrderComponent(Component) {
                const form = {
                    validateFields () {},
                    getFieldValue () {},
                    getFieldDecorator () {},
                }
                return class WrapperComp extends React.Component {
                    render () {
                        // 包装组件内部返回被包装组件的标签
                        // 负责向被包装传递特定的标签属性, 来扩展它的功能
                        return <Component form={form}></Component>
                    }
                }
            }
        5). 作用: 扩展组件的功能
        
    3. 高阶组件与高阶函数的关系
        高阶组件是特别的高阶函数: 接收一个组件函数, 返回是一个新的组件函数
        
## 3. 后台应用
    启动后台应用: mongodb服务必须启动
    使用postman测试接口(根据接口文档):
        访问测试: post请求的参数在body中设置
        保存测试接口
        导出/导入所有测试接口
        
## 4. 编写ajax代码
    1). ajax请求函数模块: api/ajax.js
        封装axios + Promise
        函数的返回值是promise对象  ===> 后面用上async/await
        自己创建Promise
          1. 内部统一处理请求异常: 外部的调用都不用使用try..catch来处理请求异常
          2. 异步返回是响应数据(而不是响应对象): 外部的调用异步得到的就直接是数据了(response --> response.data)
    2). 接口请求函数模块: api/index.js
        根据接口文档编写(一定要具备这个能力)
        接口请求函数: 使用ajax(), 返回值promise对象
    3). 解决ajax跨域请求问题(开发时)
        办法: 配置代理  ==> 只能解决开发环境
        编码: package.json: proxy: "http://localhost:5000"
    4). 对代理(服务器)的理解
        1). 是什么?
            具有特定功能的程序
        2). 运行在哪?
            运行前台应用的服务器中
            只能在开发时使用
        3). 作用?
            解决开发时的ajax请求跨域问题
            a. 监视并拦截请求(3000)
            b. 转发请求(5000)
        4). react项目中
            开发环境: webpack-dev-server ==> http-proxy-middleware
            配置: proxy: "http://localhost:3000"
    5). async和await
        a. 作用?
           简化promise对象的使用: 不用再使用then()来指定成功/失败的回调函数
           以同步编码(没有回调函数了)方式实现异步流程
        b. 哪里写await?
            在返回promise的表达式左侧写await: 不想要promise, 想要promise异步执行的成功的value数据
        c. 哪里写async?
            await所在函数(最近的)定义的左侧写async

# day03
## 1. 实现登陆(包含自动登陆)
    小功能点实现:
        1. 登陆成功后, 跳转到admin界面, 显示登陆的用户名 
        2. 访问admin界面, 如果没有登陆, 自动跳转到登陆界面
        3. 在刷新时, 如果已经登陆, 保持登陆
        4. 自动/免登陆
        5. 访问login界面, 如果已经登陆, 自动跳转到admin
    login.jsx
        1). 调用登陆的接口请求
        2). 如果失败, 显示错误提示信息
        3). 如果成功了:
            保存user到local/内存中
            跳转到admin
        4). 如果内存中的user有值, 自动跳转到admin
    src/index.js
        读取local中user到内存中保存
    admin.jsx
        判断如果内存中没有user(_id没有值), 自动跳转到login
    storageUtils.js
        包含使用localStorage来保存user相关操作的工具模块
        使用第三库store
            简化编码
            兼容不同的浏览器
    memoryUtils.js
        用来在内存中保存数据(user)的工具类

    路由跳转方式
        1. 通过点击路由链接  ===> 声明式路由跳转
            <Link to="/xxx"> Xxx</Link>
        2. 在点击回调函数中执行:  ===> 编程式路由跳转
            this.props.history.push/replace('/xxx')
        3. 在render()中自动跳转路由
            return <Redirect to="/xxx">
        
## 4. 搭建admin的整体界面结构
    1). 整体布局使用antd的Layout组件
    2). 拆分组件
        LeftNav: 左侧导航
        Header: 右侧头部
    3). 子路由
        定义路由组件
        注册路由
        
## 3. LeftNav组件
    1). 使用antd的组件
        Menu / Item / SubMenu
    
    2). 使用react-router
        withRouter(): 包装非路由组件, 给其传入history/location/match属性
        history: push()/replace()/goBack()
        location: pathname属性
        match: params属性
    
    3). componentWillMount与componentDidMount的比较
        componentWillMount: 在第一次render()前调用一次, 为第一次render()准备数据(同步)
        componentDidMount: 在第一次render()之后调用一次, 启动异步任务, 后面异步更新状态重新render
    
    4). 根据动态生成Item和SubMenu的数组
        map() + 递归: 多级菜单列表
        reduce() + 递归: 多级菜单列表
    
    5). 2个问题?
        刷新时, 如何选中对应的菜单项?
            selectedKey是当前请求的path
        刷新时, 如何默认展开对应的Submenu?
            openKey是 一级列表项的某个子菜单项是当前对应的菜单项


## 4. 快捷键
    删除一行: ctrl + D
    单行注释: ctrl + /
    多行注释: ctrl + shift + /
    显示所有命令: ctrl + 1
    查找要打开的文件: ctrl + E

# day04
## 1. Header组件
    1). 界面静态布局
        三角形效果
    2). 获取登陆用户的名称显示
        MemoryUtils
    3). 当前时间
        循环定时器, 每隔1s更新当前时间状态
        格式化指定时间: dateUtils
    4). 天气预报
        使用jsonp库发jsonp请求百度天气预报接口
        对jsonp请求的理解
    5). 当前导航项的标题
        得到当前请求的路由path: withRouter()包装非路由组件
        根据path在menuList中遍历查找对应的item的title
    6). 退出登陆
        Modal组件显示提示
        清除保存的user
        跳转到login
    7). 抽取通用的类链接按钮组件
        通过...透传所有接收的属性: <Button {...props} />    <LinkButton>xxxx</LinkButton>
        组件标签的所有子节点都会成为组件的children属性
        
## 2. jsonp解决ajax跨域的原理
    1). jsonp只能解决GET类型的ajax请求跨域问题
    2). jsonp请求不是ajax请求, 而是一般的get请求
    3). 基本原理
        浏览器端:
            动态生成<script>来请求后台接口(src就是接口的url)
            定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
        服务器端:
            接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
        浏览器端:
            收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据

## 3. 