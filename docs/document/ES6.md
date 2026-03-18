## Promise
+ Promise 就是一个对象，用来传递异步操作的消息，代表了未来才会知道结果的事件（通常是一个异步操作）
+ Promise有两个特点：
    + 1.对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending(进行中)、Resolved(已完成，又称Fulfilled) 和 Rejected(已失败)，只有异步操作的结果可以决定当前是哪一种状态
    + 2.一旦状态改变就不会再变，任何时候都能得到这个结果
    + Promise还有一些缺点，首先，无法取消 Promise，其次，如果不设置回调函数，Promise内部抛出的错误不会反映到外部，再者，当处于 Pending 状态时，无法得知目前发展到哪个阶段
+ Promise 是一个构造函数，用于生成 Promise 实例，Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject。它们是两个函数，由Javascript引擎提供，不用自己部署。
+ resolve函数的作用是将 Promise 对象的状态从 Pending 变成 Fulfilled；reject函数的作用是将Promise对象的状态从 Pending 变为 Rejected
+ Promise实例生成以后，可以用then分别制定Resolved 和 Rejected状态的回调函数，then 方法可以接受两个回调函数做参数，第一个回调函数是Promise变为Resolved时调用，第二个是Promise变为Rejected时调用，其中，第二个参数是可选的，并且建议catch语句替代
+ 如果调用resolve和reject函数时带有参数，那么这些参数会被传递给回调函数，reject函数的参数通常是Error对象的实例，表示抛出错误；resolve函数的参数除了正常的值以外，还可能是另一个Promise实例，表示异步操作结果有可能是一个值，也有可能是另一个异步操作
+ Promise.prototype.then Promise实例具有 then 方法，then方法是定义在原型对象上的，作用是为Promise添加状态改变时的回调函数
+ Promise.prototype.catch 方法是 .then(null, rejection)的别名，用于指定发生错误时的回调函数；
+ Promise.prototype.catch catch方法返回的还是一个Promise对象，还可以接着调用then方法；catch后面的then报错，前面的catch无法捕获错误
+ Promise.prototype.finally 在Promise结束时，无论结果是fulfilled或rejected，都会执行这个指定的回调函数
+ Promise.all 方法用于将多个Promise实例包装成一个新的Promise实例，Promise.all方法的参数不一定是数组，但是必须具有 Interator 接口
+ var p = Promise.all([p1, p2, p3])中，只有p1、p2、p3的状态都编程Fulfilled，p的状态才回编程Fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数；只有p1、p2、p3中有一个为Rejected，p的状态就变成了Rejected，此时第一个被Rejected的实例的返回值会传给p的回调函数
+ Promsie.allSettled() 方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果
+ Promise.race 方法同样是将多个 Promise实例包装成一个新的Promise实例
+ var p = Promise.race([p1, p2, p3])只要p1、p2、p3中有一个实例率先改变状态，p的状态就跟着改变，那个率先改变状态的Promise实例的返回值，就传递给p的回调函数
+ Promise.any() 接收一个Promise可迭代对象，只要其中的一个promise成功，就返回那个已经成功的promise。如果可迭代对象中没有一个promise成功，就返回一个失败的promise。
+ Promise.resolve可以将现有对象转为Promise对象,如果Promise.resolve方法的参数不是thenable对象（具有then方法的对象），则返回一个新的Promise对象，且其状态为Resolved
```
    Promise.resolve('foo')
    <!-- 等价于 -->
    new Promise(resolve => resolve('foo'))
```
+ Promise.reject()方法也会返回一个新的Promise实例，状态为Rejected

```
手写Promis：
// 手写Promise

class myPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";
  constructor(func) {
    this.PromiseState = myPromise.PENDING;
    this.PromiseResult = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  resolve(result) {
    // console.log("resolve执行：", result);
    if (this.PromiseState === myPromise.PENDING) {
      setTimeout(() => {
        this.PromiseState = myPromise.FULFILLED;
        this.PromiseResult = result;
        this.onFulfilledCallbacks.forEach(callback => callback(result));
      })
    }
  }

  reject(reason) {
    // console.log("reject执行：", reason, 999, this);
    if (this.PromiseState === myPromise.PENDING) {
      setTimeout(() => {
        // console.log("reject内部执行", this);
        this.PromiseState = myPromise.REJECTED;
        this.PromiseResult = reason;
        this.onRejectedCallbacks.forEach(callback => callback(reason));
        // console.log("reject内部执行2222", this);
      })
    }
  }

  then(onFulfilled, onRejected) {
    // console.log("then调用：");
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
    onRejected = typeof onRejected === "function" ? onRejected : reason => {
      // console.log("reason", reason)
      throw reason;
    }
    // console.log("onFulfilled -- onRejected", onFulfilled, onRejected);
    const promise2 = new myPromise((resolve, reject) => {
      if (this.PromiseState === myPromise.FULFILLED) {
        setTimeout(() => {
          try {
            // console.log(9)
            let x = onFulfilled(this.PromiseResult);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            // console.log(91)
            console.log(e);
            reject(e);
          }
        })
      } else if (this.PromiseState === myPromise.REJECTED) {
        setTimeout(() => {
          try {
            // console.log(8)
            let x = onRejected(this.PromiseResult);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            // console.log(81)
            console.log(e);
            reject(e);
          }
        })
      } else if (this.PromiseState === myPromise.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          try {
            // console.log(7)
            let x = onFulfilled(this.PromiseResult);
            let a= resolvePromise(promise2, x, resolve, reject);
            // console.log('aaa', this, a);
          } catch (e) {
            // console.log(71,e)
            console.log(e);
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            // console.log(6)
            let x = onRejected(this.PromiseResult);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            // console.log(61)
            console.log(e);
            reject(e);
          }
        });
      }
    })
    return promise2;
  }

}
/**
 * 
 * @param {promise} promise2 promise1.then方法返回的新的promise对象
 * @param {[type]} x  promise1中onFulfilled或onRejected的返回值
 * @param {[type]} resolve promise2的resolve方法
 * @param {[type]} reject promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
  if(promise2 === x){
    // console.log("循环引用", promise2, promise2.resolve, promise2.reject);
    throw new TypeError('Chaining cycle detected for promise');
    // return reject(new TypeError('Chaining cycle detected for promise'));
  }
  if(x instanceof myPromise){
    if(x.PromiseState === myPromise.PENDING){
      x.then(y => {
        resolvePromise(promise2, y, resolve, reject);
      }, reject)
    } else if(x.PromiseState === myPromise.FULFILLED){
      resolve(x.PromiseResult);
    } else if(x.PromiseState === myPromise.REJECTED){
      reject(x.PromiseResult);
    }
  } else if (x !== null && (typeof x === "object" || typeof x === "function")){
    try {
      var then = x.then;
    } catch (e){
      return reject(e);
    }
    if(typeof then === "function"){
      let called = false;
      try {
        then.call(
          x,
          y => {
            if(called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if(called) return;
            called = true;
            reject(r);
          }
        )
      } catch (e) {
        if(called) return;
        called = true;
        reject(e);
      }
    } else {
      resolve(x);
    }
  } else {
    return resolve(x);
  }
}

// let res = () => {
//   console.log(1);
// }
// let rej = () => {
//   console.log(2);
// }
// 1.不能在new Promise时为excutor函数传入resolve/reject函数，因为new Promise时，resolve和reject函数都是形参，
// 实际上这两个函数是在Promise内部封装好的，并在执行excutor函数时传入，而new Promise时，只是调用了这两个函数
// 2.new Promise时的resolve和reject只是形参，真正调用是在new生成实例后，所以调用resolve、reject时需要绑定this指向
// 3.第一次走then还是catch 要看new Promise时 调用了resolve还是reject,之后链式调用走then还是catch 要看上一次then/catch的返回值
// 返回值是普通值，走then；是Error，走catch；是Promise，则根据Promise的状态决定

// console.log(1);
// var p1 = new myPromise((resolve, reject) => {
//   // console.log("执行func");
//   console.log(2);
//   setTimeout(() => {
//     console.log("before:", p1.PromiseState);
//     resolve("执行resolve1");
//     console.log("after:", p1.PromiseState);
//     console.log(4);
//   })
//   // reject("执行reject1")
//   // throw new Error("抛出错误");
// })

// // var p2 = new myPromise((resolve, reject) => {
// //   reject("执行reject2");
// //   resolve("执行resolve2")
// // })

// p1.then(
//   result => {
//     console.log("fulfilled", result);
//   },
//   // null,
//   reason => {
//     console.log("rejected", reason);
//   }
// )

// console.log(3);

// // console.log("p1", p1);
// // console.log("p2", p2);

// 多次调用
// var promise = new myPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("success");
//   }, 2000);
// })

// promise.then(value => {
//   console.log(1);
//   console.log("resolve", value);
// })

// promise.then(value => {
//   console.log(2);
//   console.log("resolve", value);
// })

// promise.then(value => {
//   console.log(3);
//   console.log("resolve", value);
// })

// 链式调用
// let p1 = new myPromise((resolve, reject) => {
//   resolve(10);
// });
// p1.then(res => {
//   console.log("fulfilled", res);
//   return 2 * res;
// }).then(res => {
//   console.log("fulfilled", res);
// })

// 循环引用报错
// var promise = new myPromise((resolve, reject) => {
//   // resolve(100);
//   reject(200);
// })
// var p1 = promise.then(value => {
//   console.log(value)
//   // throw new Error()
//   return p1
// })
// console.log(p1,'p1')
// p1.then((res) => {
//   console.log("res2", res);
// }, (rej) => {
//   console.log("rej2", rej);
// })

// test
// var promise = new Promise((resolve, reject) => {
//   // resolve(100);
//   // reject(200);
//   throw new Error(300);
// })

// var p1 = promise.then((res) => {
//   console.log("res1", res);
// }, (rej) => {
//   console.log("rej1", rej);
// })
// p1.then((res) => {
//   console.log("res2", res);
// }, (rej) => {
//   console.log("rej2", rej);
// })

// 跑测试用例
// myPromise.deferred = function () {
//   let result = {};
//   result.promise = new myPromise((resolve, reject) => {
//     result.resolve = resolve;
//     result.reject = reject;
//   });
//   return result;
// }

// module.exports = myPromise;

```
## Set
+ Set是es6提供的新的数据结构，类似数组，但是成员的值都是唯一的、没有重复的值；
+ Set本身是一个构造函数，用来生成Set数据结构；
+ Set可以接受一个数组或具有iterable接口的其它数据结构作为参数，用来初始化；
### Set实例的属性和方法
+ Set.prototype.constructor 构造函数，默认就是Set函数
+ Set.prototype.size 返回Set实例的成员总数
+ 四个操作方法：
+ Set.prototype.add(value) 添加某个值 返回Set结构本身
+ Set.prototype.delete(value) 删除某个值 返回一个布尔值，表示删除是否成功
+ Set.prototype.has(value) 返回一个布尔值 表示该值是否为Set的成员
+ Set.prototype.clear() 清除所有成员，没有返回值
+ 四个遍历方法：
+ Set.prototype.keys() 返回键名的遍历器
+ Set.prototype.values() 返回键值的遍历器
+ Set.prototype.entried() 返回键值对的遍历器
+ Set.prototype.forEach() 使用回调函数遍历每个成员
+ Set结构的遍历顺序就是插入顺序
+ keys、values、entries方法返回的都是遍历器对象，由于Set结构没有键名只有键值，所以keys方法和values方法行为完全一致
### WeakSet
+ WeakSet的成员只能是对象，不能是其他类型的值
+ WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用
+ WeakSet也有add、delete、has方法，没有size、forEach方法
```
// Set
var log = console.log;
// 唯一值
// const s = new Set();
// [2,3,4,5,5,3,2].map(x=>s.add(x));
// for(let i of s) {
//     console.log(i);
// }

// Set函数的参数 为数组或其他 interable 接口的数据结构
// const set = new Set([1,2,3,5,5]);
// console.log([...set]);
// const set = new Set(document.querySelectorAll('div'));
// console.log(set.size);
// const set = new Set();
// document.querySelectorAll('div').forEach(div=>set.add(div));
// console.log(set.size)

// 应用：数组去重
// console.log([...new Set([2,3,5,6,5,3])]);
// 应用：字符串去重
// console.log([...new Set('ababbc')].join(''));

// 向Set中加入值，不会发生类型转换 内部采用精确相等判断，但NaN判定等于自身，即只能有一个NaN
// let set = new Set();
// let a = NaN;
// let b = NaN;
// set.add(a);
// set.add(b);
// console.log(set);
// 两个对象总是不相等
// let set = new Set();
// set.add({});
// console.log(set.size);
// set.add({});
// console.log(set.size);

// Set实例的属性和方法
// Set.prototype.constructor 构造函数 默认就是Set函数
// Set.prototype.size 返回Set实例的成员总数

// Set实例的方法分为两大类：操作方法 和 遍历方法
// 四个操作方法（用于操作数据）
// Set.prototype.add(value): 添加某个值，返回Set结构本身
// Set.prototype.delete(value):删除某个值，返回一个布尔值，表示删除是否成功
// Set.prototype.has(value): 返回一个布尔值，表示该值是否为Set的成员
// Set.prototype.clear(): 清除所有成员，没有返回值
// 四个遍历方法
// Set.prototype.keys: 返回键名的遍历器
// Set.prototype.values: 返回键值的遍历器
// Set.prototype.entries: 返回键值对的遍历器
// Set.prototype.forEach(): 使用回调函数遍历每个成员

// 操作方法
// let s = new Set();
// s.add(1).add(1).add(2);
// log(s.size);
// log(s.has(1));
// log(s.has(2));
// log(s.has(3));
// s.delete(2);
// log(s.has(2));

// object结构 和 Set结构 在判断是否包括一个键时写法的区别
// const properties = {
//     'width': 1,
//     'height': 1
// };
// if(properties['width']){
//     // do something
//     log('obj has property width');
// }
// const properties = new Set();
// properties.add('width');
// properties.add('height');
// if(properties.has('width')){
//     // do something
//     log('set has key width');
// }

// Array.from可以将Set结构转为数组
// const items = new Set([1,2,3,5,6]);
// const array = Array.from(items);
// log('Set:',items);
// log('Array:', array);
// 另一种数组去重方法

// function dedupe (array){
//     return Array.from(new Set(array));
// }
// log(dedupe([1,2,1,4,2,3]));

// 遍历方法
// keys方法、values方法 行为完全一致，entries方法返回一个键名和键值的数组
// let set = new Set(['red', 'green', 'blue']);
// for(let item of set.keys()){
//     log(item);
// }
// for(let item of set.values()){
//     log(item);
// }
// for(let item of set.entries()){
//     log(item);
// }

// forEach()方法
// forEach方法的参数是一个回调函数，回调函数的参数依次是键值、键名、遍历对象本身；forEach方法还可以指定第二个参数目标是绑定处理函数内部的this对象
// let set = new Set([1, 4, 9]);
// set.forEach((value, key) => log(key + ' : ' + value + this), {a:1}); // 回调函数是箭头函数时，指定this失效
// set.forEach(function (value, key){log(key + ' : ' + value + this)}, {a:1});

// 遍历的应用
// 扩展运算法(...) 内部使用的是for...of循环，也可以用于Set结构
// let set = new Set(['red', 'green', 'blue']);
// let arr = [...set];
// log(arr);

// 扩展运算符合Set相结合，用于去除数组重复成员

// 数组的map和filter方法也可以间接用于Set
// let set = new Set([1, 2, 3]);
// set = new Set([...set].map(x => x * 2));
// log(set);
// set = new Set([...set].filter(x => x%2 == 0));
// log(set);

// Set可以很容易地实现并集(Union)、交集(Intersect)和 差集(Difference)
// let a = new Set([1, 2, 3]);
// let b = new Set([4, 3, 2]);
// // 并集
// let union = new Set([...a,...b]);
// log(union);
// // 交集
// let intersect = new Set([...a].filter(x=>b.has(x)));
// log(intersect);
// // 差集 a相对于b
// let difference = new Set([...a].filter(x => !b.has(x)));
// log(difference);

// 如果想在遍历操作中，同步改变原来的Set结构，目前没有直接方法，但有两种变通方法。一是利用原Set结构映射出一个新结构，然后复制给原来的Set结构，一种是利用Array.from方法
// 方法一
// let set = new Set([1,2,3]);
// set = new Set([...set].map(val => val * 2));
// log(set);
// 方法二
// let set = new Set([1, 2, 3]);
// set = new Set(Array.from(set, val => val * 2));

//  WeakSet
// 相同点：不重复
// 不同点1：WeakSet成员只能是对象，不能是其他类型的值
// 不同点2：WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还在WeakSet中
// WeakSet适合临时存放一组对象，以及存放跟对象绑定的信息，只要这些对象再外部消失，它在WeakSet里面的引用就会自动消失
// 所以WeakSet的成员是不适合引用的，因为它随时会消失，引用前引用后成员个数可能是不一样的；所以WeakSet是不可遍历的

// WeakSet构造函数
// const ws = new WeakSet();
// 任何具有Iterable接口的数据都可以作为WeakSet的参数
// const a = [[1, 2], [3, 4]];
// const ws = new WeakSet(a);
// log(ws);
// WeakSet 结构有以下三个方法：
// WeakSet.prototype.add(value): 向WeakSet实例添加一个成员
// WeakSet.prototype.delete(value): 清除WeakSet实例的指定成员
// WeakSet.prototype.has(value): 返回一个布尔值，表示某个值是否在WeakSet实例中

// const ws = new WeakSet();
// const obj = {};
// const foo = {};
// ws.add(window);
// ws.add(obj);
// log(ws.has(window));
// log(ws.has(foo));
// ws.delete(window);
// log(ws.has(window));
// log(ws.has(obj));
// log(ws.size, ws.forEach);

// WeakSet不能遍历，是用因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet的一个用处是，是储存DOM节点，而不用担心这些节点从文档移除时，会引发内存泄漏

// const foos = new WeakSet();
// class Foo{
//     constructor (){
//         foos.add(this);
//     }
//     method (){
//         if((!foos.has(this))){
//             throw new TypeError('Foo.prototype.method 只能再Foo实例上调用！');
//         }
//     }
// }

// WeakSet能避免内存泄漏
// var dom = document.querySelector('div');
// // var obj = { dom };
// // var set = new Set();
// // set.add(dom);
// var ws = new WeakSet();
// ws.add(dom);
// // console.log(obj, set);
// console.log(ws);
// dom.parentElement.removeChild(dom)
// dom = null;
// // console.log(obj, set); // 在obj和set中，dom没有被清除，这样的内存占用积累多了以后，就会产生内存泄漏
// console.log(ws); // 打印内容看似一样 其实展开之后发现已经清掉了dom，所以不会产生内存泄漏
```

