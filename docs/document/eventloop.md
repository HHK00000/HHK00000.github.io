# 事件循环
在JS引擎中，我们可以按性质把任务分为两类，macrotask（宏任务）和 microtask（微任务）。

## 宏任务与微任务

宏任务 macrotask（按优先级顺序排列）: script(你的全部JS代码，“同步代码”）, setTimeout, setInterval, setImmediate, I/O,UI rendering
微任务 microtask（按优先级顺序排列）:process.nextTick,Promises（这里指浏览器原生实现的 Promise.then）, Object.observe, MutationObserver

## 事件循环
1.JS引擎首先执行主JS代码，并将产生的微任务、宏任务分别存入各自队列；
2.然后先开始清空微任务队列中的任务及新产生的微任务，直至完全清空微任务队列；
3.微任务队列清空后，先从宏任务队列中取出第一个任务，执行完毕后，将微任务队列中的所有任务取出，按顺序全部执行；然后再从宏任务队列中取下一个，执行完毕后，再次将微任务队列中的全部清空；
4.循环往复，直到两个任务队列中的任务全部清空。

```
// 异步代码执行顺序

console.log('script start'); // 1
setTimeout(function() {
  console.log('h'); // 5
  Promise.resolve().then(()=>{
    console.log('h1') // 6
  })
  Promise.resolve().then(()=>{
    console.log('h2') // 7
    Promise.resolve().then(()=>{
      console.log('h21') // 8
    })
  })
  Promise.resolve().then(()=>{
    console.log('h3') // 7
  })
}, 0)

new Promise(function(resolve) {
  console.log('promise1');  // 2
  resolve();
}).then(function() {
  console.log('promise2'); // 4
});

setTimeout(function() {
  console.log('m'); // 9
  Promise.resolve().then(()=>{
    console.log('m1') // 10
  })
  Promise.resolve().then(()=>{
    console.log('m2') // 11
    Promise.resolve().then(()=>{
      console.log('m21') // 13
    })
  })
  Promise.resolve().then(()=>{
    console.log('m3') // 12
  })
}, 0)

console.log('script end'); // 3
```
