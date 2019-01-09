## musik
## 构建

#### webpack+cortex+es6+less

```sh
cd /path/of/your/project

//手动构建
webpack

//自动构建
webpack --watch
```


## 运行调试

通过`webpack-dev-server`开启本地web server服务器，支持自动构建，支持热部署Hot Module Replacement (HMR)，即每次修改完代码`webpack-dev-server`会自动build并让浏览器自动载入被修改过的模块，开发者无需手动刷新浏览器。


#### webpack+cortex+es6+less
```sh
npm start
```
项目初始化完毕后会自动运行上面的命令开启调试模式
