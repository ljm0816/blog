---
title: nuxt.js中实现微信分享功能
date: 2020-03-20 10:45:20
tags: [nuxt, 微信]
thumbnail: /blog/images/nuxt.jpeg
---

在plugins中新建wx-share.js文件，代码如下：
```
import Vue from 'vue'
import wx from 'weixin-js-sdk'
import API from '@/common/api.js'
import { httpGet } from '@/common/http.js'
const wechatShare = {
  install(Vue) {
    /**
     * 分享
     */
    Vue.prototype.wxShare = function(shareData = {}, wxSignUrl) {
      // 授权签名
      let url = wxSignUrl ? wxSignUrl : location.href
      httpGet(API.getSignPackage, {url: url}).then((res) => {
        if (res.code == 200) {
          let data = res.data
          wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
          })
          wx.error(function (error) {
            console.log(error)
            // alert(error)
          })
          // 分享
          wx.ready(function() {
            wx.updateAppMessageShareData({  // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
              title: shareData.title ? shareData.title : '',
              desc: shareData.desc ? shareData.desc : location.href,
              link: shareData.link ? shareData.link : location.href,
              imgUrl: shareData.imgUrl ?  shareData.imgUrl : 'https://fcpdlpk.oss-cn-shenzhen.aliyuncs.com/apps/shareLogo.png',
              success: function() {
                // 设置成功
              },
              cancel: function() {
                // 分享取消
              }
            })
            wx.updateTimelineShareData({  // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
              title: shareData.title ? shareData.title : '',
              desc: shareData.desc ? shareData.desc : location.href,
              link: shareData.link ? shareData.link : location.href,
              imgUrl: shareData.imgUrl ? shareData.imgUrl : 'https://fcpdlpk.oss-cn-shenzhen.aliyuncs.com/apps/shareLogo.png',
              success: function() {
                // 设置成功
              },
              cancel: function() {
              }
            })
          })
        }
      })
    }
  }
}

Vue.use(wechatShare)
```

## 可能遇到的问题：
### 1、在ios上，JSSDK签名失败（config: invalid signature）
**这是因为在IOS上，无论路由切换到哪个页面，实际真正有效的的签名URL是【第一次进入应用时的URL】（即ios的微信浏览器，获取地址一直为入口地址）。**

比如进入应用首页是: https://m.app.com，需要使用JSSDK的页面A是：https://m.app.com/product1/123，无论从首页进入到A页面之前，中间跳转过多少次路由，最终签名有效的URL还是首页URL。

解决思路：既然IOS仅可使用第一次进入应用的URL来签名，那么在vuex上缓存一个微信签名URL，IOS保存第一次进入应用的URL，签名时，直接从缓存拿出签名URL来处理，Android则直接通过window.location.href获取URL。

定义vuex缓存：

// state.js
```
export default () => ({
  wxSignUrl: '', // 记录用户第一次进入应用的url, 用于需要用到微信分享的页面的微信签名， 为了解决在IOS中总是签名失败的bug
})
```

// mutations.js 
```
setWxSignUrl(state, wxSignUrl) {
    // IOS仅记录第一次进入页面时的URL
    // IOS微信切换路由实际URL不变，只能使用第一进入页面的URL进行签名
    if (process.browser) {
      let u = navigator.userAgent
      let isIos =  u.indexOf('iPhone') > -1 || u.indexOf('Mac OS') > -1
      if (isIos && state.wxSignUrl == '') {
        state.wxSignUrl = location.href
      }
    }
  }
```

// getters.js
```
getWxSignUrl(state) {
    return state.wxSignUrl
  }
```

// nuxt.config.js
```
router: {
    middleware: 'saveWxSignUrl'
  }
```