## Map
+ Map是ES6提供的一种数据结构，类似对象，也是键值对的结合，但是Map的键不限于字符串，各种类型的值(包括对象)都可以当做键名；也就是说，Object提供了"字符串-值"的对应，Map提供了“值-值”的对应，是一种更完善的Hash结构
+ Map构造函数可以接受数组作为参数，用于快速生成一个Map结构
## 实例的属性和方法
+ size属性 返回Map结构的成员总数
+ Map.prototype.set(key, value) set方法设置键名key对应的键值value，然后返回整个Map结构
+ Map.prototype.get(key) get方法读取key对应的键值，找不到则返回undefined
+ Map.prototype.has(key) has方法返回一个布尔值，表示某个键是否在当前Map对象之中
+ Map.prototype.delete(key) delete方法删除某个键，返回true，如果删除失败，返回false
+ Map.prototype.clear() clear方法清除所有成员 没有返回值
+ 四个遍历方法：
+ Map.prototype.keys():返回键名的遍历器
+ Map.prototype.values():返回键值的遍历器
+ Map.prototype.entries():返回所有成员的遍历器
+ Map.prototype.forEach(): 遍历Map的所有成员
+ Map的遍历顺序就是插入顺序
### Map结构与其他数据结构的互相转换
+ Map转为数组 使用扩展运算符 ...
+ 数组转为Map 把数组传入Map构造函数即可
+ Map转为对象 如果Map的所有key都是字符串，可以无损转为对象，使用Object.create创建obj，再遍历赋值
+ 对象转为Map 通过构造函数及Object.entries方法
+ Map转为JSON 分两种情况 Map的键名都是字符串 可以转为对象JSON，否则可以转为数组JSON 使用构造函数
+ JSON转为Map 构造函数 + 遍历方法
### WeakMap
+ WeakMap与Map结构类似，也是用于生成键值对的集合
+ WeakMap只接受对象作为键名(null除外) 不接受其他类型的值（包括Symbol也不行）作为键名
+ WeakMap的键名所指向的对象 不计入垃圾回收机制 -- 避免内存泄露
+ WeakMap没有遍历操作，没有size属性 只有四个方法可用：get()、set()、has()、delete()
### WeakRef
+ 直接创建对象的弱引用
### FinalizationRegistry
+ 清理注册表功能 用于指定目标对象被垃圾回收机制清除以后 所要执行的函数
```
// Map
var log = console.log;


// Map和Object都是一种键值对的Hash结构

// Object只能以字符串作为键名
// const data = {};
// const element = document.querySelector('div');
// data[element] = 'metadata';
// log(data, data['[object HTMLDivElement]']); // {[object HTMLDivElement]: 'metadata'}[object HTMLDivElement]: "metadata"[[Prototype]]: Object 'metadata'

// Map可以以各种类型的值（包括对象）作为键，是一种更完善的Hash结构
// const m = new Map();
// const o = { p: 'Hello World' };
// m.set(o, 'content');
// log(m.get(o));
// log(m.has(o));
// m.delete(o);
// log(m.has(o));

// Map也可以接受一个数组作为参数
// const map = new Map([
//     ['name', '张三'], // 只有数组的前两项别识别为key value
//     ['title', 'Author']
// ]);
// log(map.size);
// log(map.has('name'));
// log(map.get('name'));
// log(map.has('title'));
// log(map.get('title'));

// Map构造函数接受数组作为参数，实际上执行的是下面算法
// const items = [
//     ['name', '张三'],
//     ['title', 'Author']
// ];
// const map = new Map();
// items.forEach(
//     ([key, value]) => map.set(key, value)
// );
// log(map);

// 类似数组，任何具有Interable接口，且每个成员都是一个双元素数组的数据结构，都可以作为Map构造函数的参数，所以 Set 和 Map 都可以用来生成新的 Map
// const set = new Set([
//     ['foo', 1],
//     ['bar', 2]
// ]);
// const m1 = new Map(set);
// log(m1.get('foo'));
// const m2 = new Map([['baz', 3]]);
// const m3 = new Map(m2);
// log(m3.get('baz'));

// l连续对同一个键多次赋值，后面的值将覆盖前面的值

// 获取未知键时，返回undefined

// 只有键的引用地址相同，Map才会将其视为同一个键
// Map 的键实际上是跟北村地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞(clash)的问题,当我们扩展别人的库的时候，不必再担心自己的属性与原作者的属性同名
// const map = new Map();
// map.set(['a'], 555);
// log(map.get(['a'])); // undefined

// 如果Map 的键是一个简单类型的值（数字、字符串、布尔值）,则只要两个值严格相等，Map都会视为一个键，undefined和null是两个不同的键，NaN也视为一个键

// let map = new Map();
// map.set(-0, 123);
// log(map.get(+0));
// map.set(true, 1);
// map.set('true', 2);
// log(map.get(true));
// map.set(undefined, 3);
// map.set(null, 4);
// log(map.get(undefined));
// map.set(NaN, 123);
// log(map.get(NaN));

// 实例的属性和操作方法

// size属性 返回Map结构的成员总数

// Map.prototype.set(key, value) set方法设置键名key对应的键值value 然后返回整个Map结构(所以可以采用链式写法)，如果key已经存在，则键值会被更新，否则就生成该键

// Map.prototype.get(key) get方法读取对应的键值，如果找不到key，就返回undefined

// Map.prototype.has(key) 返回一个布尔值 表示某个键是否在当前Map对象之中

// Map.prototype.delete(key) delete方法删除某个键，返回true，如果删除失败，返回false

// Map.prototype.clear() clear方法清除所有成员，没有返回值

// 实例的遍历方法

// Map.prototype.keys() 返回键名的遍历器
// Map.prototype.values() 返回键值的遍历器
// Map.prototype.entries() 返回所有成员的遍历器
// Map.prototype.forEach() 遍历Map的所有成员
// Map的遍历顺序就是插入顺序
// const map = new Map([
//     ['F', 'no'],
//     ['T', 'yes']
// ]);
// for(let key of map.keys()){
//     log(key);
// }

// for(let value of map.values()){
//     log(value);
// }

// for(let item of map.entries()){
//     log(item); // 键值对数组 ['F', 'no]
// }

// for(let [key, value] of map){ // Map结构默认部署Iterator接口
//     console.log(key, value);
// }

// Map结构转为数组结构，比较快速的方法是使用扩展运算符(...)
// const map = new Map([
//     [1, 'one'],
//     [2, 'two'],
//     [3, 'three']
// ]);
// log([...map.keys()]);
// log([...map.values()]);
// log([...map.entries()]);
// log([...map]);

// 结合数组的map方法、filter方法，可以实现Map的遍历和过滤 （Map本身没有map和filter方法）
// const map0 = new Map()
//     .set(1, 'a')
//     .set(2, 'b')
//     .set(3, 'c');
// const map1 = new Map(
//     [...map0].filter(([k,v]) => k < 3)
// )
// log(map0,map1);

// Map的forEach方法和数组的forEach方法类似


// 与其它数据结构的相互转换
// Map转为数组， 可以使用扩展运算符
// 数组转为Map 将数组传入Map构造函数即可
// Map转为对象 如果所有Map的key都是字符串，它可以无损的转为对象
// function strMapToObj (strMap){
//     let obj = Object.create(null);
//     for(let [k, v] of strMap){
//         obj[k] = v;
//     }
//     return obj;
// }
// let myMap = new Map()
//     .set('yes', true)
//     .set('no', false);
// log(myMap, strMapToObj(myMap));
// // 对象转为Map 对象转为Map可以使用Object.entries() 或自己实现一个转换函数
// let obj = {'a': 1, 'b': 2};
// let map = new Map(Object.entries(obj));
// log(obj,map);
// function objToStrMap (obj){
//     let  strMap = new Map();
//     for(let k of Object.keys(obj)){
//         strMap.set(k, obj[k]);
//     }
//     return strMap;
// }
// log(objToStrMap({yes:true,no:false}));
// // Map转JSON 此时要区分两种，若Map的键名都是字符串，这时可以转为对象JSON，若Map的键含有非字符串，可以转为数组JSON
// function strMapToJson (strMap){
//     return JSON.stringify(strMapToObj(strMap));
// }
// log(strMapToJson(myMap));
// function mapToArrayJson (map){
//     return JSON.stringify([...map]);
// }
// log(mapToArrayJson(myMap));
// // JSON转为Map 正常情况下 所有键名都是字符串
// function jsonToStrMap(jsonStr){
//     return objToStrMap(JSON.parse(jsonStr));
// }
// log(jsonToStrMap('{"yes": true, "no": false}'));
// // 有一种特殊情况， 整个JSON是一个数组，且每个数组成员本身，又是一个有两个成员的数组，这时它可以一一对应的转成Map
// function jsonToMap(jsonStr){
//     return new Map(JSON.parse(jsonStr));
// }
// log(jsonToMap('[[true,7],[{"foo": 3},["abc"]]]'));

// WeakMap
// 相同点：WeakMap与Map类似 也是用于生成键值对的集合
// 不同点1：WeakMap只接受对象作为键名（不包括null），不接受其他类型的值作为键名
// 不同点2：WeakMap键名所指向的对象，不计入垃圾回收机制，它的键名所引用的对象都是弱引用，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存

// 基本上，如果你想要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用WeakMap，WeakMap结构有助于防止内存泄漏。WeakMap弱引用的只是键名，而不是键值，键值依然是正常引用

// WeakMap的语法 与Map的区别主要是：1.没有便利操作（keys、values、entries）及size属性；2.无法清空，没有clear方法


// WeakMap的用途

// 用途1：DOM节点作为键名
let myWeakMap = new WeakMap();
myWeakMap.set(
    document.getElementById('logo'),
    { timesClicked: 0 }
);
document.getElementById('logo').addEventListener('click', function (){
    let logoData = myWeakMap.get(document.getElementById('logo'));
    console.log(logoData.timesClicked);
    logoData.timesClicked++;
}, false);
document.getElementById('rm').addEventListener('click', function (){
    let logoData = myWeakMap.get(document.getElementById('logo'));
    console.log('删除前',logoData.timesClicked);
    var dom = document.getElementById('logo');
    dom.parentElement.removeChild(dom);
    let logoData1 = myWeakMap.get(document.getElementById('logo'));
    console.log('删除后',logoData1); // undefined
}, false);

// 用途2：部署私有属性
const _counter = new WeakMap();
const _action = new WeakMap();
class Countdown {
    constructor (counter,action){
        _counter.set(this, counter);
        _action.set(this, action);
    }
    dec (){
        let counter = _counter.get(this);
        console.log('counter：', counter);
        if(counter < 1) return;
        counter--;
        _counter.set(this, counter);
        if(counter === 0){
            _action.get(this)();
        }
    }
}
var c = new Countdown(3, () => console.log('DONE'));
c.dec();
c.dec();
c.dec();



// WeakRef 弱引用对象
// WeakSet 和 WeakMap都是基于弱引用的数据结构，ES2021提供了WeakRef对象，用于直接创建对象的弱引用
let target = {};
let wr = new WeakRef(target);
log(wr);
let obj = wr.deref();
if(obj){
    log('未被清除');
}else {
    log('已被清除');
}
target = null;
if(obj){
    log('未被清除');
}else {
    log('已被清除');
}
// 弱引用对象的一大用处就是作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动失效


// FinalizationRegistry  ES2021引入了清理注册表功能FinalizationRegistry，用来指定目标对象呗垃圾回收机制清除以后，所要执行的回调函数

const registry = new FinalizationRegistry(heldValue => {
    // ....
});
registry.register(theObject, "some value");
```

