## defineProperty
+ defineProperty是es5的API，Objetc原型上的方法，可以用于代理对象上的某个key，并对其进行劫持；在vue中是实现数据劫持的核心
+ defineProperty有三个参数：（data,key,{属性对象}），data是要劫持的对象，key是要劫持的属性，第三个参数是一个object
+ 第三个参数的可选属性：
  - configurable属性：能不能修改描述符，就是能不能再次修改描述符的其他属性
  - enumerable属性：能不能枚举该属性，就是a属性能不能被for到
  - writable属性：能不能修改属性值，就是能不能这样修改 obj.a = 1
  - value属性：该属性的值
  - get属性：是一个函数，当访问该属性的时候，函数自动调用，函数返回值就是该属性的值
  - set属性：是一个函数，当修改该属性的时候，函数自动调用，函数有且只有一个参数，即赋值的新值
+ 描述符里的value属性与get属性、writable属性与set属性是互斥的关系，只能存在一个，另外属性描述值默认都是false
+ defineProperty的缺陷
  - 不能监测对象增加属性
  - 不能监测对象删除属性
  - 不能劫持数组的修改，严格来说，是监测数组修改十分浪费性能
+ 基于defineProperty的缺陷，vue3中采用proxy替代了defineProperty做双向数据绑定

## Fetch API
+ 一个获取资源的接口（包括跨域请求）
+ 提供了对 Request 和 Response 对象的定义
+ 第一个参数必须接受一个 资源路径 为参数；第二个参数可选，可以传一个init(与Request API 和 Response API相关)
+ 无论请求成功与否 都返回一个Promise对象 resolve 对应请求的 Response
### 构造函数 Response()
+ 属性
  + Response.headers 包含此 Response 所关联的 Headers 对象
  + Response.ok  包含了一个布尔值，标示该 Response 成功（HTTP 状态码范围在200-299）
  + Response.redirected 标示该 Response 是否来自一个重定向，如果是的话，它的 URL 列表将会有多个条目
  + Response.status 包含 Response 的状态码
  + Response.statusText 包含了与该 Response 状态码一致的状态信息
  + Response.type  包含 Response 的类型
  + Response.url  包含 Response 的 URL
  + Response.useFinalURL  包含一个布尔值，来标示这是否是该 Response 的最终 URL
  + Response.body  一个简单的 getter，用于暴露一个 ReadableStream 类型的 body 内容
  + Response.bodyUsed  包含一个布尔值来标识该 Response 是否读取过 Body
+ 方法
  + Response.clone()  创建一个 Response 对象的克隆
  + Response.error()  返回一个绑定了网络错误的新的 Response 对象
  + Response.redirect()  用另一个 URL 创建一个新的 Response
  + Response.arrayBuffer()  读取 Response 对象并且将它设置为已读（因为 Response 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 ArrayBuffer 格式的 Promise 对象
  + Response.bolb()    读取 Response 对象并且将它设置为已读（因为 Response 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 Blob 格式的 Promise 对象
  + Response.formData()    读取 Response 对象并且将它设置为已读（因为 Response 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 FormData 格式的 Promise 对象
  + Response.json()    读取 Response 对象并且将它设置为已读（因为 Response 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 JSON 格式的 Promise 对象
  + Response.text()    读取 Response 对象并且将它设置为已读（因为 Response 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 USVString 格式的 Promise 对象
```
const myRequest = new Request('./lion.jpg');
console.log(myRequest,999);


// const myRequest = new Request('http://hanhuankang.com/images/animal/lion.jpg');
// console.log(myRequest,666);
let box = document.getElementById('box')
fetch(myRequest)
  .then(res => res.blob())
  .then(blob => {
    let src = URL.createObjectURL(blob);
    console.log(src,888)
    let img = document.createElement('img');
    img.src = src;
    box.appendChild(img);
  })
```
```
/** 获取 json 文件
let aaa;
try {
  fetch('./b.json')
  .then(res => { 
    // fetch() 函数返回了一个 Promise，它使用与资源获取操作相关联的 Response 对象进行解析，
    // 请求 json 文件时，需要运行 res.json()以获取 Body.json  请求img时 要使用 res。blob()...
    return res.json();
  })
  .then(json=> {
    aaa = json;
    console.log(json,'json')
    return json
  })
  .catch(err => {
    console.log(err,'err')
  })
} catch (err){
  console.log(err,'err2');
}
console.log(aaa,'aaa')
//  */

// /** 获取图片
let bbb;
try {
  fetch('./lion.jpg')
  .then(res => {
    return res.blob();
  })
  .then(blob=> {
    bbb = blob;
    console.log(blob,'blob')
    return blob
  })
  .catch(err => {
    console.log(err,'err')
  })
} catch (err){
  console.log(err,'err2');
}
console.log(bbb,'bbb')
//  */
```
## getBoundingClientRect
+ Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。
+ 返回的是一个对象，对象里有这8个属性：left right top bottom width height x y

