import{_ as n,c as a,o as p,ae as e}from"./chunks/framework.CLNW5JS9.js";const d=JSON.parse('{"title":"事件循环","description":"","frontmatter":{},"headers":[],"relativePath":"document/eventloop.md","filePath":"document/eventloop.md"}'),l={name:"document/eventloop.md"};function o(i,s,t,c,r,m){return p(),a("div",null,s[0]||(s[0]=[e(`<h1 id="事件循环" tabindex="-1">事件循环 <a class="header-anchor" href="#事件循环" aria-label="Permalink to &quot;事件循环&quot;">​</a></h1><p>在JS引擎中，我们可以按性质把任务分为两类，macrotask（宏任务）和 microtask（微任务）。</p><h2 id="宏任务与微任务" tabindex="-1">宏任务与微任务 <a class="header-anchor" href="#宏任务与微任务" aria-label="Permalink to &quot;宏任务与微任务&quot;">​</a></h2><p>宏任务 macrotask（按优先级顺序排列）: script(你的全部JS代码，“同步代码”）, setTimeout, setInterval, setImmediate, I/O,UI rendering 微任务 microtask（按优先级顺序排列）:process.nextTick,Promises（这里指浏览器原生实现的 Promise.then）, Object.observe, MutationObserver</p><h2 id="事件循环-1" tabindex="-1">事件循环 <a class="header-anchor" href="#事件循环-1" aria-label="Permalink to &quot;事件循环&quot;">​</a></h2><p>1.JS引擎首先执行主JS代码，并将产生的微任务、宏任务分别存入各自队列； 2.然后先开始清空微任务队列中的任务及新产生的微任务，直至完全清空微任务队列； 3.微任务队列清空后，先从宏任务队列中取出第一个任务，执行完毕后，将微任务队列中的所有任务取出，按顺序全部执行；然后再从宏任务队列中取下一个，执行完毕后，再次将微任务队列中的全部清空； 4.循环往复，直到两个任务队列中的任务全部清空。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 异步代码执行顺序</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(&#39;script start&#39;); // 1</span></span>
<span class="line"><span>setTimeout(function() {</span></span>
<span class="line"><span>  console.log(&#39;h&#39;); // 5</span></span>
<span class="line"><span>  Promise.resolve().then(()=&gt;{</span></span>
<span class="line"><span>    console.log(&#39;h1&#39;) // 6</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  Promise.resolve().then(()=&gt;{</span></span>
<span class="line"><span>    console.log(&#39;h2&#39;) // 7</span></span>
<span class="line"><span>    Promise.resolve().then(()=&gt;{</span></span>
<span class="line"><span>      console.log(&#39;h21&#39;) // 8</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  Promise.resolve().then(()=&gt;{</span></span>
<span class="line"><span>    console.log(&#39;h3&#39;) // 7</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>}, 0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>new Promise(function(resolve) {</span></span>
<span class="line"><span>  console.log(&#39;promise1&#39;);  // 2</span></span>
<span class="line"><span>  resolve();</span></span>
<span class="line"><span>}).then(function() {</span></span>
<span class="line"><span>  console.log(&#39;promise2&#39;); // 4</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>setTimeout(function() {</span></span>
<span class="line"><span>  console.log(&#39;m&#39;); // 9</span></span>
<span class="line"><span>  Promise.resolve().then(()=&gt;{</span></span>
<span class="line"><span>    console.log(&#39;m1&#39;) // 10</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  Promise.resolve().then(()=&gt;{</span></span>
<span class="line"><span>    console.log(&#39;m2&#39;) // 11</span></span>
<span class="line"><span>    Promise.resolve().then(()=&gt;{</span></span>
<span class="line"><span>      console.log(&#39;m21&#39;) // 13</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  Promise.resolve().then(()=&gt;{</span></span>
<span class="line"><span>    console.log(&#39;m3&#39;) // 12</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>}, 0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(&#39;script end&#39;); // 3</span></span></code></pre></div>`,7)]))}const g=n(l,[["render",o]]);export{d as __pageData,g as default};
