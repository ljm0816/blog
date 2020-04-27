---
title: 前端面试题
date: 2020-03-24 17:18:46
tags: 前端面试题
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

```
什么样的 a 可以满足 (a === 1 && a === 2 && a === 3) === true 呢？(注意是 3 个 =，也就是严格相等)

var count = 0
Object.defineProtery(window, 'a', {
    get() {
        count ++
        return count
    }
})
```

```
多继承， 怎样实现一个对象同时继承两个对象？

var foo = {
    foo() {
        console.log('foo')
    }
}
var bar = {
    bar() {
        console.log('bar')
    }
}
var sub = new Proxy({}, {
    get(target, key, reciever) {
        return target[key] || foo[key] || bar[key]
    }
})

sub.foo()
sub.bar()
```

```
function Foo() {
    getName = function () { console.log(1); };
    return this;
}
Foo.getName = function () { console.log(2);};
Foo.prototype.getName = function () { console.log(3);};
var getName = function () { console.log(4);};
function getName() { console.log(5);}

//请写出以下输出结果：
Foo.getName(); // 2
getName(); // 4; 函数声明和函数表达式，变量提升
Foo().getName(); // 1; Foo()返回this，this指向windows
getName(); // 1; 执行了第三行代码后，window.getName的值已改变
new Foo.getName(); // 2;  表达式的优先级，等于new (Foo.getName)();
new Foo().getName(); // 3; (new Foo()).getName()
new new Foo().getName(); // 3; new ((new Foo()).getName)()
```

```
var elem = document.getElementById('test')
    elem.onclick = function () {
        console.log(1)
    }
    elem.onclick = function () {
        console.log(2)
    }
    elem.addEventListener('click', function() {
        console.log(3)
    })
    elem.addEventListener('click', function() {
        console.log(4)
    })
    
    输出结果：2 3 4
    
    onclick与addEventLister的区别：
    1、onclick在同一时间只能指向唯一对象
    2、addEventLister可以给一个事件注册多个监听器
    3、addEventLister提供了一种更精细的手段控制 listener 的触发阶段。（即可以选择捕获或者冒泡）
    4、addEventLister对任何 DOM 元素都是有效的，而不仅仅只对 HTML 元素有效
```

```
js判断数组类型的方法

1、if(typeof a === 'obiect' && Array.isArray(a)){}

2、if(a instanceof Array){}

3、if(Object.prototype.toString.call(a) === '[object Array]'){}
```
