# 简答题
## 如何理解JS异步编程
- 因为js是单线程语言，在js执行中，负责执行代码的进程只有一个，所以当遇到耗时操作时，页面会造成假死现象，异步编程模式就是为了解决这一问题。
- 异步模式的主要表现为不会等待当前任务执行完再执行下一个任务，而是开启后立即执行下一个任务，后续逻辑一般通过回调函数的方式定义，等耗时操作完成后，通过回调函数定义的逻辑进行执行
- 现在的异步模式的解决方案有三种 Promise，Generator 和 async/await 三种模式

## EventLoop和消息队列的作用
- 当一段函数执行时，消息队列会压缩一个匿名函数到调用栈，然后遵照先进后出的原则，进栈和出栈，当遇到异步函数的时候，会把任务放入Web APIs中，等到调用栈的函数执行完之后，EventLoop 会查看消息队列中的待执行任务，如果有，就把该任务更新到调用栈
- Event Loop 就是用来监听调用栈和消息队列，一旦调用栈为空，事件循环会从消息队列取出第一个回调函数放入调用栈中执行
- 消息队列是用来接收Web APIs中成功的回调函数，其中，Web APIs中先结束的任务会被放到消息队列的第一位

## 什么是宏任务，什么是微任务
- 回调队列中的任务称之为宏任务
- 宏任务执行过程中可以临时加一些额外的需求，对于这些额外的需求，可以作为宏任务添加到队列中排队，也可以作为当前任务的微任务，直接在当前任务结束后立即执行
- Promise的回调会作为微任务执行
- setTimeout以宏任务的形式进入回调队列的末尾，目前大多数异步调用都作为宏任务执行
- Promise && MutationObserver && procss.nextTick 作为微任务来执行
# 代码题
## 一、将下列异步代码使用Promise的方法改进
#### [异步代码使用Promsie的方法改进](./code/01-01.js)
## 二、基于以下代码完成下面的四个练习
#### [练习1.flowRight获取最后一条数据的in_stock](./code/02-01.js)
#### [练习2.flowRight获取第一个car的name](./code/02-02.js)
#### [练习3.使用帮助函数_average重构averageDollarValue](./code/02-03.js)
#### [练习4.使用flowRight写一个sanitizeNames()函数](./code/02-04.js)
## 三、基于下面代码完成后面的四个练习
#### [练习1.使用fp.add和fp.map能让functor的值增加的函数ex1](./code/03-01.js)
#### [练习2.使用fp.first获取列表的第一个元素](./code/03-02.js)
#### [练习3.使用safeProp 和fp.first找到user名字的首字母](./code/03-03.js)
#### [练习4.使用Maybe重写ex4，不能有if语句](./code/03-04.js)
## [四、手写实现MyPromise源码](./code/04.js)
## 五、学习笔记
#### [函数式编程笔记链接](https://www.jianshu.com/p/e5574275c497)
#### [异步编程笔记点的链接](https://www.jianshu.com/p/dce49fad3445)
#### [手写Promise笔记链接](https://www.jianshu.com/p/c43364b54614)
## 六、学习总结
## [函数式编程总结链接](https://www.processon.com/mindmap/5f981ddb7d9c0806f2934591)
## [异步编程总结链接](https://www.processon.com/mindmap/5f993c3f1e08533134f9ea2e)
