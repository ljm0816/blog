---
title: vue 路由拦截
date: 2020-03-16 18:11:54
tags: [vue,router]
thumbnail: /blog/images/vue.png
---

我们在开发项目的时候，有些页面是需要登录后才能访问的，这时就需要用到路由拦截, 在路由钩子的beforeEach方法中处理

### 在路由中增加一个meta字段
```
{
  path: '/luckDraw',
  name: 'luckDraw',
  component: luckDraw,
  meta: { title: '抽奖活动', keepLive: false, requireauth: true }
}
```

### 在beforeEach中处理
```
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'vue scaffold'
  console.log(to)
  // 路由拦截
  let token = localStorage.getItem('token')
  if (to.meta.requireauth && !token) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})
```