## Symbol
+ ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值，Symbol 值通过 Symbol 函数生成。
+ Symbol 函数的参数只表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的
+ Symbol 值不能和其它类型的值进行运算，否则会报错
+ Symbol值可以显式的转为字符串
    ```
        var s = Symbol('foo');
        String(s); // 'Symbol(foo)'
        s.toString(); // 'Symbol(foo)'
    ```
+ Symbol值也可以转为布尔值，但不能转为数值
    ```
        var s = Symbol('foo');
        Boolean(s); // true
    ```
+ Symbol作为对象的属性名时，不能使用点运算符，需要使用方括号结构，在对象内部，使用Symbol值定义属性时，Symbol值必须放在方括号中
+ Symbol值作为属性名时，该属性还是公开属性，不是私有属性
+ Symbol类型还可以用来定义一组常量，这可以保证没有重复值
+ 属性名的遍历：Symbol作为属性名，该属性不会出现在for..in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames() 返回，可以用Object.getOwnPropertySymbols 方法获取，另外Reflect.ownKeys 方法可以返回所有类型的键名，包括常规键名和Symbol键名
+ Symbol.for: 有时候我们希望重新使用同一个Symbol值 Symbol.for 方法可以做到。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值，如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。 
+ Symbol.for() 与 Symbol() 这两种写的，都会生成新的Symbol。区别是，前者会被登记在全局环境中供搜索，而后者不会。Symbol.for()不会每次调用都返回一个新的Symbol类型的值，而是先检查给定的key是否已存在，如果不存在，才回新建一个值。Symbol()写法没有登记机制，所以每次调用都会返回一个不同的值。
+ Symbol.keyFor(): 该方法返回一个已登记的Symbol类型值的key
+ Symbol.for 为 Symbol 值登记的名字是全局环境的，可以在不同的iframe或service.worker中取到同一个值
```
/**Symbol */

// let s = Symbol();

// 属性名的遍历
// var obj = {};
// var a = Symbol('a');
// var b = Symbol.for('b');

// obj[a] = 'Hello';
// obj[b] = 'World';

// var objectSymbols =Object.getOwnPropertySymbols(obj);
// console.log(objectSymbols);
// var objectReflct = Reflect.ownKeys(obj);
// console.log(objectReflct);

// Symbol.for 为 Symbol 值登记的名字是全局环境的，可以在不同的iframe或service.worker中取到同一个值
// var s1 = Symbol.for('foo');
// var s2 = Symbol.for('foo');
// // console.log(s1 === s2)

// iframe = document.createElement('iframe');
// iframe.src = String(window.location);
// document.body.appendChild(iframe);

// var bool = iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')
// console.log(bool);

// ES6 提供了11个内置的Symbol值，指向语言内部使用的方法
// 1.Symbol.hasInstance -- instanceof 内部调用的这个方法(实际未调用自己设置的这个方法)
// class MyClass {
//     [Symbol.hasInstance](foo){
//         console.log(foo,'foo')
//         return foo instanceof Array;
//     }
// }
// var o = new MyClass();
// // var bool = o instanceof Array;
// var bool = o instanceof MyClass;
// console.log(bool);
// console.log(MyClass[Symbol.hasInstance](o));

// 2.Symbol.isConcatSpreadable 等于一个布尔值，表示该数据结构是否是可扩展的
// 对于数组 表示该使用Array.prototype.concat()时，是否可以展开
// let arr1 = ['c', 'd'];
// let result = ['a', 'b'].concat(arr1, 'e');
// console.log(result);

// let arr2 = ['c', 'd'];
// arr2[Symbol.isConcatSpreadable] = false;
// let result = ['a', 'b'].concat(arr2, 'e');
// console.log(result);
// 数组的 Symbol.isConcatSpreadable 属性默认为 true，表示可以展开。类数组对象也可以展开，但其Symbol.isConcatSpreadable默认为false，必须手动打开
// 对于一个类 Symbol.isConcatSpreadable 属性必须写成一个返回布尔值的方法。

// 3.Symbol.species 对象作为构造函数时，如果这个方法存在，就会使用这个属性作为构造函数来创造新的实例对象

// 4. Symbol.match 指向一个函数，调用str.match时会调用

// 5. Symbol.replace 指向一个函数，调用String.prototype.replace 方法时调用

// 6. Symbol.search 指向一个函数，调用String.prototype.replace 方法时调用

// 7. Symbol.split 指向一个方法，调用String.prototype.split 方法时调用

// 8. Symbol.interator 指向默认遍历器方法，即对象在for...of循环时会调用这个方法

// 9. Symbol.toPrimitive 指向一个方法，对象被转为原始类型的值时会调用这个方法，返回该对象对应的原始类型的值

// let obj = {
//     [Symbol.toPrimitive] (hint){
//         switch (hint){
//             case 'number':
//                 return 123;
//             case 'string':
//                 return 'str';
//             case 'default':
//                 return 'default';
//             default:
//                 throw new Error();
//         }
//     }
// }

// console.log(2 * obj); // 246
// console.log(3 + obj); // 3default
// console.log(obj === 'default'); // false
// console.log(String(obj)); // default

// 10. Symbol.toStringTag 指向一个方法，在对象上调用 Object.prototype.toString方法时，如果这个属性存在，其返回值会出现在toString方法返回的字符串中，表示对象的类型。也就是说，这个属性可以用于定时[object Object] 或 [object Array]中object后面的字符串 

// var type = ({[Symbol.toStringTag]: 'Foo'}).toString();
// console.log(type) // Foo

// class Collection {
//     get [Symbol.toStringTag] (){
//         return 'xxx';
//     }
// }
// var x = new Collection();

// console.log(Object.prototype.toString.call(x)); // [object xxx]

// 11. Symbol.unscopables 指向一个方法，制定了使用with关键字时，哪些属性会被with环境排除

// 没有 unscopables 时
// class MyClass {
//     foo(){
//         console.log(1);
//         return 1;
//     }
// }
// var foo = function (){
//     console.log(2);
//     return 2;
// }
// with(MyClass.prototype){
//     foo(); // 1
// }

// 有 unscopables 时
// class MyClass {
//     foo(){
//         console.log(1);
//         return 1;
//     }
//     get[Symbol.unscopables] (){
//         return { foo: true }; // MyClass 的 foo方法被排除在with环境中
//     }
// }

// var foo = function (){
//     console.log(2);
//     return 2;
// }
// with(MyClass.prototype){
//     foo();
// }


/**其它相关知识 1 */
// ES6 新增内置对象的 Symbol.toStringTag 属性值如下：

// 可直接在控制台查看 -- 通过构造函数
// JSON[Symbol.toStringTag]: 'JSON'
// Math[Symbol.toStringTag]: 'Math'
// ArrayBuffer.prototype[Symbol.toStringTag]:'ArrayBuffer'
// DataView.prototype[Symbol.toStringTag]: 'DataView'
// Map.prototype[Symbol.toStringTag]: 'Map'
// Promise.prototype[Symbol.toStringTag]: 'Promise'
// Set.prototype[Symbol.toStringTag]: 'Set'
// WeakMap.prototype[Symbol.toStringTag]: 'WeakMap'
// WeakSet.prototype[Symbol.toStringTag]: 'WeakSet'
// Symbol.prototype[Symbol.toStringTag]: 'Symbol'

// 需要生成实例 在实例上查看
// Module[Symbol.toStringTag]: 'Module'
// %TypedArray%.prototype[Symbol.toStringTag]: 'Uint8Array等'
// %MapIteratorPrototype%[Symbol.toStringTag]: 'Map Iterator'
// %SetIteratorPrototype%[Symbol.toStringTag]: 'Set Iterator'
// %StringIteratorPrototype%[Symbol.toStringTag]: 'String Iterator'
// Generator.prototype[Symbol.toStringTag]: 'Generator'
// GeneratorFunction.prototype[Symbol.toStringTag]: 'GeneratorFunction'

/**其它相关知识 2 */
// /*
// dataview 了解
// const buffer = new ArrayBuffer(16);
// const view1 = new DataView(buffer);
// const view2 = new DataView(buffer, 12, 4);
// console.log(view1,view2)
// view1.setInt8(12, 42);
// console.log(view1);
// console.log(view2.getInt8(0));

// DataView 视图是一个可以从二进制ArrayBuffer对象中毒蝎多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序问题
// 参数： new DataView(buffer [, byteOffset [, byteLength]])
// buffer：一个已经存在的ArrayBuffer或SharedArrayBuffer对象，DataView对象的数据源
// byteOffset：此DataView对象的第一个字节在buffer中的字节偏移，未指定时，默认从第一个字节开始
// byteLength：此DataView对象的字节长度，未指定，则这个视图的长度将匹配buffer的长度
// 返回值：一个表示指定数据缓存区的心 DataView 对象。 --- 你可以把返回的对象想象成一个二进制字节缓存区 array buffer 的“解释器”——它知道如何在读取或写入时正确地转换字节码。这意味着它能在二进制层面处理整数与浮点转化、字节顺序等其他有关的细节问题。

// */

/**其它相关知识 3 */
// /*
//  with 语句
// 警告：不建议使用with语句，因为它可能是混淆错误和兼容性问题的根源
// with语句 扩展一个语句的作用域链

// with (expression) {
//     statement
// }
// expression
// 将给定的表达式添加到在评估语句时使用的作用域链上。表达式周围的括号是必需的。
// statement
// 任何语句。要执行多个语句，请使用一个块语句 ({ ... })对这些语句进行分组。

//  */
```

