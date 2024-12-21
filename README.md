# ducafecat-vue-frontend-node-server

前端 `WWW` 服务器，适合前后端分离项目

让你快速部署前端项目

主要解决上线后，后端数据跨域问题 (ps:代理方式才是优雅的解决方案)

一旦分离后，前端独立维护项目文件，无需后端联合

前后端分离的好处这里就不多说了 x_x~~~

- [git地址](https://github.com/ducafecat/ducafecat-vue-frontend-node-server)

## 功能

- 前端服务展示
- 代理数据请求
- 守护进程管理
- 日志记录
- 启用gzip

## 目录说明

目录、文件 | 说明
----|-----------
/src                        | 源码目录
/src/config.js.example      | 配置文件 模板
/logs                       | 日志目录
/public                     | 前端文件目录
package.json                | node依赖文件
server.json                 | pm2配置

## 安装

- 1. 上传前端文件

目录 `/public` 
默认页面 `index.html`

- 2. 配置服务器

```
cp config.js.example config.js
vi config.js
```

- 3. 安装依赖包并运行

```
npm i
npm start
```

## 常用命令

命令 | 说明
----|-----------
npm start       | 开启服务
npm run show    | 显示状态
npm run restart | 重启服务
npm run list    | 服务列表
npm run stop    | 停止服务
npm run delete  | 删除服务

> 其它命令详见 `package.json -> scripts`

## 配置文档 `src\config.js`

- 第一次使用请修改文件名 `mv config.js.example config.js`

- `vi config.js`

配置项 | 说明
-----|----------
port              | 端口
staticPath        | 前端文件目录
defaultFile       | 默认启动文件
proxy             | 代理配置

- 样例

```js
module.exports = {
    port: 8080,
    staticPath: 'public',
    defaultFile: 'index.html',
    proxy: {
        target: 'http://api.yourserver.com',
        changeOrigin: true, // needed for virtual hosted sites 
        ws: true, // proxy websockets 
        pathRewrite: {
            '^/api/': '/'
        }
    }
}
```

> `proxy.target` 代理转发目标服务器
> `proxy.pathRewrite` 目标路径调整

## nginx（可选）

```js
    upstream yourserver {
            server 10.10.0.10:8080;
    }

    server {
            listen 80;
            server_name www.yourserver.com;

            location / {
                    proxy_pass http://yourserver;
                    index index.html index.htm;
            }
    }
```

## iptables（可选）

```
service iptables status
vi /etc/sysconfig/iptables

...
-A INPUT -p tcp -m tcp --dport 8080 -j ACCEPT
...
:wq

service iptables restart
```

## 参考

- http://www.expressjs.com.cn/4x/api.html
- http://pm2.keymetrics.io/docs/usage/quick-start/
