import{_ as s,c as a,o as p,ae as e}from"./chunks/framework.BTGIOJIj.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"document/ES6.md","filePath":"document/ES6.md"}'),l={name:"document/ES6.md"};function i(t,n,c,r,o,y){return p(),a("div",null,n[0]||(n[0]=[e(`<h2 id="promise" tabindex="-1">Promise <a class="header-anchor" href="#promise" aria-label="Permalink to &quot;Promise&quot;">​</a></h2><ul><li>Promise 就是一个对象，用来传递异步操作的消息，代表了未来才会知道结果的事件（通常是一个异步操作）</li><li>Promise有两个特点： <ul><li>1.对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending(进行中)、Resolved(已完成，又称Fulfilled) 和 Rejected(已失败)，只有异步操作的结果可以决定当前是哪一种状态</li><li>2.一旦状态改变就不会再变，任何时候都能得到这个结果</li><li>Promise还有一些缺点，首先，无法取消 Promise，其次，如果不设置回调函数，Promise内部抛出的错误不会反映到外部，再者，当处于 Pending 状态时，无法得知目前发展到哪个阶段</li></ul></li><li>Promise 是一个构造函数，用于生成 Promise 实例，Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject。它们是两个函数，由Javascript引擎提供，不用自己部署。</li><li>resolve函数的作用是将 Promise 对象的状态从 Pending 变成 Fulfilled；reject函数的作用是将Promise对象的状态从 Pending 变为 Rejected</li><li>Promise实例生成以后，可以用then分别制定Resolved 和 Rejected状态的回调函数，then 方法可以接受两个回调函数做参数，第一个回调函数是Promise变为Resolved时调用，第二个是Promise变为Rejected时调用，其中，第二个参数是可选的，并且建议catch语句替代</li><li>如果调用resolve和reject函数时带有参数，那么这些参数会被传递给回调函数，reject函数的参数通常是Error对象的实例，表示抛出错误；resolve函数的参数除了正常的值以外，还可能是另一个Promise实例，表示异步操作结果有可能是一个值，也有可能是另一个异步操作</li><li>Promise.prototype.then Promise实例具有 then 方法，then方法是定义在原型对象上的，作用是为Promise添加状态改变时的回调函数</li><li>Promise.prototype.catch 方法是 .then(null, rejection)的别名，用于指定发生错误时的回调函数；</li><li>Promise.prototype.catch catch方法返回的还是一个Promise对象，还可以接着调用then方法；catch后面的then报错，前面的catch无法捕获错误</li><li>Promise.prototype.finally 在Promise结束时，无论结果是fulfilled或rejected，都会执行这个指定的回调函数</li><li>Promise.all 方法用于将多个Promise实例包装成一个新的Promise实例，Promise.all方法的参数不一定是数组，但是必须具有 Interator 接口</li><li>var p = Promise.all([p1, p2, p3])中，只有p1、p2、p3的状态都编程Fulfilled，p的状态才回编程Fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数；只有p1、p2、p3中有一个为Rejected，p的状态就变成了Rejected，此时第一个被Rejected的实例的返回值会传给p的回调函数</li><li>Promsie.allSettled() 方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果</li><li>Promise.race 方法同样是将多个 Promise实例包装成一个新的Promise实例</li><li>var p = Promise.race([p1, p2, p3])只要p1、p2、p3中有一个实例率先改变状态，p的状态就跟着改变，那个率先改变状态的Promise实例的返回值，就传递给p的回调函数</li><li>Promise.any() 接收一个Promise可迭代对象，只要其中的一个promise成功，就返回那个已经成功的promise。如果可迭代对象中没有一个promise成功，就返回一个失败的promise。</li><li>Promise.resolve可以将现有对象转为Promise对象,如果Promise.resolve方法的参数不是thenable对象（具有then方法的对象），则返回一个新的Promise对象，且其状态为Resolved</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    Promise.resolve(&#39;foo&#39;)</span></span>
<span class="line"><span>    &lt;!-- 等价于 --&gt;</span></span>
<span class="line"><span>    new Promise(resolve =&gt; resolve(&#39;foo&#39;))</span></span></code></pre></div><ul><li>Promise.reject()方法也会返回一个新的Promise实例，状态为Rejected</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>手写Promis：</span></span>
<span class="line"><span>// 手写Promise</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class myPromise {</span></span>
<span class="line"><span>  static PENDING = &quot;pending&quot;;</span></span>
<span class="line"><span>  static FULFILLED = &quot;fulfilled&quot;;</span></span>
<span class="line"><span>  static REJECTED = &quot;rejected&quot;;</span></span>
<span class="line"><span>  constructor(func) {</span></span>
<span class="line"><span>    this.PromiseState = myPromise.PENDING;</span></span>
<span class="line"><span>    this.PromiseResult = null;</span></span>
<span class="line"><span>    this.onFulfilledCallbacks = [];</span></span>
<span class="line"><span>    this.onRejectedCallbacks = [];</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>      func(this.resolve.bind(this), this.reject.bind(this));</span></span>
<span class="line"><span>    } catch (e) {</span></span>
<span class="line"><span>      this.reject(e);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  resolve(result) {</span></span>
<span class="line"><span>    // console.log(&quot;resolve执行：&quot;, result);</span></span>
<span class="line"><span>    if (this.PromiseState === myPromise.PENDING) {</span></span>
<span class="line"><span>      setTimeout(() =&gt; {</span></span>
<span class="line"><span>        this.PromiseState = myPromise.FULFILLED;</span></span>
<span class="line"><span>        this.PromiseResult = result;</span></span>
<span class="line"><span>        this.onFulfilledCallbacks.forEach(callback =&gt; callback(result));</span></span>
<span class="line"><span>      })</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  reject(reason) {</span></span>
<span class="line"><span>    // console.log(&quot;reject执行：&quot;, reason, 999, this);</span></span>
<span class="line"><span>    if (this.PromiseState === myPromise.PENDING) {</span></span>
<span class="line"><span>      setTimeout(() =&gt; {</span></span>
<span class="line"><span>        // console.log(&quot;reject内部执行&quot;, this);</span></span>
<span class="line"><span>        this.PromiseState = myPromise.REJECTED;</span></span>
<span class="line"><span>        this.PromiseResult = reason;</span></span>
<span class="line"><span>        this.onRejectedCallbacks.forEach(callback =&gt; callback(reason));</span></span>
<span class="line"><span>        // console.log(&quot;reject内部执行2222&quot;, this);</span></span>
<span class="line"><span>      })</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  then(onFulfilled, onRejected) {</span></span>
<span class="line"><span>    // console.log(&quot;then调用：&quot;);</span></span>
<span class="line"><span>    onFulfilled = typeof onFulfilled === &quot;function&quot; ? onFulfilled : v =&gt; v;</span></span>
<span class="line"><span>    onRejected = typeof onRejected === &quot;function&quot; ? onRejected : reason =&gt; {</span></span>
<span class="line"><span>      // console.log(&quot;reason&quot;, reason)</span></span>
<span class="line"><span>      throw reason;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // console.log(&quot;onFulfilled -- onRejected&quot;, onFulfilled, onRejected);</span></span>
<span class="line"><span>    const promise2 = new myPromise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>      if (this.PromiseState === myPromise.FULFILLED) {</span></span>
<span class="line"><span>        setTimeout(() =&gt; {</span></span>
<span class="line"><span>          try {</span></span>
<span class="line"><span>            // console.log(9)</span></span>
<span class="line"><span>            let x = onFulfilled(this.PromiseResult);</span></span>
<span class="line"><span>            resolvePromise(promise2, x, resolve, reject);</span></span>
<span class="line"><span>          } catch (e) {</span></span>
<span class="line"><span>            // console.log(91)</span></span>
<span class="line"><span>            console.log(e);</span></span>
<span class="line"><span>            reject(e);</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>      } else if (this.PromiseState === myPromise.REJECTED) {</span></span>
<span class="line"><span>        setTimeout(() =&gt; {</span></span>
<span class="line"><span>          try {</span></span>
<span class="line"><span>            // console.log(8)</span></span>
<span class="line"><span>            let x = onRejected(this.PromiseResult);</span></span>
<span class="line"><span>            resolvePromise(promise2, x, resolve, reject);</span></span>
<span class="line"><span>          } catch (e) {</span></span>
<span class="line"><span>            // console.log(81)</span></span>
<span class="line"><span>            console.log(e);</span></span>
<span class="line"><span>            reject(e);</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>      } else if (this.PromiseState === myPromise.PENDING) {</span></span>
<span class="line"><span>        this.onFulfilledCallbacks.push(() =&gt; {</span></span>
<span class="line"><span>          try {</span></span>
<span class="line"><span>            // console.log(7)</span></span>
<span class="line"><span>            let x = onFulfilled(this.PromiseResult);</span></span>
<span class="line"><span>            let a= resolvePromise(promise2, x, resolve, reject);</span></span>
<span class="line"><span>            // console.log(&#39;aaa&#39;, this, a);</span></span>
<span class="line"><span>          } catch (e) {</span></span>
<span class="line"><span>            // console.log(71,e)</span></span>
<span class="line"><span>            console.log(e);</span></span>
<span class="line"><span>            reject(e);</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>        this.onRejectedCallbacks.push(() =&gt; {</span></span>
<span class="line"><span>          try {</span></span>
<span class="line"><span>            // console.log(6)</span></span>
<span class="line"><span>            let x = onRejected(this.PromiseResult);</span></span>
<span class="line"><span>            resolvePromise(promise2, x, resolve, reject);</span></span>
<span class="line"><span>          } catch (e) {</span></span>
<span class="line"><span>            // console.log(61)</span></span>
<span class="line"><span>            console.log(e);</span></span>
<span class="line"><span>            reject(e);</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    return promise2;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * </span></span>
<span class="line"><span> * @param {promise} promise2 promise1.then方法返回的新的promise对象</span></span>
<span class="line"><span> * @param {[type]} x  promise1中onFulfilled或onRejected的返回值</span></span>
<span class="line"><span> * @param {[type]} resolve promise2的resolve方法</span></span>
<span class="line"><span> * @param {[type]} reject promise2的reject方法</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>function resolvePromise(promise2, x, resolve, reject) {</span></span>
<span class="line"><span>  if(promise2 === x){</span></span>
<span class="line"><span>    // console.log(&quot;循环引用&quot;, promise2, promise2.resolve, promise2.reject);</span></span>
<span class="line"><span>    throw new TypeError(&#39;Chaining cycle detected for promise&#39;);</span></span>
<span class="line"><span>    // return reject(new TypeError(&#39;Chaining cycle detected for promise&#39;));</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if(x instanceof myPromise){</span></span>
<span class="line"><span>    if(x.PromiseState === myPromise.PENDING){</span></span>
<span class="line"><span>      x.then(y =&gt; {</span></span>
<span class="line"><span>        resolvePromise(promise2, y, resolve, reject);</span></span>
<span class="line"><span>      }, reject)</span></span>
<span class="line"><span>    } else if(x.PromiseState === myPromise.FULFILLED){</span></span>
<span class="line"><span>      resolve(x.PromiseResult);</span></span>
<span class="line"><span>    } else if(x.PromiseState === myPromise.REJECTED){</span></span>
<span class="line"><span>      reject(x.PromiseResult);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  } else if (x !== null &amp;&amp; (typeof x === &quot;object&quot; || typeof x === &quot;function&quot;)){</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>      var then = x.then;</span></span>
<span class="line"><span>    } catch (e){</span></span>
<span class="line"><span>      return reject(e);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if(typeof then === &quot;function&quot;){</span></span>
<span class="line"><span>      let called = false;</span></span>
<span class="line"><span>      try {</span></span>
<span class="line"><span>        then.call(</span></span>
<span class="line"><span>          x,</span></span>
<span class="line"><span>          y =&gt; {</span></span>
<span class="line"><span>            if(called) return;</span></span>
<span class="line"><span>            called = true;</span></span>
<span class="line"><span>            resolvePromise(promise2, y, resolve, reject);</span></span>
<span class="line"><span>          },</span></span>
<span class="line"><span>          r =&gt; {</span></span>
<span class="line"><span>            if(called) return;</span></span>
<span class="line"><span>            called = true;</span></span>
<span class="line"><span>            reject(r);</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>      } catch (e) {</span></span>
<span class="line"><span>        if(called) return;</span></span>
<span class="line"><span>        called = true;</span></span>
<span class="line"><span>        reject(e);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      resolve(x);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    return resolve(x);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// let res = () =&gt; {</span></span>
<span class="line"><span>//   console.log(1);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// let rej = () =&gt; {</span></span>
<span class="line"><span>//   console.log(2);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// 1.不能在new Promise时为excutor函数传入resolve/reject函数，因为new Promise时，resolve和reject函数都是形参，</span></span>
<span class="line"><span>// 实际上这两个函数是在Promise内部封装好的，并在执行excutor函数时传入，而new Promise时，只是调用了这两个函数</span></span>
<span class="line"><span>// 2.new Promise时的resolve和reject只是形参，真正调用是在new生成实例后，所以调用resolve、reject时需要绑定this指向</span></span>
<span class="line"><span>// 3.第一次走then还是catch 要看new Promise时 调用了resolve还是reject,之后链式调用走then还是catch 要看上一次then/catch的返回值</span></span>
<span class="line"><span>// 返回值是普通值，走then；是Error，走catch；是Promise，则根据Promise的状态决定</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// console.log(1);</span></span>
<span class="line"><span>// var p1 = new myPromise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>//</span><span>   // console.log(&quot;执行func&quot;);</span></span>
<span class="line"><span>//   console.log(2);</span></span>
<span class="line"><span>//   setTimeout(() =&gt; {</span></span>
<span class="line"><span>//     console.log(&quot;before:&quot;, p1.PromiseState);</span></span>
<span class="line"><span>//     resolve(&quot;执行resolve1&quot;);</span></span>
<span class="line"><span>//     console.log(&quot;after:&quot;, p1.PromiseState);</span></span>
<span class="line"><span>//     console.log(4);</span></span>
<span class="line"><span>//   })</span></span>
<span class="line"><span>//</span><span>   // reject(&quot;执行reject1&quot;)</span></span>
<span class="line"><span>//</span><span>   // throw new Error(&quot;抛出错误&quot;);</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//</span><span> // var p2 = new myPromise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>//</span><span> //   reject(&quot;执行reject2&quot;);</span></span>
<span class="line"><span>//</span><span> //   resolve(&quot;执行resolve2&quot;)</span></span>
<span class="line"><span>//</span><span> // })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// p1.then(</span></span>
<span class="line"><span>//   result =&gt; {</span></span>
<span class="line"><span>//     console.log(&quot;fulfilled&quot;, result);</span></span>
<span class="line"><span>//   },</span></span>
<span class="line"><span>//</span><span>   // null,</span></span>
<span class="line"><span>//   reason =&gt; {</span></span>
<span class="line"><span>//     console.log(&quot;rejected&quot;, reason);</span></span>
<span class="line"><span>//   }</span></span>
<span class="line"><span>// )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// console.log(3);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//</span><span> // console.log(&quot;p1&quot;, p1);</span></span>
<span class="line"><span>//</span><span> // console.log(&quot;p2&quot;, p2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 多次调用</span></span>
<span class="line"><span>// var promise = new myPromise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>//   setTimeout(() =&gt; {</span></span>
<span class="line"><span>//     resolve(&quot;success&quot;);</span></span>
<span class="line"><span>//   }, 2000);</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// promise.then(value =&gt; {</span></span>
<span class="line"><span>//   console.log(1);</span></span>
<span class="line"><span>//   console.log(&quot;resolve&quot;, value);</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// promise.then(value =&gt; {</span></span>
<span class="line"><span>//   console.log(2);</span></span>
<span class="line"><span>//   console.log(&quot;resolve&quot;, value);</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// promise.then(value =&gt; {</span></span>
<span class="line"><span>//   console.log(3);</span></span>
<span class="line"><span>//   console.log(&quot;resolve&quot;, value);</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 链式调用</span></span>
<span class="line"><span>// let p1 = new myPromise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>//   resolve(10);</span></span>
<span class="line"><span>// });</span></span>
<span class="line"><span>// p1.then(res =&gt; {</span></span>
<span class="line"><span>//   console.log(&quot;fulfilled&quot;, res);</span></span>
<span class="line"><span>//   return 2 * res;</span></span>
<span class="line"><span>// }).then(res =&gt; {</span></span>
<span class="line"><span>//   console.log(&quot;fulfilled&quot;, res);</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 循环引用报错</span></span>
<span class="line"><span>// var promise = new myPromise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>//</span><span>   // resolve(100);</span></span>
<span class="line"><span>//   reject(200);</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span>// var p1 = promise.then(value =&gt; {</span></span>
<span class="line"><span>//   console.log(value)</span></span>
<span class="line"><span>//</span><span>   // throw new Error()</span></span>
<span class="line"><span>//   return p1</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span>// console.log(p1,&#39;p1&#39;)</span></span>
<span class="line"><span>// p1.then((res) =&gt; {</span></span>
<span class="line"><span>//   console.log(&quot;res2&quot;, res);</span></span>
<span class="line"><span>// }, (rej) =&gt; {</span></span>
<span class="line"><span>//   console.log(&quot;rej2&quot;, rej);</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// test</span></span>
<span class="line"><span>// var promise = new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>//</span><span>   // resolve(100);</span></span>
<span class="line"><span>//</span><span>   // reject(200);</span></span>
<span class="line"><span>//   throw new Error(300);</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var p1 = promise.then((res) =&gt; {</span></span>
<span class="line"><span>//   console.log(&quot;res1&quot;, res);</span></span>
<span class="line"><span>// }, (rej) =&gt; {</span></span>
<span class="line"><span>//   console.log(&quot;rej1&quot;, rej);</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span>// p1.then((res) =&gt; {</span></span>
<span class="line"><span>//   console.log(&quot;res2&quot;, res);</span></span>
<span class="line"><span>// }, (rej) =&gt; {</span></span>
<span class="line"><span>//   console.log(&quot;rej2&quot;, rej);</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 跑测试用例</span></span>
<span class="line"><span>// myPromise.deferred = function () {</span></span>
<span class="line"><span>//   let result = {};</span></span>
<span class="line"><span>//   result.promise = new myPromise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>//     result.resolve = resolve;</span></span>
<span class="line"><span>//     result.reject = reject;</span></span>
<span class="line"><span>//   });</span></span>
<span class="line"><span>//   return result;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// module.exports = myPromise;</span></span></code></pre></div><h2 id="set" tabindex="-1">Set <a class="header-anchor" href="#set" aria-label="Permalink to &quot;Set&quot;">​</a></h2><ul><li>Set是es6提供的新的数据结构，类似数组，但是成员的值都是唯一的、没有重复的值；</li><li>Set本身是一个构造函数，用来生成Set数据结构；</li><li>Set可以接受一个数组或具有iterable接口的其它数据结构作为参数，用来初始化；</li></ul><h3 id="set实例的属性和方法" tabindex="-1">Set实例的属性和方法 <a class="header-anchor" href="#set实例的属性和方法" aria-label="Permalink to &quot;Set实例的属性和方法&quot;">​</a></h3><ul><li>Set.prototype.constructor 构造函数，默认就是Set函数</li><li>Set.prototype.size 返回Set实例的成员总数</li><li>四个操作方法：</li><li>Set.prototype.add(value) 添加某个值 返回Set结构本身</li><li>Set.prototype.delete(value) 删除某个值 返回一个布尔值，表示删除是否成功</li><li>Set.prototype.has(value) 返回一个布尔值 表示该值是否为Set的成员</li><li>Set.prototype.clear() 清除所有成员，没有返回值</li><li>四个遍历方法：</li><li>Set.prototype.keys() 返回键名的遍历器</li><li>Set.prototype.values() 返回键值的遍历器</li><li>Set.prototype.entried() 返回键值对的遍历器</li><li>Set.prototype.forEach() 使用回调函数遍历每个成员</li><li>Set结构的遍历顺序就是插入顺序</li><li>keys、values、entries方法返回的都是遍历器对象，由于Set结构没有键名只有键值，所以keys方法和values方法行为完全一致</li></ul><h3 id="weakset" tabindex="-1">WeakSet <a class="header-anchor" href="#weakset" aria-label="Permalink to &quot;WeakSet&quot;">​</a></h3><ul><li>WeakSet的成员只能是对象，不能是其他类型的值</li><li>WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用</li><li>WeakSet也有add、delete、has方法，没有size、forEach方法</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Set</span></span>
<span class="line"><span>var log = console.log;</span></span>
<span class="line"><span>// 唯一值</span></span>
<span class="line"><span>// const s = new Set();</span></span>
<span class="line"><span>// [2,3,4,5,5,3,2].map(x=&gt;s.add(x));</span></span>
<span class="line"><span>// for(let i of s) {</span></span>
<span class="line"><span>//     console.log(i);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Set函数的参数 为数组或其他 interable 接口的数据结构</span></span>
<span class="line"><span>// const set = new Set([1,2,3,5,5]);</span></span>
<span class="line"><span>// console.log([...set]);</span></span>
<span class="line"><span>// const set = new Set(document.querySelectorAll(&#39;div&#39;));</span></span>
<span class="line"><span>// console.log(set.size);</span></span>
<span class="line"><span>// const set = new Set();</span></span>
<span class="line"><span>// document.querySelectorAll(&#39;div&#39;).forEach(div=&gt;set.add(div));</span></span>
<span class="line"><span>// console.log(set.size)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 应用：数组去重</span></span>
<span class="line"><span>// console.log([...new Set([2,3,5,6,5,3])]);</span></span>
<span class="line"><span>// 应用：字符串去重</span></span>
<span class="line"><span>// console.log([...new Set(&#39;ababbc&#39;)].join(&#39;&#39;));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 向Set中加入值，不会发生类型转换 内部采用精确相等判断，但NaN判定等于自身，即只能有一个NaN</span></span>
<span class="line"><span>// let set = new Set();</span></span>
<span class="line"><span>// let a = NaN;</span></span>
<span class="line"><span>// let b = NaN;</span></span>
<span class="line"><span>// set.add(a);</span></span>
<span class="line"><span>// set.add(b);</span></span>
<span class="line"><span>// console.log(set);</span></span>
<span class="line"><span>// 两个对象总是不相等</span></span>
<span class="line"><span>// let set = new Set();</span></span>
<span class="line"><span>// set.add({});</span></span>
<span class="line"><span>// console.log(set.size);</span></span>
<span class="line"><span>// set.add({});</span></span>
<span class="line"><span>// console.log(set.size);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Set实例的属性和方法</span></span>
<span class="line"><span>// Set.prototype.constructor 构造函数 默认就是Set函数</span></span>
<span class="line"><span>// Set.prototype.size 返回Set实例的成员总数</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Set实例的方法分为两大类：操作方法 和 遍历方法</span></span>
<span class="line"><span>// 四个操作方法（用于操作数据）</span></span>
<span class="line"><span>// Set.prototype.add(value): 添加某个值，返回Set结构本身</span></span>
<span class="line"><span>// Set.prototype.delete(value):删除某个值，返回一个布尔值，表示删除是否成功</span></span>
<span class="line"><span>// Set.prototype.has(value): 返回一个布尔值，表示该值是否为Set的成员</span></span>
<span class="line"><span>// Set.prototype.clear(): 清除所有成员，没有返回值</span></span>
<span class="line"><span>// 四个遍历方法</span></span>
<span class="line"><span>// Set.prototype.keys: 返回键名的遍历器</span></span>
<span class="line"><span>// Set.prototype.values: 返回键值的遍历器</span></span>
<span class="line"><span>// Set.prototype.entries: 返回键值对的遍历器</span></span>
<span class="line"><span>// Set.prototype.forEach(): 使用回调函数遍历每个成员</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 操作方法</span></span>
<span class="line"><span>// let s = new Set();</span></span>
<span class="line"><span>// s.add(1).add(1).add(2);</span></span>
<span class="line"><span>// log(s.size);</span></span>
<span class="line"><span>// log(s.has(1));</span></span>
<span class="line"><span>// log(s.has(2));</span></span>
<span class="line"><span>// log(s.has(3));</span></span>
<span class="line"><span>// s.delete(2);</span></span>
<span class="line"><span>// log(s.has(2));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// object结构 和 Set结构 在判断是否包括一个键时写法的区别</span></span>
<span class="line"><span>// const properties = {</span></span>
<span class="line"><span>//     &#39;width&#39;: 1,</span></span>
<span class="line"><span>//     &#39;height&#39;: 1</span></span>
<span class="line"><span>// };</span></span>
<span class="line"><span>// if(properties[&#39;width&#39;]){</span></span>
<span class="line"><span>//</span><span>     // do something</span></span>
<span class="line"><span>//     log(&#39;obj has property width&#39;);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// const properties = new Set();</span></span>
<span class="line"><span>// properties.add(&#39;width&#39;);</span></span>
<span class="line"><span>// properties.add(&#39;height&#39;);</span></span>
<span class="line"><span>// if(properties.has(&#39;width&#39;)){</span></span>
<span class="line"><span>//</span><span>     // do something</span></span>
<span class="line"><span>//     log(&#39;set has key width&#39;);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Array.from可以将Set结构转为数组</span></span>
<span class="line"><span>// const items = new Set([1,2,3,5,6]);</span></span>
<span class="line"><span>// const array = Array.from(items);</span></span>
<span class="line"><span>// log(&#39;Set:&#39;,items);</span></span>
<span class="line"><span>// log(&#39;Array:&#39;, array);</span></span>
<span class="line"><span>// 另一种数组去重方法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// function dedupe (array){</span></span>
<span class="line"><span>//     return Array.from(new Set(array));</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// log(dedupe([1,2,1,4,2,3]));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 遍历方法</span></span>
<span class="line"><span>// keys方法、values方法 行为完全一致，entries方法返回一个键名和键值的数组</span></span>
<span class="line"><span>// let set = new Set([&#39;red&#39;, &#39;green&#39;, &#39;blue&#39;]);</span></span>
<span class="line"><span>// for(let item of set.keys()){</span></span>
<span class="line"><span>//     log(item);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// for(let item of set.values()){</span></span>
<span class="line"><span>//     log(item);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// for(let item of set.entries()){</span></span>
<span class="line"><span>//     log(item);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// forEach()方法</span></span>
<span class="line"><span>// forEach方法的参数是一个回调函数，回调函数的参数依次是键值、键名、遍历对象本身；forEach方法还可以指定第二个参数目标是绑定处理函数内部的this对象</span></span>
<span class="line"><span>// let set = new Set([1, 4, 9]);</span></span>
<span class="line"><span>// set.forEach((value, key) =&gt; log(key + &#39; : &#39; + value + this), {a:1});</span><span> // 回调函数是箭头函数时，指定this失效</span></span>
<span class="line"><span>// set.forEach(function (value, key){log(key + &#39; : &#39; + value + this)}, {a:1});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 遍历的应用</span></span>
<span class="line"><span>// 扩展运算法(...) 内部使用的是for...of循环，也可以用于Set结构</span></span>
<span class="line"><span>// let set = new Set([&#39;red&#39;, &#39;green&#39;, &#39;blue&#39;]);</span></span>
<span class="line"><span>// let arr = [...set];</span></span>
<span class="line"><span>// log(arr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 扩展运算符合Set相结合，用于去除数组重复成员</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 数组的map和filter方法也可以间接用于Set</span></span>
<span class="line"><span>// let set = new Set([1, 2, 3]);</span></span>
<span class="line"><span>// set = new Set([...set].map(x =&gt; x * 2));</span></span>
<span class="line"><span>// log(set);</span></span>
<span class="line"><span>// set = new Set([...set].filter(x =&gt; x%2 == 0));</span></span>
<span class="line"><span>// log(set);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Set可以很容易地实现并集(Union)、交集(Intersect)和 差集(Difference)</span></span>
<span class="line"><span>// let a = new Set([1, 2, 3]);</span></span>
<span class="line"><span>// let b = new Set([4, 3, 2]);</span></span>
<span class="line"><span>//</span><span> // 并集</span></span>
<span class="line"><span>// let union = new Set([...a,...b]);</span></span>
<span class="line"><span>// log(union);</span></span>
<span class="line"><span>//</span><span> // 交集</span></span>
<span class="line"><span>// let intersect = new Set([...a].filter(x=&gt;b.has(x)));</span></span>
<span class="line"><span>// log(intersect);</span></span>
<span class="line"><span>//</span><span> // 差集 a相对于b</span></span>
<span class="line"><span>// let difference = new Set([...a].filter(x =&gt; !b.has(x)));</span></span>
<span class="line"><span>// log(difference);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 如果想在遍历操作中，同步改变原来的Set结构，目前没有直接方法，但有两种变通方法。一是利用原Set结构映射出一个新结构，然后复制给原来的Set结构，一种是利用Array.from方法</span></span>
<span class="line"><span>// 方法一</span></span>
<span class="line"><span>// let set = new Set([1,2,3]);</span></span>
<span class="line"><span>// set = new Set([...set].map(val =&gt; val * 2));</span></span>
<span class="line"><span>// log(set);</span></span>
<span class="line"><span>// 方法二</span></span>
<span class="line"><span>// let set = new Set([1, 2, 3]);</span></span>
<span class="line"><span>// set = new Set(Array.from(set, val =&gt; val * 2));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//  WeakSet</span></span>
<span class="line"><span>// 相同点：不重复</span></span>
<span class="line"><span>// 不同点1：WeakSet成员只能是对象，不能是其他类型的值</span></span>
<span class="line"><span>// 不同点2：WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还在WeakSet中</span></span>
<span class="line"><span>// WeakSet适合临时存放一组对象，以及存放跟对象绑定的信息，只要这些对象再外部消失，它在WeakSet里面的引用就会自动消失</span></span>
<span class="line"><span>// 所以WeakSet的成员是不适合引用的，因为它随时会消失，引用前引用后成员个数可能是不一样的；所以WeakSet是不可遍历的</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// WeakSet构造函数</span></span>
<span class="line"><span>// const ws = new WeakSet();</span></span>
<span class="line"><span>// 任何具有Iterable接口的数据都可以作为WeakSet的参数</span></span>
<span class="line"><span>// const a = [[1, 2], [3, 4]];</span></span>
<span class="line"><span>// const ws = new WeakSet(a);</span></span>
<span class="line"><span>// log(ws);</span></span>
<span class="line"><span>// WeakSet 结构有以下三个方法：</span></span>
<span class="line"><span>// WeakSet.prototype.add(value): 向WeakSet实例添加一个成员</span></span>
<span class="line"><span>// WeakSet.prototype.delete(value): 清除WeakSet实例的指定成员</span></span>
<span class="line"><span>// WeakSet.prototype.has(value): 返回一个布尔值，表示某个值是否在WeakSet实例中</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// const ws = new WeakSet();</span></span>
<span class="line"><span>// const obj = {};</span></span>
<span class="line"><span>// const foo = {};</span></span>
<span class="line"><span>// ws.add(window);</span></span>
<span class="line"><span>// ws.add(obj);</span></span>
<span class="line"><span>// log(ws.has(window));</span></span>
<span class="line"><span>// log(ws.has(foo));</span></span>
<span class="line"><span>// ws.delete(window);</span></span>
<span class="line"><span>// log(ws.has(window));</span></span>
<span class="line"><span>// log(ws.has(obj));</span></span>
<span class="line"><span>// log(ws.size, ws.forEach);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// WeakSet不能遍历，是用因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet的一个用处是，是储存DOM节点，而不用担心这些节点从文档移除时，会引发内存泄漏</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// const foos = new WeakSet();</span></span>
<span class="line"><span>// class Foo{</span></span>
<span class="line"><span>//     constructor (){</span></span>
<span class="line"><span>//         foos.add(this);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>//     method (){</span></span>
<span class="line"><span>//         if((!foos.has(this))){</span></span>
<span class="line"><span>//             throw new TypeError(&#39;Foo.prototype.method 只能再Foo实例上调用！&#39;);</span></span>
<span class="line"><span>//         }</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// WeakSet能避免内存泄漏</span></span>
<span class="line"><span>// var dom = document.querySelector(&#39;div&#39;);</span></span>
<span class="line"><span>//</span><span> // var obj = { dom };</span></span>
<span class="line"><span>//</span><span> // var set = new Set();</span></span>
<span class="line"><span>//</span><span> // set.add(dom);</span></span>
<span class="line"><span>// var ws = new WeakSet();</span></span>
<span class="line"><span>// ws.add(dom);</span></span>
<span class="line"><span>//</span><span> // console.log(obj, set);</span></span>
<span class="line"><span>// console.log(ws);</span></span>
<span class="line"><span>// dom.parentElement.removeChild(dom)</span></span>
<span class="line"><span>// dom = null;</span></span>
<span class="line"><span>//</span><span> // console.log(obj, set);</span><span> // 在obj和set中，dom没有被清除，这样的内存占用积累多了以后，就会产生内存泄漏</span></span>
<span class="line"><span>// console.log(ws);</span><span> // 打印内容看似一样 其实展开之后发现已经清掉了dom，所以不会产生内存泄漏</span></span></code></pre></div><h2 id="map" tabindex="-1">Map <a class="header-anchor" href="#map" aria-label="Permalink to &quot;Map&quot;">​</a></h2><ul><li>Map是ES6提供的一种数据结构，类似对象，也是键值对的结合，但是Map的键不限于字符串，各种类型的值(包括对象)都可以当做键名；也就是说，Object提供了&quot;字符串-值&quot;的对应，Map提供了“值-值”的对应，是一种更完善的Hash结构</li><li>Map构造函数可以接受数组作为参数，用于快速生成一个Map结构</li></ul><h2 id="实例的属性和方法" tabindex="-1">实例的属性和方法 <a class="header-anchor" href="#实例的属性和方法" aria-label="Permalink to &quot;实例的属性和方法&quot;">​</a></h2><ul><li>size属性 返回Map结构的成员总数</li><li>Map.prototype.set(key, value) set方法设置键名key对应的键值value，然后返回整个Map结构</li><li>Map.prototype.get(key) get方法读取key对应的键值，找不到则返回undefined</li><li>Map.prototype.has(key) has方法返回一个布尔值，表示某个键是否在当前Map对象之中</li><li>Map.prototype.delete(key) delete方法删除某个键，返回true，如果删除失败，返回false</li><li>Map.prototype.clear() clear方法清除所有成员 没有返回值</li><li>四个遍历方法：</li><li>Map.prototype.keys():返回键名的遍历器</li><li>Map.prototype.values():返回键值的遍历器</li><li>Map.prototype.entries():返回所有成员的遍历器</li><li>Map.prototype.forEach(): 遍历Map的所有成员</li><li>Map的遍历顺序就是插入顺序</li></ul><h3 id="map结构与其他数据结构的互相转换" tabindex="-1">Map结构与其他数据结构的互相转换 <a class="header-anchor" href="#map结构与其他数据结构的互相转换" aria-label="Permalink to &quot;Map结构与其他数据结构的互相转换&quot;">​</a></h3><ul><li>Map转为数组 使用扩展运算符 ...</li><li>数组转为Map 把数组传入Map构造函数即可</li><li>Map转为对象 如果Map的所有key都是字符串，可以无损转为对象，使用Object.create创建obj，再遍历赋值</li><li>对象转为Map 通过构造函数及Object.entries方法</li><li>Map转为JSON 分两种情况 Map的键名都是字符串 可以转为对象JSON，否则可以转为数组JSON 使用构造函数</li><li>JSON转为Map 构造函数 + 遍历方法</li></ul><h3 id="weakmap" tabindex="-1">WeakMap <a class="header-anchor" href="#weakmap" aria-label="Permalink to &quot;WeakMap&quot;">​</a></h3><ul><li>WeakMap与Map结构类似，也是用于生成键值对的集合</li><li>WeakMap只接受对象作为键名(null除外) 不接受其他类型的值（包括Symbol也不行）作为键名</li><li>WeakMap的键名所指向的对象 不计入垃圾回收机制 -- 避免内存泄露</li><li>WeakMap没有遍历操作，没有size属性 只有四个方法可用：get()、set()、has()、delete()</li></ul><h3 id="weakref" tabindex="-1">WeakRef <a class="header-anchor" href="#weakref" aria-label="Permalink to &quot;WeakRef&quot;">​</a></h3><ul><li>直接创建对象的弱引用</li></ul><h3 id="finalizationregistry" tabindex="-1">FinalizationRegistry <a class="header-anchor" href="#finalizationregistry" aria-label="Permalink to &quot;FinalizationRegistry&quot;">​</a></h3><ul><li>清理注册表功能 用于指定目标对象被垃圾回收机制清除以后 所要执行的函数</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Map</span></span>
<span class="line"><span>var log = console.log;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Map和Object都是一种键值对的Hash结构</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Object只能以字符串作为键名</span></span>
<span class="line"><span>// const data = {};</span></span>
<span class="line"><span>// const element = document.querySelector(&#39;div&#39;);</span></span>
<span class="line"><span>// data[element] = &#39;metadata&#39;;</span></span>
<span class="line"><span>// log(data, data[&#39;[object HTMLDivElement]&#39;]);</span><span> // {[object HTMLDivElement]: &#39;metadata&#39;}[object HTMLDivElement]: &quot;metadata&quot;[[Prototype]]: Object &#39;metadata&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Map可以以各种类型的值（包括对象）作为键，是一种更完善的Hash结构</span></span>
<span class="line"><span>// const m = new Map();</span></span>
<span class="line"><span>// const o = { p: &#39;Hello World&#39; };</span></span>
<span class="line"><span>// m.set(o, &#39;content&#39;);</span></span>
<span class="line"><span>// log(m.get(o));</span></span>
<span class="line"><span>// log(m.has(o));</span></span>
<span class="line"><span>// m.delete(o);</span></span>
<span class="line"><span>// log(m.has(o));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Map也可以接受一个数组作为参数</span></span>
<span class="line"><span>// const map = new Map([</span></span>
<span class="line"><span>//     [&#39;name&#39;, &#39;张三&#39;],</span><span> // 只有数组的前两项别识别为key value</span></span>
<span class="line"><span>//     [&#39;title&#39;, &#39;Author&#39;]</span></span>
<span class="line"><span>// ]);</span></span>
<span class="line"><span>// log(map.size);</span></span>
<span class="line"><span>// log(map.has(&#39;name&#39;));</span></span>
<span class="line"><span>// log(map.get(&#39;name&#39;));</span></span>
<span class="line"><span>// log(map.has(&#39;title&#39;));</span></span>
<span class="line"><span>// log(map.get(&#39;title&#39;));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Map构造函数接受数组作为参数，实际上执行的是下面算法</span></span>
<span class="line"><span>// const items = [</span></span>
<span class="line"><span>//     [&#39;name&#39;, &#39;张三&#39;],</span></span>
<span class="line"><span>//     [&#39;title&#39;, &#39;Author&#39;]</span></span>
<span class="line"><span>// ];</span></span>
<span class="line"><span>// const map = new Map();</span></span>
<span class="line"><span>// items.forEach(</span></span>
<span class="line"><span>//     ([key, value]) =&gt; map.set(key, value)</span></span>
<span class="line"><span>// );</span></span>
<span class="line"><span>// log(map);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 类似数组，任何具有Interable接口，且每个成员都是一个双元素数组的数据结构，都可以作为Map构造函数的参数，所以 Set 和 Map 都可以用来生成新的 Map</span></span>
<span class="line"><span>// const set = new Set([</span></span>
<span class="line"><span>//     [&#39;foo&#39;, 1],</span></span>
<span class="line"><span>//     [&#39;bar&#39;, 2]</span></span>
<span class="line"><span>// ]);</span></span>
<span class="line"><span>// const m1 = new Map(set);</span></span>
<span class="line"><span>// log(m1.get(&#39;foo&#39;));</span></span>
<span class="line"><span>// const m2 = new Map([[&#39;baz&#39;, 3]]);</span></span>
<span class="line"><span>// const m3 = new Map(m2);</span></span>
<span class="line"><span>// log(m3.get(&#39;baz&#39;));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// l连续对同一个键多次赋值，后面的值将覆盖前面的值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 获取未知键时，返回undefined</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 只有键的引用地址相同，Map才会将其视为同一个键</span></span>
<span class="line"><span>// Map 的键实际上是跟北村地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞(clash)的问题,当我们扩展别人的库的时候，不必再担心自己的属性与原作者的属性同名</span></span>
<span class="line"><span>// const map = new Map();</span></span>
<span class="line"><span>// map.set([&#39;a&#39;], 555);</span></span>
<span class="line"><span>// log(map.get([&#39;a&#39;]));</span><span> // undefined</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 如果Map 的键是一个简单类型的值（数字、字符串、布尔值）,则只要两个值严格相等，Map都会视为一个键，undefined和null是两个不同的键，NaN也视为一个键</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// let map = new Map();</span></span>
<span class="line"><span>// map.set(-0, 123);</span></span>
<span class="line"><span>// log(map.get(+0));</span></span>
<span class="line"><span>// map.set(true, 1);</span></span>
<span class="line"><span>// map.set(&#39;true&#39;, 2);</span></span>
<span class="line"><span>// log(map.get(true));</span></span>
<span class="line"><span>// map.set(undefined, 3);</span></span>
<span class="line"><span>// map.set(null, 4);</span></span>
<span class="line"><span>// log(map.get(undefined));</span></span>
<span class="line"><span>// map.set(NaN, 123);</span></span>
<span class="line"><span>// log(map.get(NaN));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 实例的属性和操作方法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// size属性 返回Map结构的成员总数</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Map.prototype.set(key, value) set方法设置键名key对应的键值value 然后返回整个Map结构(所以可以采用链式写法)，如果key已经存在，则键值会被更新，否则就生成该键</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Map.prototype.get(key) get方法读取对应的键值，如果找不到key，就返回undefined</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Map.prototype.has(key) 返回一个布尔值 表示某个键是否在当前Map对象之中</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Map.prototype.delete(key) delete方法删除某个键，返回true，如果删除失败，返回false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Map.prototype.clear() clear方法清除所有成员，没有返回值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 实例的遍历方法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Map.prototype.keys() 返回键名的遍历器</span></span>
<span class="line"><span>// Map.prototype.values() 返回键值的遍历器</span></span>
<span class="line"><span>// Map.prototype.entries() 返回所有成员的遍历器</span></span>
<span class="line"><span>// Map.prototype.forEach() 遍历Map的所有成员</span></span>
<span class="line"><span>// Map的遍历顺序就是插入顺序</span></span>
<span class="line"><span>// const map = new Map([</span></span>
<span class="line"><span>//     [&#39;F&#39;, &#39;no&#39;],</span></span>
<span class="line"><span>//     [&#39;T&#39;, &#39;yes&#39;]</span></span>
<span class="line"><span>// ]);</span></span>
<span class="line"><span>// for(let key of map.keys()){</span></span>
<span class="line"><span>//     log(key);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// for(let value of map.values()){</span></span>
<span class="line"><span>//     log(value);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// for(let item of map.entries()){</span></span>
<span class="line"><span>//     log(item);</span><span> // 键值对数组 [&#39;F&#39;, &#39;no]</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// for(let [key, value] of map){</span><span> // Map结构默认部署Iterator接口</span></span>
<span class="line"><span>//     console.log(key, value);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Map结构转为数组结构，比较快速的方法是使用扩展运算符(...)</span></span>
<span class="line"><span>// const map = new Map([</span></span>
<span class="line"><span>//     [1, &#39;one&#39;],</span></span>
<span class="line"><span>//     [2, &#39;two&#39;],</span></span>
<span class="line"><span>//     [3, &#39;three&#39;]</span></span>
<span class="line"><span>// ]);</span></span>
<span class="line"><span>// log([...map.keys()]);</span></span>
<span class="line"><span>// log([...map.values()]);</span></span>
<span class="line"><span>// log([...map.entries()]);</span></span>
<span class="line"><span>// log([...map]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 结合数组的map方法、filter方法，可以实现Map的遍历和过滤 （Map本身没有map和filter方法）</span></span>
<span class="line"><span>// const map0 = new Map()</span></span>
<span class="line"><span>//     .set(1, &#39;a&#39;)</span></span>
<span class="line"><span>//     .set(2, &#39;b&#39;)</span></span>
<span class="line"><span>//     .set(3, &#39;c&#39;);</span></span>
<span class="line"><span>// const map1 = new Map(</span></span>
<span class="line"><span>//     [...map0].filter(([k,v]) =&gt; k &lt; 3)</span></span>
<span class="line"><span>// )</span></span>
<span class="line"><span>// log(map0,map1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Map的forEach方法和数组的forEach方法类似</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 与其它数据结构的相互转换</span></span>
<span class="line"><span>// Map转为数组， 可以使用扩展运算符</span></span>
<span class="line"><span>// 数组转为Map 将数组传入Map构造函数即可</span></span>
<span class="line"><span>// Map转为对象 如果所有Map的key都是字符串，它可以无损的转为对象</span></span>
<span class="line"><span>// function strMapToObj (strMap){</span></span>
<span class="line"><span>//     let obj = Object.create(null);</span></span>
<span class="line"><span>//     for(let [k, v] of strMap){</span></span>
<span class="line"><span>//         obj[k] = v;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>//     return obj;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// let myMap = new Map()</span></span>
<span class="line"><span>//     .set(&#39;yes&#39;, true)</span></span>
<span class="line"><span>//     .set(&#39;no&#39;, false);</span></span>
<span class="line"><span>// log(myMap, strMapToObj(myMap));</span></span>
<span class="line"><span>//</span><span> // 对象转为Map 对象转为Map可以使用Object.entries() 或自己实现一个转换函数</span></span>
<span class="line"><span>// let obj = {&#39;a&#39;: 1, &#39;b&#39;: 2};</span></span>
<span class="line"><span>// let map = new Map(Object.entries(obj));</span></span>
<span class="line"><span>// log(obj,map);</span></span>
<span class="line"><span>// function objToStrMap (obj){</span></span>
<span class="line"><span>//     let  strMap = new Map();</span></span>
<span class="line"><span>//     for(let k of Object.keys(obj)){</span></span>
<span class="line"><span>//         strMap.set(k, obj[k]);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>//     return strMap;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// log(objToStrMap({yes:true,no:false}));</span></span>
<span class="line"><span>//</span><span> // Map转JSON 此时要区分两种，若Map的键名都是字符串，这时可以转为对象JSON，若Map的键含有非字符串，可以转为数组JSON</span></span>
<span class="line"><span>// function strMapToJson (strMap){</span></span>
<span class="line"><span>//     return JSON.stringify(strMapToObj(strMap));</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// log(strMapToJson(myMap));</span></span>
<span class="line"><span>// function mapToArrayJson (map){</span></span>
<span class="line"><span>//     return JSON.stringify([...map]);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// log(mapToArrayJson(myMap));</span></span>
<span class="line"><span>//</span><span> // JSON转为Map 正常情况下 所有键名都是字符串</span></span>
<span class="line"><span>// function jsonToStrMap(jsonStr){</span></span>
<span class="line"><span>//     return objToStrMap(JSON.parse(jsonStr));</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// log(jsonToStrMap(&#39;{&quot;yes&quot;: true, &quot;no&quot;: false}&#39;));</span></span>
<span class="line"><span>//</span><span> // 有一种特殊情况， 整个JSON是一个数组，且每个数组成员本身，又是一个有两个成员的数组，这时它可以一一对应的转成Map</span></span>
<span class="line"><span>// function jsonToMap(jsonStr){</span></span>
<span class="line"><span>//     return new Map(JSON.parse(jsonStr));</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// log(jsonToMap(&#39;[[true,7],[{&quot;foo&quot;: 3},[&quot;abc&quot;]]]&#39;));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// WeakMap</span></span>
<span class="line"><span>// 相同点：WeakMap与Map类似 也是用于生成键值对的集合</span></span>
<span class="line"><span>// 不同点1：WeakMap只接受对象作为键名（不包括null），不接受其他类型的值作为键名</span></span>
<span class="line"><span>// 不同点2：WeakMap键名所指向的对象，不计入垃圾回收机制，它的键名所引用的对象都是弱引用，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 基本上，如果你想要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用WeakMap，WeakMap结构有助于防止内存泄漏。WeakMap弱引用的只是键名，而不是键值，键值依然是正常引用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// WeakMap的语法 与Map的区别主要是：1.没有便利操作（keys、values、entries）及size属性；2.无法清空，没有clear方法</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// WeakMap的用途</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 用途1：DOM节点作为键名</span></span>
<span class="line"><span>let myWeakMap = new WeakMap();</span></span>
<span class="line"><span>myWeakMap.set(</span></span>
<span class="line"><span>    document.getElementById(&#39;logo&#39;),</span></span>
<span class="line"><span>    { timesClicked: 0 }</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span>document.getElementById(&#39;logo&#39;).addEventListener(&#39;click&#39;, function (){</span></span>
<span class="line"><span>    let logoData = myWeakMap.get(document.getElementById(&#39;logo&#39;));</span></span>
<span class="line"><span>    console.log(logoData.timesClicked);</span></span>
<span class="line"><span>    logoData.timesClicked++;</span></span>
<span class="line"><span>}, false);</span></span>
<span class="line"><span>document.getElementById(&#39;rm&#39;).addEventListener(&#39;click&#39;, function (){</span></span>
<span class="line"><span>    let logoData = myWeakMap.get(document.getElementById(&#39;logo&#39;));</span></span>
<span class="line"><span>    console.log(&#39;删除前&#39;,logoData.timesClicked);</span></span>
<span class="line"><span>    var dom = document.getElementById(&#39;logo&#39;);</span></span>
<span class="line"><span>    dom.parentElement.removeChild(dom);</span></span>
<span class="line"><span>    let logoData1 = myWeakMap.get(document.getElementById(&#39;logo&#39;));</span></span>
<span class="line"><span>    console.log(&#39;删除后&#39;,logoData1); // undefined</span></span>
<span class="line"><span>}, false);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 用途2：部署私有属性</span></span>
<span class="line"><span>const _counter = new WeakMap();</span></span>
<span class="line"><span>const _action = new WeakMap();</span></span>
<span class="line"><span>class Countdown {</span></span>
<span class="line"><span>    constructor (counter,action){</span></span>
<span class="line"><span>        _counter.set(this, counter);</span></span>
<span class="line"><span>        _action.set(this, action);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    dec (){</span></span>
<span class="line"><span>        let counter = _counter.get(this);</span></span>
<span class="line"><span>        console.log(&#39;counter：&#39;, counter);</span></span>
<span class="line"><span>        if(counter &lt; 1) return;</span></span>
<span class="line"><span>        counter--;</span></span>
<span class="line"><span>        _counter.set(this, counter);</span></span>
<span class="line"><span>        if(counter === 0){</span></span>
<span class="line"><span>            _action.get(this)();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var c = new Countdown(3, () =&gt; console.log(&#39;DONE&#39;));</span></span>
<span class="line"><span>c.dec();</span></span>
<span class="line"><span>c.dec();</span></span>
<span class="line"><span>c.dec();</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// WeakRef 弱引用对象</span></span>
<span class="line"><span>// WeakSet 和 WeakMap都是基于弱引用的数据结构，ES2021提供了WeakRef对象，用于直接创建对象的弱引用</span></span>
<span class="line"><span>let target = {};</span></span>
<span class="line"><span>let wr = new WeakRef(target);</span></span>
<span class="line"><span>log(wr);</span></span>
<span class="line"><span>let obj = wr.deref();</span></span>
<span class="line"><span>if(obj){</span></span>
<span class="line"><span>    log(&#39;未被清除&#39;);</span></span>
<span class="line"><span>}else {</span></span>
<span class="line"><span>    log(&#39;已被清除&#39;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>target = null;</span></span>
<span class="line"><span>if(obj){</span></span>
<span class="line"><span>    log(&#39;未被清除&#39;);</span></span>
<span class="line"><span>}else {</span></span>
<span class="line"><span>    log(&#39;已被清除&#39;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 弱引用对象的一大用处就是作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动失效</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// FinalizationRegistry  ES2021引入了清理注册表功能FinalizationRegistry，用来指定目标对象呗垃圾回收机制清除以后，所要执行的回调函数</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const registry = new FinalizationRegistry(heldValue =&gt; {</span></span>
<span class="line"><span>    // ....</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>registry.register(theObject, &quot;some value&quot;);</span></span></code></pre></div><h2 id="symbol" tabindex="-1">Symbol <a class="header-anchor" href="#symbol" aria-label="Permalink to &quot;Symbol&quot;">​</a></h2><ul><li>ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值，Symbol 值通过 Symbol 函数生成。</li><li>Symbol 函数的参数只表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的</li><li>Symbol 值不能和其它类型的值进行运算，否则会报错</li><li>Symbol值可以显式的转为字符串<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    var s = Symbol(&#39;foo&#39;);</span></span>
<span class="line"><span>    String(s); // &#39;Symbol(foo)&#39;</span></span>
<span class="line"><span>    s.toString(); // &#39;Symbol(foo)&#39;</span></span></code></pre></div></li><li>Symbol值也可以转为布尔值，但不能转为数值<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    var s = Symbol(&#39;foo&#39;);</span></span>
<span class="line"><span>    Boolean(s); // true</span></span></code></pre></div></li><li>Symbol作为对象的属性名时，不能使用点运算符，需要使用方括号结构，在对象内部，使用Symbol值定义属性时，Symbol值必须放在方括号中</li><li>Symbol值作为属性名时，该属性还是公开属性，不是私有属性</li><li>Symbol类型还可以用来定义一组常量，这可以保证没有重复值</li><li>属性名的遍历：Symbol作为属性名，该属性不会出现在for..in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames() 返回，可以用Object.getOwnPropertySymbols 方法获取，另外Reflect.ownKeys 方法可以返回所有类型的键名，包括常规键名和Symbol键名</li><li>Symbol.for: 有时候我们希望重新使用同一个Symbol值 Symbol.for 方法可以做到。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值，如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。</li><li>Symbol.for() 与 Symbol() 这两种写的，都会生成新的Symbol。区别是，前者会被登记在全局环境中供搜索，而后者不会。Symbol.for()不会每次调用都返回一个新的Symbol类型的值，而是先检查给定的key是否已存在，如果不存在，才回新建一个值。Symbol()写法没有登记机制，所以每次调用都会返回一个不同的值。</li><li>Symbol.keyFor(): 该方法返回一个已登记的Symbol类型值的key</li><li>Symbol.for 为 Symbol 值登记的名字是全局环境的，可以在不同的iframe或service.worker中取到同一个值</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/**Symbol */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// let s = Symbol();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 属性名的遍历</span></span>
<span class="line"><span>// var obj = {};</span></span>
<span class="line"><span>// var a = Symbol(&#39;a&#39;);</span></span>
<span class="line"><span>// var b = Symbol.for(&#39;b&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// obj[a] = &#39;Hello&#39;;</span></span>
<span class="line"><span>// obj[b] = &#39;World&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var objectSymbols =Object.getOwnPropertySymbols(obj);</span></span>
<span class="line"><span>// console.log(objectSymbols);</span></span>
<span class="line"><span>// var objectReflct = Reflect.ownKeys(obj);</span></span>
<span class="line"><span>// console.log(objectReflct);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Symbol.for 为 Symbol 值登记的名字是全局环境的，可以在不同的iframe或service.worker中取到同一个值</span></span>
<span class="line"><span>// var s1 = Symbol.for(&#39;foo&#39;);</span></span>
<span class="line"><span>// var s2 = Symbol.for(&#39;foo&#39;);</span></span>
<span class="line"><span>//</span><span> // console.log(s1 === s2)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// iframe = document.createElement(&#39;iframe&#39;);</span></span>
<span class="line"><span>// iframe.src = String(window.location);</span></span>
<span class="line"><span>// document.body.appendChild(iframe);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var bool = iframe.contentWindow.Symbol.for(&#39;foo&#39;) === Symbol.for(&#39;foo&#39;)</span></span>
<span class="line"><span>// console.log(bool);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ES6 提供了11个内置的Symbol值，指向语言内部使用的方法</span></span>
<span class="line"><span>// 1.Symbol.hasInstance -- instanceof 内部调用的这个方法(实际未调用自己设置的这个方法)</span></span>
<span class="line"><span>// class MyClass {</span></span>
<span class="line"><span>//     [Symbol.hasInstance](foo){</span></span>
<span class="line"><span>//         console.log(foo,&#39;foo&#39;)</span></span>
<span class="line"><span>//         return foo instanceof Array;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var o = new MyClass();</span></span>
<span class="line"><span>//</span><span> // var bool = o instanceof Array;</span></span>
<span class="line"><span>// var bool = o instanceof MyClass;</span></span>
<span class="line"><span>// console.log(bool);</span></span>
<span class="line"><span>// console.log(MyClass[Symbol.hasInstance](o));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 2.Symbol.isConcatSpreadable 等于一个布尔值，表示该数据结构是否是可扩展的</span></span>
<span class="line"><span>// 对于数组 表示该使用Array.prototype.concat()时，是否可以展开</span></span>
<span class="line"><span>// let arr1 = [&#39;c&#39;, &#39;d&#39;];</span></span>
<span class="line"><span>// let result = [&#39;a&#39;, &#39;b&#39;].concat(arr1, &#39;e&#39;);</span></span>
<span class="line"><span>// console.log(result);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// let arr2 = [&#39;c&#39;, &#39;d&#39;];</span></span>
<span class="line"><span>// arr2[Symbol.isConcatSpreadable] = false;</span></span>
<span class="line"><span>// let result = [&#39;a&#39;, &#39;b&#39;].concat(arr2, &#39;e&#39;);</span></span>
<span class="line"><span>// console.log(result);</span></span>
<span class="line"><span>// 数组的 Symbol.isConcatSpreadable 属性默认为 true，表示可以展开。类数组对象也可以展开，但其Symbol.isConcatSpreadable默认为false，必须手动打开</span></span>
<span class="line"><span>// 对于一个类 Symbol.isConcatSpreadable 属性必须写成一个返回布尔值的方法。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 3.Symbol.species 对象作为构造函数时，如果这个方法存在，就会使用这个属性作为构造函数来创造新的实例对象</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 4. Symbol.match 指向一个函数，调用str.match时会调用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 5. Symbol.replace 指向一个函数，调用String.prototype.replace 方法时调用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 6. Symbol.search 指向一个函数，调用String.prototype.replace 方法时调用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 7. Symbol.split 指向一个方法，调用String.prototype.split 方法时调用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 8. Symbol.interator 指向默认遍历器方法，即对象在for...of循环时会调用这个方法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 9. Symbol.toPrimitive 指向一个方法，对象被转为原始类型的值时会调用这个方法，返回该对象对应的原始类型的值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// let obj = {</span></span>
<span class="line"><span>//     [Symbol.toPrimitive] (hint){</span></span>
<span class="line"><span>//         switch (hint){</span></span>
<span class="line"><span>//             case &#39;number&#39;:</span></span>
<span class="line"><span>//                 return 123;</span></span>
<span class="line"><span>//             case &#39;string&#39;:</span></span>
<span class="line"><span>//                 return &#39;str&#39;;</span></span>
<span class="line"><span>//             case &#39;default&#39;:</span></span>
<span class="line"><span>//                 return &#39;default&#39;;</span></span>
<span class="line"><span>//             default:</span></span>
<span class="line"><span>//                 throw new Error();</span></span>
<span class="line"><span>//         }</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// console.log(2 * obj);</span><span> // 246</span></span>
<span class="line"><span>// console.log(3 + obj);</span><span> // 3default</span></span>
<span class="line"><span>// console.log(obj === &#39;default&#39;);</span><span> // false</span></span>
<span class="line"><span>// console.log(String(obj));</span><span> // default</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 10. Symbol.toStringTag 指向一个方法，在对象上调用 Object.prototype.toString方法时，如果这个属性存在，其返回值会出现在toString方法返回的字符串中，表示对象的类型。也就是说，这个属性可以用于定时[object Object] 或 [object Array]中object后面的字符串 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var type = ({[Symbol.toStringTag]: &#39;Foo&#39;}).toString();</span></span>
<span class="line"><span>// console.log(type)</span><span> // Foo</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// class Collection {</span></span>
<span class="line"><span>//     get [Symbol.toStringTag] (){</span></span>
<span class="line"><span>//         return &#39;xxx&#39;;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var x = new Collection();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// console.log(Object.prototype.toString.call(x));</span><span> // [object xxx]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 11. Symbol.unscopables 指向一个方法，制定了使用with关键字时，哪些属性会被with环境排除</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 没有 unscopables 时</span></span>
<span class="line"><span>// class MyClass {</span></span>
<span class="line"><span>//     foo(){</span></span>
<span class="line"><span>//         console.log(1);</span></span>
<span class="line"><span>//         return 1;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var foo = function (){</span></span>
<span class="line"><span>//     console.log(2);</span></span>
<span class="line"><span>//     return 2;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// with(MyClass.prototype){</span></span>
<span class="line"><span>//     foo();</span><span> // 1</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 有 unscopables 时</span></span>
<span class="line"><span>// class MyClass {</span></span>
<span class="line"><span>//     foo(){</span></span>
<span class="line"><span>//         console.log(1);</span></span>
<span class="line"><span>//         return 1;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>//     get[Symbol.unscopables] (){</span></span>
<span class="line"><span>//         return { foo: true };</span><span> // MyClass 的 foo方法被排除在with环境中</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var foo = function (){</span></span>
<span class="line"><span>//     console.log(2);</span></span>
<span class="line"><span>//     return 2;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// with(MyClass.prototype){</span></span>
<span class="line"><span>//     foo();</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**其它相关知识 1 */</span></span>
<span class="line"><span>// ES6 新增内置对象的 Symbol.toStringTag 属性值如下：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 可直接在控制台查看 -- 通过构造函数</span></span>
<span class="line"><span>// JSON[Symbol.toStringTag]: &#39;JSON&#39;</span></span>
<span class="line"><span>// Math[Symbol.toStringTag]: &#39;Math&#39;</span></span>
<span class="line"><span>// ArrayBuffer.prototype[Symbol.toStringTag]:&#39;ArrayBuffer&#39;</span></span>
<span class="line"><span>// DataView.prototype[Symbol.toStringTag]: &#39;DataView&#39;</span></span>
<span class="line"><span>// Map.prototype[Symbol.toStringTag]: &#39;Map&#39;</span></span>
<span class="line"><span>// Promise.prototype[Symbol.toStringTag]: &#39;Promise&#39;</span></span>
<span class="line"><span>// Set.prototype[Symbol.toStringTag]: &#39;Set&#39;</span></span>
<span class="line"><span>// WeakMap.prototype[Symbol.toStringTag]: &#39;WeakMap&#39;</span></span>
<span class="line"><span>// WeakSet.prototype[Symbol.toStringTag]: &#39;WeakSet&#39;</span></span>
<span class="line"><span>// Symbol.prototype[Symbol.toStringTag]: &#39;Symbol&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 需要生成实例 在实例上查看</span></span>
<span class="line"><span>// Module[Symbol.toStringTag]: &#39;Module&#39;</span></span>
<span class="line"><span>// %TypedArray%.prototype[Symbol.toStringTag]: &#39;Uint8Array等&#39;</span></span>
<span class="line"><span>// %MapIteratorPrototype%[Symbol.toStringTag]: &#39;Map Iterator&#39;</span></span>
<span class="line"><span>// %SetIteratorPrototype%[Symbol.toStringTag]: &#39;Set Iterator&#39;</span></span>
<span class="line"><span>// %StringIteratorPrototype%[Symbol.toStringTag]: &#39;String Iterator&#39;</span></span>
<span class="line"><span>// Generator.prototype[Symbol.toStringTag]: &#39;Generator&#39;</span></span>
<span class="line"><span>// GeneratorFunction.prototype[Symbol.toStringTag]: &#39;GeneratorFunction&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**其它相关知识 2 */</span></span>
<span class="line"><span>// /*</span></span>
<span class="line"><span>// dataview 了解</span></span>
<span class="line"><span>// const buffer = new ArrayBuffer(16);</span></span>
<span class="line"><span>// const view1 = new DataView(buffer);</span></span>
<span class="line"><span>// const view2 = new DataView(buffer, 12, 4);</span></span>
<span class="line"><span>// console.log(view1,view2)</span></span>
<span class="line"><span>// view1.setInt8(12, 42);</span></span>
<span class="line"><span>// console.log(view1);</span></span>
<span class="line"><span>// console.log(view2.getInt8(0));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// DataView 视图是一个可以从二进制ArrayBuffer对象中毒蝎多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序问题</span></span>
<span class="line"><span>// 参数： new DataView(buffer [, byteOffset [, byteLength]])</span></span>
<span class="line"><span>// buffer：一个已经存在的ArrayBuffer或SharedArrayBuffer对象，DataView对象的数据源</span></span>
<span class="line"><span>// byteOffset：此DataView对象的第一个字节在buffer中的字节偏移，未指定时，默认从第一个字节开始</span></span>
<span class="line"><span>// byteLength：此DataView对象的字节长度，未指定，则这个视图的长度将匹配buffer的长度</span></span>
<span class="line"><span>// 返回值：一个表示指定数据缓存区的心 DataView 对象。 --- 你可以把返回的对象想象成一个二进制字节缓存区 array buffer 的“解释器”——它知道如何在读取或写入时正确地转换字节码。这意味着它能在二进制层面处理整数与浮点转化、字节顺序等其他有关的细节问题。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**其它相关知识 3 */</span></span>
<span class="line"><span>// /*</span></span>
<span class="line"><span>//  with 语句</span></span>
<span class="line"><span>// 警告：不建议使用with语句，因为它可能是混淆错误和兼容性问题的根源</span></span>
<span class="line"><span>// with语句 扩展一个语句的作用域链</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// with (expression) {</span></span>
<span class="line"><span>//     statement</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// expression</span></span>
<span class="line"><span>// 将给定的表达式添加到在评估语句时使用的作用域链上。表达式周围的括号是必需的。</span></span>
<span class="line"><span>// statement</span></span>
<span class="line"><span>// 任何语句。要执行多个语句，请使用一个块语句 ({ ... })对这些语句进行分组。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//  */</span></span></code></pre></div><h2 id="proxy" tabindex="-1">Proxy <a class="header-anchor" href="#proxy" aria-label="Permalink to &quot;Proxy&quot;">​</a></h2><ul><li>Proxy 可以理解成在目标对象前架设一个“拦截”层，由它来代理某些操作，可以理解为代理器</li><li>ES6 原生提供Proxy构造函数，用于生成Proxy实例</li><li>作为构造函数Proxy接受两个参数：第一个参数是所要代理的目标对象，第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作</li><li>要使Proxy起作用，必须针对Proxy实例进行操作，而不是针对目标对象进行操作</li><li>一个技巧是将Proxy对象设置到object.proxy属性，从而可以在object对象上调用</li><li>Proxy实例也可以作为其它对象的原型对象</li></ul><h2 id="proxy支持的拦截操作" tabindex="-1">Proxy支持的拦截操作 <a class="header-anchor" href="#proxy支持的拦截操作" aria-label="Permalink to &quot;Proxy支持的拦截操作&quot;">​</a></h2><ul><li>get(target,propKey,reveiver) get方法用于拦截某个属性的读取操作；get方法可以继承；利用get操作，可以实现属性的链式操作</li><li>set(target,propKey,value,receiver) set方法拦截对象属性的设置；利用set方法还可以数据绑定，即每当对象发生变化时，会自动更新DOM；结合get和set，可以设置以&quot;_&quot;开头的私有属性，防止其被外界读取</li><li>has(target, propKey) 拦截propKey in proxy 的操作 返回一个布尔值；has方法可以隐藏某些属性，不被in操作符发现；如果原对象(target)不可配置或禁止扩展，此时has拦截会报错</li><li>deleteProperty(target, propKey) 拦截delete proxy[propKey]的操作，返回一个布尔值；deleteProperty用于拦截delete操作，如果这个方法抛出错误或返回false，当前属性就无法被delete命令删除</li><li>enumerate(target) 拦截for(var x in proxy) 返回一个遍历器，即拦截for..in循环如果enumerate方法返回的不是一个对象，就会报错</li><li>hasOwn(target, propKey) 拦截proxy.hasOwnProperty(&#39;foo&#39;),返回一个布尔值；</li><li>ownKeys(target) 拦截Object.getOwnpropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy),返回一个数组，该方法返回对象所有自身属性，而Object.keys()仅返回对象可遍历的属性</li><li>getOwnpropertyDescriptor(target, propKey) 拦截Object.getOwnPropertyDescriptor(proxy, propKey),返回属性的描述对象</li><li>defineProperty(target,propKey,propDesc) 拦截Object.defineProperty(proxy, propKey, propDesc)、Object.defineProperties(proxy, propDescs),返回一个布尔值</li><li>preventExtensions(target) 拦截Object.preventExtensions(proxy) 返回一个布尔值</li><li>getPrototypeOf(target) 拦截Object.getPrototypeOf(proxy),返回一个对象</li><li>isExtensible(target) 拦截Object.isExtensible(proxy),返回一个布尔值</li><li>setPrototypeOf(target, proto) 拦截Object.setPrototypeOf(proxy,proto)，返回一个布尔值，</li><li>如果目标对象时函数，那么还有两种操作可以拦截：</li><li>apply(target, object, args) 拦截Proxy实例作为函数调用的操作，比如proxy(...args)、proxy.call(object,...args)、proxy.apply(object,args);</li><li>construct(target, args, proxy) 拦截Proxy实例作为构造函数调用的操作，比如 new proxy(...args)</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Proxy */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var target = {}</span></span>
<span class="line"><span>// var obj = new Proxy(target, {</span></span>
<span class="line"><span>//     get: function (target, key, receiver){</span></span>
<span class="line"><span>//         console.log(\`getting \${key}\`, target, key, receiver);</span></span>
<span class="line"><span>//         return Reflect.get(target, key, receiver);</span></span>
<span class="line"><span>//     },</span></span>
<span class="line"><span>//     set: function (target, key, value, receiver){</span></span>
<span class="line"><span>//         console.log(\`setting \${key}\`, target, key, value, receiver);</span></span>
<span class="line"><span>//         return Reflect.set(target, key, value, receiver);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span>// obj.count = 1;</span></span>
<span class="line"><span>// ++obj.count;</span></span>
<span class="line"><span>// target.count = 1;</span><span> // 给目标对象直接操作 不会触发proxy 只有操作代理对象Proxy的实例 才会触发</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var proxy = new Proxy({}, {</span></span>
<span class="line"><span>//     get: function(target, property){</span></span>
<span class="line"><span>//         return 35;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// console.log(Object.prototype.toString.call(proxy));</span><span> //  &#39;[object Object]&#39;</span></span>
<span class="line"><span>// console.log(Object.prototype.toString.call(Proxy));</span><span> //  &#39;[object Function]&#39;</span></span>
<span class="line"><span>// console.log(proxy.time);</span><span> // 35</span></span>
<span class="line"><span>// console.log(proxy.name);</span><span> // 35</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 要使Proxy起作用，必须针对Proxy实例进行操作，而不是针对目标对象进行操作</span></span>
<span class="line"><span>// var target = {}</span></span>
<span class="line"><span>// var handler = {}</span></span>
<span class="line"><span>// var proxy = new Proxy(target, handler);</span></span>
<span class="line"><span>// proxy.a = &#39;b&#39;</span></span>
<span class="line"><span>// console.log(target.a)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 一个拦截器可以设置多个拦截操作</span></span>
<span class="line"><span>// var funcTarget = function (x, y){</span></span>
<span class="line"><span>//     return x + y;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var funcHandler = {</span></span>
<span class="line"><span>//     get: function (target, name){</span></span>
<span class="line"><span>//         if(name === &#39;prototype&#39;) return Object.prototype;</span></span>
<span class="line"><span>//         return &#39;Hello, &#39; + name;</span></span>
<span class="line"><span>//     },</span></span>
<span class="line"><span>//     apply: function (target, thisBinding, args){ return args[0]; },</span></span>
<span class="line"><span>//     construct: function (target, args){ return { value: args[1] }; }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var fProxy = new Proxy(funcTarget, funcHandler);</span></span>
<span class="line"><span>// console.log(fProxy(1, 2));</span></span>
<span class="line"><span>// console.log(new fProxy(1, 2).value);</span></span>
<span class="line"><span>// console.log(fProxy.prototype);</span></span>
<span class="line"><span>// console.log(fProxy.hhk);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var objTarget = {}</span></span>
<span class="line"><span>// var objHandler = {</span></span>
<span class="line"><span>//     get: function (target, key, receiver){</span></span>
<span class="line"><span>//         console.log(\`getting \${key}\`, target, key, receiver);</span></span>
<span class="line"><span>//         return Reflect.get(target, key, receiver);</span></span>
<span class="line"><span>//     },</span></span>
<span class="line"><span>//     set: function (target, key, value, receiver){</span></span>
<span class="line"><span>//         console.log(\`setting \${key}\`, target, key, value, receiver);</span></span>
<span class="line"><span>//         return Reflect.set(target, key, value, receiver);</span></span>
<span class="line"><span>//     },</span></span>
<span class="line"><span>//     has: function (target, propKey){</span></span>
<span class="line"><span>//         return false;</span><span> // 返回值会被强制转为boolean再进行return</span></span>
<span class="line"><span>//     },</span></span>
<span class="line"><span>//     deleteProperty: function (target, propKey){</span></span>
<span class="line"><span>//</span><span>         // delete code  --- 需要自定义删除操作 否则删除失败</span></span>
<span class="line"><span>//         return true; </span></span>
<span class="line"><span>//     },</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var objProxy = new Proxy(objTarget, objHandler);</span></span>
<span class="line"><span>// console.log(&#39;name1&#39; in objProxy);</span><span> // 需查看在代理对象中的属性，而不是目标对象</span></span>
<span class="line"><span>// objProxy.name = 1;</span></span>
<span class="line"><span>// console.log(delete objProxy[&#39;name&#39;])</span></span>
<span class="line"><span>// console.log(objProxy[&#39;name&#39;])</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// get方法可以继承</span></span>
<span class="line"><span>// let proto = new Proxy({}, {</span></span>
<span class="line"><span>//     get(target, propertyKey, receiver) {</span></span>
<span class="line"><span>//         console.log(&#39;GET &#39;+ propertyKey);</span></span>
<span class="line"><span>//         return target[propertyKey];</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span>// let obj = Object.create(proto);</span></span>
<span class="line"><span>// obj.xxx</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 使用get方法拦截实现数组读取负数索引</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// function createArray (...elements) {</span></span>
<span class="line"><span>//     let handler = {</span></span>
<span class="line"><span>//         get (target, propKey, receiver){</span></span>
<span class="line"><span>//             let index = Number(propKey);</span></span>
<span class="line"><span>//             if(index &lt; 0){</span></span>
<span class="line"><span>//                 propKey = String(target.length + index);</span></span>
<span class="line"><span>//             }</span></span>
<span class="line"><span>//             return Reflect.get(target, propKey, receiver);</span></span>
<span class="line"><span>//         }</span></span>
<span class="line"><span>//     };</span></span>
<span class="line"><span>//     let target = [];</span></span>
<span class="line"><span>//     target.push(...elements);</span></span>
<span class="line"><span>//     return new Proxy(target, handler);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// let tempArr = [1, 2, 3];</span></span>
<span class="line"><span>// let arr = createArray(...tempArr);</span></span>
<span class="line"><span>//</span><span> // let arr = createArray(&#39;a&#39;, &#39;b&#39;, &#39;c&#39;);</span></span>
<span class="line"><span>// console.log(arr[1], arr[-1]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 通过Proxy，可以将读取属性的操作（get）转变为执行某个函数，从而实现属性的链式操作</span></span>
<span class="line"><span>// var pipe = (function (){</span></span>
<span class="line"><span>//     var pipe;</span></span>
<span class="line"><span>//     return function (value){</span></span>
<span class="line"><span>//         pipe = [];</span></span>
<span class="line"><span>//         return new Proxy({}, {</span></span>
<span class="line"><span>//             get: function (pipeObject, fnName, receiver){</span></span>
<span class="line"><span>//                 if(fnName == &#39;get&#39;){</span></span>
<span class="line"><span>//                     return pipe.reduce(function (val, fn){</span></span>
<span class="line"><span>//                         return fn(val);</span></span>
<span class="line"><span>//                     }, value)</span></span>
<span class="line"><span>//                 }</span></span>
<span class="line"><span>//                 pipe.push(fnObj[fnName]);</span></span>
<span class="line"><span>//                 return receiver;</span></span>
<span class="line"><span>//             }</span></span>
<span class="line"><span>//         });</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }());</span></span>
<span class="line"><span>// var fnObj ={</span></span>
<span class="line"><span>//     double: n =&gt; n * 2,</span></span>
<span class="line"><span>//     pow: n =&gt; n * n,</span></span>
<span class="line"><span>//     reverseInt: n =&gt; n.toString().split(&#39;&#39;).reverse().join(&#39;&#39;) | 0</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var result = pipe(3).double.pow.reverseInt.get;</span></span>
<span class="line"><span>// console.log(result);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// set 方法用于拦截某个属性的赋值操作</span></span>
<span class="line"><span>// 假定Person对象有一个age属性 该属性应该是一个不大于200的整数，可以使用Proxy保证age属性符合要求</span></span>
<span class="line"><span>// let validator = {</span></span>
<span class="line"><span>//     set: function (obj, prop, value){</span></span>
<span class="line"><span>//         if(prop === &#39;age&#39;){</span></span>
<span class="line"><span>//             if(!Number.isInteger(value)){</span></span>
<span class="line"><span>//                 throw new TypeError(&#39;The age is not an integer&#39;);</span></span>
<span class="line"><span>//             }</span></span>
<span class="line"><span>//             if(value &gt; 200){</span></span>
<span class="line"><span>//                 throw new RangeError(&#39;The age seems invalid&#39;);</span></span>
<span class="line"><span>//             }</span></span>
<span class="line"><span>//         }</span></span>
<span class="line"><span>//         obj[prop] = value;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// let person = new Proxy({}, validator);</span></span>
<span class="line"><span>// person.age = 30;</span></span>
<span class="line"><span>// console.log(person.age);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新DOM</span></span>
<span class="line"><span>// 利用set方法，还可以设置私有属性，比如以下划线_开头，防止外部访问</span></span>
<span class="line"><span>// var handler = {</span></span>
<span class="line"><span>//     get (target, key){</span></span>
<span class="line"><span>//         invariant(key, &#39;get&#39;);</span></span>
<span class="line"><span>//         return target[key];</span></span>
<span class="line"><span>//     },</span></span>
<span class="line"><span>//     set (target, key, value){</span></span>
<span class="line"><span>//         invariant(key, &#39;set&#39;);</span></span>
<span class="line"><span>//         target[key] = value;</span></span>
<span class="line"><span>//         return true;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// function invariant (key, action){</span></span>
<span class="line"><span>//     if(key[0] === &#39;_&#39;){</span></span>
<span class="line"><span>//         throw new Error(\`Invalid attempt to \${action} privite &quot;\${key}&quot; property\`);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var proxy = new Proxy({}, handler);</span></span>
<span class="line"><span>// proxy._prop</span></span>
<span class="line"><span>// proxy._prop = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// apply() 方法拦截函数的调用、call 和 apply 操作</span></span>
<span class="line"><span>// apply方法可以接受3个参数，分别是目标对象、目标对象的上下文（this）和目标对象的参数数组</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var target = function (){ return &#39;I am the target&#39;; };</span></span>
<span class="line"><span>// var handler = {</span></span>
<span class="line"><span>//     apply: function (){</span></span>
<span class="line"><span>//         return &#39;I am the proxy&#39;;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// };</span></span>
<span class="line"><span>// var p = new Proxy(target, handler);</span></span>
<span class="line"><span>// console.log(p());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var twice = {</span></span>
<span class="line"><span>//     apply: function (target, ctx, args){</span></span>
<span class="line"><span>//         return Reflect.apply(...arguments) * 2;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// };</span></span>
<span class="line"><span>// function sum (left, right){</span></span>
<span class="line"><span>//     return left + right;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var proxy = new Proxy(sum, twice);</span></span>
<span class="line"><span>// console.log(proxy(1, 2));</span></span>
<span class="line"><span>// console.log(proxy.call(null, 5, 6));</span></span>
<span class="line"><span>// console.log(proxy.apply(null, [7, 8]));</span></span>
<span class="line"><span>//</span><span> // 直接调用Reflect.apply方法也会被拦截</span></span>
<span class="line"><span>// console.log(Reflect.apply(proxy, null, [9, 10])); </span></span>
<span class="line"><span></span></span>
<span class="line"><span>// has() has方法可以隐藏某些属性 不被 in 操作符发现</span></span>
<span class="line"><span>// var handler = {</span></span>
<span class="line"><span>//     has (target, key){</span></span>
<span class="line"><span>//         if(key[0] === &#39;_&#39;){</span></span>
<span class="line"><span>//             return false;</span></span>
<span class="line"><span>//         }</span></span>
<span class="line"><span>//         return key in target;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// };</span></span>
<span class="line"><span>// var target = {</span></span>
<span class="line"><span>//     _prop: &#39;foo&#39;,</span></span>
<span class="line"><span>//     prop: &#39;lip&#39;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var proxy = new Proxy(target, handler);</span></span>
<span class="line"><span>// console.log(&#39;prop&#39; in proxy);</span></span>
<span class="line"><span>// console.log(&#39;_prop&#39; in proxy);</span></span>
<span class="line"><span>// 如果原对象不可配置或禁止扩展，那么此时has拦截会报错</span></span>
<span class="line"><span>// var obj = { a: 10 }</span></span>
<span class="line"><span>// Object.preventExtensions(obj);</span></span>
<span class="line"><span>// var p = new Proxy(obj, {</span></span>
<span class="line"><span>//     has: function (target, prop){</span></span>
<span class="line"><span>//         return false;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// });</span></span>
<span class="line"><span>// console.log(&#39;a&#39; in p);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// construct() construct方法用于拦截new 命令</span></span>
<span class="line"><span>// var handler = {</span></span>
<span class="line"><span>//     construct (target, args){</span></span>
<span class="line"><span>//         return new target(...args);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var p = new Proxy(function (){}, {</span></span>
<span class="line"><span>//     construct: function (target, args){</span></span>
<span class="line"><span>//         console.log(&#39;called: &#39; + args.join(&#39;, &#39;));</span></span>
<span class="line"><span>//         return { value: args[0] * 10};</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// });</span></span>
<span class="line"><span>// console.log(new p(5).value);</span></span>
<span class="line"><span>// 如果construct方法返回的不是对象，就会抛出错误</span></span>
<span class="line"><span>// var p = new Proxy(function (){}, {</span></span>
<span class="line"><span>//     construct: function (target, args){</span></span>
<span class="line"><span>//         return 1;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }) </span></span>
<span class="line"><span>// new p();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// deleteProperty() deleteProperty 方法用于拦截 delete 操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除</span></span>
<span class="line"><span>// var handler = {</span></span>
<span class="line"><span>//     deleteProperty (target, key){</span></span>
<span class="line"><span>//</span><span>         // invariant(key, &#39;delete&#39;);</span></span>
<span class="line"><span>//         delete target[key];</span></span>
<span class="line"><span>//         return true;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// };</span></span>
<span class="line"><span>// function invariant (key, action){</span></span>
<span class="line"><span>//     if(key[0] === &#39;_&#39;){</span></span>
<span class="line"><span>//         throw new Error(\`Invalid attempt to \${action} private &quot;\${key}&quot; property\`);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var target = { _prop: &#39;foo&#39; };</span></span>
<span class="line"><span>// var proxy = new Proxy(target, handler);</span></span>
<span class="line"><span>// delete proxy._prop;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// defineProperty() defineProperty 方法拦截了Object.defineProperty 操作</span></span>
<span class="line"><span>// var handler = {</span></span>
<span class="line"><span>//     defineProperty (target, key, descriptor){</span></span>
<span class="line"><span>//</span><span>         // console.log(target, key, descriptor);</span></span>
<span class="line"><span>//         return false;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var target = {};</span></span>
<span class="line"><span>// var proxy = new Proxy(target, handler);</span></span>
<span class="line"><span>// proxy.foo = &#39;bar&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// enumerate() enumerate 方法用于拦截for...in循环</span></span>
<span class="line"><span>// var handler = {</span></span>
<span class="line"><span>//     enumerate (target){</span></span>
<span class="line"><span>//         console.log(target);</span><span>  // 实际未生效 没有打印 enumerate方法未走到  可能是目前的ES标准暂未实现 </span></span>
<span class="line"><span>//         return Object.keys(target).filter(key =&gt; key[0] !== &#39;_&#39;)[Symbol.iterator]();</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var target = {</span></span>
<span class="line"><span>//     prop: &#39;foo&#39;,</span></span>
<span class="line"><span>//     _bar: &#39;baz&#39;,</span></span>
<span class="line"><span>//     _prop: &#39;foo&#39;,</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var proxy = new Proxy(target, handler);</span></span>
<span class="line"><span>// for(let key in proxy){</span></span>
<span class="line"><span>//     console.log(key);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var p = new Proxy({}, {</span></span>
<span class="line"><span>//     enumerate (target) {</span></span>
<span class="line"><span>//         console.log(&#39;called&#39;);</span><span> // 未打印</span></span>
<span class="line"><span>//         return [&#39;a&#39;, &#39;b&#39;, &#39;c&#39;][Symbol.iterator]();</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// });</span></span>
<span class="line"><span>// for(var key in p){</span></span>
<span class="line"><span>//     console.log(key);</span><span> // 未打印</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 如果enumerate方法返回的不是一个对象 就会报错</span></span>
<span class="line"><span>// var p = new Proxy({}, {</span></span>
<span class="line"><span>//     enumerate (target){</span></span>
<span class="line"><span>//         return 1;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// });</span></span>
<span class="line"><span>// for(var key in p){</span></span>
<span class="line"><span>//</span><span>     // 应该报错  实际未报错 </span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// getOwnPropertyDescriptor() getOwnPropertyDescriptor方法拦截Object.getOwnPropertyDescriptor,返回一个属性描述对象或undefined</span></span>
<span class="line"><span>// var handler = {</span></span>
<span class="line"><span>//     getOwnPropertyDescriptor (target, key){</span></span>
<span class="line"><span>//         if(key[0] === &#39;_&#39;){</span></span>
<span class="line"><span>//</span><span>             // return 1;</span><span> //返回值不为属性描述对象或undefined时 报错</span></span>
<span class="line"><span>//             return;</span></span>
<span class="line"><span>//         }</span></span>
<span class="line"><span>//         return Object.getOwnPropertyDescriptor(target, key);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var target = {</span></span>
<span class="line"><span>//     _foo: &#39;bar&#39;,</span></span>
<span class="line"><span>//     baz: &#39;tar&#39;,</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var proxy = new Proxy(target, handler);</span></span>
<span class="line"><span>// console.log(Object.getOwnPropertyDescriptor(proxy, &#39;wat&#39;));</span></span>
<span class="line"><span>// console.log(Object.getOwnPropertyDescriptor(proxy, &#39;_foo&#39;));</span></span>
<span class="line"><span>// console.log(Object.getOwnPropertyDescriptor(proxy, &#39;baz&#39;));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// getPrototypeOf() getPrototypeOf方法主要用于拦截Object.getPrototypeOf()运算符，以及下面其他一些操作：</span></span>
<span class="line"><span>// Object.prototype.__proto__</span></span>
<span class="line"><span>// Object.prototype.isPrototypeOf()</span></span>
<span class="line"><span>// Object.getPrototypeOf()</span></span>
<span class="line"><span>// Reflect.getPrototypeOf()</span></span>
<span class="line"><span>// instanceof 运算符</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var proto = { a: 1 };</span></span>
<span class="line"><span>// var p = new Proxy({}, {</span></span>
<span class="line"><span>//     getPrototypeOf (target){</span></span>
<span class="line"><span>//         console.log(&#39;called&#39;);</span></span>
<span class="line"><span>//         return proto;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// });</span></span>
<span class="line"><span>// console.log(Object.getPrototypeOf(p) === proto);</span><span> // true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// isExtensible() isExtensible方法拦截Object.isExtensible 操作</span></span>
<span class="line"><span>// var p = new Proxy({}, {</span></span>
<span class="line"><span>//     isExtensible (target){</span></span>
<span class="line"><span>//         console.log(&#39;called&#39;);</span></span>
<span class="line"><span>//         return true;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// });</span></span>
<span class="line"><span>// console.log(Object.isExtensible(p));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 这个方法有一个强限制，如果不能满足以下条件就会报错：</span></span>
<span class="line"><span>// Object.isExtensible(proxy) === Object.isExtensible(target)</span></span>
<span class="line"><span>// 如下</span></span>
<span class="line"><span>// var p = new Proxy({}, {</span></span>
<span class="line"><span>//     isExtensible: function (target) {</span></span>
<span class="line"><span>//         return false;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span>// console.log(Object.isExtensible(p));</span><span> // 报错</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ownKeys() ownKeys方法用于拦截Object.keys操作</span></span>
<span class="line"><span>// let target = {</span></span>
<span class="line"><span>//     hello1: 1,</span></span>
<span class="line"><span>//     world2: 2</span></span>
<span class="line"><span>// };</span></span>
<span class="line"><span>// let handler = {</span></span>
<span class="line"><span>//     ownKeys (target){</span></span>
<span class="line"><span>//         console.log(&#39;called&#39;);</span><span> // 此处有调用</span></span>
<span class="line"><span>//</span><span>         // return [&#39;hello&#39;, &#39;world&#39;];</span><span> // 设置的返回值没生效 只有target自身有的属性才能生效</span></span>
<span class="line"><span>//         return Reflect.ownKeys(target).concat([&#39;hello&#39;, &#39;world&#39;]);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// };</span></span>
<span class="line"><span>// let proxy = new Proxy(target, handler);</span></span>
<span class="line"><span>//</span><span> // console.log(Object.keys(proxy));</span></span>
<span class="line"><span>// for(let key of Object.keys(proxy)){</span></span>
<span class="line"><span>//     console.log(key);</span><span> // prop</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 拦截第一个字符为下划线的属性名</span></span>
<span class="line"><span>// var target = {</span></span>
<span class="line"><span>//     _bar: &#39;foo&#39;,</span></span>
<span class="line"><span>//     _prop: &#39;bar&#39;,</span></span>
<span class="line"><span>//     prop: &#39;baz&#39;,</span></span>
<span class="line"><span>// };</span></span>
<span class="line"><span>// var handler = {</span></span>
<span class="line"><span>//     ownKeys (target){</span></span>
<span class="line"><span>//         return Reflect.ownKeys(target).filter(key =&gt; key[0] !== &#39;_&#39;);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// };</span></span>
<span class="line"><span>// var proxy = new Proxy(target, handler);</span></span>
<span class="line"><span>// for(let key of Object.keys(proxy)){</span></span>
<span class="line"><span>//     console.log(key);</span><span> // prop</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// preventExtensions() preventExtensions 方法拦截Object.preventExtensions() 该方法必须返回一个布尔值</span></span>
<span class="line"><span>// 这个方法有一个限制，只有当Object,isExtensible(proxy)为false（即不可扩展）时，proxy.preventExtensions才能返回true 否则会报错</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var p = new Proxy({}, {</span></span>
<span class="line"><span>//     preventExtensions (target){</span></span>
<span class="line"><span>//         return true;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span>// console.log(Object.isExtensible(p));</span><span> // true</span></span>
<span class="line"><span>// console.log(Object.preventExtensions(p));</span><span> // 报错 只有Object.isExtensible返回false时 Object.preventExtensions才能返回true 否则报错</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 为防止出现这个报错问题，通常要在proxy.preventExtensions方法中调用一次 Object.preventExtensions</span></span>
<span class="line"><span>// var p = new Proxy({}, {</span></span>
<span class="line"><span>//     preventExtensions (target){</span></span>
<span class="line"><span>//         console.log(&#39;called&#39;);</span></span>
<span class="line"><span>//         Object.preventExtensions(target);</span></span>
<span class="line"><span>//         return true;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span>// console.log(Object.isExtensible(p));</span><span> // true</span></span>
<span class="line"><span>// console.log(Object.preventExtensions(p));</span><span> // 返回值为proxy实例</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// setPrototypeOf() setPrototypeOf方法主要用于拦截Object.setPrototypeOf方法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 不允许修改原型的例子</span></span>
<span class="line"><span>// var handler = {</span></span>
<span class="line"><span>//     setPrototypeOf (target, proto){</span></span>
<span class="line"><span>//         throw new Error(&#39;Changing the prototype is forbidden&#39;);</span><span> // 不允许修改原型的场景</span></span>
<span class="line"><span>//</span><span>         // return Reflect.setPrototypeOf(target, proto);</span><span> // 设置生效的场景</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// };</span></span>
<span class="line"><span>// var proto = {};</span></span>
<span class="line"><span>// var target = function (){};</span></span>
<span class="line"><span>// var proxy = new Proxy(target, handler);</span></span>
<span class="line"><span>// console.log(Object.setPrototypeOf(proxy, proto));</span></span>
<span class="line"><span>// console.log(Object.getPrototypeOf(proxy) === proto);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Proxy.revocable() 返回一个可取消的Proxy实例</span></span>
<span class="line"><span>// let target = {};</span></span>
<span class="line"><span>// let handler = {};</span></span>
<span class="line"><span>// let {proxy, revoke } = Proxy.revocable(target, handler);</span></span>
<span class="line"><span>// proxy.foo = 123;</span></span>
<span class="line"><span>// console.log(proxy.foo);</span></span>
<span class="line"><span>// revoke();</span></span>
<span class="line"><span>// console.log(proxy.foo);</span><span> // 报错 TypeError: Cannot perform &#39;get&#39; on a proxy that has been revoked</span></span></code></pre></div><h2 id="iterator-接口-和-for-of-循环" tabindex="-1">Iterator 接口 和 for...of 循环 <a class="header-anchor" href="#iterator-接口-和-for-of-循环" aria-label="Permalink to &quot;Iterator 接口 和 for...of 循环&quot;">​</a></h2><ul><li>遍历器(Iterator)是一种机制，为各种不同的数据结构提供统一的访问机制，任何数据结构，只要部署了Iterator接口，就可以完成遍历操作</li><li>Iterator 的作用有三个：一是为各种数据结构提供统一的、简便的访问接口；二是使得数据结构的成员能够按某种 次序排列；三是ES6创造了一种新的遍历命令————for...of循环，Iterator接口主要供for...of消费</li><li>ES6规定，默认的Iterator接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是&quot;可遍历的&quot;</li><li>在es6中，有3类数据结构原生具备Iterator接口：数组、某些类数组的对象、Set和Map结构</li><li>调用 Iterator 接口的场景： 解构赋值、扩展运算符、yield*、for...of、Array.from、Map()、Set()、WeakMap()、WeakSet()、Promise.all()、Promise.race()</li><li>字符串是一个类数组对象，也原生具有Iterator接口，Symbol.iterator属性对应一个函数，执行后返回当前对象的遍历器对象，在其上可以调用next方法实现对于字符串的遍历</li><li>for...of循环可以使用的范围包括数组、Set和Map结构、某些类似数组的对象(比如arguments对象、DOM NodeList对象)、Generator对象、字符串</li><li>for...in循环只能获得数组或对象的键名key，for...of循环获取的是键值value</li><li>for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    var arr = [3,4,5];</span></span>
<span class="line"><span>    arr.foo = &#39;hello&#39;;</span></span>
<span class="line"><span>    for(let v of arr){</span></span>
<span class="line"><span>        console.log(v); // 3,4,5</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    for(let i in arr){</span></span>
<span class="line"><span>        console.log(i); // 0,1,2&#39;foo&#39;</span></span>
<span class="line"><span>    }</span></span></code></pre></div></li><li>计算生成的数据结构：有些数据结构是在现有数据结构的基础上计算生成的，比如ES6的数组、Set、Map都部署了entries、keys、values三个方法，调用后都返回遍历器对象</li><li>对于普通对象，for...of循环不能直接使用，可以通过Object.keys获取对象的键名，再使用for...of遍历这个数组；或者将数组的Symbol.iterator赋给其它对象的Symbol.iterator（比如jQuery对象）;或者使用Generator函数将对象重新包装一下<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    var obj = {</span></span>
<span class="line"><span>        a: 1,</span></span>
<span class="line"><span>        b: 2,</span></span>
<span class="line"><span>        c: 3</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    function* entries(obj){</span></span>
<span class="line"><span>        for(let key of Object.keys(obj)){</span></span>
<span class="line"><span>            yield [key, obj[key]];</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    for(let [key,value] of entries(obj)){</span></span>
<span class="line"><span>        console.log(key, &quot;-&gt;&quot;, value);</span></span>
<span class="line"><span>    }</span></span></code></pre></div></li><li>for...of与其它遍历语法的比较： <ul><li>数组最原始的for循环：写法比较麻烦</li><li>数组forEach循环：无法中途跳出forEach循环，break命令或return命令都不能奏效</li><li>for...in循环可以遍历键名，但还会遍历手动添加的其它键，甚至包括原型链上的键，且某些情况下回以任意顺序遍历键名，for...in循环主要是为遍历对象而设计的，不适用于遍历数组</li><li>for...of写法同for...in一样简洁，且可以配合break、continue、return使用</li></ul></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Iterator 接口 和 for...of 循环</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口</span></span>
<span class="line"><span>// let generator = function* (){</span></span>
<span class="line"><span>//     yield 1;</span></span>
<span class="line"><span>//     yield* [2,3,4];</span></span>
<span class="line"><span>//     yield 5;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var iterator = generator();</span></span>
<span class="line"><span>// console.log(iterator.next());</span></span>
<span class="line"><span>// console.log(iterator.next());</span></span>
<span class="line"><span>// console.log(iterator.next());</span></span>
<span class="line"><span>// console.log(iterator.next());</span></span>
<span class="line"><span>// console.log(iterator.next());</span></span>
<span class="line"><span>// console.log(iterator.next());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 可以覆盖原生的Symbol.iterator方法，达到修改遍历器行为的目的</span></span>
<span class="line"><span>// var str = new String(&#39;hi&#39;);</span></span>
<span class="line"><span>// console.log([...str]);</span></span>
<span class="line"><span>// str[Symbol.iterator] = function (){</span></span>
<span class="line"><span>//     return {</span></span>
<span class="line"><span>//         next: function (){</span></span>
<span class="line"><span>//             if(this._first){</span></span>
<span class="line"><span>//                 this._first = false;</span></span>
<span class="line"><span>//                 return { value: &#39;haha&#39;, done: false }</span></span>
<span class="line"><span>//             } else {</span></span>
<span class="line"><span>//                 return { done: true }</span></span>
<span class="line"><span>//             }</span></span>
<span class="line"><span>//</span><span>             // return { value: &#39;haha&#39;, done: false }</span><span> // 会一直取next 导致内存溢出</span></span>
<span class="line"><span>//</span><span>             // return { value: &#39;haha&#39;, done: true }</span><span> // done：true则不会内存溢出 </span></span>
<span class="line"><span>//         },</span></span>
<span class="line"><span>//         _first: true</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// console.log([...str]);</span></span>
<span class="line"><span>// console.log(str);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Symbol.iterator 方法的最简单实现还是使用 Generator 函数</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// let obj = {</span></span>
<span class="line"><span>//     * [Symbol.iterator] (){</span></span>
<span class="line"><span>//         yield &#39;hello&#39;;</span></span>
<span class="line"><span>//         yield &#39;world&#39;;</span></span>
<span class="line"><span>//</span><span>         // yield* &#39;hello&#39;;</span></span>
<span class="line"><span>//</span><span>         // yield* &#39;world&#39;;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// };</span></span>
<span class="line"><span>// for(let x of obj){</span></span>
<span class="line"><span>//     console.log(x);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// for...of循环内部调用的是数据结构的 Symbol.iterator 方法</span></span>
<span class="line"><span>// 数组</span></span>
<span class="line"><span>// var arr = [&#39;red&#39;,&#39;green&#39;,&#39;blue&#39;];</span></span>
<span class="line"><span>// var iterator = arr[Symbol.iterator]();</span></span>
<span class="line"><span>// for(let v of arr){</span></span>
<span class="line"><span>//     console.log(v);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// for(let v of iterator){</span></span>
<span class="line"><span>//     console.log(v);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var arr = [3,4,5];</span></span>
<span class="line"><span>// arr.foo = &#39;hello&#39;;</span></span>
<span class="line"><span>// for(let v of arr){</span></span>
<span class="line"><span>//     console.log(v);</span><span> // 3,4,5</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// for(let i in arr){</span></span>
<span class="line"><span>//     console.log(i);</span><span> // 0,1,2&#39;foo&#39;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 普通对象</span></span>
<span class="line"><span>// jQuery.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];</span></span>
<span class="line"><span>// var obj = {</span></span>
<span class="line"><span>//     a: 1,</span></span>
<span class="line"><span>//     b: 2,</span></span>
<span class="line"><span>//     c: 3</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// function* entries(obj){</span></span>
<span class="line"><span>//     for(let key of Object.keys(obj)){</span></span>
<span class="line"><span>//         yield [key, obj[key]];</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// for(let [key,value] of entries(obj)){</span></span>
<span class="line"><span>//     console.log(key, &quot;-&gt;&quot;, value);</span></span>
<span class="line"><span>// }</span></span></code></pre></div><h2 id="generator函数" tabindex="-1">Generator函数 <a class="header-anchor" href="#generator函数" aria-label="Permalink to &quot;Generator函数&quot;">​</a></h2><ul><li>可以把Generator函数理解成一个状态机，内部封装了很多状态</li><li>调用Generator函数后，该函数并不执行，返回的也不是函数运行的结果，而是返回一个遍历器对象（一个指向内部状态的指针对象），</li><li>必须调用遍历器对象的next方法，使得指针移向下一状态，next方法返回一个有着value和done属性的对象</li><li>Generator函数是分段执行的，yield语句是暂停执行的标记，而next方法可以恢复执行</li><li>yield语句和return语句有区别，yield语句可以执行多次，return语句只执行一次，执行return后 返回的对象done变为true</li><li>yield语句本身没有返回值，会者说返回值总是undefined</li><li>next方法可以带一个参数，该参数会被当做上一条yield语句的返回值</li><li>for...of循环可以自动遍历Generator函数，此时不需要调用next方法</li><li>for...of循环、扩展运算符、解构赋值、Array.from方法内部调用的都是遍历器接口，所以都可以将Generator函数返回的Iterator对象作为参数</li><li>原生的js对象没有遍历接口，可以使用for...of遍历对象的key的数组，再配合Generator函数和yield 为对象部署遍历器接口</li><li>Generator函数返回的遍历器对象上有一个throw方法：Generator.prototype.throw() 该方法可以在函数体外抛出错误，然后在函数体内捕获</li><li>Generator函数返回的遍历器对象上有一个return方法：Generator.prototype.return() 可以返回给定的值，并结束Generator函数的遍历，遍历器对象调用return方法后，返回值的value属性就是return方法的参数，同时Generator函数终止遍历，返回值的done属性为true，以后再调用next方法，done属性总是返回true</li><li>yield* 语句可以在一个Generator函数内执行另一个Generator函数：从语法角度看，如果一个yield命令后面跟的是一个遍历器对象，那么需要在yield命令后面加上星号*，表明返回的是一个遍历器对象。yield* 可以视为for...of和yield组合的简写。</li><li>Generator函数返回的总是遍历器对象，而不是 this 对象 （可以先创建一个空对象，在通过bind绑定Generator函数内部的this）</li><li>Generator函数推导：针对大数组的遍历，可以在遍历时再生成数组，节省系统资源</li><li>Generator 与状态机：相比ES5实现状态机，不用再保存外部状态变量，更简洁，更安全（不会被非法篡改），更符合函数式编程思想；Generator之所以可以不用外部变量保存状态，因为它本身就包含了一个状态信息，即目前是否处于暂停状态</li><li>Generator函数的应用 <ul><li>异步操作的同步化表达：ajax请求、读文件等异步操作</li><li>控制流管理</li><li>部署Interator接口</li><li>作为数据结构</li></ul></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Generator 函数</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// function* helloWorldGenerator() {</span></span>
<span class="line"><span>//   console.log(1);</span></span>
<span class="line"><span>//   yield &#39;hello&#39;;</span></span>
<span class="line"><span>//   console.log(2);</span></span>
<span class="line"><span>//   yield &#39;world&#39;;</span></span>
<span class="line"><span>//   console.log(3);</span></span>
<span class="line"><span>//   return &#39;ending&#39;;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var hw = helloWorldGenerator();</span></span>
<span class="line"><span>// console.log(hw)</span></span>
<span class="line"><span>// hw.next();</span></span>
<span class="line"><span>// hw.next();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// function * f(){</span></span>
<span class="line"><span>//     for(var i = 0; true; i++){</span></span>
<span class="line"><span>//         var reset = yield i;</span></span>
<span class="line"><span>//         console.log(reset,&#39;reset&#39;);</span></span>
<span class="line"><span>//         if(reset){ i = -1; }</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var g = f();</span></span>
<span class="line"><span>// console.log(g.next());</span></span>
<span class="line"><span>// console.log(g.next());</span></span>
<span class="line"><span>// console.log(g.next());</span></span>
<span class="line"><span>// console.log(g.next());</span></span>
<span class="line"><span>// console.log(g.next(true));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// function* dataConsumer (){</span></span>
<span class="line"><span>//     console.log(&#39;Started&#39;);</span></span>
<span class="line"><span>//     console.log(\`1.\${yield}\`);</span></span>
<span class="line"><span>//     console.log(\`2.\${yield}\`);</span></span>
<span class="line"><span>//     return &#39;result&#39;;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// let genObj = dataConsumer();</span></span>
<span class="line"><span>// genObj.next();</span><span> // Started</span></span>
<span class="line"><span>// genObj.next(&#39;hi&#39;);</span><span> // 1.hi</span></span>
<span class="line"><span>// genObj.next(&#39;haha&#39;);</span><span> // 2.haha</span></span>
<span class="line"><span>// genObj.next(&#39;hehe&#39;);</span><span> // 已结束运行</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var g = function* (){</span></span>
<span class="line"><span>//     while (true){</span></span>
<span class="line"><span>//         try{</span></span>
<span class="line"><span>//             yield;</span></span>
<span class="line"><span>//         } catch (e){</span></span>
<span class="line"><span>//             if(e != &#39;a&#39;) throw e;</span></span>
<span class="line"><span>//             console.log(&#39;内部捕获&#39;, e);</span></span>
<span class="line"><span>//         }</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var i = g();</span></span>
<span class="line"><span>// i.next();</span></span>
<span class="line"><span>// try {</span></span>
<span class="line"><span>//     i.throw(&#39;a&#39;);</span></span>
<span class="line"><span>//     i.throw(&#39;b&#39;);</span></span>
<span class="line"><span>// } catch (e){</span></span>
<span class="line"><span>//     console.log(&#39;外部捕获&#39;, e);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var gen = function* (){</span></span>
<span class="line"><span>//     yield console.log(&#39;hello&#39;);</span></span>
<span class="line"><span>//     yield console.log(&#39;world&#39;);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var g = gen();</span></span>
<span class="line"><span>// g.next();</span></span>
<span class="line"><span>// try{</span></span>
<span class="line"><span>//</span><span>     // g.throw();</span></span>
<span class="line"><span>//     throw new Error();</span></span>
<span class="line"><span>// } catch (e){</span></span>
<span class="line"><span>//     console.log(&#39;catch&#39;)</span></span>
<span class="line"><span>//     g.next();</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// function* getFuncWithReturn (){</span></span>
<span class="line"><span>//     yield &#39;a&#39;;</span></span>
<span class="line"><span>//     yield &#39;b&#39;;</span></span>
<span class="line"><span>//     return &#39;the result&#39;;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// function* logReturned(getObj){</span></span>
<span class="line"><span>//     let result = yield* getObj;</span></span>
<span class="line"><span>//     console.log(result);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var it = [...logReturned(getFuncWithReturn())];</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 使用yield* 命令去除嵌套数组的所有成员</span></span>
<span class="line"><span>// function* iterTree (tree){</span></span>
<span class="line"><span>//     if(Array.isArray(tree)){</span></span>
<span class="line"><span>//         for(let i = 0;i &lt; tree.length;i++){</span></span>
<span class="line"><span>//             yield* iterTree(tree[i]);</span></span>
<span class="line"><span>//         }</span></span>
<span class="line"><span>//     } else {</span></span>
<span class="line"><span>//         yield tree;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var tree = [&#39;a&#39;, [&#39;b&#39;, &#39;c&#39;], [&#39;d&#39;, &#39;e&#39;]];</span></span>
<span class="line"><span>// for(let x of iterTree(tree)){</span></span>
<span class="line"><span>//     console.log(x);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/** 使用yield*语句遍历完全二叉树 */</span></span>
<span class="line"><span>//</span><span> // 二叉树构造函数，三个参数分别是：左子树、当前节点、右子树</span></span>
<span class="line"><span>// function Tree (left, label, right){</span></span>
<span class="line"><span>//     this.left = left;</span></span>
<span class="line"><span>//     this.label = label;</span></span>
<span class="line"><span>//     this.right = right;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>//</span><span> // 中序（inorder）遍历函数</span></span>
<span class="line"><span>//</span><span> // 由于返回的是一个遍历器，所以要使用Generator函数</span></span>
<span class="line"><span>//</span><span> // 函数体内部采用递归算法，所以左子树、右子树需要用yield*遍历</span></span>
<span class="line"><span>// function* inorder (t){</span></span>
<span class="line"><span>//     if(t){</span></span>
<span class="line"><span>//         yield* inorder(t.left);</span></span>
<span class="line"><span>//         yield t.label;</span></span>
<span class="line"><span>//         yield* inorder(t.right);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>//</span><span> // 生成二叉树</span></span>
<span class="line"><span>// function make(array){</span></span>
<span class="line"><span>//     if(array.length == 1) return new Tree(null, array[0], null);</span></span>
<span class="line"><span>//     return new Tree(make(array[0]), array[1], make(array[2]));</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var tree = make([[[&#39;a&#39;], &#39;b&#39;, [&#39;c&#39;]], &#39;d&#39;, [[&#39;e&#39;], &#39;f&#39;, [&#39;g&#39;]]]);</span></span>
<span class="line"><span>//</span><span> // 遍历二叉树</span></span>
<span class="line"><span>// var result = [];</span></span>
<span class="line"><span>// for(let node of inorder(tree)){</span></span>
<span class="line"><span>//     result.push(node);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// function* g(){}</span></span>
<span class="line"><span>// g.prototype.hello = function (){</span></span>
<span class="line"><span>//     return &#39;hi&#39;;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// let obj = g();</span></span>
<span class="line"><span>// obj instanceof g;</span><span> //true</span></span>
<span class="line"><span>// obj.hello();</span><span> // hi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// function* F(){</span></span>
<span class="line"><span>//     yield this.x = 2;</span></span>
<span class="line"><span>//     yield this.y = 3;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// console.log(&#39;next&#39; in new F());</span><span> // F is not a constructor</span><span> // chrome 101</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// function* F(){</span></span>
<span class="line"><span>//     yield this.x = 2;</span></span>
<span class="line"><span>//     yield this.y = 3;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var obj = {};</span></span>
<span class="line"><span>// var f = F.call(obj);</span></span>
<span class="line"><span>// console.log(f.next());</span></span>
<span class="line"><span>// console.log(f.next());</span></span>
<span class="line"><span>// console.log(f.next());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//</span><span> // Generator 函数推导</span></span>
<span class="line"><span>// var bigGenerator = function* (){</span></span>
<span class="line"><span>//     for(let i = 0;i &lt; 100000; i++){</span></span>
<span class="line"><span>//         yield i;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>//</span><span> // var squared =  (for (n of bigGenerator()) n*n);</span><span> // 报错</span></span>
<span class="line"><span>// var squared =  bigGenerator();</span></span>
<span class="line"><span>// console.log(squared.next());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Generator 与状态机</span></span>
<span class="line"><span>// var clock = function*(_){</span></span>
<span class="line"><span>//     while(true){</span></span>
<span class="line"><span>//         console.log(&#39;Tick!&#39;);</span></span>
<span class="line"><span>//         yield _;</span></span>
<span class="line"><span>//         console.log(&#39;Tock!&#39;);</span></span>
<span class="line"><span>//         yield _;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// };</span></span>
<span class="line"><span>// var c = clock();</span></span>
<span class="line"><span>// c.next();</span></span>
<span class="line"><span>// c.next();</span></span>
<span class="line"><span>// c.next();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 通过Generator函数逐行读取文本</span></span>
<span class="line"><span>// function* numbers(){</span></span>
<span class="line"><span>//     let file = new FileReader(&#39;a.txt&#39;);</span><span> // 此种方式读取文件暂不支持 需要配合input来读取</span></span>
<span class="line"><span>//     try {</span></span>
<span class="line"><span>//         while(!file.eof) {</span></span>
<span class="line"><span>//             yield parseInt(file.readLine(), 10);</span></span>
<span class="line"><span>//         }</span></span>
<span class="line"><span>//     } finally {</span></span>
<span class="line"><span>//         file.close();</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>/** FileReader 读取文件 */</span></span>
<span class="line"><span>// var myFile = document.querySelector(&#39;#myFile&#39;);</span></span>
<span class="line"><span>// myFile.onchange = function (){</span></span>
<span class="line"><span>//     var file = myFile.files[0];</span></span>
<span class="line"><span>//     console.log(&#39;file&#39;, file);</span><span> // File 对象</span></span>
<span class="line"><span>//     let reader = new FileReader(&#39;a.txt&#39;);</span></span>
<span class="line"><span>//</span><span>     // reader.readAsDataURL(file);</span><span> // 读取为base64</span></span>
<span class="line"><span>//     reader.readAsText(file);</span><span> // 读取为文本</span></span>
<span class="line"><span>//     reader.onload = function (){</span></span>
<span class="line"><span>//</span><span>         // const img = new Image()</span><span> // 若读取的文件是图片  则采用base64格式赋给Img对象</span></span>
<span class="line"><span>//</span><span>         // img.src = reader.result</span></span>
<span class="line"><span>//         var data = reader.result;</span></span>
<span class="line"><span>//         console.log(&#39;data:&#39;, data);</span></span>
<span class="line"><span>//         document.body.innerHTML += reader.result</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>//     reader.onerror = function (){</span></span>
<span class="line"><span>//         console.log(&#39;读取失败&#39;);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>/**nodejs读取文件 */</span></span>
<span class="line"><span>// 1. 通过readline的方式</span></span>
<span class="line"><span>// const fs = require(&#39;fs&#39;);</span></span>
<span class="line"><span>// const readline = require(&#39;readline&#39;);</span></span>
<span class="line"><span>// let rl = readline.createInterface({</span></span>
<span class="line"><span>//     input: fs.createReadStream(&quot;./index.md&quot;)</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span>// let index = 0;</span></span>
<span class="line"><span>// rl.on(&#39;line&#39;, line =&gt; {</span></span>
<span class="line"><span>//     index++;</span></span>
<span class="line"><span>//     console.log(\`第\${index}行\`, line);</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 2.通过stream的方式</span></span></code></pre></div><h2 id="reflect" tabindex="-1">Reflect <a class="header-anchor" href="#reflect" aria-label="Permalink to &quot;Reflect&quot;">​</a></h2><ul><li>Reflect 对象与Proxy对象一样，也是ES6 为了操作对象而新提供的API，Reflect对象的设计目的有以下几个： <ul><li>1.将Object对象的一些明显属于语言层面的方法放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来新方法将只部署在Reflect对象上</li><li>2.修改某些Object方法的返回结果，让其变得更合理。比如Object.defineProperty(obj, name, desc)在无法定义属性时会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false</li><li>3.让Object操作都编程函数行为。某些Object操作是命令式，比如 name in obj 和 delete obj[name]，而 Reflect.has(obj, name) 和 Reflect.deleteProperty(obj, name)让它们变成了函数行为</li><li>4.Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为</li></ul></li></ul><h2 id="reflect对象的方法" tabindex="-1">Reflect对象的方法 <a class="header-anchor" href="#reflect对象的方法" aria-label="Permalink to &quot;Reflect对象的方法&quot;">​</a></h2><ul><li>Reflect.getOwnPropertyDescriptor(target, name)</li><li>Reflect.defineProperty(target, name, desc) -- 返回一个布尔值，表示操作是否成功，其对应的Object方法在失败时会抛出错误</li><li>Reflect.getOwnPropertyNames(target)</li><li>Reflect.getPrototypeOf(target) -- 读取对象的 __proto__属性，等同于Object.getPrototypeOf(target)</li><li>Reflect.setPrototypeOf(target, prototype) -- 设置对象的__proto__属性，（Object没有与此对应的方法）</li><li>Reflect.deleteProoerty(target, name) -- 等同于 delete target[name]</li><li>Reflect.enumerate(target)</li><li>Reflect.freeze(target) -- 返回一个布尔值，表示操作是否成功，其对应的Object方法在失败时会抛出错误</li><li>Reflect.seal(target) -- 封闭一个对象，阻止添加新属性，并将所有现有属性标记为不可配置，当前属性的值只要原来是可写的就可以改变；返回一个布尔值，表示操作是否成功，其对应的Object方法在失败时会抛出错误</li><li>Reflect.preventExtensions(target) -- 返回一个布尔值，表示操作是否成功，其对应的Object方法在失败时会抛出错误</li><li>Reflect.isFrozen(target)</li><li>Reflect.isSealed(target)</li><li>Reflect.isExtensible(target)</li><li>Reflect.has(target, name) -- 等同于 name in target</li><li>Reflect.hasOwn(target, name)</li><li>Reflect.keys(target)</li><li>Reflect.get(target, name, receiver) -- 查找兵返回target的name属性，如果没有该属性，返回undefined，如果name属性部署了读取函数，则读取函数的this绑定receiver</li><li>Reflect.set(target, name, value, receiver) -- 设置target对象的name属性等于value，如果name属性设置了赋值函数，则赋值函数的this绑定receiver，返回一个布尔值，表示操作是否成功，其对应的Object方法在失败时会抛出错误</li><li>Reflect.apply(target, thisArg, args) -- 等同于Function.prototype.apply.call(target, thisArg, args) 一般来说 要绑定一个函数的this对象，可以写成fn.apply(obj,args)，但如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args) 采用Reflect对象可以简化这种操作</li><li>Reflect.construct(target, args) -- 等同于 new target(...args) 这提供了一种不使用new 来调用构造函数的方法</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Reflect</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// let target = {}</span></span>
<span class="line"><span>// let proxy = new Proxy(target, {</span></span>
<span class="line"><span>//     set (target, propKey, value, receiver){</span></span>
<span class="line"><span>//         var success = Reflect.set(target, propKey, value, receiver);</span></span>
<span class="line"><span>//         if(success){</span></span>
<span class="line"><span>//             console.log(\`property\` + propKey + &#39; on &#39; + target + &#39; set to &#39; + value);</span></span>
<span class="line"><span>//         }</span></span>
<span class="line"><span>//         return success;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// })</span></span>
<span class="line"><span>// proxy.name = &#39;abc&#39;</span></span>
<span class="line"><span>// console.log(proxy.name)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var obj = {};</span></span>
<span class="line"><span>// var loggedObj = new Proxy(obj, {</span></span>
<span class="line"><span>//     get(target, name){</span></span>
<span class="line"><span>//         console.log(&#39;get&#39;, target, name);</span></span>
<span class="line"><span>//         return Reflect.get(target, name);</span></span>
<span class="line"><span>//     },</span></span>
<span class="line"><span>//     set(target, name, value){</span></span>
<span class="line"><span>//         console.log(&#39;set &#39; + name + &#39; of &#39; + value);</span></span>
<span class="line"><span>//         return Reflect.set(target, name, value);</span></span>
<span class="line"><span>//     },</span></span>
<span class="line"><span>//     deleteProperty (target, name){</span></span>
<span class="line"><span>//         console.log(&#39;delete&#39; + name);</span></span>
<span class="line"><span>//         return Reflect.deleteProperty(target, name);</span></span>
<span class="line"><span>//     },</span></span>
<span class="line"><span>//     has (target, name){</span></span>
<span class="line"><span>//         console.log(&#39;has&#39; + name);</span></span>
<span class="line"><span>//         return Reflect.has(target, name);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// });</span></span>
<span class="line"><span>// loggedObj.name = 1;</span></span>
<span class="line"><span>// console.log(&#39;name&#39; in loggedObj);</span></span>
<span class="line"><span>// delete loggedObj.name;</span></span>
<span class="line"><span>// console.log(&#39;name&#39; in loggedObj);</span></span></code></pre></div><h2 id="二进制数组" tabindex="-1">二进制数组 <a class="header-anchor" href="#二进制数组" aria-label="Permalink to &quot;二进制数组&quot;">​</a></h2><ul><li>二进制数组（ArrayBuffer对象、TypedArray视图 和 DataView视图） 是JavaScript操作二进制数据的一个接口。</li><li>这个接口的原始设计目的与WebGL项目有关，允许像C语言一样直接操作字节。二进制数组很像C语言的数组，允许开发者以数组下标的形式直接操作内存，使开发者能通过JavaScript与操作系统的原生接口欧进行二进制通信</li><li>ArrayBuffer对象：代表内存中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这样就可以用数组的方法操作内存</li><li>TypedArray视图：共包括9种视图 <ul><li>Int8 8位带符号整数 字节长度1 对应的C语言类型：signed char</li><li>Uint8 8位不带符号整数 字节长度1 对应的C语言类型：unsigned char</li><li>Uint8C 8位不带符号整数（自动过滤溢出） 字节长度1 对应的C语言类型：unsigned char</li><li>Int16 18位带符号整数 字节长度2 对应的C语言类型：short</li><li>Uint16 16位不带符号整数 字节长度2 对应的C语言类型：unsigned short</li><li>Int32 32位带符号整数 字节长度4 对应的C语言类型：int</li><li>Uint32 32位不带符号整数 字节长度4 对应的C语言类型：unsigned int</li><li>Float32 32位浮点数 字节长度4 对应的C语言类型：float</li><li>Float64 64位浮点数 字节长度8 对应的C语言类型：double</li></ul></li><li>DataView视图：可以自定义复合格式的视图。可以第一个字节是Uint8、第二个字节是Int16等</li><li>总结：ArrayBuffer对象代表原始的二进制数据，TypedArray视图用于读/写简单类型的二进制数据，DataView视图用于读/写复杂类型的二进制数据</li><li>很多浏览器操作的API用到了二进制数组操作二进制数据，比如：File API、XMLHttpRequest、Fetch API、Canvas、WebSockets</li></ul><h2 id="arraybuffer对象" tabindex="-1">ArrayBuffer对象 <a class="header-anchor" href="#arraybuffer对象" aria-label="Permalink to &quot;ArrayBuffer对象&quot;">​</a></h2><ul><li>ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读/写，只能通过视图（TypedArray视图和DataView视图）读/写，视图的作用是以指定格式解读二进制数据</li><li>ArrayBuffer也是一个构造函数，参数是所需要的的内存大小，单位是字节；为了读/写这段内存，需要为它指定视图，创建DataView视图，需要提供ArrayBuffer对象实例作为参数。<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    var buf = new ArrayBuffer(32);</span></span>
<span class="line"><span>    var dataView = new DataView(buf);</span></span></code></pre></div></li><li>TypedArray视图与DataView视图的一个区别是，它不是一个构造函数，而是一组构造函数，使用两种不能视图操作同一段内存时，一个视图修改底层内存会影响到另一个</li><li>ArrayBuffer.prototype.byteLength ArrayBuffer实例的byteLength属性返回所分配的内存区域的字节长度(如果分配的内存区域很大，有可能失败，因为可能没有那么多连续空余的内存，因此有必要检测是否分配成功)</li><li>ArrayBuffer.prototype.slice() ArrayBuffer 实例有一个slice方法，允许将内存区域的一部分复制生成一个新的ArrayBuffer对象；slice方法其实包含两步，第一步先分配一段新内存，第二部将原来那个ArrayBuffer对象复制过去；slice方法接受两个参数，第一个参数表示复制开始的字节序号（包含该字节）,第二个参数表示复制截止的字节序号（不含该字节），如果省略第二个参数，则默认复制到原ArrayBuffer对象的结尾 (除了slice方法，ArrayBuffer对象不提供任何直接读/写内存的方法，只允许在其上建立视图，然后通过视图进行读/写)</li><li>ArrayBuffer.isView() ArrayBuffer 有一个静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视图实例，即判断参数是否为TypedArray实例或DataView实例</li></ul><h2 id="typedarray-视图" tabindex="-1">TypedArray 视图 <a class="header-anchor" href="#typedarray-视图" aria-label="Permalink to &quot;TypedArray 视图&quot;">​</a></h2><ul><li>ArrayBuffer对象作为内存区域可以存放多种类型的数据。同一段内存，不同数据有不同的解读方式，这就叫做“视图”(view)。TypedArray视图一共包括9种类型，每一种视图都是一种构造函数。 <ul><li>Int8 8位带符号整数 字节长度1 对应的C语言类型：signed char</li><li>Uint8 8位不带符号整数 字节长度1 对应的C语言类型：unsigned char</li><li>Uint8C 8位不带符号整数（自动过滤溢出） 字节长度1 对应的C语言类型：unsigned char</li><li>Int16 18位带符号整数 字节长度2 对应的C语言类型：short</li><li>Uint16 16位不带符号整数 字节长度2 对应的C语言类型：unsigned short</li><li>Int32 32位带符号整数 字节长度4 对应的C语言类型：int</li><li>Uint32 32位不带符号整数 字节长度4 对应的C语言类型：unsigned int</li><li>Float32 32位浮点数 字节长度4 对应的C语言类型：float</li><li>Float64 64位浮点数 字节长度8 对应的C语言类型：double</li></ul></li><li>普通数组与TypedArray数组的差异主要有： <ul><li>TypedArray 数组的所有成员都是同一种类型</li><li>TypedArray数组的成员是连续的，不会有空位</li><li>TypedArray数组成员的默认值是0</li><li>TypedArray数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象中，要获取底层对象必须使用buffer属性</li></ul></li><li>构造函数，TypedArray的9种构造函数，可以生成不同类型的数组实例，视图构造函数可以接受3个参数： <ul><li>第一个参数buffer（必需）：视图对应的底层ArrayBuffer对象</li><li>第二个参数byteOffset=0（可选）：视图开始的字节序号，默认从0开始 -- btyeOffset必需与所要建立的数据类型一致，否则报错（即ArrayBuffer中的字节数与视图的字节数能匹配），如果想从任意字节开始解读ArrayBuffer，必需使用DataView视图</li><li>第三个参数length（可选）：视图包含的数据个数，默认直到本段内存区域结束</li></ul></li><li>TypedArray（length）视图还可以不通过ArrayBuffer对象，而是直接分配内存生成，此时构造函数的参数为成员数，即对应length属性</li><li>TypedArray(typedArray) TypedArray数组的构造函数还可以接受另一个TypedArray实例作为参数，新数组会重新开辟一段内存储存数据，而不会共用之前的内存</li><li>TypedArray(arrayLikeObject)构造函数的参数也可以是一个普通数组，然后直接生成TypedArray实例，TypedArray数组也可以转换回普通数组（Array.prototype.slice.call(typedArray)）</li><li>数组方法：普通数组的操作方法和属性对TypedArray数组完全适用，但TypedArray数组没有concat方法</li><li>TypedArray数组与普通数组一样部署了Iterator接口，可以使用for...of循环</li><li>字节序：字节序指的是数值在内存中的表示方式。x86体系的计算机都采用小端字节序（小端字节序将最不重要的字节排在后面，大端字节序相反），TypedArray数组内部也采用小端字节序读/写数据，或者更准确的说，按照本机操作系统设定的字节序读/写数据，这就导致对于大端字节序，TypedArray无法正确解析，为此引入了DataView对象，可以设定字节序</li><li>BYTES_PER_ELEMENT 属性：每一种视图的构造函数，都有一个BYTES_PER_ELEMENT属性，表示这种数据类型占据的字节数，这个属性在TypedArray实例上也可以获取</li><li>ArrayBuffer与字符串的互相转换：两者相互转换有一个前提，即字符串的编码方式是确定的</li><li>溢出：TypedArray数组对溢出才用的处理方法是求余值。正向溢出时，等于最小值加余值减一；负向溢出时，等于最大值减余值加一；不同长度级是否带符号的TypedArray数组，取值范围不一样；8位无符号整数范围为0~255；8位带符号整数的取值范围是-128~127。Uint8ClampedArray视图的溢出规则不太一样，负向溢出都为0，正向溢出都为255。</li><li>TypedArray.prototype.buffer：TypedArray实例的buffer属性返回整段内存对应的ArrayBuffer对象，只读属性</li><li>TypedArray.prototype.byteLength: 该属性返回TypedArray数组占据的内存长度，单位为字节，只读属性</li><li>TypedArray.prototype.byteOffset：该属性返回TypedArray数组从底层ArrayBuffer对象的哪个字节开始，只读属性</li><li>TypedArray.prototype.length：该属性表示TypedArray数组含有多少个成员，是成员长度，对应8位的TypedArray数组，length和byteLength一致</li><li>TypedArray.prototype.set() set方法用于复制数组，也就是将一段内存完全复制到另一段内存，set方法还可以接受第二个参数，表示从目标对象的第几个成员，开始复制被复制对象</li><li>TypedArray.prototype.subarray() subarray方法是对于TypedArray数组的一部分再建立一个新的视图，subarray方法的第一个参数是起始成员序号，第二个参数是结束成员序号（不包含，省略则包含剩余的全部成员）</li><li>TypedArray.prototype.slice() slice方法返回一个指定位置的TypedArray实例，slice方法的参数表示原数组的具体位置，负值表示倒数第几个；</li><li>TypedArray.of() of方法用于将一个参数转为TypedArray实例</li><li>TypedArray.from() from方法接受一个可遍历的数据结构（比如数组）作为参数，返回一个机遇次结构的TypedArray实例；该方法还可以将一种TypedArray实例转为另一种；from方法还可以接受一个函数作为第二个传参数，用于对每个元素进行遍历，类似map方法 --- 函数的处理在from之后，先转换类型再进行运算判断是否溢出</li></ul><h2 id="复合视图" tabindex="-1">复合视图 <a class="header-anchor" href="#复合视图" aria-label="Permalink to &quot;复合视图&quot;">​</a></h2><ul><li>由于视图的构造函数可以指定起始位置和长度，所以同一段内存中可以依次存放不同类型的数据，叫做 复合视图</li></ul><h2 id="dataview视图" tabindex="-1">DataView视图 <a class="header-anchor" href="#dataview视图" aria-label="Permalink to &quot;DataView视图&quot;">​</a></h2><ul><li>如果一段数据中包括多种数据类型（比如服务器传来的HTTP数据），这是除了复合视图外，还可以通过DataView视图来操作</li><li>DataView视图本身也是构造函数，接受一个ArrayBuffer对象作为参数生成视图</li><li>原型上有三个属性：buffer、btyeLength、byteOffset</li><li>8个方法读取内存：getInt8、getUint8等</li><li>8个方法写入内存：setInt8、setUint8等</li></ul><h2 id="二进制数组的应用" tabindex="-1">二进制数组的应用 <a class="header-anchor" href="#二进制数组的应用" aria-label="Permalink to &quot;二进制数组的应用&quot;">​</a></h2><ul><li>Ajax</li><li>Canvas</li><li>WebSocket</li><li>Fetch API</li><li>File API</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 二进制数组</span></span>
<span class="line"><span>// ArrayBuffer也是一个构造函数，参数是所需要的的内存大小，单位是字节；为了读/写这段内存，需要为它指定视图，创建DataView视图，需要提供ArrayBuffer对象实例作为参数</span></span>
<span class="line"><span>// var buf = new ArrayBuffer(32);</span></span>
<span class="line"><span>// var dataView = new DataView(buf);</span></span>
<span class="line"><span>// console.log(dataView.getUint8(0));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 使用两种不能视图操作同一段内存时，一个视图修改底层内存会影响到另一个</span></span>
<span class="line"><span>// var buffer = new ArrayBuffer(12);</span></span>
<span class="line"><span>// var x1 = new Int32Array(buffer);</span></span>
<span class="line"><span>// x1[0] = 1;</span></span>
<span class="line"><span>// var x2 = new Uint8Array(buffer);</span></span>
<span class="line"><span>// console.log(x2[0]);</span></span>
<span class="line"><span>// x2[0] = 2;</span></span>
<span class="line"><span>// console.log(x1[0],x2[0]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 检测是否分配内存成功</span></span>
<span class="line"><span>// var buf = new ArrayBuffer(19);</span></span>
<span class="line"><span>// console.log(buf.byteLength);</span></span>
<span class="line"><span>// if(buf.byteLength === 19){</span></span>
<span class="line"><span>//     console.log(&#39;内存分配成功&#39;);</span></span>
<span class="line"><span>// } else {</span></span>
<span class="line"><span>//     console.log(&#39;内存分配失败&#39;);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var buffer = new ArrayBuffer(8);</span></span>
<span class="line"><span>// var newBuffer = buffer.slice(0, 3);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var buffer = new ArrayBuffer(8);</span></span>
<span class="line"><span>// console.log(ArrayBuffer.isView(buffer));</span><span> // false</span></span>
<span class="line"><span>// var v = new Int32Array(buffer);</span></span>
<span class="line"><span>// console.log(ArrayBuffer.isView(v));</span><span> // true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 同一个ArrayBuffer对象上，可以根据不同的数据类型建立多个视图</span></span>
<span class="line"><span>// 创建一个8字节的ArrayBuffer</span></span>
<span class="line"><span>// var b = new ArrayBuffer(8);</span></span>
<span class="line"><span>//</span><span> // 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾</span></span>
<span class="line"><span>// var v1 = new Int32Array(b);</span></span>
<span class="line"><span>//</span><span> // 创建一个指向b的Unit8视图，开始于字节2，知道缓冲区末尾</span></span>
<span class="line"><span>// var v2 = new Uint8Array(b, 2);</span></span>
<span class="line"><span>//</span><span> // 创建一个指向b的Int16视图 开始于字节2，长度为2</span></span>
<span class="line"><span>// var v3 = new Int16Array(b, 2, 2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var buffer = new ArrayBuffer(8);</span></span>
<span class="line"><span>//</span><span>  // 可以理解为用Int16视图解读此buffer时，前面空出的字节也一样得用这种方式解读 所以起始字节需要能被整除</span></span>
<span class="line"><span>// var i16 = new Int16Array(buffer, 1);</span><span> // Uncaught RangeError: start offset of Int16Array should be a multiple of 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var f64a = new Float64Array(8);</span></span>
<span class="line"><span>// f64a[0] = 10;</span></span>
<span class="line"><span>// f64a[1] = 20;</span></span>
<span class="line"><span>// f64a[2] = f64a[0] + f64a[1];</span></span>
<span class="line"><span>// console.log(f64a);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// TypedArray数组的构造函数可以接受另一个TypedArray实例或普通数组作为参数，新数组会开辟一段新的内存储存数据</span></span>
<span class="line"><span>// var x = new Int8Array([1, 1]);</span></span>
<span class="line"><span>// var y = new Int8Array(x);</span></span>
<span class="line"><span>// console.log(x[0]);</span></span>
<span class="line"><span>// console.log(y[0]);</span></span>
<span class="line"><span>// x[0] = 2;</span></span>
<span class="line"><span>// console.log(x[0]);</span></span>
<span class="line"><span>// console.log(y[0]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// TypedArray数组也可以转换回普通数组</span></span>
<span class="line"><span>// var typedArray = new Int8Array([1,2,3]);</span></span>
<span class="line"><span>// var normalArray = Array.prototype.slice.call(typedArray);</span></span>
<span class="line"><span>// console.log(normalArray);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// TypedArray数组没有concat方法，如果想要合并多个TypedArrray数组，可以用下面这个函数</span></span>
<span class="line"><span>// function concatnate (resultConstructor, ...arrays){</span></span>
<span class="line"><span>//     let totalLength = 0;</span></span>
<span class="line"><span>//     for(let arr of arrays){</span></span>
<span class="line"><span>//         totalLength += arr.length;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>//     let result = new resultConstructor(totalLength);</span></span>
<span class="line"><span>//     let offset = 0;</span></span>
<span class="line"><span>//     for(let arr of arrays){</span></span>
<span class="line"><span>//         result.set(arr, offset);</span></span>
<span class="line"><span>//         offset += arr.length;</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>//     return result;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var result = concatnate(Uint8Array, Uint8Array.of(1, 2), Uint16Array.of(3, 4));</span></span>
<span class="line"><span>// console.log(result);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// TypedArray数组与普通数组一样部署了 Interator 接口，所以可以遍历</span></span>
<span class="line"><span>// let ui8 = Uint8Array.of(0, 1, 3);</span></span>
<span class="line"><span>// for(let byte of ui8){</span></span>
<span class="line"><span>//     console.log(byte);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 字节序是指数值在内存中的表示方式</span></span>
<span class="line"><span>// var buffer = new ArrayBuffer(16);</span></span>
<span class="line"><span>// var int32View = new Int32Array(buffer);</span></span>
<span class="line"><span>// for(var i = 0;i &lt; int32View.length;i++){</span></span>
<span class="line"><span>//     int32View[i] = i * 2;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var int16View = new Int16Array(buffer);</span></span>
<span class="line"><span>// for(var i = 0;i &lt; int16View.length;i++){</span></span>
<span class="line"><span>//     console.log(&#39;Entry &#39;+ i + &#39;: &#39; + int16View[i]);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 假定某段buffer包含如下字节： [0x02,0x01,0x03,0x07] --- 0x开头为16进制数字 0b二进制 0八进制 可直接以此定义变量</span></span>
<span class="line"><span>// var buffer = new ArrayBuffer(4);</span></span>
<span class="line"><span>// var v1 = new Uint8Array(buffer);</span></span>
<span class="line"><span>// v1[0] = 2;</span></span>
<span class="line"><span>// v1[1] = 1;</span></span>
<span class="line"><span>// v1[2] = 3;</span></span>
<span class="line"><span>// v1[3] = 7;</span></span>
<span class="line"><span>// var uInt16View = new Uint16Array(buffer);</span></span>
<span class="line"><span>//</span><span> // 计算机采用小端字节序 所以头两个字节等于258</span></span>
<span class="line"><span>// if(uInt16View[0] === 258){</span></span>
<span class="line"><span>//</span><span>     // 计算机是小端字节序时，Uint8Array视图在内存中第一个数字为0x02 第二个为0x01 而在Uint16Array中读取的是0x0102 将决定其大小的最不重要的字节放在前面，最重要的字节放在后面 16进制0x0102对应10进制也就是258</span></span>
<span class="line"><span>//     console.log(&#39;OK&#39;);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// for(var i=0;i&lt;v1.length;i++){</span></span>
<span class="line"><span>//     console.log(&#39;v1:&#39; + v1[i]);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// for(var i=0;i&lt;uInt16View.length;i++){</span></span>
<span class="line"><span>//     console.log(&#39;uInt16View:&#39; + uInt16View[i]);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 下面函数可以用于判断当前视图是小端字节序还是大端字节序</span></span>
<span class="line"><span>// const BIG_ENDIAN = Symbol(&#39;BIG_ENDIAN&#39;);</span></span>
<span class="line"><span>// const LITTLE_ENDIAN = Symbol(&#39;LITTLE_ENDIAN&#39;);</span></span>
<span class="line"><span>// function getPlatformEndianness(){</span></span>
<span class="line"><span>//     let arr32 = Uint32Array.of(0x12345678);</span></span>
<span class="line"><span>//     let arr8 = new Uint8Array(arr32.buffer);</span></span>
<span class="line"><span>//     switch ((arr8[0] * 0x1000000) + (arr8[1] * 0x10000) + (arr8[2] * 0x100) + (arr8[3])) {</span></span>
<span class="line"><span>//         case 0x12345678:</span></span>
<span class="line"><span>//             return BIG_ENDIAN;</span></span>
<span class="line"><span>//         case 0x78563412:</span></span>
<span class="line"><span>//             return LITTLE_ENDIAN;</span></span>
<span class="line"><span>//         default:</span></span>
<span class="line"><span>//             throw new Error(&#39;Unknown endianness&#39;);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// let result = getPlatformEndianness();</span></span>
<span class="line"><span>// console.log(result);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ArrayBuffer与字符串的互相转换</span></span>
<span class="line"><span>// ArrayBuffer转为字符串，参数为ArrayBuffer对象</span></span>
<span class="line"><span>// function ab2str (buf){</span></span>
<span class="line"><span>//     return String.fromCharCode.apply(null, new Uint16Array(buf));</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// var buf = new ArrayBuffer(8);</span></span>
<span class="line"><span>// console.log(ab2str(buf));</span></span>
<span class="line"><span>// 字符串转为ArrayBuffer对象，参数为字符串</span></span>
<span class="line"><span>// function str2ab(str){</span></span>
<span class="line"><span>//     var buf = new ArrayBuffer(str.length * 2);</span><span> // 每个字符占用两个字节</span></span>
<span class="line"><span>//     var bufView = new Uint16Array(buf);</span></span>
<span class="line"><span>//     for(var i = 0;i &lt; str.length;i++){</span></span>
<span class="line"><span>//         bufView[i] = str.charCodeAt(i);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>//     return buf;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span>// console.log(str2ab(&#39;abc&#39;));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 溢出 正向溢出 和 负向溢出</span></span>
<span class="line"><span>// var uint8 = new Uint8Array(1);</span><span> // 8位无符号整数Uint8Array的取值范围是 0~255</span></span>
<span class="line"><span>// uint8[0] = 256;</span></span>
<span class="line"><span>// console.log(uint8[0]);</span><span> // 0 正向溢出取最小值加余值再减1</span></span>
<span class="line"><span>// uint8[0] = -1;</span></span>
<span class="line"><span>// console.log(uint8[0]);</span><span> // 255  负向溢出取最大值减余值再加1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// var int8 = new Int8Array(1);</span><span> // 8位带符号整数Int8Array的取值范围是-128~127</span></span>
<span class="line"><span>// int8[0] = 128;</span></span>
<span class="line"><span>// console.log(int8[0]);</span><span> // 正向溢出</span></span>
<span class="line"><span>// int8[0] = -129; </span></span>
<span class="line"><span>// console.log(int8[0]);</span><span> // 负向溢出</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Uint8ClampedArray视图的溢出与其它视图有所区别，负向溢出等于0，正向溢出都等于255</span></span>
<span class="line"><span>// var uint8c = new Uint8ClampedArray(1);</span></span>
<span class="line"><span>// uint8c[0] = 256;</span></span>
<span class="line"><span>// console.log(uint8c[0]);</span></span>
<span class="line"><span>// uint8c[0] = -1;</span></span>
<span class="line"><span>// console.log(uint8c[0]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// TypedArray实例的buffer属性返回整段内存区域对应的ArrayBuffer对象，只读属性</span></span>
<span class="line"><span>// var a = new Float32Array(64);</span></span>
<span class="line"><span>// var b = new Uint8Array(a.buffer);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// byteLength属性返回TypedArray数组占据的内存长度，单位是字节。byteOffset属性返回TypedArray数组从底层ArrayBuffer对象的哪个字节开始，只读属性</span></span>
<span class="line"><span>// var b = new ArrayBuffer(8);</span></span>
<span class="line"><span>// var v1 = new Int32Array(b);</span></span>
<span class="line"><span>// var v2 = new Uint8Array(b, 2);</span></span>
<span class="line"><span>// var v3 = new Int16Array(b, 2, 2);</span></span>
<span class="line"><span>// console.log(v1.byteLength);</span></span>
<span class="line"><span>// console.log(v2.byteLength);</span></span>
<span class="line"><span>// console.log(v3.byteLength);</span></span>
<span class="line"><span>// console.log(v1.byteOffset);</span></span>
<span class="line"><span>// console.log(v2.byteOffset);</span></span>
<span class="line"><span>// console.log(v3.byteOffset);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// TypedArray.prototype.length length属性表示TypedArray数组含有多少个成员</span></span>
<span class="line"><span>// var a = new Int16Array(8);</span></span>
<span class="line"><span>// console.log(a.length);</span></span>
<span class="line"><span>// console.log(a.byteLength);</span></span>
<span class="line"><span>// console.log(a);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// TypedArray.prototype.set() 用于复制数组 将一段内存复制到另一段</span></span>
<span class="line"><span>// var a = new Uint8Array(8);</span></span>
<span class="line"><span>// var b = new Uint8Array(8);</span></span>
<span class="line"><span>// a[0] = 1;</span></span>
<span class="line"><span>// console.log(a,b);</span></span>
<span class="line"><span>// b.set(a);</span></span>
<span class="line"><span>// console.log(a,b);</span></span>
<span class="line"><span>// b = new Uint8Array(10);</span></span>
<span class="line"><span>// b.set(a,2)// 长度需对应</span></span>
<span class="line"><span>// console.log(a,b);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// TypedArray.prototype.subarray()对TypedArray数组的一部分再建立一个新的视图</span></span>
<span class="line"><span>// var a = new Uint16Array(8);</span></span>
<span class="line"><span>// var b = a.subarray(2,3);</span></span>
<span class="line"><span>// console.log(a.byteLength, b.byteLength, a, b);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// TypedArray.prototype.slice() 返回一个指定位置的新的TypedArray实例</span></span>
<span class="line"><span>// let ui8 = Uint8Array.of(0, 1, 2);</span></span>
<span class="line"><span>// console.log(ui8.slice(-1));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// TypedArray.of() 将参数转为一个TypedArray实例</span></span>
<span class="line"><span>// console.log(Float32Array.of(0.151, -8, 3.7));</span></span>
<span class="line"><span>// 下面三种方法会生成同样的TypedArray数组</span></span>
<span class="line"><span>// 方法一</span></span>
<span class="line"><span>// let tarr = new Uint8Array([1,2,3]);</span></span>
<span class="line"><span>// console.log(tarr);</span></span>
<span class="line"><span>// 方法二</span></span>
<span class="line"><span>// let tarr = Uint8Array.of(1, 2, 3);</span></span>
<span class="line"><span>// console.log(tarr);</span></span>
<span class="line"><span>// 方法三</span></span>
<span class="line"><span>// let tarr = new Uint8Array(3);</span></span>
<span class="line"><span>// tarr[0] = 1;</span></span>
<span class="line"><span>// tarr[1] = 2;</span></span>
<span class="line"><span>// tarr[2] = 3;</span></span>
<span class="line"><span>// console.log(tarr);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// TypedArray.from() 接受一个可遍历的数据结构作为参数，返回一个基于此结构的TypedArray实例</span></span>
<span class="line"><span>// console.log(Uint16Array.from([1,2,3]));</span></span>
<span class="line"><span>// 这个方法还可以将一种TypedArray实例转为另一种</span></span>
<span class="line"><span>// var ui16 = Uint16Array.from(Uint8Array.of(0,1,2));</span></span>
<span class="line"><span>// console.log(ui16 instanceof Uint16Array,ui16);</span></span>
<span class="line"><span>// from方法还可以接受一个函数作为第二参数，用于对每个元素进行遍历，类似map方法</span></span>
<span class="line"><span>// var i8 = Int8Array.of(127,126,125).map(x=&gt;2*x);</span></span>
<span class="line"><span>// console.log(i8);</span><span> // 有溢出 Int8Array([-2,-4,-6])</span></span>
<span class="line"><span>// var i16 = Int16Array.from(Int8Array.of(127, 126, 125), x =&gt; 2 * x);</span></span>
<span class="line"><span>// console.log(i16);</span><span> //没有溢出 说明遍历针对的是from操作后的16位整数数组而不是原来的8位整数数组</span></span></code></pre></div><h2 id="es6数组方法总结" tabindex="-1">es6数组方法总结 <a class="header-anchor" href="#es6数组方法总结" aria-label="Permalink to &quot;es6数组方法总结&quot;">​</a></h2><ul><li><p>1、forEach<br> 特点：不改变原数组、无返回值、不能用break跳出循环(只能return跳出单次循环)<br> 参数： 单项item 索引index 原数组arr</p></li><li><p>2、map<br> 特点：不改变原数组 返回一个新数组(中间可对item进行处理) 不能break跳出循环(只能return跳出单次循环)<br> 参数： 单项item 索引index 原数组arr --&gt; forEach&amp;map 区别在于是否返回一个新数组</p></li><li><p>3、filter<br> 特点： 不改变原数组 返回一个新数组 不能break 返回过滤后的数组 参数： 单项item 索引index 原数组arr --&gt; filter&amp;map 区别在于return的返回机制 map的return是真正把return后的值返回给新数组当成其对应的一个新item filter的return 是判断return后面值 强转为boolean以后 为true则将此次循环的item返回 即push到新数组 为false 则 跳出此次循环进行下一次 并且不往新数组里面push任何内容</p></li><li><p>4、every 特点: 不改变原数组 返回一个布尔值 不能break 执行每次循环的 return 后的语句 如果return后的语句都为 true 则整次循环返回 true 否则返回 false 参数：同上 --&gt; 可用于类似验证性的判断 类似自动化用例里面的判断逻辑 不必先声明一个布尔值 条件不符是置为 非 这个方法直接返回想要的结果</p></li><li><p>5、some 特点： 不改变原数组 返回一个布尔值 不能break 顺序执行每次循环 当return后的语句 强转为boolean以后为true时 结束整次循环 并返还true 如果循环结束 所有return全为false 则整体返回false 参数同上</p></li></ul><p>--&gt; every&amp;some 两个方法可以分别适用于两个相对的场景 有时需要判断全为true 有时需要判断有没有true 这两个方法可以极大简化代码 基本能涵盖大部分类似场景</p><ul><li>6、reduce<br> 特点： 不改变原数组 返回类型值任意 不能break 顺序执行每次循环(当不传初始值时 从index=1开始遍历) 参数： 两个参数 第一个为一个回调函数 必选 第二个为遍历开始时的初始值 可选 类型任意 回调函数的参数： 四个 (prev,cur,index,arr)<br> 第一个为循环开始的初始值prev reduce不传二参时初始值prev为要遍历数组的index=0的项 同时遍历改为从index=1开始执行<br> 第二个为当前遍历的数组项cur 可以在回调函数体内对cur和prev进行任意操作 然后return 任意类型的值 注意改值最好与prev的类型一致 第三个为当前遍历的数组项的index 第四个为当前数组 --&gt;使用reduce可以简化很多操作</li></ul>`,61)]))}const f=s(l,[["render",i]]);export{g as __pageData,f as default};
