# CSS核心知识
参考 https://juejin.cn/post/6941206439624966152

## 语法
CSS的核心功能是将CSS属性设定为特定的值。一个属性与值的键值对被称为声明，一个声明被{}包裹起来后，组成一个声明块，声明块如果需要作用到具体的HTML元素，则还需要加上选择器。选择器和声明块组成了CSS规则集，简称CSS规则。

## @规则
CSS规则是样式表的主体，通常样式表会包括大量的规则列表。但有时候也需要再样式表中包括一些其他信息，比如字符集，导入其它外部样式表，字体等，这就是@规则：
+ @namespace 告诉css引擎必须考虑XML命名空间
+ @media 如果满足媒体查询条件 则条件规则组里的规则生效
+ @page 描述打印文档时布局的变化
+ @font-face描述将下载的外部字体
+ @keyframes 描述css动画的关键帧
+ @document 如果文档样式表满足给定条件 则规则组里的规则生效
+ @chaeset 用于定义样式表使用的字符集
+ @import告诉css引擎引入一个外部样式表 -- link与@import的区别
+ @supports用于查询特定的css是否生效 可以结合not、and、or等操作符

## 层叠性
CSS是层叠样式表，层叠性是CSS中的核心特性之一，是用于合并来自多个源的属性值的算法。层叠性涉及到CSS选择器的优先级，优先级高样式的覆盖优先级低的样式，同一优先级选择器的样式，后面的声明会覆盖前面的。

## 选择器
CSS选择器是CSS的核心之一

### 基础选择器：
+ 标签选择器：h1
+ 类选择器： .checked
+ ID选择器： #picker
+ 通配符选择器： *

### 属性选择器
+ [attr]：指定属性的元素
+ [attr=val]：属性等于指定值的元素
+ [attr*=val]：属性包含指定值的元素
+ [attr^=val]：属性以指定值开头的元素
+ [attr$=val]：属性以指定值结尾的元素
+ [attr~=val]：属性包含指定值（完整单词）的元素
+ [attr|=val]：属性以指定值（完整单词）开头的元素

### 组合选择器
+ 相邻兄弟选择器：A + B
+ 普通兄弟选择器： A ~ B
+ 子代选择器： A > B
+ 后代选择器: A B

### 伪类

#### 条件伪类
+ :lang() 基于元素语言来匹配页面元素
+ :dir() 匹配特定文字书写方向的元素
+ :has() 匹配包含指定元素的元素
+ :is() 匹配指定选择器列表里的元素
+ :not() 用来匹配不符合一组选择器的元素

#### 行为伪类
+ :active 鼠标激活的元素
+ :hover 鼠标悬浮的元素
+ ::selection 鼠标选中的元素

#### 状态伪类
+ :target 当前锚点的元素
+ :link 未访问的链接元素
+ :visited 已访问的链接元素
+ :focus 输入聚焦的表单元素
....

#### 结构伪类
+ :empty 无子元素的元素
+ :nth-child(n) 元素中指定顺序索引的元素
+ :nth-last-child(n) 元素中指定逆序索引的元素
+ :first-child 元素中第一个的元素
+ :last-child 元素中最后一个的元素
+ :nth-of-type(n) 元素中指定顺序索引的标签
...

#### 伪元素
+ ::before 在元素前插入内容
+ ::after 在元素后插入内容

## 优先级
行内样式 > ID选择器 > 类选择器 > 标签选择器

+ 10000：!important
+ 01000：内敛样式
+ 00100：ID选择器
+ 00010：类选择器、伪类选择器、属性选择器
+ 00001：元素选择器、伪元素选择器
+ 00000：通配符选择器、后代选择器、兄弟选择器

使用important的注意事项：
+ 一定要优先考虑使用样式规则的优先级来解决问题 而不是!important
+ 只有在需要覆盖全站或外部CSS的特定页面中使用!important
+ 永远不要在插件中使用!important
+ 永远不要在全站范围的CSS代码中使用!important

## 继承性
在CSS中有一个很重要的特性就是子元素会继承父元素对应属性计算后的值。如果CSS中不存在继承性，name我们可能需要为不同文本的标签都设置一下color等属性，会导致CSS文件大小无限增大。

