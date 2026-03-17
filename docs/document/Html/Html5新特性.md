# HTML5新特性 -- 经典篇

## 语义化标签
header、nav、footer、aside、section
对seo友好

## DOM查询操作
document.querySelector()、document.querySelectorAll()

## 表单控件
calendar、date、time、email、url、search
input的新增type属性

## 拖曳API
drag、drop
使一个H5元素变为可拖曳

## 音频、视频API
audio、video

## 画布API
canvas元素用于图形的绘制。标签只是图形容器，需要通过脚本（通常是JavaScript）来完成图形绘制

## 地理API
Geolocation

## Web存储
本地离线存储 localStorage：长期存储，路蓝旗关闭后数据不丢失
本地会话存储 sessionStorage：在浏览器关闭后自动删除

## 离线存储
概念：在用户没有因特网连接时，可以正常访问站点或应用，在用户连接因特网时，更新用户机器上的缓存文件

原理：HTML5的离线存储是基于一个新建的.appcache文件的缓存机制(不是存储技术)，通过这个文件上的解析清单来离线存储资源，这些资源就会像cookie一样被存储下来，之后网络断开时，浏览器会使用这些被离线存储的数据进行展示
使用方法：
```
<!-- 创建一个和 html 同名的 manifest 文件，然后在页面头部加入 manifest 属性： -->
<html lang="en" manifest="index.manifest">

<!-- 在 cache.manifest 文件中编写需要离线存储的资源： -->
CACHE MANIFEST
    #v0.11
    CACHE:
    js/app.js
    css/style.css
    NETWORK:
    resourse/logo.png
    FALLBACK:
    / /offline.html
```

## 其它新技术

### webworker
JS的JS引擎线程为主线程，在JS引擎线程执行脚本时，页面的GUI渲染线程是被阻塞的；web worker线程独立于JS引擎线程，可以运行JS脚本，但获取不到window对象，适合复杂JS运算，数据结果可以通过postMessage传回主线程(JS引擎线程)

### websocket
概念：WebSocket是HTML5提供的一种在单个TCP连接上进行全双工通讯的协议（双向通信协议），协议标识符是ws/wss
作用：实现客户端与服务器之间的双向通信，允许服务端主动向客户端推送数据，只需一次握手，就可以建立持久性连接，进行双向数据传输

## HTML5新特性 -- 实用篇
### detail tag
```
<details>标签提供随需应变的细节内容给用户。如果需要按需向用户显示内容，请使用此标记。默认情况下，详细内容是关闭的。打开后，它将展开并显示其中的内容。
<summary>标签与<details>一起使用，来为它指定一个可见的标题。
```
### Content Editable
```
contenteditable是可以在元素上设置以使内容可编辑的属性
可以与DIV，P，UL等元素一起使用。您必须像这样指定它：<element contenteditable="true|false">。
注意，如果contenteditable未在元素上设置属性，则会从其父级继承该属性。
可以用input事件监听修改操作
```
### Map
```
<map>标签可以帮助定义image map，image map是其中具有一个或多个可单击区域的任何图像。map标签与<area>标签一起确定可点击区域。可点击区域可以是矩形，圆形或多边形区域中的任意一种。如果您未指定任何形状，它将默认整个图像。
```
### Mark Content
```
使用<mark>标记突出显示任何文本内容。
```
### data-*attribute
```
data-*属性用于存储页面或应用程序专用的自定义数据。可以在Javascript代码中使用存储的数据来创建更多的用户体验。
data-*属性由两部分组成：
  1.属性名称不得包含任何大写字母，并且前缀"data-"后必须至少长一个字符
  2.属性值可以是任何字符串
要在JavaScript中读取这些属性的值，可以使用getAttribute()，但是规范定义了一种更简单的方法：使用dataset属性
```
### output tag
```
<output>标签表示运算的结果。通常，此元素定义一个区域，该区域将用于显示某些计算得出的文本。
```
### datalist
```
<datalist>标签指定了预先定义的选项列表，并允许用户添加更多。它提供了一项autocomplete功能，使您可以提前输入所需的选项。
与传统<select>-<option>标签有何不同？Select标记用于从选项中选择一个或多个项目，您需要浏览列表以进行选择。Datalist是具有自动完成支持的高级功能。也就是说Datalist标签不仅可以选择，还可以输入
```
### range(slider)
```
range具有滑块，范围选择的输入类型
```
### meter
```
使用<meter>标签测量给定范围内的数据。
请勿将<meter>标签用于进度条。我们有<Progress>HTML5的标记。
```