## Proxy
+ Proxy 可以理解成在目标对象前架设一个“拦截”层，由它来代理某些操作，可以理解为代理器
+ ES6 原生提供Proxy构造函数，用于生成Proxy实例
+ 作为构造函数Proxy接受两个参数：第一个参数是所要代理的目标对象，第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作
+ 要使Proxy起作用，必须针对Proxy实例进行操作，而不是针对目标对象进行操作
+ 一个技巧是将Proxy对象设置到object.proxy属性，从而可以在object对象上调用
+ Proxy实例也可以作为其它对象的原型对象
## Proxy支持的拦截操作
+ get(target,propKey,reveiver) get方法用于拦截某个属性的读取操作；get方法可以继承；利用get操作，可以实现属性的链式操作
+ set(target,propKey,value,receiver) set方法拦截对象属性的设置；利用set方法还可以数据绑定，即每当对象发生变化时，会自动更新DOM；结合get和set，可以设置以"_"开头的私有属性，防止其被外界读取
+ has(target, propKey) 拦截propKey in proxy 的操作 返回一个布尔值；has方法可以隐藏某些属性，不被in操作符发现；如果原对象(target)不可配置或禁止扩展，此时has拦截会报错
+ deleteProperty(target, propKey) 拦截delete proxy[propKey]的操作，返回一个布尔值；deleteProperty用于拦截delete操作，如果这个方法抛出错误或返回false，当前属性就无法被delete命令删除
+ enumerate(target) 拦截for(var x in proxy) 返回一个遍历器，即拦截for..in循环如果enumerate方法返回的不是一个对象，就会报错
+ hasOwn(target, propKey) 拦截proxy.hasOwnProperty('foo'),返回一个布尔值；
+ ownKeys(target) 拦截Object.getOwnpropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy),返回一个数组，该方法返回对象所有自身属性，而Object.keys()仅返回对象可遍历的属性
+ getOwnpropertyDescriptor(target, propKey) 拦截Object.getOwnPropertyDescriptor(proxy, propKey),返回属性的描述对象
+ defineProperty(target,propKey,propDesc) 拦截Object.defineProperty(proxy, propKey, propDesc)、Object.defineProperties(proxy, propDescs),返回一个布尔值
+ preventExtensions(target) 拦截Object.preventExtensions(proxy) 返回一个布尔值
+ getPrototypeOf(target) 拦截Object.getPrototypeOf(proxy),返回一个对象
+ isExtensible(target) 拦截Object.isExtensible(proxy),返回一个布尔值
+ setPrototypeOf(target, proto) 拦截Object.setPrototypeOf(proxy,proto)，返回一个布尔值，
+ 如果目标对象时函数，那么还有两种操作可以拦截：
+ apply(target, object, args) 拦截Proxy实例作为函数调用的操作，比如proxy(...args)、proxy.call(object,...args)、proxy.apply(object,args);
+ construct(target, args, proxy) 拦截Proxy实例作为构造函数调用的操作，比如 new proxy(...args)
```
/* Proxy */

// var target = {}
// var obj = new Proxy(target, {
//     get: function (target, key, receiver){
//         console.log(`getting ${key}`, target, key, receiver);
//         return Reflect.get(target, key, receiver);
//     },
//     set: function (target, key, value, receiver){
//         console.log(`setting ${key}`, target, key, value, receiver);
//         return Reflect.set(target, key, value, receiver);
//     }
// })
// obj.count = 1;
// ++obj.count;
// target.count = 1; // 给目标对象直接操作 不会触发proxy 只有操作代理对象Proxy的实例 才会触发

// var proxy = new Proxy({}, {
//     get: function(target, property){
//         return 35;
//     }
// })

// console.log(Object.prototype.toString.call(proxy)); //  '[object Object]'
// console.log(Object.prototype.toString.call(Proxy)); //  '[object Function]'
// console.log(proxy.time); // 35
// console.log(proxy.name); // 35

// 要使Proxy起作用，必须针对Proxy实例进行操作，而不是针对目标对象进行操作
// var target = {}
// var handler = {}
// var proxy = new Proxy(target, handler);
// proxy.a = 'b'
// console.log(target.a)

// 一个拦截器可以设置多个拦截操作
// var funcTarget = function (x, y){
//     return x + y;
// }
// var funcHandler = {
//     get: function (target, name){
//         if(name === 'prototype') return Object.prototype;
//         return 'Hello, ' + name;
//     },
//     apply: function (target, thisBinding, args){ return args[0]; },
//     construct: function (target, args){ return { value: args[1] }; }
// }
// var fProxy = new Proxy(funcTarget, funcHandler);
// console.log(fProxy(1, 2));
// console.log(new fProxy(1, 2).value);
// console.log(fProxy.prototype);
// console.log(fProxy.hhk);

// var objTarget = {}
// var objHandler = {
//     get: function (target, key, receiver){
//         console.log(`getting ${key}`, target, key, receiver);
//         return Reflect.get(target, key, receiver);
//     },
//     set: function (target, key, value, receiver){
//         console.log(`setting ${key}`, target, key, value, receiver);
//         return Reflect.set(target, key, value, receiver);
//     },
//     has: function (target, propKey){
//         return false; // 返回值会被强制转为boolean再进行return
//     },
//     deleteProperty: function (target, propKey){
//         // delete code  --- 需要自定义删除操作 否则删除失败
//         return true; 
//     },
// }
// var objProxy = new Proxy(objTarget, objHandler);
// console.log('name1' in objProxy); // 需查看在代理对象中的属性，而不是目标对象
// objProxy.name = 1;
// console.log(delete objProxy['name'])
// console.log(objProxy['name'])

// get方法可以继承
// let proto = new Proxy({}, {
//     get(target, propertyKey, receiver) {
//         console.log('GET '+ propertyKey);
//         return target[propertyKey];
//     }
// })
// let obj = Object.create(proto);
// obj.xxx

// 使用get方法拦截实现数组读取负数索引

// function createArray (...elements) {
//     let handler = {
//         get (target, propKey, receiver){
//             let index = Number(propKey);
//             if(index < 0){
//                 propKey = String(target.length + index);
//             }
//             return Reflect.get(target, propKey, receiver);
//         }
//     };
//     let target = [];
//     target.push(...elements);
//     return new Proxy(target, handler);
// }
// let tempArr = [1, 2, 3];
// let arr = createArray(...tempArr);
// // let arr = createArray('a', 'b', 'c');
// console.log(arr[1], arr[-1]);


// 通过Proxy，可以将读取属性的操作（get）转变为执行某个函数，从而实现属性的链式操作
// var pipe = (function (){
//     var pipe;
//     return function (value){
//         pipe = [];
//         return new Proxy({}, {
//             get: function (pipeObject, fnName, receiver){
//                 if(fnName == 'get'){
//                     return pipe.reduce(function (val, fn){
//                         return fn(val);
//                     }, value)
//                 }
//                 pipe.push(fnObj[fnName]);
//                 return receiver;
//             }
//         });
//     }
// }());
// var fnObj ={
//     double: n => n * 2,
//     pow: n => n * n,
//     reverseInt: n => n.toString().split('').reverse().join('') | 0
// }
// var result = pipe(3).double.pow.reverseInt.get;
// console.log(result);

// set 方法用于拦截某个属性的赋值操作
// 假定Person对象有一个age属性 该属性应该是一个不大于200的整数，可以使用Proxy保证age属性符合要求
// let validator = {
//     set: function (obj, prop, value){
//         if(prop === 'age'){
//             if(!Number.isInteger(value)){
//                 throw new TypeError('The age is not an integer');
//             }
//             if(value > 200){
//                 throw new RangeError('The age seems invalid');
//             }
//         }
//         obj[prop] = value;
//     }
// }
// let person = new Proxy({}, validator);
// person.age = 30;
// console.log(person.age);

// 利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新DOM
// 利用set方法，还可以设置私有属性，比如以下划线_开头，防止外部访问
// var handler = {
//     get (target, key){
//         invariant(key, 'get');
//         return target[key];
//     },
//     set (target, key, value){
//         invariant(key, 'set');
//         target[key] = value;
//         return true;
//     }
// }
// function invariant (key, action){
//     if(key[0] === '_'){
//         throw new Error(`Invalid attempt to ${action} privite "${key}" property`);
//     }
// }
// var proxy = new Proxy({}, handler);
// proxy._prop
// proxy._prop = 1

// apply() 方法拦截函数的调用、call 和 apply 操作
// apply方法可以接受3个参数，分别是目标对象、目标对象的上下文（this）和目标对象的参数数组

// var target = function (){ return 'I am the target'; };
// var handler = {
//     apply: function (){
//         return 'I am the proxy';
//     }
// };
// var p = new Proxy(target, handler);
// console.log(p());

// var twice = {
//     apply: function (target, ctx, args){
//         return Reflect.apply(...arguments) * 2;
//     }
// };
// function sum (left, right){
//     return left + right;
// }
// var proxy = new Proxy(sum, twice);
// console.log(proxy(1, 2));
// console.log(proxy.call(null, 5, 6));
// console.log(proxy.apply(null, [7, 8]));
// // 直接调用Reflect.apply方法也会被拦截
// console.log(Reflect.apply(proxy, null, [9, 10])); 

// has() has方法可以隐藏某些属性 不被 in 操作符发现
// var handler = {
//     has (target, key){
//         if(key[0] === '_'){
//             return false;
//         }
//         return key in target;
//     }
// };
// var target = {
//     _prop: 'foo',
//     prop: 'lip'
// }
// var proxy = new Proxy(target, handler);
// console.log('prop' in proxy);
// console.log('_prop' in proxy);
// 如果原对象不可配置或禁止扩展，那么此时has拦截会报错
// var obj = { a: 10 }
// Object.preventExtensions(obj);
// var p = new Proxy(obj, {
//     has: function (target, prop){
//         return false;
//     }
// });
// console.log('a' in p);

// construct() construct方法用于拦截new 命令
// var handler = {
//     construct (target, args){
//         return new target(...args);
//     }
// }

// var p = new Proxy(function (){}, {
//     construct: function (target, args){
//         console.log('called: ' + args.join(', '));
//         return { value: args[0] * 10};
//     }
// });
// console.log(new p(5).value);
// 如果construct方法返回的不是对象，就会抛出错误
// var p = new Proxy(function (){}, {
//     construct: function (target, args){
//         return 1;
//     }
// }) 
// new p();

// deleteProperty() deleteProperty 方法用于拦截 delete 操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除
// var handler = {
//     deleteProperty (target, key){
//         // invariant(key, 'delete');
//         delete target[key];
//         return true;
//     }
// };
// function invariant (key, action){
//     if(key[0] === '_'){
//         throw new Error(`Invalid attempt to ${action} private "${key}" property`);
//     }
// }
// var target = { _prop: 'foo' };
// var proxy = new Proxy(target, handler);
// delete proxy._prop;

// defineProperty() defineProperty 方法拦截了Object.defineProperty 操作
// var handler = {
//     defineProperty (target, key, descriptor){
//         // console.log(target, key, descriptor);
//         return false;
//     }
// }
// var target = {};
// var proxy = new Proxy(target, handler);
// proxy.foo = 'bar';

// enumerate() enumerate 方法用于拦截for...in循环
// var handler = {
//     enumerate (target){
//         console.log(target);  // 实际未生效 没有打印 enumerate方法未走到  可能是目前的ES标准暂未实现 
//         return Object.keys(target).filter(key => key[0] !== '_')[Symbol.iterator]();
//     }
// }
// var target = {
//     prop: 'foo',
//     _bar: 'baz',
//     _prop: 'foo',
// }
// var proxy = new Proxy(target, handler);
// for(let key in proxy){
//     console.log(key);
// }

// var p = new Proxy({}, {
//     enumerate (target) {
//         console.log('called'); // 未打印
//         return ['a', 'b', 'c'][Symbol.iterator]();
//     }
// });
// for(var key in p){
//     console.log(key); // 未打印
// }

// 如果enumerate方法返回的不是一个对象 就会报错
// var p = new Proxy({}, {
//     enumerate (target){
//         return 1;
//     }
// });
// for(var key in p){
//     // 应该报错  实际未报错 
// }

// getOwnPropertyDescriptor() getOwnPropertyDescriptor方法拦截Object.getOwnPropertyDescriptor,返回一个属性描述对象或undefined
// var handler = {
//     getOwnPropertyDescriptor (target, key){
//         if(key[0] === '_'){
//             // return 1; //返回值不为属性描述对象或undefined时 报错
//             return;
//         }
//         return Object.getOwnPropertyDescriptor(target, key);
//     }
// }
// var target = {
//     _foo: 'bar',
//     baz: 'tar',
// }
// var proxy = new Proxy(target, handler);
// console.log(Object.getOwnPropertyDescriptor(proxy, 'wat'));
// console.log(Object.getOwnPropertyDescriptor(proxy, '_foo'));
// console.log(Object.getOwnPropertyDescriptor(proxy, 'baz'));

// getPrototypeOf() getPrototypeOf方法主要用于拦截Object.getPrototypeOf()运算符，以及下面其他一些操作：
// Object.prototype.__proto__
// Object.prototype.isPrototypeOf()
// Object.getPrototypeOf()
// Reflect.getPrototypeOf()
// instanceof 运算符

// var proto = { a: 1 };
// var p = new Proxy({}, {
//     getPrototypeOf (target){
//         console.log('called');
//         return proto;
//     }
// });
// console.log(Object.getPrototypeOf(p) === proto); // true

// isExtensible() isExtensible方法拦截Object.isExtensible 操作
// var p = new Proxy({}, {
//     isExtensible (target){
//         console.log('called');
//         return true;
//     }
// });
// console.log(Object.isExtensible(p));

// 这个方法有一个强限制，如果不能满足以下条件就会报错：
// Object.isExtensible(proxy) === Object.isExtensible(target)
// 如下
// var p = new Proxy({}, {
//     isExtensible: function (target) {
//         return false;
//     }
// })
// console.log(Object.isExtensible(p)); // 报错

// ownKeys() ownKeys方法用于拦截Object.keys操作
// let target = {
//     hello1: 1,
//     world2: 2
// };
// let handler = {
//     ownKeys (target){
//         console.log('called'); // 此处有调用
//         // return ['hello', 'world']; // 设置的返回值没生效 只有target自身有的属性才能生效
//         return Reflect.ownKeys(target).concat(['hello', 'world']);
//     }
// };
// let proxy = new Proxy(target, handler);
// // console.log(Object.keys(proxy));
// for(let key of Object.keys(proxy)){
//     console.log(key); // prop
// }

// 拦截第一个字符为下划线的属性名
// var target = {
//     _bar: 'foo',
//     _prop: 'bar',
//     prop: 'baz',
// };
// var handler = {
//     ownKeys (target){
//         return Reflect.ownKeys(target).filter(key => key[0] !== '_');
//     }
// };
// var proxy = new Proxy(target, handler);
// for(let key of Object.keys(proxy)){
//     console.log(key); // prop
// }

// preventExtensions() preventExtensions 方法拦截Object.preventExtensions() 该方法必须返回一个布尔值
// 这个方法有一个限制，只有当Object,isExtensible(proxy)为false（即不可扩展）时，proxy.preventExtensions才能返回true 否则会报错

// var p = new Proxy({}, {
//     preventExtensions (target){
//         return true;
//     }
// })
// console.log(Object.isExtensible(p)); // true
// console.log(Object.preventExtensions(p)); // 报错 只有Object.isExtensible返回false时 Object.preventExtensions才能返回true 否则报错

// 为防止出现这个报错问题，通常要在proxy.preventExtensions方法中调用一次 Object.preventExtensions
// var p = new Proxy({}, {
//     preventExtensions (target){
//         console.log('called');
//         Object.preventExtensions(target);
//         return true;
//     }
// })
// console.log(Object.isExtensible(p)); // true
// console.log(Object.preventExtensions(p)); // 返回值为proxy实例

// setPrototypeOf() setPrototypeOf方法主要用于拦截Object.setPrototypeOf方法

// 不允许修改原型的例子
// var handler = {
//     setPrototypeOf (target, proto){
//         throw new Error('Changing the prototype is forbidden'); // 不允许修改原型的场景
//         // return Reflect.setPrototypeOf(target, proto); // 设置生效的场景
//     }
// };
// var proto = {};
// var target = function (){};
// var proxy = new Proxy(target, handler);
// console.log(Object.setPrototypeOf(proxy, proto));
// console.log(Object.getPrototypeOf(proxy) === proto);

// Proxy.revocable() 返回一个可取消的Proxy实例
// let target = {};
// let handler = {};
// let {proxy, revoke } = Proxy.revocable(target, handler);
// proxy.foo = 123;
// console.log(proxy.foo);
// revoke();
// console.log(proxy.foo); // 报错 TypeError: Cannot perform 'get' on a proxy that has been revoked

```