## createNodeIterator
+ 返回一个 NodeIterator 对象

+ 如何输出页面所有元素：
const body = document.getElementsByTagName("body")[0];
const it = document.createNodeIterator(body);
console.log('it:', it);
let root = it.nextNode();
while (root){
  console.log("root:", root);
  root = it.nextNode();
}

## getComputedStyle
+ getComputedStyle 返回一个对象，其中包含dom元素的CSS属性
```
// window.getComputedStyle(element, pseudoElement)
// element: 必需，要获取样式的元素。
// pseudoElement: 可选，伪类元素，当不查询伪类元素的时候可以忽略或者传入 null。

// html
// #box {
//   width: 200px;
//   height: 200px;
//   background-color: yellow;
// }

// <div id="box"></div>

const box = document.getElementById('box')
const styles = window.getComputedStyle(box)
// 搭配getPropertyValue可以获取到具体样式
const height = styles.getPropertyValue("height")
const width = styles.getPropertyValue("width")
console.log(height, width) // '200px'  '200px'

// 可以传入第二个参数 代表要查询的伪元素的CSS样式
// let h3 = document.querySelector('h3'),
// result = getComputedStyle(h3, '::after').content;
```

## requestAnimationFrame 
+ window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
### 背景
+ 传统的 javascript 动画是通过定时器 setTimeout 或者 setInterval 实现的。但是定时器动画一直存在两个问题，第一个就是动画的循时间环间隔不好确定，设置长了动画显得不够平滑流畅，设置短了浏览器的重绘频率会达到瓶颈，推荐的最佳循环间隔是17ms（大多数电脑的显示器刷新频率是60Hz，1000ms/60）；第二个问题是定时器第二个时间参数只是指定了多久后将动画任务添加到浏览器的UI线程队列中，如果UI线程处于忙碌状态，那么动画不会立刻执行。为了解决这些问题，H5 中加入了 requestAnimationFrame;
### 优点
+ 1.requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率
+ 2.在隐藏或不可见的元素中，requestAnimationFrame 将不会进行重绘或回流，这当然就意味着更少的 CPU、GPU 和内存使用量
+ 3.requestAnimationFrame 是由浏览器专门为动画提供的 API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了 CPU 开销
### 场景
#### js动画
+ requestAnimationFrame 本来就是为动画而生的，所以在处理 js 动画不在话下，与定时器的用法非常相似，下面是一个例子，点击元素时开始转动，再次点击转动速速增加。
```
  var deg = 0;
  var id;
  var div = document.getElementById("div");
  div.addEventListener('click', function () {
      var self = this;
      requestAnimationFrame(function change() {
          self.style.transform = 'rotate(' + (deg++) + 'deg)';
          id = requestAnimationFrame(change);
      });
  });
  document.getElementById('stop').onclick = function () {
      cancelAnimationFrame(id);
  };
```
#### 大数据渲染
+ 在大数据渲染过程中，比如表格的渲染，如果不进行一些性能策略处理，就会出现 UI 冻结现象，用户体验极差。有个场景，将后台返回的十万条记录插入到表格中，如果一次性在循环中生成 DOM 元素，会导致页面卡顿5s左右。这时候我们就可以用 requestAnimationFrame 进行分步渲染，确定最好的时间间隔，使得页面加载过程中很流畅。
```
  var total = 100000;
  var size = 100;
  var count = total / size;
  var done = 0;
  var ul = document.getElementById('list');

  function addItems() {
      var li = null;
      var fg = document.createDocumentFragment();

      for (var i = 0; i < size; i++) {
          li = document.createElement('li');
          li.innerText = 'item ' + (done * size + i);
          fg.appendChild(li);
      }

      ul.appendChild(fg);
      done++;

      if (done < count) {
          requestAnimationFrame(addItems);
      }
  };

  requestAnimationFrame(addItems);
```
### 兼容性
+ firefox、chrome、ie10以上， requestAnimationFrame 的支持很好，但不兼容 IE9及以下浏览器，但是我们可以用定时器来做一下兼容，以下是兼容代码：
```
(function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback) {
            /*调整时间，让一次动画等待和执行时间在最佳循环时间间隔内完成*/
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());
```
### 知乎问答：任务时长超过一帧怎么处理？
+ 问题就是错的，任务耗时的后果是让一帧耗时变长，帧率变低，任务不会被跳过
```
    <!-- 这一帧耗时就会至少 1 秒钟 -->
    document.addEventListener("click", function () {
        var now = Date.now();
        requestAnimationFrame(() => console.log("这一帧持续了" + (Date.now() - now)));
        while (Date.now() < now + 1000);
    });
```
```
// JS动画
// var deg = 0;
// var id;
// var div = document.getElementById("box");
// div.addEventListener('click', function () {
//     var self = this;
//     requestAnimationFrame(function change() {
//         self.style.transform = 'rotate(' + (deg++) + 'deg)';
//         id = requestAnimationFrame(change);
//     });
// });
// document.getElementById('stop').onclick = function () {
//     cancelAnimationFrame(id);
// };


// 大数据渲染
// var total = 100000;
// var size = 100;
// var count = total / size;
// var done = 0;
// var ul = document.getElementById('list');

// function addItems() {
//     var li = null;
//     var fg = document.createDocumentFragment();

//     for (var i = 0; i < size; i++) {
//         li = document.createElement('li');
//         li.innerText = 'item ' + (done * size + i);
//         fg.appendChild(li);
//     }

//     ul.appendChild(fg);
//     done++;

//     if (done < count) {
//         requestAnimationFrame(addItems);
//     }
// };

// requestAnimationFrame(addItems);
```

