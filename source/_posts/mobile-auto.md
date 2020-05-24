---
title: 移动端 适配
date: 2020-03-14 21:46:50
tags: [web, mobile]
thumbnail: /blog/images/mobile.jpeg
---

**demo : https://github.com/HuJiaoHJ/h5-layout

## vw + rem 方案
- 1、设置 html font-size 为 10vw
```
html {
    font-size: 10vw;
}
```
- 2、以750UI图为例，在 css 中，直接使用UI图上的长度值，单位设置为 px
```
.head {
    width: 750px;
}
```
- 3、引入 postcss-pxtorem 插件，配置如下：
  - https://github.com/HuJiaoHJ/h5-layout/blob/master/.postcssrc.js
```
require('postcss-pxtorem')({
    rootValue: 75,
    unitPrecision: 5,
    propList: ['*'],
    selectorBlackList: [],
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
})
```
- 4、如果屏幕宽度超过最大或最小限制的话。则将html 标签的 font-size设置为固定值
```
@media screen and (min-width: 750px) {
  html{
    font-size: 40Px;
  }
  body{
    max-width: 750Px;
  }
}
```
上面的Px是故意为之，避免postcss-pxtorem插件将其传唤为rem

以上，就可以使用了 vw + rem 方案实现了移动端适配

## 1px border 问题
- 再谈Retina下1px的解决方案： https://www.w3cplus.com/css/fix-1px-for-retina.html

```
<script>
(function () {
    // 1px
    var dpr = window.devicePixelRatio;
    var isIPhone = window.navigator.appVersion.match(/iphone/gi);
    var UA = window.navigator.userAgent;
    var hacks = ['m1 note']; // 对 meizu 某型号进行hack，主要原因是 dpr为3，但是手机屏幕分辨率不够，会出现 1px border 过细的问题，这种问题主要出现在部分魅族手机上
    var flag = false;
    hacks.forEach(function (item) {
        if (UA.indexOf(item) >= 0) {
            flag = true;
            return;
        }
    });
    if (!isIPhone && flag) {
        dpr = dpr >= 2 ? 2 : dpr;
    }
    var scale = 1 / dpr;
    var metaEl = document.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no, viewport-fit=cover');
    if (document.documentElement.firstElementChild) {
        document.documentElement.firstElementChild.appendChild(metaEl);
    } else {
        var wrap = document.createElement('div');
        wrap.appendChild(metaEl);
        document.write(wrap.innerHTML);
    }
})();
</script>
```

## 参考
- https://github.com/fairyly/front-end-summary

