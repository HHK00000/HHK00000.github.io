# CSS常见需求

## 清除浮动
+ BFC清除浮动  overflow: hidden
+ 通过clear清除浮动  clear: 
```
.clearfix {
    zoom: 1;
}
.clearfix::after {
    content: "";
    display: block;
    clear: both;
}
```

## 1px边框解决方案
高分屏比普通屏幕分辨率更高，所以移动端的1px边框就会看起来较粗
解决方案：
+ 使用0.5px边框 先查询浏览器是否支持设置0.5px边框 无法兼容安卓及IOS 8以下
+ border-image
+ background-image
+ 多背景渐变实现
+ 使用box-shadow模拟边框
+ viewport + rem 实现  全局修改，适合新项目
+ 伪类 + transform 实现 （先去掉边框 再添加一个伪类 在伪类中实现边框 并通过transform scale(0.5)来解决1px边框问题） 适合老项目，局部修改

## 清除浏览器默认样式
reset.css 及 后来的 Normalize.css

## 长文本处理

超出部分换行 overflow-wrap:break-word

字符超出位置使用连字符 hyphens: auto

单行文本超出显示省略号
```
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

多行文本超出显示省略号
```
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

## 水平垂直居中
场景：
+ 单行文本、inline或inline-block元素
+ 固定宽高的块级盒子
+ 不固定宽高的块级盒子

### 单行文本、inline或inline-block元素
+ 水平居中 text-align: center
+ 垂直居中
  + 通过设置上下内边距一致，达到垂直居中的效果
  + 通过设置height和line-height来达到垂直居中

### 固定宽高的块级盒子
+ absolute + 负margin  left、top 50%，margin负的盒子的一半
+ absolute + margin auto left、top、right、bottom全为0，margin：auto
+ absolute + calc left: calc(50% - 50px)

### 不固定宽高的块级盒子
+ absolute + transform
+ inline-block + text-align + vertical-align
+ writing-mode
+ table-cell
+ flex
+ grid

## 常用布局

两栏布局 左侧固定，右侧自适应
+ float + overflow(BFC原理)
+ float + margin
+ flex
+ grid

三栏布局 两侧栏宽度固定 中间自适应
+ 圣杯布局 浮动 + 相对定位 + 负margin
+ 双飞翼布局 浮动 + margin
+ float + overflow(BFC原理)
+ flex
+ grid

多列等高布局
+ 浮动 + padding + 负margin
+ 设置父级背景图片 + 百分比

三行布局(头尾定高主栏自适应)
+ calc
+ absolute
+ flex
+ grid

## PostCSS、Sass、Less异同，以及配置使用
+ 编译环境不同：Sass安装需要Ruby环境，在服务端处理，Less需要引入less.js来处理代码
+ 变量符号不一样，less是@，Scss是$
+ 输出设置不一样，Less没有输出设置，Sass提供4种输出选项：nested、compact、compressed、expanded
+ 处理条件语句不一样：Sass支持条件语句，可以使用if else for等，Less的条件语句是when等关键词
+ 引用外部文件，文件名如果以下划线_开头，Sass回认为该文件是一个引用文件，不会编译成css文件，less引用外部文件和css中@import没什么差异
+ 工具库不一样，Sass工具库Compass，less有UI组件库Bootstrap
+ PostCSS的主要功能只有两个 第一个就是把CSS解析成JS可以操作的AST,第二个就是调用插件来处理AST并得到结果。PostCSS一般不单独使用，而是与已有的构建工具进行集成

## 如何防止CSS阻塞渲染
使用媒体类型和媒体查询
```
<link href="style.css" rel="stylesheet">  //阻塞
<link href="print.css" rel="stylesheet" media="print">  // 不阻塞
<link href="other.css" rel="stylesheet" media="(min-width: 40em)"> // 符合媒体查询条件时阻塞
```

## 移动端样式问题汇总
### input 框disable时的样式问题
- 在ios下，disable状态的输入框 会默认加上一个透明度，导致字体颜色变化
```
  <!-- 解决方案 -->
  input:disabled, input[disabled], textarea:disabled, textarea[disabled]{
    color: #af8867!important;
    -webkit-text-fill-color:#af8867!important; // ios 和 安卓9.0 必须添加此属性，才会生效
    background-color: transparent!important;
    opacity: 1!important;
  }
```
### 移动端手机点击输入框的时候输入框(页面)会变大
- 由于弹出了输入框，导致输入框及页面变大 在head的meta标签中添加 user-scalable=no 可以解决
```
<!-- 解决方案   在head下添加以下代码 -->
<meta content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=2.0, user-scalable=no, width=device-width" name="viewport">
```

### 手机端点击时的背景色设置
用vue3开发移动端项目时，当点击一个元素时，元素会有一个默认的背景颜色，半透明的灰色
可以禁用默认背景颜色 -webkit-tag-highlight-color: transparent;
这个属性是设定元素在移动设备上触发点击事件时 相应的背景框的颜色

## 浏览器兼容性问题汇总
### IE兼容性问题
+ ie下input事件会在(jq中)初始化时触发一次，解决方案是先初始化focus事件，在focus事件中绑定input事件
### firefox兼容性问题
+ 不支持 overflow: overlay; 属性 需要用 overflow:auto; 做兼容处理