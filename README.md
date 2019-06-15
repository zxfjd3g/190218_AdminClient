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

## 1. 高阶函数
    1). 是什么?
        返回值是函数
        参数是函数
    2). 常用的
        定时器: setTimeout()/setInterval()
        数组遍历相关方法: forEach()/map()/filter()/find()
        jQuery: $(function(){}), $.get(() => {})
        Promise: Promise构造/then()
        高阶组件
    3). 更加具有扩展/更动态/更强大

## 2. 高阶组件(HOC)
    1). 是什么?
       本质是一个函数。
       参数为组件，返回值为新组件
       const WrapperComponent = higherOrderComponent(Component);
    2). 大概实现
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
    3). 作用:
        较动态扩展组件的功能
