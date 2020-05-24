---
title: Event Loop 与宏任务微任务
date: 2020-05-24 12:38:32
tags: javascript
thumbnail: /blog/images/eventloop.jpg
---

javascript是一种单线程语言，所有任务都会在一个线程里面完成。为解决单线程带来的一些问题，javascript 引入Event Loop这种运行机制。
下面我们来看一张图：

![](/blog/images/eventLoop.jpg)

1、整体的javascript代码开始执行的时候，将所有的代码分为同步任务和异步任务两种，同步任务直接进入主线程执行，异步任务再分为macro-task(宏任务)和micro-task(微任务)
2、宏任务进入到Event Table中，并在里面注册回调函数，每当指定的事件完成时，Event Table会将这个函数移到Event Queue中；
3、微任务也会进入到另一个Event Table中，并在里面注册回调函数，每当指定的事件完成时，Event Table会将这个函数移到Event Queue中；
4、当主线程内的任务执行完毕，主线程为空时，会检查微任务的Event Queue，如果有任务，就**全部执行**，如果没有就**执行下一个宏任务**；
5、上述过程会不断重复，这就是Event Loop事件循环；


macro-task(宏任务):包括整体代码script,setTimeout,setInterval,setImmediate, I/O,UI rendering
micro-task(微任务):Promise,process.nextTick,MutationObserver

#### 下面我们来看一个例子:

```
setTimeout(function(){
    console.log(1)
  new Promise(function(resolve){
    resolve()
  }).then(function () {
    console.log(2)
  })
}, 0)

new Promise(function(resolve){
    console.log(3)
    for(let i = 0; i < 10000; i++){
        i===9999 && resolve()
    }
    console.log(4)
}).then(function () {
    console.log(5)
})

console.log(6)
```

1)、这段代码首先进入主线程的是 new Promise()  和 console.log(3)  输出： 3 4 6
2)、serTimeout 进入宏任务列表，Promise.then进入微任务列表
3)、当主线程执行完毕后，去微任务中查找是否有等待执行的任务，将所有微任务放入主线程执行，输出：5
4)、微任务执行完毕，执行下一个宏任务（这里只将宏任务队列中的一个宏任务放入主线程）seTimeout，setTimeout中又有一个Promise.then，将其推入微任务列表中，输出： 1
5)、setTimeout执行完毕，执行微任务队列，输出：2
7)、所以最后的输出结果是： 346512


#### async/await函数

因为，async/await本质上还是基于Promise的一些封装，而Promise是属于微任务的一种。所以在使用await关键字与Promise.then效果类似：

```
setTimeout(function(){
  console.log(4)
}, 0)

async function main() {
  console.log(1)
  await Promise.resolve()
  console.log(3)
}

main()

console.log(2)
```

**async函数在await之前的代码都是同步执行的，可以理解为await之前的代码属于new Promise时传入的代码，await之后的所有代码都是在Promise.then中的回调**