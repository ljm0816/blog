---
title: hexo 搭建个人博客
date: 2020-03-13 13:57:39
tags: [hexo,github]
thumbnail: /blog/images/china-great-wall.jpg
---
hexo搭建个人博客，并部署到github pages; 前提条件：1、在本地安装node环境，2、需要注册github账号

## hexo安装

```
$ npm install -g hexo-cli
```
嫌npm慢的可以更换成cnpm；安装完后 输入hexo -v 命令，可检查hexo是否安装成功


## 在本地创建博客

```
$ hexo init  ##初始化
$ npm install  ##安装依赖包
$ hexo g  ##生成（generate）网页
$ hexo s ##将生成的网页放在了本地服务器（server）
```
启动服务器后在浏览器打开http://localhost:4000， 本地博客创建完毕


## 创建第一个博客文章

```
hexo new "你的文件名称"
```
执行上面的命令后，在文件夹source -> _posts中可以看到你创建的文件(你也可以手动创建),打开文件编辑内容


## Hexo的配置与部署（部署到github pages）

### 安装hexo-deployer-git
```
$ npm install hexo-deployer-git --save
```

### 修改_config.yml文件

```
deploy:
  type: git
  repo: git@github.com:paowx/blog.git
  branch: master
  massage: 
```
repo的值是你在github上创建的对应项目的ssh，我这里就是blog


## 发布到github上

```
$ hexo clean ##清楚
$ hexo g  ##打包      
$ hexo d  ##发布
```
出现 **INFO  Deploy done: git**表示发布成功


## 生成github pages链接

打开你的blog项目, 找到Settings 下的 GitHub Pages，将Source设置为master branch后会自动刷新页面，等页面刷新完后就可以看到博客的链接了，点击打开即可


## 更换主题
可以在这里选择你喜欢的主题风格[https://hexo.io/themes/](https://hexo.io/themes/)，这里我选的是hueman主题
点击主题名称进入github,你可以直接下载压缩包，也可以用git命令下载
```
$ git clone https://github.com/ppoffice/hexo-theme-hueman themes/hueman
```

下载完后修改_config.yml文件中的theme为：
theme: hueman


## 可能遇到的问题

### 1、hexo发布后，发现博客主页打不开，出现404页面
这是因为你执行hexo d命令发布是把打包的public文件推到了github上，而打包后的public文件中没有README.md，需要手动补上README.md文件才能访问。

### 2、打开hexo博客首页，发现样式加载不成功,如图：
![error](/blog/images/hexo-error.png)

修改_config.yml文件中的root为：
root: /blog/

### 3、更换主题后，打包发布失败
检查主题包中是否有_config.yml文件，如果有_config.yml.example文件没有_config.yml，将_config.yml.example重命名为_config.yml即可

