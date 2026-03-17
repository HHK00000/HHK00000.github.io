import{_ as n,c as s,o as p,ae as e}from"./chunks/framework.Dh1jimFm.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"document/性能监控/埋点和性能监控.md","filePath":"document/性能监控/埋点和性能监控.md"}'),l={name:"document/性能监控/埋点和性能监控.md"};function i(t,a,c,o,r,d){return p(),s("div",null,a[0]||(a[0]=[e(`<h2 id="埋点和性能监控" tabindex="-1">埋点和性能监控 <a class="header-anchor" href="#埋点和性能监控" aria-label="Permalink to &quot;埋点和性能监控&quot;">​</a></h2><h3 id="埋点" tabindex="-1">埋点 <a class="header-anchor" href="#埋点" aria-label="Permalink to &quot;埋点&quot;">​</a></h3><ul><li>埋点：埋点分析，是网站分析的一种常用的数据采集方法</li><li>埋点的目的：获取用户信息，根据用户喜好，定制不同内容、决定产品迭代方向等</li></ul><h3 id="性能监控" tabindex="-1">性能监控 <a class="header-anchor" href="#性能监控" aria-label="Permalink to &quot;性能监控&quot;">​</a></h3><ul><li>性能监控主要注意的几点： <ul><li>白屏时长（从请求到到达渲染条件，出现ui骨架的时间）</li><li>重要页面的http请求时间</li><li>重要页面的渲染时间</li><li>首屏加载时长（页面所有动态内容加载完成的时间，包括ajax数据后渲染到页面的时间）</li></ul></li><li>数据监控就是能拿到用户的行为，需要注意的几点： <ul><li>PV访问量（Page View）</li><li>UV访问量（Unique Visitor）</li><li>记录操作系统和浏览器</li><li>记录用户在页面的停留时间</li><li>进入当前页面的来源页面（from 也就是哪里来的转化）</li></ul></li></ul><h3 id="几种埋点方式" tabindex="-1">几种埋点方式 <a class="header-anchor" href="#几种埋点方式" aria-label="Permalink to &quot;几种埋点方式&quot;">​</a></h3><h4 id="手动埋点-代码埋点" tabindex="-1">手动埋点（代码埋点） <a class="header-anchor" href="#手动埋点-代码埋点" aria-label="Permalink to &quot;手动埋点（代码埋点）&quot;">​</a></h4><ul><li>域名 document.domainURL document.URL</li><li>页面标题 document.title</li><li>分辨率 window.screen.height &amp; window.screen.width</li><li>颜色深度 window.screen.colorDepth</li><li>Referrer document.referrer</li><li>客户端语言 navigation.language</li><li>Performance:DNS解析时间、TCP建立连接时间、首屏白屏时间、DOM渲染完成时间、页面load时间等<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  //拿到Performance并且初始化一些参数</span></span>
<span class="line"><span>  let timing = performance.timing,</span></span>
<span class="line"><span>      start = timing.navigationStart,</span></span>
<span class="line"><span>      dnsTime = 0,</span></span>
<span class="line"><span>      tcpTime = 0,</span></span>
<span class="line"><span>      firstPaintTime = 0,</span></span>
<span class="line"><span>      domRenderTime = 0,</span></span>
<span class="line"><span>      loadTime = 0;</span></span>
<span class="line"><span>  //根据提供的api和属性，拿到对应的时间</span></span>
<span class="line"><span>  dnsTime = timing.domainLookupEnd - timing.domainLookupStart;</span></span>
<span class="line"><span>  tcpTime = timing.connectEnd - timing.connectStart;</span></span>
<span class="line"><span>  firstPaintTime = timing.responseStart - start;</span></span>
<span class="line"><span>  domRenderTime = timing.domContentLoadedEventEnd - start;</span></span>
<span class="line"><span>  loadTime = timing.loadEventEnd - start;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  console.log(&#39;DNS解析时间:&#39;, dnsTime, </span></span>
<span class="line"><span>              &#39;\\nTCP建立时间:&#39;, tcpTime, </span></span>
<span class="line"><span>              &#39;\\n首屏时间:&#39;, firstPaintTime,</span></span>
<span class="line"><span>              &#39;\\ndom渲染完成时间:&#39;, domRenderTime, </span></span>
<span class="line"><span>              &#39;\\n页面onload时间:&#39;, loadTime);</span></span></code></pre></div></li><li>拿到数据以后我们可以在提交，或者通过图片的方式去提交埋点内容<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  // 页面加载时发送埋点请求</span></span>
<span class="line"><span>  $(document).ready(function(){</span></span>
<span class="line"><span>  // ... 这里存在一些业务逻辑</span></span>
<span class="line"><span>  sendRequest(params);</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>  // 按钮点击时发送埋点请求</span></span>
<span class="line"><span>  $(&#39;button&#39;).click(function(){</span></span>
<span class="line"><span>    //  这里存在一些业务逻辑</span></span>
<span class="line"><span>    sendRequest(params);</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>    // 通过伪装成 Image 对象，传递给后端，防止跨域</span></span>
<span class="line"><span>      let img = new Image(1, 1);</span></span>
<span class="line"><span>      let src = \`http://aaaaa/api/test.jpg?args=\${encodeURIComponent(args)}\`;</span></span>
<span class="line"><span>      img.src = src;</span></span>
<span class="line"><span>  //css实现的埋点</span></span>
<span class="line"><span>      .link:active::after{</span></span>
<span class="line"><span>      content: url(&quot;http://www.example.com?action=yourdata&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  &lt;a class=&quot;link&quot;&gt;点击我，会发埋点数据&lt;/a&gt;</span></span>
<span class="line"><span>  //data自定义属性，rangjs去拿到属性绑定事件，实现埋点</span></span>
<span class="line"><span>  //&lt;button data-mydata=&quot;{key:&#39;uber_comt_share_ck&#39;, act: &#39;click&#39;,msg:{}}&quot;&gt;打车&lt;/button&gt;</span></span></code></pre></div></li><li>这种埋点方式虽然能精准的监控到用户的行为，和网页性能等数据，但是非常繁琐，需要大量的工作量，当然这部分工作也有人帮我们做了，比如像友盟、百度统计等给我们其实提供了服务。我们可以按照他们的流程使用手动埋点</li></ul><h4 id="可视化埋点" tabindex="-1">可视化埋点 <a class="header-anchor" href="#可视化埋点" aria-label="Permalink to &quot;可视化埋点&quot;">​</a></h4><ul><li>这种埋点方案，又叫无痕埋点，解放了前端手动操作的工作量，其实本质就是用系统去插入本来需要手动插入的埋点，这种埋点方式由于自带技术壁垒，所以开发人员基本基本不用考虑，花钱即可 ，比较靠谱的服务商 国外的Mixpanel，国内较早支持可视化埋点的有TalkingData、诸葛 IO，腾讯 MTA 等</li></ul><h4 id="无埋点" tabindex="-1">无埋点 <a class="header-anchor" href="#无埋点" aria-label="Permalink to &quot;无埋点&quot;">​</a></h4><ul><li>无埋点并不是没有任何埋点，所谓无只是不需要工程师在业务代码里面插入侵入式的代码。只需要简单的加载了一段定义好的SDK代码，技术门槛更低，使用与部署也简单，避免了需求变更，埋点错误导致的重新埋点。这也是大多网站的选择，因为实在太简单了 我们先来看看百度埋点长什么样子：<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>   &lt;script&gt;</span></span>
<span class="line"><span>    var _hmt = _hmt || []</span></span>
<span class="line"><span>    ;(function() {</span></span>
<span class="line"><span>      var hm = document.createElement(&#39;script&#39;)</span></span>
<span class="line"><span>      hm.src =</span></span>
<span class="line"><span>        &#39;https://hm.baidu.com/hm.js?&lt;%= htmlWebpackPlugin.options.baiduCode %&gt;&#39;</span></span>
<span class="line"><span>      var s = document.getElementsByTagName(&#39;script&#39;)[0]</span></span>
<span class="line"><span>      s.parentNode.insertBefore(hm, s)</span></span>
<span class="line"><span>    })()</span></span>
<span class="line"><span>  &lt;/script&gt;</span></span></code></pre></div></li><li>上图一段代码插入我们的html中,便能清晰的看到统计数据，省时省力，就是不省钱！但是缺点就是由于是自动完成，无法针对特定场景拿到数据，由后端来过滤和计算出有用的数据。导致服务器压力山大</li></ul>`,12)]))}const h=n(l,[["render",i]]);export{u as __pageData,h as default};