## Iterator 接口 和 for...of 循环
+ 遍历器(Iterator)是一种机制，为各种不同的数据结构提供统一的访问机制，任何数据结构，只要部署了Iterator接口，就可以完成遍历操作
+ Iterator 的作用有三个：一是为各种数据结构提供统一的、简便的访问接口；二是使得数据结构的成员能够按某种 次序排列；三是ES6创造了一种新的遍历命令————for...of循环，Iterator接口主要供for...of消费
+ ES6规定，默认的Iterator接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是"可遍历的"
+ 在es6中，有3类数据结构原生具备Iterator接口：数组、某些类数组的对象、Set和Map结构
+ 调用 Iterator 接口的场景： 解构赋值、扩展运算符、yield*、for...of、Array.from、Map()、Set()、WeakMap()、WeakSet()、Promise.all()、Promise.race()
+ 字符串是一个类数组对象，也原生具有Iterator接口，Symbol.iterator属性对应一个函数，执行后返回当前对象的遍历器对象，在其上可以调用next方法实现对于字符串的遍历
+ for...of循环可以使用的范围包括数组、Set和Map结构、某些类似数组的对象(比如arguments对象、DOM NodeList对象)、Generator对象、字符串
+ for...in循环只能获得数组或对象的键名key，for...of循环获取的是键值value
+ for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性
    ```
        var arr = [3,4,5];
        arr.foo = 'hello';
        for(let v of arr){
            console.log(v); // 3,4,5
        }
        for(let i in arr){
            console.log(i); // 0,1,2'foo'
        }
    ```
+ 计算生成的数据结构：有些数据结构是在现有数据结构的基础上计算生成的，比如ES6的数组、Set、Map都部署了entries、keys、values三个方法，调用后都返回遍历器对象
+ 对于普通对象，for...of循环不能直接使用，可以通过Object.keys获取对象的键名，再使用for...of遍历这个数组；或者将数组的Symbol.iterator赋给其它对象的Symbol.iterator（比如jQuery对象）;或者使用Generator函数将对象重新包装一下
    ```
        var obj = {
            a: 1,
            b: 2,
            c: 3
        }
        function* entries(obj){
            for(let key of Object.keys(obj)){
                yield [key, obj[key]];
            }
        }
        for(let [key,value] of entries(obj)){
            console.log(key, "->", value);
        }
    ```
+ for...of与其它遍历语法的比较：
    + 数组最原始的for循环：写法比较麻烦
    + 数组forEach循环：无法中途跳出forEach循环，break命令或return命令都不能奏效
    + for...in循环可以遍历键名，但还会遍历手动添加的其它键，甚至包括原型链上的键，且某些情况下回以任意顺序遍历键名，for...in循环主要是为遍历对象而设计的，不适用于遍历数组
    + for...of写法同for...in一样简洁，且可以配合break、continue、return使用
