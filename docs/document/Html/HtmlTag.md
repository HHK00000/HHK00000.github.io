# HTML标签

## HTML标签类型

+ 行内元素：不能设置宽高 宽高由内容决定，常见：a、b、span、strong
+ 块级元素：可设置宽高内外边距、独占一行，常见：div、ul、li、dl、dt、h1-5、p
+ 行内块元素：可以设置宽高内外边距，常见：img、input、td
+ 空元素：没有对应的闭合标签，常见：br、hr、link、meta
+ 通过css的display属性可以切换行内元素/inline、行内块元素/inline-block、块元素/block

## 语义化标签
概念：语义化是指根据内容的结构化、语义化，选择合适的标签（代码语义化），便于开发者阅读和写出更优雅的代码，同时让浏览器的爬虫和机器更好的解析

语义化的好处：
+ 用正确的标签做正确的事情
+ 样式丢失或加载不到时使页面呈现出清晰的结构
+ 方便其他设备解析（如：屏幕阅读器、盲人阅读器、移动设备等），
+ 有利于SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息，爬虫依赖于标签来确定上下文和各个关键字的权重
+ 有利于团队开发和维护，语义化更具可读性，遵循W3C标准的团队都遵循这个写法，可以减少差异化

## a标签的作用
+ 打开新页面（外部页面链接），跳转到不同url链接，target属性有一下值：
  + _self 在当前页面打开链接
  + _blank 在新窗口打开链接
  + _top 在顶层窗口打开链接
+ 锚点，跳转到页面指定位置
+ 下载文件，下载的原理在于a标签所对应的资源浏览器无法解析时，会将其下载下来
+ 手机拨号
+ 发送短信
+ 发送邮件

## input标签的type属性
| 属性值 | 描述 |
| text | 默认。定义单行输入字段，用户可在其中输入文本，默认20个字符 |
| button | 定义可点击按钮 |
| radio | 定义单选框 |
| checkbox | 定义复选框 |
| file | 定义输入字段和“浏览”按钮，供文件上传 |
| hidden | 定义隐藏输入字段 |
| image | 定义图像作为提交按钮 |
| password | 定义密码字段，其中的字符会被遮盖 |
| reset | 定义充值按钮，重置按钮会将所有表单字段重置为初始值 |
| submit | 定义提交按钮，提交按钮向服务器发送数据 |
| url | 定义用于URL的文本字段 |
| H5新增 | 以下为H5新增 |
| color | 定义拾色器 |
| date | 定义日期字段 （带有calendar空间） |
| datetime | 定义日期字段（带有calendar 和 time 控件） |
| datetime-local | 定义日期字段（带有calendar 和 time 控件） |
| month | 定义日期字段的月（带有calendar 控件） |
| week | 定义日期字段的周（带有calendar 控件） |
| time | 定义日期字段的时、分、秒（带有calendar 控件） |
| email | 用于定义e-mail地址的文本字段 |
| number | 定义带有 spinner 控件的数字字段 |
| range | 定义带有slider控件的数字字段 |
| search | 定义用于搜索的文本字段 |
| tel | 定义用于电话号码的文本字段 |

## iframe标签
html标签，作用是文档中的文档，嵌入式框架，用来在页面中嵌入其它页面

+ 优点：
  + 还原性：iframe能够原封不动的把嵌入的网页展现出来
  + 模块化：如果有多个网页引用iframe，只需要修改frame的内容，就可以实现每个调用页面中内容的更改-方便快捷
  + 可复用：统一网页风格，并用iframe来嵌套，可实现-码复用
  + iframe可以跨域通信
  + 解决了加载缓慢的第三方内容如图标和广告等加载问题
  + 用于微前端架构，分拆大型项目
+ 缺点：
  + 阻塞主页面的onload事件
  + 搜索引擎无法检索iframe页面，不利于SEO
  + 兼容性较差，ie11开始支持

## label标签
label标签为 input 元素定义标签，本身不会有任何特殊样式，并为鼠标用户改善了可用性，当用户点击label元素内的文本时，会聚焦到表单控件本身

## meta标签
meta标签由name和content属性定义，用来描述网页文档的属性，比如网页的作者、网页的描述、关键词等，除了HTTP标准固定了一些name代表具体含义外，开发者还可以自定义name

常用的meta标签：
+ charset 用来描述HTML文档的编码类型 <meta charset="UTF-8" >
+ keywords 页面关键词 <meta name="keywords" content="关键词" />
+ description 页面描述 <meta http-equiv="refresh" content="0;url=" />
+ refresh 页面重定向和刷新 <meta http-equiv="refresh" content="0;url=" />
+ viewport 适配移动端，可控制饰扣大小和比例 <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

content参数有以下几种：
+ width viewport ：宽度(数值/device-width)
+ height viewport ：高度(数值/device-height)
+ initial-scale ：初始缩放比例
+ maximum-scale ：最大缩放比例
+ minimum-scale ：最小缩放比例
+ user-scalable ：是否允许用户缩放(yes/no）

搜索引擎索引方式：<meta name="robots" content="index,follow" />
其中content参数有以下几种：
+ all：文件将被检索，且页面上的链接可以被查询；
+ none：文件将不被检索，且页面上的链接不可以被查询；
+ index：文件将被检索；
+ follow：页面上的链接可以被查询；
+ noindex：文件将不被检索；
+ nofollow：页面上的链接不可以被查询；

## img标签
srcset属性用于响应式页面中根据屏幕密度设置不同图片
```
<img src="image-128.png" srcset="image-256.png 2x" />
```
使用上面的代码，就能实现在屏幕密度为1x的情况下加载image-128.png, 屏幕密度为2x时加载image-256.png。
按照上面的实现，不同的屏幕密度都要设置图片地址，目前的屏幕密度有1x,2x,3x,4x四种，如果每一个图片都设置4张图片，加载就会很慢。所以就有了新的srcset标准。代码如下：
```
<img src="image-128.png"
     srcset="image-128.png 128w, image-256.png 256w, image-512.png 512w"
     sizes="(max-width: 360px) 340px, 128px" />
```
其中srcset指定图片的地址和对应的图片质量。sizes用来设置图片的尺寸零界点。对于 srcset 中的 w 单位，可以理解成图片质量。如果可视区域小于这个质量的值，就可以使用。浏览器会自动选择一个最小的可用图片。

