# XHR

## XHR请求的五个步骤
- 1.创建XMLHttpRequest对象;
- 2.设置回调函数;
- 3.配置请求信息，(如open,get方法)，使用open方法与服务器建立链接;
- 4.向服务器发送数据;
- 5.在回调函数中针对不同的响应状态进行处理;

## XHR请求成功和失败判断
XHR的 success 和 error 方法根据响应状态码来触发
当XMLHttpRequest.status为200时，表示响应成功，此时触发 success()，其它状态码触发error()
```
【readyState】：
0 － （未初始化）还没有调用send()方法
1 － （载入）已调用send()方法，正在发送请求
2 － （载入完成）send()方法执行完成，已经接收到全部响应内容
3 － （交互）正在解析响应内容
4 － （完成）响应内容解析完成，可以在客户端调用了
```

## XHR的优点
- 不重新加载页面的情况下更新网页
- 在页面已加载后从服务器请求/接收数据
- 向后台向服务器发送数据。

## XHR的缺点
- 使用起来也比较繁琐，需要设置很多值。
- 早期的IE浏览器有自己的实现，这样需要写兼容代码。

## 完整的XHR实例

```
if (window.XMLHttpRequest) { // model browser
  xhr = new XMLHttpRequest()
} else if (window.ActiveXObject) { // IE 6 and older
  xhr = new ActiveXObject('Microsoft.XMLHTTP')
}
xhr.open('POST', url, true)
xhr.send(data)
xhr.onreadystatechange = function () {
  try {
    // 处理响应
    if (xhr.readyState === 4) {
      // 请求正常
      if (xhr.status === 200) {
        // 处理响应
      } else {
        // 请求遇到一些问题，处理异常
      }
    } else {
      // 还处于未准备好的状态
    }
  } catch (e) {
    // 通信错误的事件中（例如服务器宕机）
    alert('Caught Exception: ' + e.description)
  }
}
// 设置请求头
xhr.setRequestHeader("Content-type", "applicationx-www-form-urlencoded");
// 异常处理
xhr.onerror = function() {
  console.log('Network request failed')
}
// 跨域携带cookie
xhr.withCredentials = true;
```
# jquery ajax

jquery ajax就是对XMLHttpRequest的封装

```
$.ajax({
  type: 'POST',
  url: url, 
  data: data,
  dataType: dataType,
  success: function () {},
  error: function () {}
})

```
## 优点

- 对原生XHR的封装，做了兼容处理，简化了使用。
- 增加了对JSONP的支持，可以简单处理部分跨域。

## 缺点

- 如果有多个请求，并且有依赖关系的话，容易形成回调地狱。
- 本身是针对MVC的编程，不符合现在前端MVVM的浪潮。
- ajax是jQuery中的一个方法。如果只是要使用ajax却要引入整个jQuery非常的不合理。
# fetch

Fetch API提供了一个 JavaScript 接口，用于访问和操作HTTP管道的部分，例如请求和响应。它还提供了一个全局 fetch() 方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。

fetch 是底层API，代替XHR，可以轻松处理各种格式，非文本化格式。可以很容易的被其他技术使用，例如Service Workers。但是想要很好的使用fetch，需要做一些封装处理。

```
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
```

## 优点

- 跨域的支持:在配置中，添加mode： 'no-cors'就可以跨域了
```
fetch('/users.json', {
    method: 'post', 
    mode: 'no-cors',
    data: {}
}).then(function() { /* handle response */ });
``` 

## 缺点
- fetch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理
- fetch默认不会带cookie，需要添加配置项。
- fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费。
- fetch没有办法原生监测请求的进度，而XHR可以。

当接收到一个代表错误的 HTTP 状态码时，从 fetch()返回的 Promise 不会被标记为 reject， 即使该 HTTP 响应的状态码是 404或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
fetch() 不会接受跨域 cookies；你也不能使用fetch() 建立起跨域会话。其他网站的Set-Cookie头部字段将会被无视。
fetch 不会发送 cookies。除非你使用了credentials的 初始化选项。（自2017年8月25日以后，默认的credentials策略变更为same-origin。Firefox也在61.0b13版本中，对默认值进行修改）
# axios
axios是一个基于promise的HTTP库，可以用在浏览器和 node.js 中。它本质也是对原生XMLHttpRequest的封装，只不过它是Promise的实现版本，符合最新的ES规范。
```
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(),getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));
```

## 优点
- 从浏览器中创建XMLHttpRequests
- 可在 node.js 中使用
- 支持 Promise API
- 提供了并发请求的接口
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 XSRF

## 缺点
只支持现代浏览器
# 跨域及解决方案
https://juejin.cn/post/6844904126246027278

## 同源策略
跨域问题其实就是浏览器的同源策略导致的。
「同源策略」是一个重要的安全策略，它用于限制一个origin的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。
同源策略就是：网络请求的发送方与请求地址的 协议名、域名、端口号 三者都一致，就视为该请求是同源的；三者有一个不一样就不符合同源策略，此时服务端仍会返回结果，但浏览器会拦截返回结果，并报错。

## 跨域解决方案

### CORS

### Node 正向代理

### Nginx 反向代理

### JSONP

### Websocket

### window.postMessage

### document.domain + Iframe

### window.location.hash + Iframe

### window.name + Iframe

### 浏览器开启跨域（终极方案）