```
// Iterator 接口 和 for...of 循环

// yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口
// let generator = function* (){
//     yield 1;
//     yield* [2,3,4];
//     yield 5;
// }
// var iterator = generator();
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

// 可以覆盖原生的Symbol.iterator方法，达到修改遍历器行为的目的
// var str = new String('hi');
// console.log([...str]);
// str[Symbol.iterator] = function (){
//     return {
//         next: function (){
//             if(this._first){
//                 this._first = false;
//                 return { value: 'haha', done: false }
//             } else {
//                 return { done: true }
//             }
//             // return { value: 'haha', done: false } // 会一直取next 导致内存溢出
//             // return { value: 'haha', done: true } // done：true则不会内存溢出 
//         },
//         _first: true
//     }
// }

// console.log([...str]);
// console.log(str);

// Symbol.iterator 方法的最简单实现还是使用 Generator 函数

// let obj = {
//     * [Symbol.iterator] (){
//         yield 'hello';
//         yield 'world';
//         // yield* 'hello';
//         // yield* 'world';
//     }
// };
// for(let x of obj){
//     console.log(x);
// }

// for...of循环内部调用的是数据结构的 Symbol.iterator 方法
// 数组
// var arr = ['red','green','blue'];
// var iterator = arr[Symbol.iterator]();
// for(let v of arr){
//     console.log(v);
// }
// for(let v of iterator){
//     console.log(v);
// }

// var arr = [3,4,5];
// arr.foo = 'hello';
// for(let v of arr){
//     console.log(v); // 3,4,5
// }
// for(let i in arr){
//     console.log(i); // 0,1,2'foo'
// }

// 普通对象
// jQuery.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// var obj = {
//     a: 1,
//     b: 2,
//     c: 3
// }
// function* entries(obj){
//     for(let key of Object.keys(obj)){
//         yield [key, obj[key]];
//     }
// }
// for(let [key,value] of entries(obj)){
//     console.log(key, "->", value);
// }
```

## Generator函数
+ 可以把Generator函数理解成一个状态机，内部封装了很多状态
+ 调用Generator函数后，该函数并不执行，返回的也不是函数运行的结果，而是返回一个遍历器对象（一个指向内部状态的指针对象），
+ 必须调用遍历器对象的next方法，使得指针移向下一状态，next方法返回一个有着value和done属性的对象
+ Generator函数是分段执行的，yield语句是暂停执行的标记，而next方法可以恢复执行
+ yield语句和return语句有区别，yield语句可以执行多次，return语句只执行一次，执行return后 返回的对象done变为true
+ yield语句本身没有返回值，会者说返回值总是undefined
+ next方法可以带一个参数，该参数会被当做上一条yield语句的返回值
+ for...of循环可以自动遍历Generator函数，此时不需要调用next方法
+ for...of循环、扩展运算符、解构赋值、Array.from方法内部调用的都是遍历器接口，所以都可以将Generator函数返回的Iterator对象作为参数
+ 原生的js对象没有遍历接口，可以使用for...of遍历对象的key的数组，再配合Generator函数和yield 为对象部署遍历器接口
+ Generator函数返回的遍历器对象上有一个throw方法：Generator.prototype.throw() 该方法可以在函数体外抛出错误，然后在函数体内捕获
+ Generator函数返回的遍历器对象上有一个return方法：Generator.prototype.return() 可以返回给定的值，并结束Generator函数的遍历，遍历器对象调用return方法后，返回值的value属性就是return方法的参数，同时Generator函数终止遍历，返回值的done属性为true，以后再调用next方法，done属性总是返回true
+ yield* 语句可以在一个Generator函数内执行另一个Generator函数：从语法角度看，如果一个yield命令后面跟的是一个遍历器对象，那么需要在yield命令后面加上星号*，表明返回的是一个遍历器对象。yield* 可以视为for...of和yield组合的简写。
+ Generator函数返回的总是遍历器对象，而不是 this 对象 （可以先创建一个空对象，在通过bind绑定Generator函数内部的this）
+ Generator函数推导：针对大数组的遍历，可以在遍历时再生成数组，节省系统资源
+ Generator 与状态机：相比ES5实现状态机，不用再保存外部状态变量，更简洁，更安全（不会被非法篡改），更符合函数式编程思想；Generator之所以可以不用外部变量保存状态，因为它本身就包含了一个状态信息，即目前是否处于暂停状态
+ Generator函数的应用
    + 异步操作的同步化表达：ajax请求、读文件等异步操作
    + 控制流管理
    + 部署Interator接口
    + 作为数据结构
```
// Generator 函数

// function* helloWorldGenerator() {
//   console.log(1);
//   yield 'hello';
//   console.log(2);
//   yield 'world';
//   console.log(3);
//   return 'ending';
// }
// var hw = helloWorldGenerator();
// console.log(hw)
// hw.next();
// hw.next();

// function * f(){
//     for(var i = 0; true; i++){
//         var reset = yield i;
//         console.log(reset,'reset');
//         if(reset){ i = -1; }
//     }
// }
// var g = f();
// console.log(g.next());
// console.log(g.next());
// console.log(g.next());
// console.log(g.next());
// console.log(g.next(true));

// function* dataConsumer (){
//     console.log('Started');
//     console.log(`1.${yield}`);
//     console.log(`2.${yield}`);
//     return 'result';
// }
// let genObj = dataConsumer();
// genObj.next(); // Started
// genObj.next('hi'); // 1.hi
// genObj.next('haha'); // 2.haha
// genObj.next('hehe'); // 已结束运行


// var g = function* (){
//     while (true){
//         try{
//             yield;
//         } catch (e){
//             if(e != 'a') throw e;
//             console.log('内部捕获', e);
//         }
//     }
// }
// var i = g();
// i.next();
// try {
//     i.throw('a');
//     i.throw('b');
// } catch (e){
//     console.log('外部捕获', e);
// }

// var gen = function* (){
//     yield console.log('hello');
//     yield console.log('world');
// }
// var g = gen();
// g.next();
// try{
//     // g.throw();
//     throw new Error();
// } catch (e){
//     console.log('catch')
//     g.next();
// }


// function* getFuncWithReturn (){
//     yield 'a';
//     yield 'b';
//     return 'the result';
// }
// function* logReturned(getObj){
//     let result = yield* getObj;
//     console.log(result);
// }
// var it = [...logReturned(getFuncWithReturn())];


// 使用yield* 命令去除嵌套数组的所有成员
// function* iterTree (tree){
//     if(Array.isArray(tree)){
//         for(let i = 0;i < tree.length;i++){
//             yield* iterTree(tree[i]);
//         }
//     } else {
//         yield tree;
//     }
// }
// var tree = ['a', ['b', 'c'], ['d', 'e']];
// for(let x of iterTree(tree)){
//     console.log(x);
// }

/** 使用yield*语句遍历完全二叉树 */
// // 二叉树构造函数，三个参数分别是：左子树、当前节点、右子树
// function Tree (left, label, right){
//     this.left = left;
//     this.label = label;
//     this.right = right;
// }
// // 中序（inorder）遍历函数
// // 由于返回的是一个遍历器，所以要使用Generator函数
// // 函数体内部采用递归算法，所以左子树、右子树需要用yield*遍历
// function* inorder (t){
//     if(t){
//         yield* inorder(t.left);
//         yield t.label;
//         yield* inorder(t.right);
//     }
// }
// // 生成二叉树
// function make(array){
//     if(array.length == 1) return new Tree(null, array[0], null);
//     return new Tree(make(array[0]), array[1], make(array[2]));
// }
// var tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);
// // 遍历二叉树
// var result = [];
// for(let node of inorder(tree)){
//     result.push(node);
// }

// function* g(){}
// g.prototype.hello = function (){
//     return 'hi';
// }
// let obj = g();
// obj instanceof g; //true
// obj.hello(); // hi

// function* F(){
//     yield this.x = 2;
//     yield this.y = 3;
// }
// console.log('next' in new F()); // F is not a constructor // chrome 101

// function* F(){
//     yield this.x = 2;
//     yield this.y = 3;
// }
// var obj = {};
// var f = F.call(obj);
// console.log(f.next());
// console.log(f.next());
// console.log(f.next());

// // Generator 函数推导
// var bigGenerator = function* (){
//     for(let i = 0;i < 100000; i++){
//         yield i;
//     }
// }
// // var squared =  (for (n of bigGenerator()) n*n); // 报错
// var squared =  bigGenerator();
// console.log(squared.next());

// Generator 与状态机
// var clock = function*(_){
//     while(true){
//         console.log('Tick!');
//         yield _;
//         console.log('Tock!');
//         yield _;
//     }
// };
// var c = clock();
// c.next();
// c.next();
// c.next();

// 通过Generator函数逐行读取文本
// function* numbers(){
//     let file = new FileReader('a.txt'); // 此种方式读取文件暂不支持 需要配合input来读取
//     try {
//         while(!file.eof) {
//             yield parseInt(file.readLine(), 10);
//         }
//     } finally {
//         file.close();
//     }
// }
/** FileReader 读取文件 */
// var myFile = document.querySelector('#myFile');
// myFile.onchange = function (){
//     var file = myFile.files[0];
//     console.log('file', file); // File 对象
//     let reader = new FileReader('a.txt');
//     // reader.readAsDataURL(file); // 读取为base64
//     reader.readAsText(file); // 读取为文本
//     reader.onload = function (){
//         // const img = new Image() // 若读取的文件是图片  则采用base64格式赋给Img对象
//         // img.src = reader.result
//         var data = reader.result;
//         console.log('data:', data);
//         document.body.innerHTML += reader.result
//     }
//     reader.onerror = function (){
//         console.log('读取失败');
//     }
// }
/**nodejs读取文件 */
// 1. 通过readline的方式
// const fs = require('fs');
// const readline = require('readline');
// let rl = readline.createInterface({
//     input: fs.createReadStream("./index.md")
// })
// let index = 0;
// rl.on('line', line => {
//     index++;
//     console.log(`第${index}行`, line);
// })

// 2.通过stream的方式
```

## Reflect
+ Reflect 对象与Proxy对象一样，也是ES6 为了操作对象而新提供的API，Reflect对象的设计目的有以下几个：
    + 1.将Object对象的一些明显属于语言层面的方法放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来新方法将只部署在Reflect对象上
    + 2.修改某些Object方法的返回结果，让其变得更合理。比如Object.defineProperty(obj, name, desc)在无法定义属性时会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false
    + 3.让Object操作都编程函数行为。某些Object操作是命令式，比如 name in obj 和 delete obj[name]，而 Reflect.has(obj, name) 和 Reflect.deleteProperty(obj, name)让它们变成了函数行为
    + 4.Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为
## Reflect对象的方法
+ Reflect.getOwnPropertyDescriptor(target, name)
+ Reflect.defineProperty(target, name, desc) -- 返回一个布尔值，表示操作是否成功，其对应的Object方法在失败时会抛出错误
+ Reflect.getOwnPropertyNames(target)
+ Reflect.getPrototypeOf(target) -- 读取对象的 __proto__属性，等同于Object.getPrototypeOf(target)
+ Reflect.setPrototypeOf(target, prototype) -- 设置对象的__proto__属性，（Object没有与此对应的方法）
+ Reflect.deleteProoerty(target, name) -- 等同于 delete target[name]
+ Reflect.enumerate(target)
+ Reflect.freeze(target) -- 返回一个布尔值，表示操作是否成功，其对应的Object方法在失败时会抛出错误
+ Reflect.seal(target) -- 封闭一个对象，阻止添加新属性，并将所有现有属性标记为不可配置，当前属性的值只要原来是可写的就可以改变；返回一个布尔值，表示操作是否成功，其对应的Object方法在失败时会抛出错误
+ Reflect.preventExtensions(target) -- 返回一个布尔值，表示操作是否成功，其对应的Object方法在失败时会抛出错误
+ Reflect.isFrozen(target)
+ Reflect.isSealed(target)
+ Reflect.isExtensible(target)
+ Reflect.has(target, name)  -- 等同于 name in target
+ Reflect.hasOwn(target, name)
+ Reflect.keys(target)
+ Reflect.get(target, name, receiver) -- 查找兵返回target的name属性，如果没有该属性，返回undefined，如果name属性部署了读取函数，则读取函数的this绑定receiver
+ Reflect.set(target, name, value, receiver) -- 设置target对象的name属性等于value，如果name属性设置了赋值函数，则赋值函数的this绑定receiver，返回一个布尔值，表示操作是否成功，其对应的Object方法在失败时会抛出错误
+ Reflect.apply(target, thisArg, args) -- 等同于Function.prototype.apply.call(target, thisArg, args) 一般来说 要绑定一个函数的this对象，可以写成fn.apply(obj,args)，但如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args) 采用Reflect对象可以简化这种操作
+ Reflect.construct(target, args) -- 等同于 new target(...args) 这提供了一种不使用new 来调用构造函数的方法
```
// Reflect

// let target = {}
// let proxy = new Proxy(target, {
//     set (target, propKey, value, receiver){
//         var success = Reflect.set(target, propKey, value, receiver);
//         if(success){
//             console.log(`property` + propKey + ' on ' + target + ' set to ' + value);
//         }
//         return success;
//     }
// })
// proxy.name = 'abc'
// console.log(proxy.name)

// var obj = {};
// var loggedObj = new Proxy(obj, {
//     get(target, name){
//         console.log('get', target, name);
//         return Reflect.get(target, name);
//     },
//     set(target, name, value){
//         console.log('set ' + name + ' of ' + value);
//         return Reflect.set(target, name, value);
//     },
//     deleteProperty (target, name){
//         console.log('delete' + name);
//         return Reflect.deleteProperty(target, name);
//     },
//     has (target, name){
//         console.log('has' + name);
//         return Reflect.has(target, name);
//     }
// });
// loggedObj.name = 1;
// console.log('name' in loggedObj);
// delete loggedObj.name;
// console.log('name' in loggedObj);

```