## requestIdleCallback
+ window.requestIdleCallback()方法插入一个函数，这个函数将在浏览器空闲时期被调用。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。
+ requestAnimationFrame的回调会在每一帧确定执行，属于高优先级任务，而requestIdleCallback的回调则不一定，属于低优先级任务。
我们所看到的网页，都是浏览器一帧一帧绘制出来的，通常认为FPS为60的时候是比较流畅的，而FPS为个位数的时候就属于用户可以感知到的卡顿了
+ 一帧包含了用户的交互、js的执行、以及requestAnimationFrame的调用，布局计算以及页面的重绘等工作。
假如某一帧里面要执行的任务不多，在不到16ms（1000/60)的时间内就完成了上述任务的话，那么这一帧就会有一定的空闲时间，这段时间就恰好可以用来执行requestIdleCallback的回调
+ 由于requestIdleCallback利用的是帧的空闲时间，所以就有可能出现浏览器一直处于繁忙状态，导致回调一直无法执行，这其实也并不是我们期望的结果（如上报丢失），那么这种情况我们就需要在调用requestIdleCallback的时候传入第二个配置参数timeout了
+ 强烈建议不要在requestIdleCallback里面刻意执行DOM修改操作，从上面一帧的构成里面可以看到，requestIdleCallback回调的执行说明前面的工作（包括样式变更以及布局计算）都已完成。如果我们在callback里面做DOM修改的话，之前所做的布局计算都会失效，而且如果下一帧里有获取布局（如getBoundingClientRect、clientWidth）等操作的话，浏览器就不得不执行强制重排工作,这会极大的影响性能，另外由于修改dom操作的时间是不可预测的，因此很容易超出当前帧空闲时间的阈值，故而不推荐这么做。推荐的做法是在requestAnimationFrame里面做dom的修改，可以在requestIdleCallback里面构建Document Fragment，然后在下一帧的requestAnimationFrame里面应用Fragment。
```
// requestIdleCallback 的用法
requestIdleCallback(myNonEssentialWork);  
function myNonEssentialWork (deadline) {

  // deadline.timeRemaining()可以获取到当前帧剩余时间
  while (deadline.timeRemaining() > 0 && tasks.length > 0) {
    doWorkIfNeeded();
  }
  if (tasks.length > 0){
    requestIdleCallback(myNonEssentialWork);
  }
}


// 添加第二个配置参数 timeout
requestIdleCallback(myNonEssentialWork, { timeout: 2000 });
function myNonEssentialWork (deadline) {
  // 当回调函数是由于超时才得以执行的话，deadline.didTimeout为true
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) &&
         tasks.length > 0) {
       doWorkIfNeeded();
    }
  if (tasks.length > 0) {
    requestIdleCallback(myNonEssentialWork);
  }
}
```
## DOMContentLoaded
+ 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载
### 浏览器渲染原理
+ 浏览器向服务器请求到了 HTML 文档后便开始解析，产物是 DOM（文档对象模型），到这里 HTML 文档就被加载和解析完成了。如果有 CSS 的会根据 CSS 生成 CSSOM（CSS 对象模型），然后再由 DOM 和 CSSOM 合并产生渲染树。有了渲染树，知道了所有节点的样式，下面便根据这些节点以及样式计算它们在浏览器中确切的大小和位置，这就是布局阶段。有了以上这些信息，下面就把节点绘制到浏览器上。(浏览器渲染.png)
+ JavaScript 可以阻塞 DOM 的生成，也就是说当浏览器在解析 HTML 文档时，如果遇到
```
<body>
  <script type="text/javascript">
  console.log(document.getElementById('ele')); // null
  </script>

  <div id="ele"></div>

  <script type="text/javascript">
  console.log(document.getElementById('ele')); // <div id="ele"></div>
  </script>
</body>

```
+ 另外，因为 JavaScript 可以查询任意对象的样式，所以意味着在 CSS 解析完成，也就是 CSSOM 生成之后，JavaScript 才可以被执行。
+ 当文档中没有脚本时，浏览器解析完文档便能触发 DOMContentLoaded 事件；如果文档中包含脚本，则脚本会阻塞文档的解析，而脚本需要等 CSSOM 构建完成才能执行。在任何情况下，DOMContentLoaded 的触发不需要等待图片等其他资源加载完成。
#### 异步脚本
+ 当 HTML 文档被解析时如果遇见（同步）脚本，则停止解析，先去加载脚本，然后执行，执行结束后继续解析 HTML 文档；
+ defer 脚本：当 HTML 文档被解析时如果遇见 defer 脚本，则在后台加载脚本，文档解析过程不中断，而等文档解析结束之后，defer 延迟脚本执行。另外，defer 脚本的执行顺序与定义时的位置有关 -- 异步加载 延迟执行
+ async 脚本：当 HTML 文档被解析时如果遇见 async 脚本，则在后台加载脚本，文档解析过程不中断。脚本加载完成后，文档停止解析，脚本执行，执行结束后文档继续解析 - 异步加载 异步执行
+  DOMContentLoaded 与 load：当 HTML 文档解析完成就会触发 DOMContentLoaded，而所有资源加载完成之后，load 事件才会被触发（所以图片资源的加载会阻塞load，当图片很大时会很明显）
+ (document).ready(function()//...代码...);其实监听的就是DOMContentLoaded事件，而(document).load(function() { // ...代码... }); 监听的是 load 事件。
```
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
});

for(var i=0; i<1000000000; i++){
  // 这个同步脚本将延迟 DOM 的解析。
  // 所以 DOMContentLoaded 事件稍后将启动。
} 
```
## MutationObserver
+ MutationObserver 接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分。
+ MutationObserver()构造函数，创建并返回一个新的 MutationObserver 它会在指定的 DOM 发生变化时被调用
+ 方法：
  + disconnect()  阻止 MutationObserver 实例继续接收的通知，直到再次调用其 observe() 方法，该观察者对象包含的回调函数都不会再被调用。
  + observe()  配置 MutationObserver 在 DOM 更改匹配给定选项时，通过其回调函数开始接收通知。
  + takeRecords()  从 MutationObserver 的通知队列中删除所有待处理的通知，并将它们返回到 MutationRecord 对象的新 Array 中。
### config 是一个具有布尔选项的对象，该布尔选项表示“将对哪些更改做出反应”：
+ childList —— node 的直接子节点的更改，
+ subtree —— node 的所有后代的更改，
+ attributes —— node 的特性（attribute），
+ attributeFilter —— 特性名称数组，只观察选定的特性。
+ characterData —— 是否观察 node.data（文本内容）
+ 其他几个选项：
  + attributeOldValue —— 如果为 true，则将特性的旧值和新值都传递给回调（参见下文），否则只传新值（需要 attributes 选项），
  + characterDataOldValue —— 如果为 true，则将 node.data 的旧值和新值都传递给回调（参见下文），否则只传新值（需要 characterData 选项）。
```
 // 选择需要观察变动的节点
 const targetNode = document.getElementById('box');

 // 观察器的配置（需要观察什么变动）
 const config = { attributes: true, childList: true, subtree: true };
 
 // 当观察到变动时执行的回调函数
 const callback = function(mutationsList, observer) {
     // Use traditional 'for loops' for IE 11
     console.log(mutationsList,"mutationsList");
     for(let mutation of mutationsList) {
         if (mutation.type === 'childList') {
             console.log('A child node has been added or removed.');
         }
         else if (mutation.type === 'attributes') {
             console.log('The ' + mutation.attributeName + ' attribute was modified.');
         }
     }
 };
 
 // 创建一个观察器实例并传入回调函数
 const observer = new MutationObserver(callback);
 
 // 以上述配置开始观察目标节点
 observer.observe(targetNode, config);
 
 // 之后，可停止观察
//  observer.disconnect();

// 修改dom
function addDom(){
    var span = document.createElement("span");
    span.innerHTML = "随便写点";
    targetNode.appendChild(span);
}
```
# Web Workers API
+ HTML5新增内容 与JS的单线程(主线程、子线程)、EventLoop等内容相关
## JS的单线程
+ JS的运行是单线程的
+ 浏览器可以有多个进程 一般每个tab页对应一个进程  每个进程有多个线程 包括GUI渲染线程、JS引擎线程、事件触发线程、定时器触发线程、http请求线程等
+ HTML5中新增了子线程 可以使用 Web Workers API 开启一个子线程
+ 子线程不阻塞主线程代码运行
+ 子线程没有DOM操作权限
## EventLoop
+ JS的线程运行时，会开启一个主线程的 执行栈 和 一个 任务队列
+ 所有宏任务都放到执行栈中，所有微任务都会放到任务队列中
+ JS的微任务包括：setTimeout定时器、异步I/O操作、Ajax请求、Promise、DOM操作（DOM事件）等
+ 微任务优先级高于宏任务
+ 每次事件循环，初始化时都会把所有微任务宏任务分别放入执行栈和任务队列中，然后先执行执行栈中的宏任务
+ 执行栈中的宏任务执行完毕后，会把任务队列中的微任务放到执行栈中执行(涉及到计算定时器时间 --- 所以定时器是在宏任务第一次执行完毕后才会计算时间并执行)，此时任务队列已空
+ 执行栈中的微任务在执行时，如果有新的微任务，则会继续把这些微任务放到任务队列中，等待下一次事件循环时执行
+ 依次反复执行任务队列中的任务，称为事件循环Event Loop
## Worker的使用方法

## Worker的使用场景
+ 使用工作线程做后台数值（算法）计算
+ 使用共享线程处理多用户并发连接
+ HTML5 线程代理
```
// 主线程业务代码

// 定义一个子线程实例
var worker = new Worker("WebWorkersAPI_02.js");

let type = Object.prototype.toString.call(worker); // "[object Worker]"  数据类型位Object class为 Worcker

// 向子线程发送数据 
worker.postMessage([
  {
    name:'斩风',
    id: 1
  },
  {
    name:'诛仙',
    id: 2
  },
]);

// 接收子线程传回来的数据
worker.onmessage = function (e) {
    console.log(e.data, '01 message');
};



// 共享线程
// var share_worker = new SharedWorker("WebWorkersAPI_02.js");

// share_worker.port.postMessage("message_share");

// share_worker.port.onmessage = function(e){
//   console.log(e, 'onmessage_share');
// }

// 子线程业务代码

let main_data;

// 获取主线程传过来的数据
onmessage = function (e) {
  console.log(e.data,'02 onmessage');
  main_data = e.data;

  // 对主线程数据进行处理
  handleData(main_data);

  //发送给主线程
  postMessage(main_data)
};







function handleData(data){ //处理数据 添加书名号
  data.map(item=>{
    item.name=`《${item.name}》`
  })
}
```
## IndexedDB
参考(https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)
+ IndexedDB 是一种底层API，用于在客户端存储大量的结构化数据（也包括文件/二进制大型对象(blobs)）。（在 Web Worker 中可用）
+ IndexedDB API是强大的，但对于简单的情况可能看起来太复杂。如果想使用一个简单的API，可以使用  localForage、dexie.js、PouchDB、idb、idb-keyval、JsStore 或者 lovefield 等库。
+ 使用 IndexedDB 指定的操作是异步的。同步API已从规范中移除，但开发者扔可重新引入。
### 基本概念
+ IndexedDB API 下的接口
  + 数据库：IDBDatabase 对象
  + 对象仓库：IDBObjectStore 对象
  + 索引： IDBIndex 对象
  + 事务： IDBTransaction 对象
  + 操作请求：IDBRequest 对象
  + 指针： IDBCursor 对象
  + 主键集合：IDBKeyRange 对象
```
/*IndexDB 学习 */
// 打开我们的数据库
//  indexedDB.open 第二个参数 version 代表数据库版本 默认是 1; 报错 VER_ERR 时，表明存储在磁盘上的数据库版本高于你试图打开的版本
var request = window.indexedDB.open("MyTestDatabase", 2); // IDBOpenDBRequest
// Object.prototype.toString.call(request); // '[object IDBOpenDBRequest]'

var db;

request.onerror = function (event) {
  // Do someting
  alert("Why didn't you allow my web app to use IndexedDB?!");
}

request.onsuccess = function (event) {
  // Do someting
  db = event.target.result; // IDBDatabase

  /* 错误事件遵循冒泡机制 */
  db.onerror = function (event) {
    alert("Database error: " + event.target.errorCode);
  };

}

request.onupgradeneeded = function (event) {
  // 保存 IDBDatabase 接口
  var db = event.target.result;

  // 为该数据库创建一个对象仓库
  var objectStore;
  if (!db.objectStoreNames.contains('person')) {
    // 新建一个 person 表，主键是 id,
    objectStore = db.createObjectStore("person", {
      keyPath: "id",
    });
    // 新建一个 person 表, IndexedDB自动生成主键，使用一个递增的整数 作为主键属性
    objectStore = db.createObjectStore("person", {
      autoIncrement: true
    });
    // createIndex 的三个参数分别为 索引名称、索引所在的属性、配置对象(unique说明该属性是否可以包含重复的值)
    objectStore.createIndex('name', 'name', {
      unique: false
    });
    objectStore.createIndex('email', 'email', {
      unique: true
    })
    var obj = {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com'
    };
    add(db, obj);
  }
}

// 新增数据
function add (db, obj = {}){
  // db.transaction 是新建一个事务,新建事务时必须制定表格名称和操作模式( 只读 或 读写)
  // 通过IDBTransaction.objectStore(name) 方法，拿到IDBObjectStore 对象,再通过表格对象的 add()方法，向表格写入一条记录
  var request = db.transaction(['person', 'readwrite'])
    .objectStore('person')
    .add(obj);
  request.onsuccess = function (event){
    console.log('数据写入成功');
  }
  request.onerror = function (event){
    console.log('事务失败');
  }
}

// 读取数据
function read (db, index){
  var transaction = db.transaction(['person']);
  var objectStore = transaction.objectStore('person');
  // objectStore.get() 方法用于读取数据,参数 index 是主键的值
  var request = objectStore.get(index);
  request.onerror = function (event){
    console.log('读取数据失败');
  }
  request.onsuccess = function (event){
    if(request.result){
      console.log('Name' + request.result.name);
      console.log('Age' + request.result.age);
      console.log('email' + request.result.email);
    } else {
      console.log('未获得数据记录');
    }
  }
}

// 遍历数据
function readAll(db){
  var objectStore = db.transaction('person').objectStore('person');

  // 遍历数据表格的所有记录，要使用指针对象 IDBCursor
  objectStore.openCursor().onsuccess = function (event){
    var cursor = event.target.result;

    if(cursor){
      console.log('ID:' + cursor.key);
      console.log('Name:' + cursor.name);
      console.log('Age:' + cursor.age);
      console.log('Email:' + cursor.email);
    } else {
      console.log("没有更多数据了!");
    }
  }
}

// 更新数据
function update(db, obj){
  // obj = {
  //   id: 1,
  //   name: "李四",
  //   email: "lisi@example.com"
  // };
  // 更新数据要使用 IDBObject.put() 方法 put() 方法自动更新了主键为 1 的数据记录
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .put(obj);

  request.onsuccess = function (event){
    console.log('数据更新成功');
  }

  request.onerror = function (event){

  }
}

// 删除数据
function remove (db, index){
  // IDBObjectStore.delete() 方法用于删除记录
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .delete(index);
  request.onsuccess = function (event){
    console.log("数据删除成功");
  }
}

// 使用索引
function getInfoByIndexName (db, indexName, tableName, name){
  // indexName = "name";
  // tableName = "person";
  // name = "李四";
  var transaction = db.transaction([tableName], 'readonly');
  var store = transaction.objectStore(tableName);
  var index = store.index(indexName);
  var request = index.get(name);
  request.onsuccess = function (event){
    var result = e.target.result;
    if(result){
      // doSomething
    } else {
      // doSomething
    }
  }
}
```
