## 埋点和性能监控
### 埋点
+ 埋点：埋点分析，是网站分析的一种常用的数据采集方法
+ 埋点的目的：获取用户信息，根据用户喜好，定制不同内容、决定产品迭代方向等
### 性能监控
+ 性能监控主要注意的几点：
  + 白屏时长（从请求到到达渲染条件，出现ui骨架的时间）
  + 重要页面的http请求时间
  + 重要页面的渲染时间
  + 首屏加载时长（页面所有动态内容加载完成的时间，包括ajax数据后渲染到页面的时间）
+ 数据监控就是能拿到用户的行为，需要注意的几点：
  + PV访问量（Page View）
  + UV访问量（Unique Visitor）
  + 记录操作系统和浏览器
  + 记录用户在页面的停留时间
  + 进入当前页面的来源页面（from 也就是哪里来的转化）
### 几种埋点方式
#### 手动埋点（代码埋点）
+ 域名 document.domainURL document.URL
+ 页面标题 document.title
+ 分辨率 window.screen.height & window.screen.width
+ 颜色深度 window.screen.colorDepth
+ Referrer document.referrer
+ 客户端语言 navigation.language
+ Performance:DNS解析时间、TCP建立连接时间、首屏白屏时间、DOM渲染完成时间、页面load时间等
  ```
    //拿到Performance并且初始化一些参数
    let timing = performance.timing,
        start = timing.navigationStart,
        dnsTime = 0,
        tcpTime = 0,
        firstPaintTime = 0,
        domRenderTime = 0,
        loadTime = 0;
    //根据提供的api和属性，拿到对应的时间
    dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
    tcpTime = timing.connectEnd - timing.connectStart;
    firstPaintTime = timing.responseStart - start;
    domRenderTime = timing.domContentLoadedEventEnd - start;
    loadTime = timing.loadEventEnd - start;

    console.log('DNS解析时间:', dnsTime, 
                '\nTCP建立时间:', tcpTime, 
                '\n首屏时间:', firstPaintTime,
                '\ndom渲染完成时间:', domRenderTime, 
                '\n页面onload时间:', loadTime);
  ```
+ 拿到数据以后我们可以在提交，或者通过图片的方式去提交埋点内容
  ```
    // 页面加载时发送埋点请求
    $(document).ready(function(){
    // ... 这里存在一些业务逻辑
    sendRequest(params);
    });
    // 按钮点击时发送埋点请求
    $('button').click(function(){
      //  这里存在一些业务逻辑
      sendRequest(params);
    });
      // 通过伪装成 Image 对象，传递给后端，防止跨域
        let img = new Image(1, 1);
        let src = `http://aaaaa/api/test.jpg?args=${encodeURIComponent(args)}`;
        img.src = src;
    //css实现的埋点
        .link:active::after{
        content: url("http://www.example.com?action=yourdata");
    }
    <a class="link">点击我，会发埋点数据</a>
    //data自定义属性，rangjs去拿到属性绑定事件，实现埋点
    //<button data-mydata="{key:'uber_comt_share_ck', act: 'click',msg:{}}">打车</button>
  ```
+ 这种埋点方式虽然能精准的监控到用户的行为，和网页性能等数据，但是非常繁琐，需要大量的工作量，当然这部分工作也有人帮我们做了，比如像友盟、百度统计等给我们其实提供了服务。我们可以按照他们的流程使用手动埋点
#### 可视化埋点
+ 这种埋点方案，又叫无痕埋点，解放了前端手动操作的工作量，其实本质就是用系统去插入本来需要手动插入的埋点，这种埋点方式由于自带技术壁垒，所以开发人员基本基本不用考虑，花钱即可 ，比较靠谱的服务商 国外的Mixpanel，国内较早支持可视化埋点的有TalkingData、诸葛 IO，腾讯 MTA 等
#### 无埋点
+ 无埋点并不是没有任何埋点，所谓无只是不需要工程师在业务代码里面插入侵入式的代码。只需要简单的加载了一段定义好的SDK代码，技术门槛更低，使用与部署也简单，避免了需求变更，埋点错误导致的重新埋点。这也是大多网站的选择，因为实在太简单了
我们先来看看百度埋点长什么样子：
  ```
     <script>
      var _hmt = _hmt || []
      ;(function() {
        var hm = document.createElement('script')
        hm.src =
          'https://hm.baidu.com/hm.js?<%= htmlWebpackPlugin.options.baiduCode %>'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
      })()
    </script>
  ```
+ 上图一段代码插入我们的html中,便能清晰的看到统计数据，省时省力，就是不省钱！但是缺点就是由于是自动完成，无法针对特定场景拿到数据，由后端来过滤和计算出有用的数据。导致服务器压力山大


