## canvas API

### 实例属性

- height 可读可写
- width 可读可写

```
var canvas = document.getElementById('canvas')
canvas.height = 100;
canvas.width = 300;
```

### 实例方法

- getContext() 返回 canvas 上下文
- toBlob() 创造 Blob 对象
- toDataURL() 返回一个包含图片展示的 data URI

### 继承

### 事件

### canvas API 相关页面

- OffscreenCanvas 离屏渲染 canvas

## canvas 教程

### 基本用法

- 使用 document.getElementById 来获取元素；再使用 getContext() 拿到 canvas 渲染上下文

### 绘制形状

- 绘制矩形
  - fillRect(x, y, width, height) 绘制一个填充的矩形
  - strokeRect(x, y, width, height) 绘制一个矩形的边框
  - clearRect(x, y, width, height) 清除指定矩形区域，使其完全透明
- 绘制路径
- 图形的基本元素是路径，路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。
- 首先创建路径的起始点
- 然后使用画图命令去画出路径
- 之后把路径封闭
- 一旦路径生成，就可以通过描边或填充路径来渲染图形
- beginPath() 新建一条路径 生成之后 图形绘制命令被指向到路径上生成路径
- moveTo() 将笔触移动到指定的坐标 x 以及 y 上。
- lineTo() 绘制一条从当前位置到指定 x 以及 y 位置的直线
- arc(x, y, radius, startAngle, endAngle, anticlockwise) 绘制圆或圆弧，。画一个以（x,y）为圆心的以 radius 为半径的圆弧（圆），从 startAngle 开始到 endAngle 结束，按照 anticlockwise 给定的方向（默认为顺时针）来生成。
- quadraticCurveTo(cp1x, cp1y, x, y) 绘制二次贝塞尔曲线，cp1x,cp1y 为一个控制点，x,y 为结束点。
- bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) 绘制三次贝塞尔曲线，cp1x,cp1y 为控制点一，cp2x,cp2y 为控制点二，x,y 为结束点。
- closePath() 闭合路径之后 图形绘制命令又重新指向到上下文中。不是必需的。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做
- stroke() 通过线条来绘制图形轮廓
- fill() 通过填充路径的内容区域来生成实心的图形。当调用 fill() 函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用 closePath() 函数。但是调用 stroke() 时不会自动闭合

### 添加颜色和样式

- 色彩 Colors
- fillStyle = color 设置图形的填充颜色
- strokeStyle = color 设置图形轮廓的颜色
- 透明度 Transparency
  ```
  // 指定透明颜色，用于描边和填充样式
  ctx.strokeStyle = "rgba(255,0,0,0.5)";
  ctx.fillStyle = "rgba(255,0,0,0.5)";
  ```
- 线型 Line styles
  - lineWidth = value 设置线条宽度
  - lineCap = type 设置线条末端样式 butt，round 和 square。默认是 butt
  - lineJoin = type 设置(斜接)线条与线条接合处的样式 round, bevel 和 miter。默认是 miter
  - miterLimit = value 限制两条线相交时 交接处最大长度
  - getLineDash() 返回一个包含当前虚线样式 长度为非负偶数的数组
  - setLineDash(segments) 设置当前虚线样式
  - lineDashOffset = value 设置虚线样式的起始偏移量
- 渐变 Gradients

  - 创建一个 canvasGradient 对象，并且赋给 fillStyle 或 strokeStyle 属性
  - 创建出 canvasGradient 对象后，就可以用 addColorStop 方法给它上色了。
  - 线性渐变 createLinearGradient(x1, y1, x2, y2) 接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)
  - 径向渐变 createRadialGradient(x1, y1, r1, x2, y2, r2) 接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。

  ```
  var lineargradient = ctx.createLinearGradient(0,0,150,150);
  var radialgradient = ctx.createRadialGradient(75,75,0,75,75,100);

  var lineargradient = ctx.createLinearGradient(0,0,150,150);
  lineargradient.addColorStop(0,'white');
  lineargradient.addColorStop(1,'black');
  ```

- 图案样式 Patterns
  - createPattern(image, type) 该方法接受两个参数。Image 可以是一个 Image 对象的引用，或者另一个 canvas 对象。Type 必须是下面的字符串值之一：repeat，repeat - x，repeat - y 和 no - repeat。

```
  var img = new Image();
  img.src = 'someimage.png';
  var ptrn = ctx.createPattern(img,'repeat');
```

- 阴影 Shadows
  - shadowOffsetX = float; shadowOffsetY = float 阴影在 X、Y 轴的延伸距离 默认 0
  - shadowBlur = float 设定阴影的模糊程度 默认 0
  - shadowColor = color 设定阴影颜色效果 默认黑色
- Canvas 填充规则 可以选择一个填充规则，该填充规则根据某处在路径的外面或者里面来决定该处是否被填充，这对于自己与自己路径相交或者路径被嵌套的时候是有用的
  - fill 可以传入参数 标识填充模式 默认"nonzero" 或 "evenodd"