## 二进制数组
+ 二进制数组（ArrayBuffer对象、TypedArray视图 和 DataView视图） 是JavaScript操作二进制数据的一个接口。
+ 这个接口的原始设计目的与WebGL项目有关，允许像C语言一样直接操作字节。二进制数组很像C语言的数组，允许开发者以数组下标的形式直接操作内存，使开发者能通过JavaScript与操作系统的原生接口欧进行二进制通信
+ ArrayBuffer对象：代表内存中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这样就可以用数组的方法操作内存
+ TypedArray视图：共包括9种视图
    + Int8 8位带符号整数 字节长度1 对应的C语言类型：signed char
    + Uint8 8位不带符号整数 字节长度1 对应的C语言类型：unsigned char
    + Uint8C 8位不带符号整数（自动过滤溢出） 字节长度1 对应的C语言类型：unsigned char
    + Int16 18位带符号整数 字节长度2 对应的C语言类型：short
    + Uint16 16位不带符号整数 字节长度2 对应的C语言类型：unsigned short
    + Int32 32位带符号整数 字节长度4 对应的C语言类型：int
    + Uint32 32位不带符号整数 字节长度4 对应的C语言类型：unsigned int
    + Float32 32位浮点数 字节长度4 对应的C语言类型：float
    + Float64 64位浮点数 字节长度8 对应的C语言类型：double
+ DataView视图：可以自定义复合格式的视图。可以第一个字节是Uint8、第二个字节是Int16等
+ 总结：ArrayBuffer对象代表原始的二进制数据，TypedArray视图用于读/写简单类型的二进制数据，DataView视图用于读/写复杂类型的二进制数据
+ 很多浏览器操作的API用到了二进制数组操作二进制数据，比如：File API、XMLHttpRequest、Fetch API、Canvas、WebSockets
## ArrayBuffer对象
+ ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读/写，只能通过视图（TypedArray视图和DataView视图）读/写，视图的作用是以指定格式解读二进制数据
+ ArrayBuffer也是一个构造函数，参数是所需要的的内存大小，单位是字节；为了读/写这段内存，需要为它指定视图，创建DataView视图，需要提供ArrayBuffer对象实例作为参数。
    ```
        var buf = new ArrayBuffer(32);
        var dataView = new DataView(buf);
    ```
+ TypedArray视图与DataView视图的一个区别是，它不是一个构造函数，而是一组构造函数，使用两种不能视图操作同一段内存时，一个视图修改底层内存会影响到另一个
+ ArrayBuffer.prototype.byteLength  ArrayBuffer实例的byteLength属性返回所分配的内存区域的字节长度(如果分配的内存区域很大，有可能失败，因为可能没有那么多连续空余的内存，因此有必要检测是否分配成功)
+ ArrayBuffer.prototype.slice() ArrayBuffer 实例有一个slice方法，允许将内存区域的一部分复制生成一个新的ArrayBuffer对象；slice方法其实包含两步，第一步先分配一段新内存，第二部将原来那个ArrayBuffer对象复制过去；slice方法接受两个参数，第一个参数表示复制开始的字节序号（包含该字节）,第二个参数表示复制截止的字节序号（不含该字节），如果省略第二个参数，则默认复制到原ArrayBuffer对象的结尾 (除了slice方法，ArrayBuffer对象不提供任何直接读/写内存的方法，只允许在其上建立视图，然后通过视图进行读/写)
+ ArrayBuffer.isView()  ArrayBuffer 有一个静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视图实例，即判断参数是否为TypedArray实例或DataView实例
## TypedArray 视图
+ ArrayBuffer对象作为内存区域可以存放多种类型的数据。同一段内存，不同数据有不同的解读方式，这就叫做“视图”(view)。TypedArray视图一共包括9种类型，每一种视图都是一种构造函数。
    + Int8 8位带符号整数 字节长度1 对应的C语言类型：signed char
    + Uint8 8位不带符号整数 字节长度1 对应的C语言类型：unsigned char
    + Uint8C 8位不带符号整数（自动过滤溢出） 字节长度1 对应的C语言类型：unsigned char
    + Int16 18位带符号整数 字节长度2 对应的C语言类型：short
    + Uint16 16位不带符号整数 字节长度2 对应的C语言类型：unsigned short
    + Int32 32位带符号整数 字节长度4 对应的C语言类型：int
    + Uint32 32位不带符号整数 字节长度4 对应的C语言类型：unsigned int
    + Float32 32位浮点数 字节长度4 对应的C语言类型：float
    + Float64 64位浮点数 字节长度8 对应的C语言类型：double
+ 普通数组与TypedArray数组的差异主要有：
    + TypedArray 数组的所有成员都是同一种类型
    + TypedArray数组的成员是连续的，不会有空位
    + TypedArray数组成员的默认值是0
    + TypedArray数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象中，要获取底层对象必须使用buffer属性
+ 构造函数，TypedArray的9种构造函数，可以生成不同类型的数组实例，视图构造函数可以接受3个参数：
    + 第一个参数buffer（必需）：视图对应的底层ArrayBuffer对象
    + 第二个参数byteOffset=0（可选）：视图开始的字节序号，默认从0开始 -- btyeOffset必需与所要建立的数据类型一致，否则报错（即ArrayBuffer中的字节数与视图的字节数能匹配），如果想从任意字节开始解读ArrayBuffer，必需使用DataView视图
    + 第三个参数length（可选）：视图包含的数据个数，默认直到本段内存区域结束
