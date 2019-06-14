const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
  // 使用import的babel插件, 针对antd进行按需
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es', // scmascript
    // style: 'css', // 自动打包相关css文件
    style: true, // 加载less进行编译
  }),

  // 添加lessloader的配置
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' }, // 指定新的基本颜色
  }),
);