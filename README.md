# 留华桥 [brige-to-china]

<p align=center>
  <a href="#">
    <img src="./public/images/header-icon.png" alt="留华桥">
  </a>
</p>
<p  align=center>
基于Next.js开发的帮助各国留学生在中国留学的平台（开发中）
</p>
<p align="center">
<a target="_blank" href="https://github.com/stick-i/scblogs">
<br>
  <img src="https://img.shields.io/badge/React-18.2.0-blue" alt=""/>
  <img src="https://img.shields.io/badge/Next-latest-blue" alt=""/>
  <img src="https://img.shields.io/badge/Axios-1.2.2-blue" alt=""/>
  <img src="https://img.shields.io/badge/Antd-5.1.1-blue" alt=""/>
  <img src="https://img.shields.io/badge/Sass-1.57.1-blue" alt=""/>
  <img src="https://img.shields.io/badge/Redux-8.0.5-blue" alt=""/>
</a></p>


## 项目目录

```
├─.idea：IDEA配置文件
├─.vscode：VSCode配置文件
├─public：静态资源
│ ├─images：图片资源
│ └─favicon.ico：网站图标
├─src：代码入口
│  ├─api：接口
│  ├─components：组件
│  ├─constants：常量
│  ├─hooks：自定义hooks
│  ├─langueges：国际化
│  ├─page_components：页面组件
│  ├─pages：页面
│  ├─store: 全局状态管理
│  ├─styles: 样式
│  ├─utils: 工具函数
│  └─globalConfig.ts: 全局配置
├─.babelrc: babel配置
├─.env: 环境变量
├─.env.development: 开发环境变量
├─.env.production: 生产环境变量
├─.eslintignore: eslint忽略文件
├─.eslintrc.js: eslint配置
├─.gitignore: git忽略文件
├─.prettierrc.js: prettier配置
├─next.config.js: next配置
├─next-env.d.ts: next环境变量
├─package.json: 依赖
├─README.md: 项目说明
├─tsconfig.json: ts配置
└─yarn.lock: yarn依赖
```

## 项目运行

```bash 
yarn  # 安装依赖
yarn dev # 运行项目
yarn build # 打包项目
yarn start # 运行打包后的项目
```

## git规范
请看项目根目录下的[git规范](./git.md)

## 代码规范
请看项目根目录下的[代码规范](./代码规范.md)