+ TypedArray（length）视图还可以不通过ArrayBuffer对象，而是直接分配内存生成，此时构造函数的参数为成员数，即对应length属性
+ TypedArray(typedArray) TypedArray数组的构造函数还可以接受另一个TypedArray实例作为参数，新数组会重新开辟一段内存储存数据，而不会共用之前的内存
+ TypedArray(arrayLikeObject)构造函数的参数也可以是一个普通数组，然后直接生成TypedArray实例，TypedArray数组也可以转换回普通数组（Array.prototype.slice.call(typedArray)）
+ 数组方法：普通数组的操作方法和属性对TypedArray数组完全适用，但TypedArray数组没有concat方法
+ TypedArray数组与普通数组一样部署了Iterator接口，可以使用for...of循环
+ 字节序：字节序指的是数值在内存中的表示方式。x86体系的计算机都采用小端字节序（小端字节序将最不重要的字节排在后面，大端字节序相反），TypedArray数组内部也采用小端字节序读/写数据，或者更准确的说，按照本机操作系统设定的字节序读/写数据，这就导致对于大端字节序，TypedArray无法正确解析，为此引入了DataView对象，可以设定字节序
+ BYTES_PER_ELEMENT 属性：每一种视图的构造函数，都有一个BYTES_PER_ELEMENT属性，表示这种数据类型占据的字节数，这个属性在TypedArray实例上也可以获取
+ ArrayBuffer与字符串的互相转换：两者相互转换有一个前提，即字符串的编码方式是确定的
+ 溢出：TypedArray数组对溢出才用的处理方法是求余值。正向溢出时，等于最小值加余值减一；负向溢出时，等于最大值减余值加一；不同长度级是否带符号的TypedArray数组，取值范围不一样；8位无符号整数范围为0~255；8位带符号整数的取值范围是-128~127。Uint8ClampedArray视图的溢出规则不太一样，负向溢出都为0，正向溢出都为255。
+ TypedArray.prototype.buffer：TypedArray实例的buffer属性返回整段内存对应的ArrayBuffer对象，只读属性
+ TypedArray.prototype.byteLength: 该属性返回TypedArray数组占据的内存长度，单位为字节，只读属性
+ TypedArray.prototype.byteOffset：该属性返回TypedArray数组从底层ArrayBuffer对象的哪个字节开始，只读属性
+ TypedArray.prototype.length：该属性表示TypedArray数组含有多少个成员，是成员长度，对应8位的TypedArray数组，length和byteLength一致
+ TypedArray.prototype.set() set方法用于复制数组，也就是将一段内存完全复制到另一段内存，set方法还可以接受第二个参数，表示从目标对象的第几个成员，开始复制被复制对象
+ TypedArray.prototype.subarray() subarray方法是对于TypedArray数组的一部分再建立一个新的视图，subarray方法的第一个参数是起始成员序号，第二个参数是结束成员序号（不包含，省略则包含剩余的全部成员）
+ TypedArray.prototype.slice() slice方法返回一个指定位置的TypedArray实例，slice方法的参数表示原数组的具体位置，负值表示倒数第几个；
+ TypedArray.of() of方法用于将一个参数转为TypedArray实例
+ TypedArray.from()  from方法接受一个可遍历的数据结构（比如数组）作为参数，返回一个机遇次结构的TypedArray实例；该方法还可以将一种TypedArray实例转为另一种；from方法还可以接受一个函数作为第二个传参数，用于对每个元素进行遍历，类似map方法 --- 函数的处理在from之后，先转换类型再进行运算判断是否溢出
## 复合视图
+ 由于视图的构造函数可以指定起始位置和长度，所以同一段内存中可以依次存放不同类型的数据，叫做 复合视图
## DataView视图
+ 如果一段数据中包括多种数据类型（比如服务器传来的HTTP数据），这是除了复合视图外，还可以通过DataView视图来操作
+ DataView视图本身也是构造函数，接受一个ArrayBuffer对象作为参数生成视图
+ 原型上有三个属性：buffer、btyeLength、byteOffset
+ 8个方法读取内存：getInt8、getUint8等
+ 8个方法写入内存：setInt8、setUint8等
## 二进制数组的应用
+ Ajax
+ Canvas
+ WebSocket
+ Fetch API
+ File API
```
// 二进制数组
// ArrayBuffer也是一个构造函数，参数是所需要的的内存大小，单位是字节；为了读/写这段内存，需要为它指定视图，创建DataView视图，需要提供ArrayBuffer对象实例作为参数
// var buf = new ArrayBuffer(32);
// var dataView = new DataView(buf);
// console.log(dataView.getUint8(0));

// 使用两种不能视图操作同一段内存时，一个视图修改底层内存会影响到另一个
// var buffer = new ArrayBuffer(12);
// var x1 = new Int32Array(buffer);
// x1[0] = 1;
// var x2 = new Uint8Array(buffer);
// console.log(x2[0]);
// x2[0] = 2;
// console.log(x1[0],x2[0]);

// 检测是否分配内存成功
// var buf = new ArrayBuffer(19);
// console.log(buf.byteLength);
// if(buf.byteLength === 19){
//     console.log('内存分配成功');
// } else {
//     console.log('内存分配失败');
// }
// var buffer = new ArrayBuffer(8);
// var newBuffer = buffer.slice(0, 3);

// var buffer = new ArrayBuffer(8);
// console.log(ArrayBuffer.isView(buffer)); // false
// var v = new Int32Array(buffer);
// console.log(ArrayBuffer.isView(v)); // true

// 同一个ArrayBuffer对象上，可以根据不同的数据类型建立多个视图
// 创建一个8字节的ArrayBuffer
// var b = new ArrayBuffer(8);
// // 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
// var v1 = new Int32Array(b);
// // 创建一个指向b的Unit8视图，开始于字节2，知道缓冲区末尾
// var v2 = new Uint8Array(b, 2);
// // 创建一个指向b的Int16视图 开始于字节2，长度为2
// var v3 = new Int16Array(b, 2, 2);

// var buffer = new ArrayBuffer(8);
//  // 可以理解为用Int16视图解读此buffer时，前面空出的字节也一样得用这种方式解读 所以起始字节需要能被整除
// var i16 = new Int16Array(buffer, 1); // Uncaught RangeError: start offset of Int16Array should be a multiple of 2

// var f64a = new Float64Array(8);
// f64a[0] = 10;
// f64a[1] = 20;
// f64a[2] = f64a[0] + f64a[1];
// console.log(f64a);

// TypedArray数组的构造函数可以接受另一个TypedArray实例或普通数组作为参数，新数组会开辟一段新的内存储存数据
// var x = new Int8Array([1, 1]);
// var y = new Int8Array(x);
// console.log(x[0]);
// console.log(y[0]);
// x[0] = 2;
// console.log(x[0]);
// console.log(y[0]);

// TypedArray数组也可以转换回普通数组
// var typedArray = new Int8Array([1,2,3]);
// var normalArray = Array.prototype.slice.call(typedArray);
// console.log(normalArray);

// TypedArray数组没有concat方法，如果想要合并多个TypedArrray数组，可以用下面这个函数
// function concatnate (resultConstructor, ...arrays){
//     let totalLength = 0;
//     for(let arr of arrays){
//         totalLength += arr.length;
//     }
//     let result = new resultConstructor(totalLength);
//     let offset = 0;
//     for(let arr of arrays){
//         result.set(arr, offset);
//         offset += arr.length;
//     }
//     return result;
// }
// var result = concatnate(Uint8Array, Uint8Array.of(1, 2), Uint16Array.of(3, 4));
// console.log(result);

// TypedArray数组与普通数组一样部署了 Interator 接口，所以可以遍历
// let ui8 = Uint8Array.of(0, 1, 3);
// for(let byte of ui8){
//     console.log(byte);
// }

// 字节序是指数值在内存中的表示方式
// var buffer = new ArrayBuffer(16);
// var int32View = new Int32Array(buffer);
// for(var i = 0;i < int32View.length;i++){
//     int32View[i] = i * 2;
// }
// var int16View = new Int16Array(buffer);
// for(var i = 0;i < int16View.length;i++){
//     console.log('Entry '+ i + ': ' + int16View[i]);
// }

// 假定某段buffer包含如下字节： [0x02,0x01,0x03,0x07] --- 0x开头为16进制数字 0b二进制 0八进制 可直接以此定义变量
// var buffer = new ArrayBuffer(4);
// var v1 = new Uint8Array(buffer);
// v1[0] = 2;
// v1[1] = 1;
// v1[2] = 3;
// v1[3] = 7;
// var uInt16View = new Uint16Array(buffer);
// // 计算机采用小端字节序 所以头两个字节等于258
// if(uInt16View[0] === 258){
//     // 计算机是小端字节序时，Uint8Array视图在内存中第一个数字为0x02 第二个为0x01 而在Uint16Array中读取的是0x0102 将决定其大小的最不重要的字节放在前面，最重要的字节放在后面 16进制0x0102对应10进制也就是258
//     console.log('OK');
// }
// for(var i=0;i<v1.length;i++){
//     console.log('v1:' + v1[i]);
// }
// for(var i=0;i<uInt16View.length;i++){
//     console.log('uInt16View:' + uInt16View[i]);
// }

// 下面函数可以用于判断当前视图是小端字节序还是大端字节序
// const BIG_ENDIAN = Symbol('BIG_ENDIAN');
// const LITTLE_ENDIAN = Symbol('LITTLE_ENDIAN');
// function getPlatformEndianness(){
//     let arr32 = Uint32Array.of(0x12345678);
//     let arr8 = new Uint8Array(arr32.buffer);
//     switch ((arr8[0] * 0x1000000) + (arr8[1] * 0x10000) + (arr8[2] * 0x100) + (arr8[3])) {
//         case 0x12345678:
//             return BIG_ENDIAN;
//         case 0x78563412:
//             return LITTLE_ENDIAN;
//         default:
//             throw new Error('Unknown endianness');
//     }
// }
// let result = getPlatformEndianness();
// console.log(result);

// ArrayBuffer与字符串的互相转换
// ArrayBuffer转为字符串，参数为ArrayBuffer对象
// function ab2str (buf){
//     return String.fromCharCode.apply(null, new Uint16Array(buf));
// }
// var buf = new ArrayBuffer(8);
// console.log(ab2str(buf));
// 字符串转为ArrayBuffer对象，参数为字符串
// function str2ab(str){
//     var buf = new ArrayBuffer(str.length * 2); // 每个字符占用两个字节
//     var bufView = new Uint16Array(buf);
//     for(var i = 0;i < str.length;i++){
//         bufView[i] = str.charCodeAt(i);
//     }
//     return buf;
// }
// console.log(str2ab('abc'));

// 溢出 正向溢出 和 负向溢出
// var uint8 = new Uint8Array(1); // 8位无符号整数Uint8Array的取值范围是 0~255
// uint8[0] = 256;
// console.log(uint8[0]); // 0 正向溢出取最小值加余值再减1
// uint8[0] = -1;
// console.log(uint8[0]); // 255  负向溢出取最大值减余值再加1

// var int8 = new Int8Array(1); // 8位带符号整数Int8Array的取值范围是-128~127
// int8[0] = 128;
// console.log(int8[0]); // 正向溢出
// int8[0] = -129; 
// console.log(int8[0]); // 负向溢出

// Uint8ClampedArray视图的溢出与其它视图有所区别，负向溢出等于0，正向溢出都等于255
// var uint8c = new Uint8ClampedArray(1);
// uint8c[0] = 256;
// console.log(uint8c[0]);
// uint8c[0] = -1;
// console.log(uint8c[0]);

// TypedArray实例的buffer属性返回整段内存区域对应的ArrayBuffer对象，只读属性
// var a = new Float32Array(64);
// var b = new Uint8Array(a.buffer);

// byteLength属性返回TypedArray数组占据的内存长度，单位是字节。byteOffset属性返回TypedArray数组从底层ArrayBuffer对象的哪个字节开始，只读属性
// var b = new ArrayBuffer(8);
// var v1 = new Int32Array(b);
// var v2 = new Uint8Array(b, 2);
// var v3 = new Int16Array(b, 2, 2);
// console.log(v1.byteLength);
// console.log(v2.byteLength);
// console.log(v3.byteLength);
// console.log(v1.byteOffset);
// console.log(v2.byteOffset);
// console.log(v3.byteOffset);

// TypedArray.prototype.length length属性表示TypedArray数组含有多少个成员
// var a = new Int16Array(8);
// console.log(a.length);
// console.log(a.byteLength);
// console.log(a);

// TypedArray.prototype.set() 用于复制数组 将一段内存复制到另一段
// var a = new Uint8Array(8);
// var b = new Uint8Array(8);
// a[0] = 1;
// console.log(a,b);
// b.set(a);
// console.log(a,b);
// b = new Uint8Array(10);
// b.set(a,2)// 长度需对应
// console.log(a,b);

// TypedArray.prototype.subarray()对TypedArray数组的一部分再建立一个新的视图
// var a = new Uint16Array(8);
// var b = a.subarray(2,3);
// console.log(a.byteLength, b.byteLength, a, b);

// TypedArray.prototype.slice() 返回一个指定位置的新的TypedArray实例
// let ui8 = Uint8Array.of(0, 1, 2);
// console.log(ui8.slice(-1));

// TypedArray.of() 将参数转为一个TypedArray实例
// console.log(Float32Array.of(0.151, -8, 3.7));
// 下面三种方法会生成同样的TypedArray数组
// 方法一
// let tarr = new Uint8Array([1,2,3]);
// console.log(tarr);
// 方法二
// let tarr = Uint8Array.of(1, 2, 3);
// console.log(tarr);
// 方法三
// let tarr = new Uint8Array(3);
// tarr[0] = 1;
// tarr[1] = 2;
// tarr[2] = 3;
// console.log(tarr);

// TypedArray.from() 接受一个可遍历的数据结构作为参数，返回一个基于此结构的TypedArray实例
// console.log(Uint16Array.from([1,2,3]));
// 这个方法还可以将一种TypedArray实例转为另一种
// var ui16 = Uint16Array.from(Uint8Array.of(0,1,2));
// console.log(ui16 instanceof Uint16Array,ui16);
// from方法还可以接受一个函数作为第二参数，用于对每个元素进行遍历，类似map方法
// var i8 = Int8Array.of(127,126,125).map(x=>2*x);
// console.log(i8); // 有溢出 Int8Array([-2,-4,-6])
// var i16 = Int16Array.from(Int8Array.of(127, 126, 125), x => 2 * x);
// console.log(i16); //没有溢出 说明遍历针对的是from操作后的16位整数数组而不是原来的8位整数数组
```
## es6数组方法总结
+ 1、forEach    
	特点：不改变原数组、无返回值、不能用break跳出循环(只能return跳出单次循环)  
	参数： 单项item  索引index  原数组arr
+ 2、map   
	特点：不改变原数组   返回一个新数组(中间可对item进行处理)  不能break跳出循环(只能return跳出单次循环)   
	参数： 单项item  索引index  原数组arr
--> forEach&map  区别在于是否返回一个新数组

+ 3、filter   
	特点： 不改变原数组 返回一个新数组  不能break  返回过滤后的数组 
	参数： 单项item  索引index  原数组arr
--> filter&map   区别在于return的返回机制  map的return是真正把return后的值返回给新数组当成其对应的一个新item   filter的return 是判断return后面值 强转为boolean以后 为true则将此次循环的item返回 即push到新数组 为false 则 跳出此次循环进行下一次  并且不往新数组里面push任何内容


+ 4、every  特点:  不改变原数组 返回一个布尔值  不能break  执行每次循环的 return 后的语句  如果return后的语句都为 true  则整次循环返回 true 否则返回 false 参数：同上
--> 可用于类似验证性的判断 类似自动化用例里面的判断逻辑 不必先声明一个布尔值 条件不符是置为 非 这个方法直接返回想要的结果

+ 5、some   特点： 不改变原数组  返回一个布尔值 不能break  顺序执行每次循环 当return后的语句 强转为boolean以后为true时  结束整次循环 并返还true  如果循环结束 所有return全为false 则整体返回false 参数同上

--> every&some   两个方法可以分别适用于两个相对的场景  有时需要判断全为true 有时需要判断有没有true  这两个方法可以极大简化代码  基本能涵盖大部分类似场景

+ 6、reduce  
	特点：  不改变原数组  返回类型值任意  不能break  顺序执行每次循环(当不传初始值时 从index=1开始遍历) 
	参数： 两个参数  第一个为一个回调函数  必选  第二个为遍历开始时的初始值 可选  类型任意 
	   回调函数的参数： 四个 (prev,cur,index,arr)  
			第一个为循环开始的初始值prev  reduce不传二参时初始值prev为要遍历数组的index=0的项 同时遍历改为从index=1开始执行  
			第二个为当前遍历的数组项cur 可以在回调函数体内对cur和prev进行任意操作 然后return 任意类型的值 注意改值最好与prev的类型一致
			第三个为当前遍历的数组项的index 
			第四个为当前数组
-->使用reduce可以简化很多操作
