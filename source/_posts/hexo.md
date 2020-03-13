---
title: hexo 搭建个人博客
date: 2020-03-13 13:57:39
tags: [hexo,github]
thumbnail: images/china-great-wall.jpg
---
hexo搭建个人博客，并部署到github pages; 前提条件：1、在本地安装node环境，2、需要注册github账号

## hexo安装

```
$ npm install -g hexo-cli
```
嫌npm慢的可以更换成cnpm；安装完后 输入hexo -v 命令，可检查hexo是否安装成功

## 一、在本地创建博客

```
$ hexo init  ##初始化
$ npm install  ##安装依赖包
$ hexo g  ##生成（generate）网页
$ hexo s ##将生成的网页放在了本地服务器（server）
```
启动服务器后在浏览器打开http://localhost:4000， 本地博客创建完毕


## 二、Hexo的配置与部署（部署到github pages）

### 安装hexo-deployer-git
```
$ npm install hexo-deployer-git --save
```


### 修改_config.yml文件

```
deploy:
  type: git
  repo: git@github.com:ljm0816/blog.git
  branch: master
  massage: 
```
repo的值是你在github上创建的对应项目的ssh，我这里就是blog


### 三、发布到github上
```
$ hexo clean ##清楚
$ hexo g  ##打包      
$ hexo d  ##发布
```
出现 **INFO  Deploy done: git**表示发布成功