存在继承的属性：
+ 字体相关：font-family、font-style、font-size、font-weight等
+ 文本相关：text-align、text-indent、text-decoration、text-shadow、letter-spacing、word-spacing、white-space、line-height、color等
+ 列表相关：list-style等
+ 其它属性：visibility、cursor等

对于其它默认不继承的属性也可以通过一下几个属性值来控制继承行为：
+ inherit 继承父元素对应属性的计算值
+ initial 应用该属性的默认值
+ unset 如果属性是默认可继承的 则继承，都则去默认值
+ revert 同unset 兼容性差

## 文档流
CSS中 会把内容从左到右，从上到下按顺序进行排列显示。正常情况页面会被分割成一行一行显示，每行可能由多列组成，所以视觉上是从上到下从左到右，这就是CSS中的流式布局，又叫文档流。

文档流的几个特性：
+ 块级元素默认占满整行，所以多个块级盒子是从上到下排列的
+ 内联元素默认会在一行里一列一列的排布，当一行放不下时，自动切换到下一行

脱离文档流指正常节点脱离文档流后，在正常文档流中的其它节点将忽略该节点并填补其原来的空间。文档一旦脱离文档流，计算其父节点高度时不会将其高度纳入，脱流节点不占据空间。
如何脱离文档流：
+ 浮动
+ 定位：绝对定位、固定定位及满足条件的粘性定位

## 盒模型
在CSS中任何元素都可以看成是一个盒子，而一个盒子是由4部分组成：内容、内边距、边框、外边距。
盒模型有两种：标准盒模型和IE盒模型，分别由W3C和IE制定的标准。
标准盒模型认为：盒子的实际尺寸 = 内容(设置的宽高) + 内边距 + 边框，设置内边距和边框会撑大盒子实际尺寸；
IE盒模型认为：盒子的实际尺寸 = 设置的宽高 = 内容 + 内边距 + 边框，设置内边距和边框不会撑大盒子实际尺寸，而是会挤压盒子的内容区域；
在CSS3中新增了一个box-sizing属性，允许设置盒模型标准：
+ content-box  标准盒模型
+ border-box  IE盒模型
+ padding-box 只有padding计入width，border不计入；兼容性很差，只有低版本firefox支持

## 视觉格式化模型
规定页面中多个盒子的排列规则，盒子该怎么摆放、渲染成什么样子，盒模型也包含在这个规则里。视觉格式化模型，大体将页面中盒子的排列分为三种方式：
常规流、浮动、定位。

## 格式化上下文
格式化上下文是CSS2.1规范中的一个概念，大概是说页面中的一块渲染区域，规定了渲染区域内部的子元素是如何排版以及相互作用的。

不同类型的盒子有不同的何世华上下文，大概有这4类：
+ BFC 块级格式化上下文
+ IFC 行内格式化上下文
+ FFC 弹性格式化上下文
+ GFC 栅格格式化上下文

其中BFC和IFC在CSS中极其重要，直接影响了网页布局

### BFC
块级格式化上下文，它是一个独立的渲染区域，只有块级盒子参与，规定了内部的块级盒子如何布局，并且与这个区域外部毫不相干

BFC渲染规则：
+ 内部的盒子会在垂直方向，一个接一个地放置
+ 盒子垂直方向的距离由margin决定，属于同一个BFC的两个相邻盒子的margin会发生重叠
+ 每个元素的margin的左边，与包含块border的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此
+ BFC区域不会与float盒子重叠
+ BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会有影响到外面的元素，外面的元素也不会影响到里面的元素
+ 计算BFC高度时，浮动元素也参与计算

如何创建BFC
+ 根元素 html
+ 非溢出的可见元素 overflow不为visible
+ 设置浮动 float属性不为none
+ 设置定位 position为absolute或fixed
+ 定义成块级的非块级元素：display:inline-block、table-cell、table-caption、flex、inline-flex、inline-grid

BFC的应用场景：
自适应两栏布局
内部清除浮动
防止垂直margin合并 -- 同属于一个BFC才会发生margin合并，给两个盒子外层分别套一个盒子并触发其BFC，就不会产生margin合并了

