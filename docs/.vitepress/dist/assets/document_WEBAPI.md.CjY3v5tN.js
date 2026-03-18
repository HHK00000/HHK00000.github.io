import{_ as s,c as a,o as p,ae as e}from"./chunks/framework.BMBYWaLh.js";const m=JSON.parse('{"title":"Web Workers API","description":"","frontmatter":{},"headers":[],"relativePath":"document/WEBAPI.md","filePath":"document/WEBAPI.md"}'),l={name:"document/WEBAPI.md"};function i(t,n,o,c,r,d){return p(),a("div",null,n[0]||(n[0]=[e(`<h2 id="defineproperty" tabindex="-1">defineProperty <a class="header-anchor" href="#defineproperty" aria-label="Permalink to &quot;defineProperty&quot;">​</a></h2><ul><li>defineProperty是es5的API，Objetc原型上的方法，可以用于代理对象上的某个key，并对其进行劫持；在vue中是实现数据劫持的核心</li><li>defineProperty有三个参数：（data,key,{属性对象}），data是要劫持的对象，key是要劫持的属性，第三个参数是一个object</li><li>第三个参数的可选属性： <ul><li>configurable属性：能不能修改描述符，就是能不能再次修改描述符的其他属性</li><li>enumerable属性：能不能枚举该属性，就是a属性能不能被for到</li><li>writable属性：能不能修改属性值，就是能不能这样修改 obj.a = 1</li><li>value属性：该属性的值</li><li>get属性：是一个函数，当访问该属性的时候，函数自动调用，函数返回值就是该属性的值</li><li>set属性：是一个函数，当修改该属性的时候，函数自动调用，函数有且只有一个参数，即赋值的新值</li></ul></li><li>描述符里的value属性与get属性、writable属性与set属性是互斥的关系，只能存在一个，另外属性描述值默认都是false</li><li>defineProperty的缺陷 <ul><li>不能监测对象增加属性</li><li>不能监测对象删除属性</li><li>不能劫持数组的修改，严格来说，是监测数组修改十分浪费性能</li></ul></li><li>基于defineProperty的缺陷，vue3中采用proxy替代了defineProperty做双向数据绑定</li></ul><h2 id="fetch-api" tabindex="-1">Fetch API <a class="header-anchor" href="#fetch-api" aria-label="Permalink to &quot;Fetch API&quot;">​</a></h2><ul><li>一个获取资源的接口（包括跨域请求）</li><li>提供了对 Request 和 Response 对象的定义</li><li>第一个参数必须接受一个 资源路径 为参数；第二个参数可选，可以传一个init(与Request API 和 Response API相关)</li><li>无论请求成功与否 都返回一个Promise对象 resolve 对应请求的 Response</li></ul><h3 id="构造函数-response" tabindex="-1">构造函数 Response() <a class="header-anchor" href="#构造函数-response" aria-label="Permalink to &quot;构造函数 Response()&quot;">​</a></h3><ul><li>属性 <ul><li>Response.headers 包含此 Response 所关联的 Headers 对象</li><li>Response.ok 包含了一个布尔值，标示该 Response 成功（HTTP 状态码范围在200-299）</li><li>Response.redirected 标示该 Response 是否来自一个重定向，如果是的话，它的 URL 列表将会有多个条目</li><li>Response.status 包含 Response 的状态码</li><li>Response.statusText 包含了与该 Response 状态码一致的状态信息</li><li>Response.type 包含 Response 的类型</li><li>Response.url 包含 Response 的 URL</li><li>Response.useFinalURL 包含一个布尔值，来标示这是否是该 Response 的最终 URL</li><li>Response.body 一个简单的 getter，用于暴露一个 ReadableStream 类型的 body 内容</li><li>Response.bodyUsed 包含一个布尔值来标识该 Response 是否读取过 Body</li></ul></li><li>方法 <ul><li>Response.clone() 创建一个 Response 对象的克隆</li><li>Response.error() 返回一个绑定了网络错误的新的 Response 对象</li><li>Response.redirect() 用另一个 URL 创建一个新的 Response</li><li>Response.arrayBuffer() 读取 Response 对象并且将它设置为已读（因为 Response 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 ArrayBuffer 格式的 Promise 对象</li><li>Response.bolb() 读取 Response 对象并且将它设置为已读（因为 Response 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 Blob 格式的 Promise 对象</li><li>Response.formData() 读取 Response 对象并且将它设置为已读（因为 Response 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 FormData 格式的 Promise 对象</li><li>Response.json() 读取 Response 对象并且将它设置为已读（因为 Response 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 JSON 格式的 Promise 对象</li><li>Response.text() 读取 Response 对象并且将它设置为已读（因为 Response 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 USVString 格式的 Promise 对象</li></ul></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const myRequest = new Request(&#39;./lion.jpg&#39;);</span></span>
<span class="line"><span>console.log(myRequest,999);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// const myRequest = new Request(&#39;http://hanhuankang.com/images/animal/lion.jpg&#39;);</span></span>
<span class="line"><span>// console.log(myRequest,666);</span></span>
<span class="line"><span>let box = document.getElementById(&#39;box&#39;)</span></span>
<span class="line"><span>fetch(myRequest)</span></span>
<span class="line"><span>  .then(res =&gt; res.blob())</span></span>
<span class="line"><span>  .then(blob =&gt; {</span></span>
<span class="line"><span>    let src = URL.createObjectURL(blob);</span></span>
<span class="line"><span>    console.log(src,888)</span></span>
<span class="line"><span>    let img = document.createElement(&#39;img&#39;);</span></span>
<span class="line"><span>    img.src = src;</span></span>
<span class="line"><span>    box.appendChild(img);</span></span>
<span class="line"><span>  })</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/** 获取 json 文件</span></span>
<span class="line"><span>let aaa;</span></span>
<span class="line"><span>try {</span></span>
<span class="line"><span>  fetch(&#39;./b.json&#39;)</span></span>
<span class="line"><span>  .then(res =&gt; { </span></span>
<span class="line"><span>    // fetch() 函数返回了一个 Promise，它使用与资源获取操作相关联的 Response 对象进行解析，</span></span>
<span class="line"><span>    // 请求 json 文件时，需要运行 res.json()以获取 Body.json  请求img时 要使用 res。blob()...</span></span>
<span class="line"><span>    return res.json();</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  .then(json=&gt; {</span></span>
<span class="line"><span>    aaa = json;</span></span>
<span class="line"><span>    console.log(json,&#39;json&#39;)</span></span>
<span class="line"><span>    return json</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  .catch(err =&gt; {</span></span>
<span class="line"><span>    console.log(err,&#39;err&#39;)</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>} catch (err){</span></span>
<span class="line"><span>  console.log(err,&#39;err2&#39;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>console.log(aaa,&#39;aaa&#39;)</span></span>
<span class="line"><span>//  */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// /** 获取图片</span></span>
<span class="line"><span>let bbb;</span></span>
<span class="line"><span>try {</span></span>
<span class="line"><span>  fetch(&#39;./lion.jpg&#39;)</span></span>
<span class="line"><span>  .then(res =&gt; {</span></span>
<span class="line"><span>    return res.blob();</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  .then(blob=&gt; {</span></span>
<span class="line"><span>    bbb = blob;</span></span>
<span class="line"><span>    console.log(blob,&#39;blob&#39;)</span></span>
<span class="line"><span>    return blob</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  .catch(err =&gt; {</span></span>
<span class="line"><span>    console.log(err,&#39;err&#39;)</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>} catch (err){</span></span>
<span class="line"><span>  console.log(err,&#39;err2&#39;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>console.log(bbb,&#39;bbb&#39;)</span></span>
<span class="line"><span>//  */</span></span></code></pre></div><h2 id="getboundingclientrect" tabindex="-1">getBoundingClientRect <a class="header-anchor" href="#getboundingclientrect" aria-label="Permalink to &quot;getBoundingClientRect&quot;">​</a></h2><ul><li>Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。</li><li>返回的是一个对象，对象里有这8个属性：left right top bottom width height x y</li></ul><h2 id="createnodeiterator" tabindex="-1">createNodeIterator <a class="header-anchor" href="#createnodeiterator" aria-label="Permalink to &quot;createNodeIterator&quot;">​</a></h2><ul><li><p>返回一个 NodeIterator 对象</p></li><li><p>如何输出页面所有元素： const body = document.getElementsByTagName(&quot;body&quot;)[0]; const it = document.createNodeIterator(body); console.log(&#39;it:&#39;, it); let root = it.nextNode(); while (root){ console.log(&quot;root:&quot;, root); root = it.nextNode(); }</p></li></ul><h2 id="getcomputedstyle" tabindex="-1">getComputedStyle <a class="header-anchor" href="#getcomputedstyle" aria-label="Permalink to &quot;getComputedStyle&quot;">​</a></h2><ul><li>getComputedStyle 返回一个对象，其中包含dom元素的CSS属性</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// window.getComputedStyle(element, pseudoElement)</span></span>
<span class="line"><span>// element: 必需，要获取样式的元素。</span></span>
<span class="line"><span>// pseudoElement: 可选，伪类元素，当不查询伪类元素的时候可以忽略或者传入 null。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// html</span></span>
<span class="line"><span>// #box {</span></span>
<span class="line"><span>//   width: 200px;</span></span>
<span class="line"><span>//   height: 200px;</span></span>
<span class="line"><span>//   background-color: yellow;</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// &lt;div id=&quot;box&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const box = document.getElementById(&#39;box&#39;)</span></span>
<span class="line"><span>const styles = window.getComputedStyle(box)</span></span>
<span class="line"><span>// 搭配getPropertyValue可以获取到具体样式</span></span>
<span class="line"><span>const height = styles.getPropertyValue(&quot;height&quot;)</span></span>
<span class="line"><span>const width = styles.getPropertyValue(&quot;width&quot;)</span></span>
<span class="line"><span>console.log(height, width) // &#39;200px&#39;  &#39;200px&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 可以传入第二个参数 代表要查询的伪元素的CSS样式</span></span>
<span class="line"><span>// let h3 = document.querySelector(&#39;h3&#39;),</span></span>
<span class="line"><span>// result = getComputedStyle(h3, &#39;::after&#39;).content;</span></span></code></pre></div><h2 id="requestanimationframe" tabindex="-1">requestAnimationFrame <a class="header-anchor" href="#requestanimationframe" aria-label="Permalink to &quot;requestAnimationFrame&quot;">​</a></h2><ul><li>window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行</li></ul><h3 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h3><ul><li>传统的 javascript 动画是通过定时器 setTimeout 或者 setInterval 实现的。但是定时器动画一直存在两个问题，第一个就是动画的循时间环间隔不好确定，设置长了动画显得不够平滑流畅，设置短了浏览器的重绘频率会达到瓶颈，推荐的最佳循环间隔是17ms（大多数电脑的显示器刷新频率是60Hz，1000ms/60）；第二个问题是定时器第二个时间参数只是指定了多久后将动画任务添加到浏览器的UI线程队列中，如果UI线程处于忙碌状态，那么动画不会立刻执行。为了解决这些问题，H5 中加入了 requestAnimationFrame;</li></ul><h3 id="优点" tabindex="-1">优点 <a class="header-anchor" href="#优点" aria-label="Permalink to &quot;优点&quot;">​</a></h3><ul><li>1.requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率</li><li>2.在隐藏或不可见的元素中，requestAnimationFrame 将不会进行重绘或回流，这当然就意味着更少的 CPU、GPU 和内存使用量</li><li>3.requestAnimationFrame 是由浏览器专门为动画提供的 API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了 CPU 开销</li></ul><h3 id="场景" tabindex="-1">场景 <a class="header-anchor" href="#场景" aria-label="Permalink to &quot;场景&quot;">​</a></h3><h4 id="js动画" tabindex="-1">js动画 <a class="header-anchor" href="#js动画" aria-label="Permalink to &quot;js动画&quot;">​</a></h4><ul><li>requestAnimationFrame 本来就是为动画而生的，所以在处理 js 动画不在话下，与定时器的用法非常相似，下面是一个例子，点击元素时开始转动，再次点击转动速速增加。</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  var deg = 0;</span></span>
<span class="line"><span>  var id;</span></span>
<span class="line"><span>  var div = document.getElementById(&quot;div&quot;);</span></span>
<span class="line"><span>  div.addEventListener(&#39;click&#39;, function () {</span></span>
<span class="line"><span>      var self = this;</span></span>
<span class="line"><span>      requestAnimationFrame(function change() {</span></span>
<span class="line"><span>          self.style.transform = &#39;rotate(&#39; + (deg++) + &#39;deg)&#39;;</span></span>
<span class="line"><span>          id = requestAnimationFrame(change);</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>  document.getElementById(&#39;stop&#39;).onclick = function () {</span></span>
<span class="line"><span>      cancelAnimationFrame(id);</span></span>
<span class="line"><span>  };</span></span></code></pre></div><h4 id="大数据渲染" tabindex="-1">大数据渲染 <a class="header-anchor" href="#大数据渲染" aria-label="Permalink to &quot;大数据渲染&quot;">​</a></h4><ul><li>在大数据渲染过程中，比如表格的渲染，如果不进行一些性能策略处理，就会出现 UI 冻结现象，用户体验极差。有个场景，将后台返回的十万条记录插入到表格中，如果一次性在循环中生成 DOM 元素，会导致页面卡顿5s左右。这时候我们就可以用 requestAnimationFrame 进行分步渲染，确定最好的时间间隔，使得页面加载过程中很流畅。</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  var total = 100000;</span></span>
<span class="line"><span>  var size = 100;</span></span>
<span class="line"><span>  var count = total / size;</span></span>
<span class="line"><span>  var done = 0;</span></span>
<span class="line"><span>  var ul = document.getElementById(&#39;list&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function addItems() {</span></span>
<span class="line"><span>      var li = null;</span></span>
<span class="line"><span>      var fg = document.createDocumentFragment();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      for (var i = 0; i &lt; size; i++) {</span></span>
<span class="line"><span>          li = document.createElement(&#39;li&#39;);</span></span>
<span class="line"><span>          li.innerText = &#39;item &#39; + (done * size + i);</span></span>
<span class="line"><span>          fg.appendChild(li);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      ul.appendChild(fg);</span></span>
<span class="line"><span>      done++;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      if (done &lt; count) {</span></span>
<span class="line"><span>          requestAnimationFrame(addItems);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  requestAnimationFrame(addItems);</span></span></code></pre></div><h3 id="兼容性" tabindex="-1">兼容性 <a class="header-anchor" href="#兼容性" aria-label="Permalink to &quot;兼容性&quot;">​</a></h3><ul><li>firefox、chrome、ie10以上， requestAnimationFrame 的支持很好，但不兼容 IE9及以下浏览器，但是我们可以用定时器来做一下兼容，以下是兼容代码：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>(function () {</span></span>
<span class="line"><span>    var lastTime = 0;</span></span>
<span class="line"><span>    var vendors = [&#39;webkit&#39;, &#39;moz&#39;];</span></span>
<span class="line"><span>    for (var x = 0; x &lt; vendors.length &amp;&amp; !window.requestAnimationFrame; ++x) {</span></span>
<span class="line"><span>        window.requestAnimationFrame = window[vendors[x] + &#39;RequestAnimationFrame&#39;];</span></span>
<span class="line"><span>        window.cancelAnimationFrame =</span></span>
<span class="line"><span>            window[vendors[x] + &#39;CancelAnimationFrame&#39;] || window[vendors[x] + &#39;CancelRequestAnimationFrame&#39;];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (!window.requestAnimationFrame)</span></span>
<span class="line"><span>        window.requestAnimationFrame = function (callback) {</span></span>
<span class="line"><span>            /*调整时间，让一次动画等待和执行时间在最佳循环时间间隔内完成*/</span></span>
<span class="line"><span>            var currTime = new Date().getTime();</span></span>
<span class="line"><span>            var timeToCall = Math.max(0, 16 - (currTime - lastTime));</span></span>
<span class="line"><span>            var id = window.setTimeout(function () {</span></span>
<span class="line"><span>                    callback(currTime + timeToCall);</span></span>
<span class="line"><span>                },</span></span>
<span class="line"><span>                timeToCall);</span></span>
<span class="line"><span>            lastTime = currTime + timeToCall;</span></span>
<span class="line"><span>            return id;</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (!window.cancelAnimationFrame)</span></span>
<span class="line"><span>        window.cancelAnimationFrame = function (id) {</span></span>
<span class="line"><span>            clearTimeout(id);</span></span>
<span class="line"><span>        };</span></span>
<span class="line"><span>}());</span></span></code></pre></div><h3 id="知乎问答-任务时长超过一帧怎么处理" tabindex="-1">知乎问答：任务时长超过一帧怎么处理？ <a class="header-anchor" href="#知乎问答-任务时长超过一帧怎么处理" aria-label="Permalink to &quot;知乎问答：任务时长超过一帧怎么处理？&quot;">​</a></h3><ul><li>问题就是错的，任务耗时的后果是让一帧耗时变长，帧率变低，任务不会被跳过</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    &lt;!-- 这一帧耗时就会至少 1 秒钟 --&gt;</span></span>
<span class="line"><span>    document.addEventListener(&quot;click&quot;, function () {</span></span>
<span class="line"><span>        var now = Date.now();</span></span>
<span class="line"><span>        requestAnimationFrame(() =&gt; console.log(&quot;这一帧持续了&quot; + (Date.now() - now)));</span></span>
<span class="line"><span>        while (Date.now() &lt; now + 1000);</span></span>
<span class="line"><span>    });</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// JS动画</span></span>
<span class="line"><span>// var deg = 0;</span></span>
<span class="line"><span>// var id;</span></span>
<span class="line"><span>// var div = document.getElementById(&quot;box&quot;);</span></span>
<span class="line"><span>// div.addEventListener(&#39;click&#39;, function () {</span></span>
<span class="line"><span>//     var self = this;</span></span>
<span class="line"><span>//     requestAnimationFrame(function change() {</span></span>
<span class="line"><span>//         self.style.transform = &#39;rotate(&#39; + (deg++) + &#39;deg)&#39;;</span></span>
<span class="line"><span>//         id = requestAnimationFrame(change);</span></span>
<span class="line"><span>//     });</span></span>
<span class="line"><span>// });</span></span>
<span class="line"><span>// document.getElementById(&#39;stop&#39;).onclick = function () {</span></span>
<span class="line"><span>//     cancelAnimationFrame(id);</span></span>
<span class="line"><span>// };</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 大数据渲染</span></span>
<span class="line"><span>// var total = 100000;</span></span>
<span class="line"><span>// var size = 100;</span></span>
<span class="line"><span>// var count = total / size;</span></span>
<span class="line"><span>// var done = 0;</span></span>
<span class="line"><span>// var ul = document.getElementById(&#39;list&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// function addItems() {</span></span>
<span class="line"><span>//     var li = null;</span></span>
<span class="line"><span>//     var fg = document.createDocumentFragment();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//     for (var i = 0; i &lt; size; i++) {</span></span>
<span class="line"><span>//         li = document.createElement(&#39;li&#39;);</span></span>
<span class="line"><span>//         li.innerText = &#39;item &#39; + (done * size + i);</span></span>
<span class="line"><span>//         fg.appendChild(li);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//     ul.appendChild(fg);</span></span>
<span class="line"><span>//     done++;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//     if (done &lt; count) {</span></span>
<span class="line"><span>//         requestAnimationFrame(addItems);</span></span>
<span class="line"><span>//     }</span></span>
<span class="line"><span>// };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// requestAnimationFrame(addItems);</span></span></code></pre></div><h2 id="requestidlecallback" tabindex="-1">requestIdleCallback <a class="header-anchor" href="#requestidlecallback" aria-label="Permalink to &quot;requestIdleCallback&quot;">​</a></h2><ul><li>window.requestIdleCallback()方法插入一个函数，这个函数将在浏览器空闲时期被调用。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。</li><li>requestAnimationFrame的回调会在每一帧确定执行，属于高优先级任务，而requestIdleCallback的回调则不一定，属于低优先级任务。 我们所看到的网页，都是浏览器一帧一帧绘制出来的，通常认为FPS为60的时候是比较流畅的，而FPS为个位数的时候就属于用户可以感知到的卡顿了</li><li>一帧包含了用户的交互、js的执行、以及requestAnimationFrame的调用，布局计算以及页面的重绘等工作。 假如某一帧里面要执行的任务不多，在不到16ms（1000/60)的时间内就完成了上述任务的话，那么这一帧就会有一定的空闲时间，这段时间就恰好可以用来执行requestIdleCallback的回调</li><li>由于requestIdleCallback利用的是帧的空闲时间，所以就有可能出现浏览器一直处于繁忙状态，导致回调一直无法执行，这其实也并不是我们期望的结果（如上报丢失），那么这种情况我们就需要在调用requestIdleCallback的时候传入第二个配置参数timeout了</li><li>强烈建议不要在requestIdleCallback里面刻意执行DOM修改操作，从上面一帧的构成里面可以看到，requestIdleCallback回调的执行说明前面的工作（包括样式变更以及布局计算）都已完成。如果我们在callback里面做DOM修改的话，之前所做的布局计算都会失效，而且如果下一帧里有获取布局（如getBoundingClientRect、clientWidth）等操作的话，浏览器就不得不执行强制重排工作,这会极大的影响性能，另外由于修改dom操作的时间是不可预测的，因此很容易超出当前帧空闲时间的阈值，故而不推荐这么做。推荐的做法是在requestAnimationFrame里面做dom的修改，可以在requestIdleCallback里面构建Document Fragment，然后在下一帧的requestAnimationFrame里面应用Fragment。</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// requestIdleCallback 的用法</span></span>
<span class="line"><span>requestIdleCallback(myNonEssentialWork);  </span></span>
<span class="line"><span>function myNonEssentialWork (deadline) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // deadline.timeRemaining()可以获取到当前帧剩余时间</span></span>
<span class="line"><span>  while (deadline.timeRemaining() &gt; 0 &amp;&amp; tasks.length &gt; 0) {</span></span>
<span class="line"><span>    doWorkIfNeeded();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (tasks.length &gt; 0){</span></span>
<span class="line"><span>    requestIdleCallback(myNonEssentialWork);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 添加第二个配置参数 timeout</span></span>
<span class="line"><span>requestIdleCallback(myNonEssentialWork, { timeout: 2000 });</span></span>
<span class="line"><span>function myNonEssentialWork (deadline) {</span></span>
<span class="line"><span>  // 当回调函数是由于超时才得以执行的话，deadline.didTimeout为true</span></span>
<span class="line"><span>  while ((deadline.timeRemaining() &gt; 0 || deadline.didTimeout) &amp;&amp;</span></span>
<span class="line"><span>         tasks.length &gt; 0) {</span></span>
<span class="line"><span>       doWorkIfNeeded();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  if (tasks.length &gt; 0) {</span></span>
<span class="line"><span>    requestIdleCallback(myNonEssentialWork);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="domcontentloaded" tabindex="-1">DOMContentLoaded <a class="header-anchor" href="#domcontentloaded" aria-label="Permalink to &quot;DOMContentLoaded&quot;">​</a></h2><ul><li>当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载</li></ul><h3 id="浏览器渲染原理" tabindex="-1">浏览器渲染原理 <a class="header-anchor" href="#浏览器渲染原理" aria-label="Permalink to &quot;浏览器渲染原理&quot;">​</a></h3><ul><li>浏览器向服务器请求到了 HTML 文档后便开始解析，产物是 DOM（文档对象模型），到这里 HTML 文档就被加载和解析完成了。如果有 CSS 的会根据 CSS 生成 CSSOM（CSS 对象模型），然后再由 DOM 和 CSSOM 合并产生渲染树。有了渲染树，知道了所有节点的样式，下面便根据这些节点以及样式计算它们在浏览器中确切的大小和位置，这就是布局阶段。有了以上这些信息，下面就把节点绘制到浏览器上。(浏览器渲染.png)</li><li>JavaScript 可以阻塞 DOM 的生成，也就是说当浏览器在解析 HTML 文档时，如果遇到</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>  &lt;script type=&quot;text/javascript&quot;&gt;</span></span>
<span class="line"><span>  console.log(document.getElementById(&#39;ele&#39;)); // null</span></span>
<span class="line"><span>  &lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;div id=&quot;ele&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;script type=&quot;text/javascript&quot;&gt;</span></span>
<span class="line"><span>  console.log(document.getElementById(&#39;ele&#39;)); // &lt;div id=&quot;ele&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>  &lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span></code></pre></div><ul><li>另外，因为 JavaScript 可以查询任意对象的样式，所以意味着在 CSS 解析完成，也就是 CSSOM 生成之后，JavaScript 才可以被执行。</li><li>当文档中没有脚本时，浏览器解析完文档便能触发 DOMContentLoaded 事件；如果文档中包含脚本，则脚本会阻塞文档的解析，而脚本需要等 CSSOM 构建完成才能执行。在任何情况下，DOMContentLoaded 的触发不需要等待图片等其他资源加载完成。</li></ul><h4 id="异步脚本" tabindex="-1">异步脚本 <a class="header-anchor" href="#异步脚本" aria-label="Permalink to &quot;异步脚本&quot;">​</a></h4><ul><li>当 HTML 文档被解析时如果遇见（同步）脚本，则停止解析，先去加载脚本，然后执行，执行结束后继续解析 HTML 文档；</li><li>defer 脚本：当 HTML 文档被解析时如果遇见 defer 脚本，则在后台加载脚本，文档解析过程不中断，而等文档解析结束之后，defer 延迟脚本执行。另外，defer 脚本的执行顺序与定义时的位置有关 -- 异步加载 延迟执行</li><li>async 脚本：当 HTML 文档被解析时如果遇见 async 脚本，则在后台加载脚本，文档解析过程不中断。脚本加载完成后，文档停止解析，脚本执行，执行结束后文档继续解析 - 异步加载 异步执行</li><li>DOMContentLoaded 与 load：当 HTML 文档解析完成就会触发 DOMContentLoaded，而所有资源加载完成之后，load 事件才会被触发（所以图片资源的加载会阻塞load，当图片很大时会很明显）</li><li>(document).ready(function()//...代码...);其实监听的就是DOMContentLoaded事件，而(document).load(function() { // ...代码... }); 监听的是 load 事件。</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>document.addEventListener(&quot;DOMContentLoaded&quot;, function(event) {</span></span>
<span class="line"><span>  console.log(&quot;DOM fully loaded and parsed&quot;);</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for(var i=0; i&lt;1000000000; i++){</span></span>
<span class="line"><span>  // 这个同步脚本将延迟 DOM 的解析。</span></span>
<span class="line"><span>  // 所以 DOMContentLoaded 事件稍后将启动。</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="mutationobserver" tabindex="-1">MutationObserver <a class="header-anchor" href="#mutationobserver" aria-label="Permalink to &quot;MutationObserver&quot;">​</a></h2><ul><li>MutationObserver 接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分。</li><li>MutationObserver()构造函数，创建并返回一个新的 MutationObserver 它会在指定的 DOM 发生变化时被调用</li><li>方法： <ul><li>disconnect() 阻止 MutationObserver 实例继续接收的通知，直到再次调用其 observe() 方法，该观察者对象包含的回调函数都不会再被调用。</li><li>observe() 配置 MutationObserver 在 DOM 更改匹配给定选项时，通过其回调函数开始接收通知。</li><li>takeRecords() 从 MutationObserver 的通知队列中删除所有待处理的通知，并将它们返回到 MutationRecord 对象的新 Array 中。</li></ul></li></ul><h3 id="config-是一个具有布尔选项的对象-该布尔选项表示-将对哪些更改做出反应" tabindex="-1">config 是一个具有布尔选项的对象，该布尔选项表示“将对哪些更改做出反应”： <a class="header-anchor" href="#config-是一个具有布尔选项的对象-该布尔选项表示-将对哪些更改做出反应" aria-label="Permalink to &quot;config 是一个具有布尔选项的对象，该布尔选项表示“将对哪些更改做出反应”：&quot;">​</a></h3><ul><li>childList —— node 的直接子节点的更改，</li><li>subtree —— node 的所有后代的更改，</li><li>attributes —— node 的特性（attribute），</li><li>attributeFilter —— 特性名称数组，只观察选定的特性。</li><li>characterData —— 是否观察 node.data（文本内容）</li><li>其他几个选项： <ul><li>attributeOldValue —— 如果为 true，则将特性的旧值和新值都传递给回调（参见下文），否则只传新值（需要 attributes 选项），</li><li>characterDataOldValue —— 如果为 true，则将 node.data 的旧值和新值都传递给回调（参见下文），否则只传新值（需要 characterData 选项）。</li></ul></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> // 选择需要观察变动的节点</span></span>
<span class="line"><span> const targetNode = document.getElementById(&#39;box&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> // 观察器的配置（需要观察什么变动）</span></span>
<span class="line"><span> const config = { attributes: true, childList: true, subtree: true };</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> // 当观察到变动时执行的回调函数</span></span>
<span class="line"><span> const callback = function(mutationsList, observer) {</span></span>
<span class="line"><span>     // Use traditional &#39;for loops&#39; for IE 11</span></span>
<span class="line"><span>     console.log(mutationsList,&quot;mutationsList&quot;);</span></span>
<span class="line"><span>     for(let mutation of mutationsList) {</span></span>
<span class="line"><span>         if (mutation.type === &#39;childList&#39;) {</span></span>
<span class="line"><span>             console.log(&#39;A child node has been added or removed.&#39;);</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>         else if (mutation.type === &#39;attributes&#39;) {</span></span>
<span class="line"><span>             console.log(&#39;The &#39; + mutation.attributeName + &#39; attribute was modified.&#39;);</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>     }</span></span>
<span class="line"><span> };</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> // 创建一个观察器实例并传入回调函数</span></span>
<span class="line"><span> const observer = new MutationObserver(callback);</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> // 以上述配置开始观察目标节点</span></span>
<span class="line"><span> observer.observe(targetNode, config);</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> // 之后，可停止观察</span></span>
<span class="line"><span>//  observer.disconnect();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 修改dom</span></span>
<span class="line"><span>function addDom(){</span></span>
<span class="line"><span>    var span = document.createElement(&quot;span&quot;);</span></span>
<span class="line"><span>    span.innerHTML = &quot;随便写点&quot;;</span></span>
<span class="line"><span>    targetNode.appendChild(span);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="web-workers-api" tabindex="-1">Web Workers API <a class="header-anchor" href="#web-workers-api" aria-label="Permalink to &quot;Web Workers API&quot;">​</a></h1><ul><li>HTML5新增内容 与JS的单线程(主线程、子线程)、EventLoop等内容相关</li></ul><h2 id="js的单线程" tabindex="-1">JS的单线程 <a class="header-anchor" href="#js的单线程" aria-label="Permalink to &quot;JS的单线程&quot;">​</a></h2><ul><li>JS的运行是单线程的</li><li>浏览器可以有多个进程 一般每个tab页对应一个进程 每个进程有多个线程 包括GUI渲染线程、JS引擎线程、事件触发线程、定时器触发线程、http请求线程等</li><li>HTML5中新增了子线程 可以使用 Web Workers API 开启一个子线程</li><li>子线程不阻塞主线程代码运行</li><li>子线程没有DOM操作权限</li></ul><h2 id="eventloop" tabindex="-1">EventLoop <a class="header-anchor" href="#eventloop" aria-label="Permalink to &quot;EventLoop&quot;">​</a></h2><ul><li>JS的线程运行时，会开启一个主线程的 执行栈 和 一个 任务队列</li><li>所有宏任务都放到执行栈中，所有微任务都会放到任务队列中</li><li>JS的微任务包括：setTimeout定时器、异步I/O操作、Ajax请求、Promise、DOM操作（DOM事件）等</li><li>微任务优先级高于宏任务</li><li>每次事件循环，初始化时都会把所有微任务宏任务分别放入执行栈和任务队列中，然后先执行执行栈中的宏任务</li><li>执行栈中的宏任务执行完毕后，会把任务队列中的微任务放到执行栈中执行(涉及到计算定时器时间 --- 所以定时器是在宏任务第一次执行完毕后才会计算时间并执行)，此时任务队列已空</li><li>执行栈中的微任务在执行时，如果有新的微任务，则会继续把这些微任务放到任务队列中，等待下一次事件循环时执行</li><li>依次反复执行任务队列中的任务，称为事件循环Event Loop</li></ul><h2 id="worker的使用方法" tabindex="-1">Worker的使用方法 <a class="header-anchor" href="#worker的使用方法" aria-label="Permalink to &quot;Worker的使用方法&quot;">​</a></h2><h2 id="worker的使用场景" tabindex="-1">Worker的使用场景 <a class="header-anchor" href="#worker的使用场景" aria-label="Permalink to &quot;Worker的使用场景&quot;">​</a></h2><ul><li>使用工作线程做后台数值（算法）计算</li><li>使用共享线程处理多用户并发连接</li><li>HTML5 线程代理</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 主线程业务代码</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 定义一个子线程实例</span></span>
<span class="line"><span>var worker = new Worker(&quot;WebWorkersAPI_02.js&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let type = Object.prototype.toString.call(worker); // &quot;[object Worker]&quot;  数据类型位Object class为 Worcker</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 向子线程发送数据 </span></span>
<span class="line"><span>worker.postMessage([</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    name:&#39;斩风&#39;,</span></span>
<span class="line"><span>    id: 1</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    name:&#39;诛仙&#39;,</span></span>
<span class="line"><span>    id: 2</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 接收子线程传回来的数据</span></span>
<span class="line"><span>worker.onmessage = function (e) {</span></span>
<span class="line"><span>    console.log(e.data, &#39;01 message&#39;);</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 共享线程</span></span>
<span class="line"><span>// var share_worker = new SharedWorker(&quot;WebWorkersAPI_02.js&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// share_worker.port.postMessage(&quot;message_share&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// share_worker.port.onmessage = function(e){</span></span>
<span class="line"><span>//   console.log(e, &#39;onmessage_share&#39;);</span></span>
<span class="line"><span>// }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 子线程业务代码</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let main_data;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 获取主线程传过来的数据</span></span>
<span class="line"><span>onmessage = function (e) {</span></span>
<span class="line"><span>  console.log(e.data,&#39;02 onmessage&#39;);</span></span>
<span class="line"><span>  main_data = e.data;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 对主线程数据进行处理</span></span>
<span class="line"><span>  handleData(main_data);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //发送给主线程</span></span>
<span class="line"><span>  postMessage(main_data)</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>function handleData(data){ //处理数据 添加书名号</span></span>
<span class="line"><span>  data.map(item=&gt;{</span></span>
<span class="line"><span>    item.name=\`《\${item.name}》\`</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="indexeddb" tabindex="-1">IndexedDB <a class="header-anchor" href="#indexeddb" aria-label="Permalink to &quot;IndexedDB&quot;">​</a></h2><p>参考(<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API</a>)</p><ul><li>IndexedDB 是一种底层API，用于在客户端存储大量的结构化数据（也包括文件/二进制大型对象(blobs)）。（在 Web Worker 中可用）</li><li>IndexedDB API是强大的，但对于简单的情况可能看起来太复杂。如果想使用一个简单的API，可以使用 localForage、dexie.js、PouchDB、idb、idb-keyval、JsStore 或者 lovefield 等库。</li><li>使用 IndexedDB 指定的操作是异步的。同步API已从规范中移除，但开发者扔可重新引入。</li></ul><h3 id="基本概念" tabindex="-1">基本概念 <a class="header-anchor" href="#基本概念" aria-label="Permalink to &quot;基本概念&quot;">​</a></h3><ul><li>IndexedDB API 下的接口 <ul><li>数据库：IDBDatabase 对象</li><li>对象仓库：IDBObjectStore 对象</li><li>索引： IDBIndex 对象</li><li>事务： IDBTransaction 对象</li><li>操作请求：IDBRequest 对象</li><li>指针： IDBCursor 对象</li><li>主键集合：IDBKeyRange 对象</li></ul></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/*IndexDB 学习 */</span></span>
<span class="line"><span>// 打开我们的数据库</span></span>
<span class="line"><span>//  indexedDB.open 第二个参数 version 代表数据库版本 默认是 1; 报错 VER_ERR 时，表明存储在磁盘上的数据库版本高于你试图打开的版本</span></span>
<span class="line"><span>var request = window.indexedDB.open(&quot;MyTestDatabase&quot;, 2); // IDBOpenDBRequest</span></span>
<span class="line"><span>// Object.prototype.toString.call(request);</span><span> // &#39;[object IDBOpenDBRequest]&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var db;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>request.onerror = function (event) {</span></span>
<span class="line"><span>  // Do someting</span></span>
<span class="line"><span>  alert(&quot;Why didn&#39;t you allow my web app to use IndexedDB?!&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>request.onsuccess = function (event) {</span></span>
<span class="line"><span>  // Do someting</span></span>
<span class="line"><span>  db = event.target.result; // IDBDatabase</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* 错误事件遵循冒泡机制 */</span></span>
<span class="line"><span>  db.onerror = function (event) {</span></span>
<span class="line"><span>    alert(&quot;Database error: &quot; + event.target.errorCode);</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>request.onupgradeneeded = function (event) {</span></span>
<span class="line"><span>  // 保存 IDBDatabase 接口</span></span>
<span class="line"><span>  var db = event.target.result;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 为该数据库创建一个对象仓库</span></span>
<span class="line"><span>  var objectStore;</span></span>
<span class="line"><span>  if (!db.objectStoreNames.contains(&#39;person&#39;)) {</span></span>
<span class="line"><span>    // 新建一个 person 表，主键是 id,</span></span>
<span class="line"><span>    objectStore = db.createObjectStore(&quot;person&quot;, {</span></span>
<span class="line"><span>      keyPath: &quot;id&quot;,</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    // 新建一个 person 表, IndexedDB自动生成主键，使用一个递增的整数 作为主键属性</span></span>
<span class="line"><span>    objectStore = db.createObjectStore(&quot;person&quot;, {</span></span>
<span class="line"><span>      autoIncrement: true</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    // createIndex 的三个参数分别为 索引名称、索引所在的属性、配置对象(unique说明该属性是否可以包含重复的值)</span></span>
<span class="line"><span>    objectStore.createIndex(&#39;name&#39;, &#39;name&#39;, {</span></span>
<span class="line"><span>      unique: false</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    objectStore.createIndex(&#39;email&#39;, &#39;email&#39;, {</span></span>
<span class="line"><span>      unique: true</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    var obj = {</span></span>
<span class="line"><span>      id: 1,</span></span>
<span class="line"><span>      name: &#39;张三&#39;,</span></span>
<span class="line"><span>      email: &#39;zhangsan@example.com&#39;</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>    add(db, obj);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 新增数据</span></span>
<span class="line"><span>function add (db, obj = {}){</span></span>
<span class="line"><span>  // db.transaction 是新建一个事务,新建事务时必须制定表格名称和操作模式( 只读 或 读写)</span></span>
<span class="line"><span>  // 通过IDBTransaction.objectStore(name) 方法，拿到IDBObjectStore 对象,再通过表格对象的 add()方法，向表格写入一条记录</span></span>
<span class="line"><span>  var request = db.transaction([&#39;person&#39;, &#39;readwrite&#39;])</span></span>
<span class="line"><span>    .objectStore(&#39;person&#39;)</span></span>
<span class="line"><span>    .add(obj);</span></span>
<span class="line"><span>  request.onsuccess = function (event){</span></span>
<span class="line"><span>    console.log(&#39;数据写入成功&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  request.onerror = function (event){</span></span>
<span class="line"><span>    console.log(&#39;事务失败&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 读取数据</span></span>
<span class="line"><span>function read (db, index){</span></span>
<span class="line"><span>  var transaction = db.transaction([&#39;person&#39;]);</span></span>
<span class="line"><span>  var objectStore = transaction.objectStore(&#39;person&#39;);</span></span>
<span class="line"><span>  // objectStore.get() 方法用于读取数据,参数 index 是主键的值</span></span>
<span class="line"><span>  var request = objectStore.get(index);</span></span>
<span class="line"><span>  request.onerror = function (event){</span></span>
<span class="line"><span>    console.log(&#39;读取数据失败&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  request.onsuccess = function (event){</span></span>
<span class="line"><span>    if(request.result){</span></span>
<span class="line"><span>      console.log(&#39;Name&#39; + request.result.name);</span></span>
<span class="line"><span>      console.log(&#39;Age&#39; + request.result.age);</span></span>
<span class="line"><span>      console.log(&#39;email&#39; + request.result.email);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      console.log(&#39;未获得数据记录&#39;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 遍历数据</span></span>
<span class="line"><span>function readAll(db){</span></span>
<span class="line"><span>  var objectStore = db.transaction(&#39;person&#39;).objectStore(&#39;person&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 遍历数据表格的所有记录，要使用指针对象 IDBCursor</span></span>
<span class="line"><span>  objectStore.openCursor().onsuccess = function (event){</span></span>
<span class="line"><span>    var cursor = event.target.result;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if(cursor){</span></span>
<span class="line"><span>      console.log(&#39;ID:&#39; + cursor.key);</span></span>
<span class="line"><span>      console.log(&#39;Name:&#39; + cursor.name);</span></span>
<span class="line"><span>      console.log(&#39;Age:&#39; + cursor.age);</span></span>
<span class="line"><span>      console.log(&#39;Email:&#39; + cursor.email);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      console.log(&quot;没有更多数据了!&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 更新数据</span></span>
<span class="line"><span>function update(db, obj){</span></span>
<span class="line"><span>  // obj = {</span></span>
<span class="line"><span>  //   id: 1,</span></span>
<span class="line"><span>  //   name: &quot;李四&quot;,</span></span>
<span class="line"><span>  //   email: &quot;lisi@example.com&quot;</span></span>
<span class="line"><span>  // };</span></span>
<span class="line"><span>  // 更新数据要使用 IDBObject.put() 方法 put() 方法自动更新了主键为 1 的数据记录</span></span>
<span class="line"><span>  var request = db.transaction([&#39;person&#39;], &#39;readwrite&#39;)</span></span>
<span class="line"><span>    .objectStore(&#39;person&#39;)</span></span>
<span class="line"><span>    .put(obj);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  request.onsuccess = function (event){</span></span>
<span class="line"><span>    console.log(&#39;数据更新成功&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  request.onerror = function (event){</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 删除数据</span></span>
<span class="line"><span>function remove (db, index){</span></span>
<span class="line"><span>  // IDBObjectStore.delete() 方法用于删除记录</span></span>
<span class="line"><span>  var request = db.transaction([&#39;person&#39;], &#39;readwrite&#39;)</span></span>
<span class="line"><span>    .objectStore(&#39;person&#39;)</span></span>
<span class="line"><span>    .delete(index);</span></span>
<span class="line"><span>  request.onsuccess = function (event){</span></span>
<span class="line"><span>    console.log(&quot;数据删除成功&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 使用索引</span></span>
<span class="line"><span>function getInfoByIndexName (db, indexName, tableName, name){</span></span>
<span class="line"><span>  // indexName = &quot;name&quot;;</span></span>
<span class="line"><span>  // tableName = &quot;person&quot;;</span></span>
<span class="line"><span>  // name = &quot;李四&quot;;</span></span>
<span class="line"><span>  var transaction = db.transaction([tableName], &#39;readonly&#39;);</span></span>
<span class="line"><span>  var store = transaction.objectStore(tableName);</span></span>
<span class="line"><span>  var index = store.index(indexName);</span></span>
<span class="line"><span>  var request = index.get(name);</span></span>
<span class="line"><span>  request.onsuccess = function (event){</span></span>
<span class="line"><span>    var result = e.target.result;</span></span>
<span class="line"><span>    if(result){</span></span>
<span class="line"><span>      // doSomething</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      // doSomething</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,68)]))}const b=s(l,[["render",i]]);export{m as __pageData,b as default};
