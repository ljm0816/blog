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

```
var User = {
  count: 1,
  getCount: function() {
    return this.count;
  }
};
var func = User.getCount;
console.log(func() , User.getCount()); // undefined, 1
```

```
// 6.下面这个ul，如何点击每一列的时候alert其index?  要求: 请用JavaScript

<ul id="test">
<li>这是第一条</li>
<li>这是第二条</li>
<li>这是第三条</li>
</ul>


let elems = document.getElementById('test').children
for (var i=0; i<elems.length; i++) {
  elems[i].onclick = function (index) {
    function () {
    	alert(index)
    }
  }(i)
}
```