### 绘制文本

- 绘制文本
  - fillText(text, x, y, maxWidth) 在指定的(x,y)的位置填充指定的文本，绘制的最大宽度是可选参数
  - strokeText(text, x, y, maxWidth) 在指定的(x, y)位置绘制文本边框，绘制的最大宽度是可选参数
- 有样式的文本
  - font = value 设置字体大小
  - textAlign = value 文本对齐选项，可选的值包括：start, end, left, right or center. 默认值是 start
  - textBaseline = value 基线对齐选项，可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。
  - direction = value 文本方向，可能的值包括：ltr、rtl、inherit
- 预测量文本宽度
  - measureText() 将返回一个 TextMetrics 对象的宽度、所在像素等文本特性的属性

### 使用图片

- canvas 具有图像操作能力，可以用于动态的图像合成、作为图形的背景、游戏界面等，可以使用浏览器支持的任意格式的图片(png、gif、jpg、jpeg 等)，甚至使用其他 canvas 元素生成的图片作为图片源
- 引入图像到 canvas 需要两步：
  - 获得一个指向 HTMLImageElement 的对象或者另一个 canvas 元素元素的引用作为源，也可以通过提供一个 URL 的方式来使用图片
  - 使用 drawImage()函数将图片绘制在画布上
- 获得需要绘制的图片
  - HTMLImageElement 由 Image() 函数构造出来 或 任何的 <img/> 元素
  - HTMLVideoElement 用一个 HTML 的 <video/> 元素作为图片源，可以从视频中抓取当前帧作为一个图像
  - HTMLCanvasElement 可以使用另一个 <canvas/> 元素作为你的图片源
  - ImageBitmap 这是一个高性能的位图，可以低延迟地绘制，它可以从以上所有源以及其它几种源中生成
  - 使用其它域名下的图片
- 绘制图像：drawImage(image, x, y) 其中 image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标
- 缩放 Scaling：drawImage(image, x, y, width, height) 这个方法多了 2 个参数：width 和 height，这两个参数用来控制 当向 canvas 画入时应该缩放的大小
- 切片 Slicing：drawImage 方法的第三个也是最后一个变种有 8 个新参数，用于控制做切片显示的。drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) 第一个参数和其它的是相同的，都是一个图像或者另一个 canvas 的引用。其它 8 个参数，前 4 个是定义图像源的切片位置和大小，后 4 个则是定义切片的目标显示位置和大小

### 变形 Transformations
- 状态保存和恢复
  - save() 保存画布 (canvas) 的所有状态
  - restore() save 和 restore 方法是用来保存和恢复 canvas 状态的，都没有参数。Canvas 的状态就是当前画面应用的 所有样式和变形 的一个快照。
  - 一个绘画状态包括：
    - 当前应用的变形（即移动，旋转和缩放，见下）
    - 以及下面这些属性：strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, lineDashOffset, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation, font, textAlign, textBaseline, direction, imageSmoothingEnabled
    - 当前的裁切路径（clipping path）
- 移动 Translating
  - translate(x, y) 用来移动 canvas 和它的圆点到不同的位置，translate方法接受两个参数。x 是左右偏移量，y 是上下偏移量
- 旋转 Rotate 
  - rotate(angle) 用于以原点为中心旋转，只接受一个参数：旋转的角度 (angle)，它是顺时针方向的，以弧度为单位的值。旋转的中心点始终是 canvas 的原点，如果要改变原点位置，可以用 translate 方法
- 缩放 Scaling
  - scale(x, y) 缩放，用来增减图形在canvas中的像素数目，对形状、位图进行缩小或放大。
  - scale方法可以缩放画布的水平和垂直的单位。两个参数都是实数，可以为负数，x 为水平缩放因子，y 为垂直缩放因子，如果比 1 小，会缩小图形，如果比 1 大会放大图形。默认值为 1，为实际大小。
  - 画布初始情况下，是以左上角坐标为原点的第一象限。如果参数为负实数，相当于以 x 或 y 轴作为对称轴镜像反转（例如，使用translate(0,canvas.height); scale(1,-1); 以 y 轴作为对称轴镜像反转，就可得到著名的笛卡尔坐标系，左下角为原点）。
  - 默认情况下，canvas 的 1 个单位为 1 个像素。举例说，如果我们设置缩放因子是 0.5，1 个单位就变成对应 0.5 个像素，这样绘制出来的形状就会是原先的一半。同理，设置为 2.0 时，1 个单位就对应变成了 2 像素，绘制的结果就是图形放大了 2 倍。
- 变形 Transforms
  - transform(a, b, c, d, e, f) 允许对变形矩阵直接修改

### 合成和裁剪
### 基本动画
### 高级动画
### 像素操作
### canvas 的优化
### 终极