### IFC
IFC的形成条件很简单，块级元素中仅包含内联级别元素，当IFC中有块级元素插入时，会产生两个匿名块将父元素分割开来，产生两个IFC

IFC渲染规则：
+ 子元素在水平方向上一个接一个排列，在垂直方向上将以容器顶部开始向下排列
+ 节点无法声明宽高，margin和padding在水平方向有效在垂直方向无效
+ 节点在垂直方向以不同形式对齐
+ 能把在一行上的框都完全包含进去一个矩形区域，被称为改行的线盒。线盒的宽度是由包含块和与其中的浮动来决定
+ IFC中 line box 一般左右边贴紧其包含块，但float元素会优先排列
+ IFC中的line box 高度由line-height计算规则来确定，同个IFC下多个line box 高度可能会不同
+ 当内联级盒子的总宽度少于包含它们的line box时，其水平渲染规则由text-align属性值来决定
+ 当一个内联盒子超过父元素宽度时，它会被分割成多个盒子，如果子元素未设置强制换行，将溢出父元素

IFC的应用场景：
+ 水平居中 text-align:center
+ 垂直居中 vertical-align:middle

## 层叠上下文
在电脑屏幕上的页面其实是一个三维空间，水平方向是X轴，竖直方向是Y轴，而屏幕到眼睛方向可以看成是Z轴。众多HTML元素依据自己定义的属性的优先级在Z轴上按照一定的顺序排开，而这其实就是层叠上下文所要描述的东西。

如何产生一个层叠上下文：
+ html文档根元素
+ 声明position为absolute/relative且z-index不为auto的元素
+ 声明position为fixed/sticky的元素
+ flex容器的子元素，且z-index值不为auto
+ grid容器的子元素，且z-index不为auto
+ opacity属性值小于1的元素
+ mix-blend-mode属性值不为normal的元素
+ 以下属性值不为none的元素：
  + transform
  + filter
  + perspective
  + clip-path
  + mask/mask-image/mask-border
+ isolation 属性值为 isolate 的元素
+ -webkit-overflow-scrolling 属性值为 touch 的元素
+ will-change 值设定了任一属性而该属性在 non-initial 值时会创建层叠上下文的元素
+ contain 属性值为 layout、paint 或包含它们其中之一的合成值（比如 contain: strict、contain: content）的元素

层叠等级：层叠等级指节点在三维空间Z轴的上下顺序，分两种情况：
+ 在统一个层叠上下文中，它描述定义的是该层叠上下文中的层叠上下文元素在Z轴上的上下顺序
+ 在其它普通元素中，它描述的是这些普通元素在Z轴上的上下顺序

层叠顺序（从下往上）：
+ 层叠上下文的border和background
+ z-index<0的子节点
+ 标准流内块级非定位的子节点
+ 浮动非定位的子节点
+ 标准流内行内非定位的子节点
+ z-index为auto/0的子节点
+ z-index > 0的子节点

如何比较两个元素的层叠等级：
+ 1.在统一层叠上下文中，按照上面顺序比较
+ 2.不再同意层叠上下文中时，需要比较两个元素分别所处的层叠上下文的等级
+ 3.如果两个元素在同一层叠上下文，且层叠顺序相同，则在HTML中定义顺序越后面的层叠等级越高

## 值和单位
CSS的声明由属性和值组成，而值的类型有许多种：
+ 数值 长度值，如width等
+ 百分比 可以用于指定尺寸或长度等
+ 颜色 可以指定字体颜色或背景颜色等
+ 坐标位置 以屏幕左上角为原点的位置，如top、bottom、left、right等
+ 函数 用于指定资源路径或背景色的渐变 如 url()、linear-gradient()

CSS的单位：
px
设备像素(Device pixels)
设备像素币(DPR)
像素密度(DPI/PPI)
设备独立像素(DIP)
em
rem
vw/vh

## 颜色体系
CSS中颜色值的类型 大概可以分为下面几类：
+ 颜色关键字 red等
+ transparent关键字 透明色
+ currentColor关键字 会取当前元素继承父级元素的文本颜色值或声明的文本颜色值
+ RGB颜色 rgb、rgba、十六进制
+ HSL颜色

