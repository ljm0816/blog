---
title: 前端面试题
date: 2020-03-24 17:18:46
tags:
---
```
var a = "11" + 2 - "1"
console.log(a, typeof a)  // 111, number
```

```
var b = true
var c = function() {}
console.log(typeof b && typeof c) // function
console.log(typeof c && typeof b) // boolean
```

```
var a,b = null
console.log(a, typeof a) // undefined, undefind 
console.log(b, typeof b) // null, object
console.log(c, typeof c) // 抛出异常
```

```
var arg1 = {a: 1}
var arg2 = {b: 2}
!function(arg1,arg2){
   arg1 = arg2
   arg2['c'] = 3 
}(arg1,arg2)
console.log(JSON.stringify(arg1), JSON.stringify(arg2)) // {a: 1},{b:2, c:2}
```