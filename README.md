# HHK00000.github.io
HHK的个人主页

## 配置目录
/docs/.vitepress/config.js

## 文档目录
/docs/document/  下面所有md文件

## 编译
npm run build

## 本地开发
npm run dev

## 替换静态资源路径
node repleace.js 替换html中的静态资源路径  -- 部署是不需要执行此命令

## 发布
node publish.js 把编译文件拷贝到根目录

## 部署到服务器的流程
1.修改 /docs/document 下的markdown文件（尽量不要用中文命名.md文件）
2.修改 /docs/.vitepress/config.js 配置markdown文件 与 生成后的html文件的对应关系，html文件可以使用中文
3.执行node publish.js 把编译文件拷贝到根目录
4.提交代码
5.在服务器上git pull 拉取最新代码
6.在服务器 /blog目录下（代码库的上一层目录），执行 sh copy.sh 把文件拷贝到blog根目录
7.在页面中输入 http://hanhuankang.com/blog/ 刷新查看页面