## 媒体查询
媒体查询是指针对不同的设备、特定的设备特征或者参数进行定制化的修改网站样式
```
<link rel="stylesheet" src="styles.css" media="screen" />
<link rel="stylesheet" src="styles.css" media="print" />
```
以上media值支持的类型：
+ all 适用于所有设备
+ 适用于在打印预览模式下载屏幕上查看的分页材料和文档
+ screen 主要用于屏幕
+ speech 主要用于语音合成器

```
/* 用户设备的最小高度为680px或为纵向模式的屏幕设备 */
@media (min-height: 680px), screen and (orientation: portrait) {}
```
@media支持的逻辑操作符
+ and 查询条件都满足才生效
+ not 查询条件取反
+ only 整个查询匹配的时候才生效 常用于兼容低版本浏览器
+ 逗号或or 查询条件满足一项即可匹配

## CSS样式
### CSS引入方式
- 内联样式：直接将样式写在标签上，只对当前标签有效
- 嵌入样式：在head标签内的style标签中写入样式，对当前页面有效
- 链接样式/外联样式：使用link标签引入css
- 导入样式：在style中使用@import导入样式，或者在css文件中使用@import导入其它样式
### link导入css与@import导入css的区别
- link是XHTML标签，它不仅可以引入css文件，还可以引入网站图标、图片等文件(type属性设置类型)或设置媒体查询
- @import是CSS提供的语法规则，只能用来加载css
- link引入css文件，页面载入的同时加载css文件; @import则会在页面完全载入之后加载css文件，在网络较慢的情况下，一开始会没有css样式
- link在浏览器中没有兼容问题；@import是css2.1中提出的，低版本浏览器不会支持
- link中的css可以被js获取进而控制DOM，而@import不支持
### CSS选择器权重
+ 针对同一元素标签 当设置了不同选择器时 需要判断权重值大小 权重值越大优先级越高
+ 权重排序： !important > 行内样式 > id > 类|伪类|属性 > 标签 > 通配符 > 继承
+ CSS层叠性：针对同一标签元素 当设置了不同的选择器时 权重高的层叠掉权重低的样式

## CSS的overflow属性
+ overflow是CSS的简写属性 它设置了元素溢出时所需的行为 即当元素的内容太大而无法适应它的块级格式化上下文时的行为
+ 这个属性是以下属性的简写：
  + overflow-x
  + overflow-y
  + 所以overflow可以设置一个或两个属性 设置两个属性时 分别设置这两个属性 设置一个属性时 这两个属性都会使用这个一个值
+ overflow的属性值有以下5个：
  + visible: 溢出的内容不能被裁剪并且可能渲染到盒子外部
  + hidden: 溢出的内容会被裁剪以适应盒子 不提供滚动条 也不支持用户滚动(比如拖拽或滚轮) 但是内容可以以编程方式(js)滚动 所以仍是一个滚动容器;同时会启动新的块级格式化上下文 所以可用于清除浮动
  + clip: 类似hidden 溢出内容会以被裁剪 区别在于clip禁止所有滚动 包括编程方式(js)滚动 盒子不是一个滚动容器; 不会启动新的块级格式化上下文
  + scroll: 溢出内容被裁剪 但是浏览器始终会显示滚动条 并可以通过滚动查看溢出内容
  + auto: 取决于内容是否溢出 如果内容没有溢出 看起来跟visible一样 但是仍然会创建新的块级格式化上下文;如果内容溢出 则浏览器会提供滚动条 效果跟scroll类似
  + overlay: 行为与auto相同 但是滚动条绘制在内容之上 而不是占据空间
+ JS的Element.scrollTop属性可用于滚动HTML元素 即使overflow设置为hidden

## css中使用var变量
- var(--name, value) name必填，value可选，name必须以 -- 开头
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="shortcut icon" href="http://hanhuankang.com/favicon.ico" />
    <style>
        #box {
            color: var(--box-color);
        }
    </style>
</head>

<body>
    <div id="box">颜色改变</div>
</body>

</html>
<script>
// var(--name, value)
var box = document.getElementById("box");
box.style.setProperty("--box-color", "red");
setTimeout(() => {
    box.style.setProperty("--box-color", "skyblue");
}, 2000);
</script>
```