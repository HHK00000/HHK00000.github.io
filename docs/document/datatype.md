# JS数据类型及转换
## JS数据类型
js目前有7种基本数据类型和一种复杂数据类型

- Undefined 只有一个值就是undefined，表示未经初始化的变量值
- Null 只有一个值null，表示空对象指针
- String 表示另个或多个16位Unicode字符组成的字符序列
- Number 包括整数和浮点数
- Boolean 有两个字面值：true 和 false，表示一个逻辑实体
- Symbol 每次创建的值都是唯一的，不能被强制转换
- BigInt 表示一种特殊的数字类型，它支持任意长度的整数
- Object 复杂数据类型/引用数据类型

## JS引擎内部实现类型转换的4个抽象操作
隐式类型转换是在一定场景下，js运行环境自动调用这几个方法，尝试转换成期望的数据类型

- ToString(argument)
- ToNumber(argument)
- ToBoolean(argument)
- ToPrimitive(input[,PreferredType])

### ToString(argument)

- undefined --> 'undefined'
- null --> 'null'
- boolean true --> 'true'  false --> 'false'
- number 返回字符串表示的数字 123 --> '123'
- string 返回原参数
- Symbol 抛出TypeError异常
- BigInt 返回字符串表示的数字 1n --> '1'
- Object 先primValue = ToPrimitive(argument, Number) 再对primValue使用 ToString(primValue)

### ToNumber(argument)

- undefined --> NaN
- null --> +0
- boolean true --> 1  false --> 0
- number 返回原参数
- string 参数是字符串数字则返回数字，转化失败则返回 NaN '123' --> 123  '123px' --> NaN
- Symbol 类似string 将字符串中的内容转为数字 转换失败则返回NaN
- BigInt 返回对应的数字 1n --> 1
- Object 先primValue = ToPrimitive(argument, Number) 再对primValue使用 ToNumber(primValue)

### ToBoolean(argument)

- undefined --> false
- null --> false
- boolean 返回原参数
- number 参数为 零/NaN 时返回 false，其它返回true
- string 参数是空字符串时返回false，其它返回true
- Symbol true
- BigInt 类似number 参数为0n时返回false，其它返回true
- Object true

### ToPrimitive(input[,PreferredType])

input是输入参数值，PreferredType是期望转换的类型，可以是字符串或数字

- PreferredType参数是Number，则ToPrimitive的执行顺序：
  - 1.input本身是原始类型，返回input
  - 2.调用input.valueOf(),如果结果是原始类型，则返回这个结果
  - 3.调用input.toString()，如果结果是原始类型，则返回这个结果
  - 4.抛出TypeError异常

- PreferredType参数是String，则ToPrimitive的执行顺序：
  - 1.input本身是原始类型，返回input
  - 2.调用input.toString()，如果结果是原始类型，则返回这个结果
  - 3.调用input.valueOf(),如果结果是原始类型，则返回这个结果
  - 4.抛出TypeError异常
- PreferredType没有传入参数
  - 如果input是内置的Date类型，则PreferredType视为String
  - 否则PreferredType视为Number

## 常见的隐式类型转换

### 转成String类型

- 字符串连接符(+)转成字符串

```
var a = 123
var n = a + 'helloworld';
console.log(n)   // '123hellowold'

a = true
var m = a + 'helloworld'
console.log(m)   // 'truehelloworld'
```

### 转成Number类型

- 自增自减运算符 ++/--
- 加减乘除求余算术运算符 +-*/%

```
var a = '100'
var b = a--
var c = a/2
console.log(a) // 99
console.log(b) // 100
a+= ''
console.log(c) // 49.5

```
- 关系运算符 >、<、>=、<=、==、!=、===、!==
  - 1.当关系运算符一边有字符串时，会将其数据类型使用Number转换，再做比较
  - 2.当两边都是字符串时，则都转成Number，注意：此时不是转成对应的数字，而是按照字符串对应的unicode编码转成数字
  - 3.多个字符串从左往右进行比较
  ```
  console.log('10' > 3) // true 先转成数字10再比较
  console.log('3' > '10') // true

  console.log('3'.charCodeAt()) // 51
  console.log('10'.charCodeAt()) // 49

  console.log('abc' > 'b') // false 先比较a和b，a和b不等，直接false
  console.log('abc' > 'ade') // false，先比较aa，相等，继续比较db，得出结果
  console.log('b'.charCodeAt()) // 98
  console.log('d'.charCodeAt()) // 100
  ```
  - 4.特殊情况
  ```
  console.log(undefined == undefined) // true 
  console.log(undefined === undefined) // true

  console.log(undefined == null) // true undefined是从null派生出来的
  console.log(undefined === null) // false

  console.log(null == null) // true
  console.log(null === null) // true

  console.log(NaN == NaN)  // false NaN与任何数据比较都是NaN
  console.log(NaN === NaN) // false NaN与任何数据比较都是NaN
  ```

  ### 转成Boolean类型
  
  数据在逻辑判断和逻辑运算之中会隐式转换为Boolean类型

  - 以下几种数据转换后为false：+0、-0、0、NaN、undefined、null、"“、document.all()，其它都是true
  - 复杂数据类型转换为Boolean后都是true，如：[]、{}
  - 逻辑非运算符! 逻辑非运算中，会讲数据先做Boolean转换，然后取反
  ```
  var a = undefined
  console.log(!a) // true 先Boolean(a) => false; 再取反 !false => true
  ```

  ## 进阶

  ### 字符串运算与算术运算符
  转换类型取决于 加号'+' 两边的数据类型
  - 只要有一边是字符串，则把非字符串的一边转为字符串
  ```
  console.log(123 + 'true') // '123true'
  ```
  - 字符串两边有一边是Number类型,此时+为算数运算符,则将另一边的数据转成Number类型
  - 对于空字符串、null、布尔值false转成Number后都是0，undefined转成Number后是NaN
  ```
  console.log(1 + true) // 2 先Number(true)=> 1,再做加计算，结果为2
  console.log(1 + undefined) // 先Number(undefined) => NaN ,再计算，结果NaN
  console.log(1 + null) // 先Number(null) => 0,再计算，结果为1
  ```

  ### 复杂数据类型的隐式转换
  复杂数据类型在隐式转换时，会先调用valueOf和toString两个函数，如果自身数据原型对象上没有相应函数，则会沿着原型链，最终调用到Object.prototype对象对应的函数上，所有对象都会继承这两个方法

  valueOf 返回这个逻辑对象上对应的原始类型的值，原始值是存储在栈中的简单数据段
  toString 返回这个对象的字符串表示

  - 转换规则如前所述，先用valueOf获取原始值，如果原始值不是基本类型，则使用toString转成字符串
  ```
  console.log([1,2] == '1,2') // true 解析如下

  console.log([1,2].valueOf()) // [1,2]，获取原始值
  console.log([1,2].toString()) // '1,2'，转成字符串，与右边数据相等

  var a = {}
  console.log(a == "[object Object]") // true

  // 左边转换过程
  console.log(a.valueOf()) // {}
  console.log({}.toString()) // "[object Object]"，再进行比较
  ```

### 逻辑非隐式转换与关系运算符隐式转换

- 逻辑非优先级高于关系运算符
```
console.log(![] == 0) // true 解析：空数组转换布尔型是true，取非后为false；false跟数字0比较，
布尔型被Number后为0，0 == 0

console.log([] == ![]) // true [].valueOf().toString()=>''; ![] => false 关系运算符将两边转成Number型进行比较，Number('') => 0; Number(false) => 0

console.log({} == !{}) // false 逻辑非优先级高，按照复杂类型隐式转换规则，左侧需通过valueOf和toString转换，转换结果为'[object Object]'，右侧{}转为Boolean为true，取反为false，字符串'[object Object]'和false比较，把false转为空字符串''，'[object Object]'和''比较，最终结果为false
```
- 引用数据类型的转化处理
  - 1.引用类型，可称为对象类型，包括Object、Array、Function、Date等；数据存在堆中，变量中存的是堆地址，我们只能操作存在栈内的引用地址；
  - 2.var声明的一般是栈内存
  - 3.7中基本数据类型的存储方式是值类型，存在于栈中
  ```
  console.log([] == []) // false 数组为引用类型，在堆中存放的是两份不同的数据，所以比较结果不相等
  console.log({} == {}) // false，同理，{}为引用类型，结果不相等
  ```

# JS数据类型检测
## 常用的的四种方案
+ typeof
	+ 语法： typeof [val] 返回当前值对应的数据类型，返回值为 string
	+ 返回值：'string' 'number' 'boolean' 'undefined' 'object' 'function' 'symbol' 'bigint' 七种基本类型 + 一种引用类型 以及 'function' (也是引用类型)
	+ 优势：检测基本类型还是很准确的 而且操作起来方便
	+ 劣势：
		+ typeof null === 'object' //无法准确区分 null 和 object
		+ typeof 检测数组、普通对象、正则、时间对象等类时，返回值都是 'object',所以无法对对象数据类型精确细分
+ instanceof 
	+ 语法：[val] instanceof [类] 通过检测这个值是否属于这个类，从而检测值是否为这个类型，返回一个布尔值
	+ 原理：只要当前实例的原型链 __proto__ 中出现这个类，检测结果都是 true
	+ 优势：对于数组、正则、时间对象、普通对象等 可以细分一下
	+ 劣势：无法用于检测 基本数据类型，
+ constructor
	+ 语法：[val].constructor === 类
	+ 优势：比 instanceof 好的一点是，可以检测基本数据类型，因为获取实例所属的 constructor 属性，实际是获取直接所属的类，所以比 instanceof更准确一点
	+ 劣势：construtor是可以被随意改动的
	+ 和 instanceof 类似，也是非专业检测数据类型的
+ Object.prototype.toString.call([val])  <==> ({}).toString.call([val])
	+ 语法：Object.prototype.toString.call([val]) 借用对象原型上的 toString 方法来检测数据类型，返回值都是字符串
	+ 返回值： "[object String]" "[object Number]" "[object Boolean]" "[object Undefined]" "[object Null]" "[object Object]" "[object Array]" "[object Function]" "[object Date]" "[object Symbol]"  "[object BigInt]" ....
	+ 原理：每种数据类型的内置原型上都有 toString 方法，但是都是用来转换字符串的，只有Object原型上的 toString方法是检测数据类型的；通过借用Object原型来调用其toString方法，以及 call 改变 this 指向为传入的值，结果就是检测传入值得数据类型，返回值为固定格式的字符串 "object [所属的类]"
	+ 最强大的数据类型检测方案
```
function type(data) {
  if (data == null) {
    return data + '';
  }
  return typeof data === "object" || typeof data === "function" ? ({}).toString.call(data).slice(8, -1).toLowerCase() : typeof data;
}
```
## 其它
+ 对于数组 有专门的API Array.isArray()
+ 对于NaN 有专门的API isNaN()

# JS运算符及其优先级
来自文章 https://juejin.cn/post/6844904048773201927 可以参考截图文件

- 1.逗号
- 2.展开运算符
- 3.yield yield*
- 4.赋值
- 5.条件运算法/三元运算符
- 6.逻辑或
- 7.逻辑与
- 8.按位或
- 9.按位异或
- 10.按位与
- 11.等号、非等号、全等号、非全等号
- 12.小于、小于等于、大于、大于等于、in instanceof
- 13.按位左移、按位右移、无符号右移
- 14.加法、减法
- 15.乘法、除法、取模
- 16.幂
- 17.逻辑非、按位非、一元加法、一元减法、前置递增/先加加、前置递减/先减减、typeof、void、delete、await
- 18.后置递增/加加、后置递减/减减
- 19.new[无参数列表]
- 20.成员访问/.语法、需计算的成员访问/对象[]、new[带参数列表]、函数调用、可选链
- 21.圆括号

# deepclone 深拷贝
+ 深拷贝  对拷贝后的变量进行更改，不会影响拷贝前变量  --- 拷贝前后的两个变量是没有关系的
+ 浅拷贝 改变拷贝前变量的内容，会对拷贝之后变量的内容有影响 --- 拷贝前后的变量是有关系的（共用引用地址）
+  判断是深拷贝还是浅拷贝，关键在于 引用关系
```
function deepClone (obj, hash = new WeakMap()){
    if(obj == null) return obj; // 覆盖 null、undefined
    if(typeof obj !== 'object') return obj; // 覆盖 函数 和 其它基本类型(string、number、boolean、Symbol、BigInt)
    if(hash.get(obj)) return hash.get(obj); // 覆盖 循环引用的对象
    let cloneObj = new obj.constructor;
    hash.set(obj, cloneObj);
    if(Object.prototype.toString.call(obj) === '[object Object]'){ // 判断是不是纯对象
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                cloneObj[key] = deepClone(obj[key], hash); // 递归拷贝多层级的object
            }
        }
    } else {
        cloneObj = new obj.constructor(obj); // 覆盖 Date、RegExp等object类
    }
    
    return cloneObj;
}

// // 函数
// var f = function (){console.log(1)}
// var cf = deepClone(f);
// console.log(cf);
// // 基本类型
// var obj = undefined;
// console.log('clone:', deepClone(obj));

// var obj = null;
// console.log('clone:', deepClone(obj));

// var obj = 123;
// console.log('clone:', deepClone(obj));

// var obj = '123';
// console.log('clone:', deepClone(obj));

// var obj = true;
// console.log('clone:', deepClone(obj));

// var obj = Symbol('123');
// console.log('clone:', deepClone(obj));

// var obj = BigInt(2);
// console.log('clone:', deepClone(obj));

// // 纯对象 -- 递归拷贝
// var obj = {a: 1, path: {x: 1, y: 2}};
// var cObj = deepClone(obj);
// obj.a = 2;
// obj.path.x = 100;
// console.log(cObj);


// // 数组
// var arr = [1, 2, 3, { a: 1, b: 2}];
// var cArr = deepClone(arr);
// console.log(cArr);

// // 内置类 Date等
// var obj = new Date('2019 10 02');
// var cObj = deepClone(obj);
// console.log('clone:', cObj);

// var obj = new RegExp('abc');
// var cObj = deepClone(obj);
// console.log('clone:', cObj);

// // 循环引用的对象 -- 需要使用WeakMap
// var obj = {a: 1, path: {x: 1, y: 2}};
// obj.o = obj; // 循环引用的对象  需要使用WeakMap来进行拷贝
// var cObj = deepClone(obj);
// console.log('clone:', cObj);

```

# 精度丢失

js中表示数字统一使用64位
+ 1位用来表示符号位
+ 11位用来表示指数
+ 52位表示尾数

计算机底层，数值的操作和运算都是采用二进制实现的，由于进制转换过程中产生的无限循环数字，计算机无法精确表示浮点数，而只能用二进制近似相等来表示浮点数的小数部分，故而产生精度丢失。
```
0.1 >> 0.0001 1001 1001 1001…（1001无限循环）
0.2 >> 0.0011 0011 0011 0011…（0011无限循环）
```
而大整数也存在同样的问题，因为表示尾数的尾数只有52位，因此 JS 中能精准表示的最大整数是 Math.pow(2, 53)，即十进制9007199254740992。
```
9007199254740992     >> 10000000000000...000 // 共计 53 个 0
9007199254740992 + 1 >> 10000000000000...001 // 中间 52 个 0
9007199254740992 + 2 >> 10000000000000...010 // 中间 51 个 0
9007199254740992 + 1 // 丢失        //9007199254740992 
9007199254740992 + 2 // 未丢失      //9007199254740994   
9007199254740992 + 3 // 丢失        //9007199254740992 
9007199254740992 + 4 // 未丢失      //9007199254740996  
```

十进制中的有穷数值，在计算机底层，可能是0、1循环的无限数值。产生精度丢失的根本原因就是二进制与十进制相互转换过程中产生的无限循环数字。

# JS位运算

### 位运算符
+ &： 按位与，a&b,两个位都为1时，结果才为1
+ |：按位或，a|b,两个位都为0时，结果才为0
+ ~：按位取反,~a,0变为1,1变为0
+ ^:按位异或,a^b,两个位相同为0，不同为1
+ <<:左移位，a<<2,各二进制位全部左移若干位，高位丢弃，低位补0
+ >>:右移位,a>>2,各二进制位全部右移若干位，对无符号数，高位补0，有符号数，右移补1
+ >>>:无符号右移位,x>>>2,各二进制全部右移若干位，高位补0，低位丢弃

### JS数字的标识
+ 二进制：0b、0B开头 如：0b10 对应十进制 2
+ 八进制：0、0O、0o开头 如：010 对应十进制 10
+ 十六进制： 0x、0X开头 如：0x10 对应十进制 16

### 数值精度

#### 在JavaScript中，浮点数的64位组成，从最左边开始
第1位：符号位，0代表整数，1代表负数
第2位到第12位：指数部分
第13位到第64位：小数部分（即有效数字）
#### 一个64位数字在JavaScript中的表示
(-1)符号位 * 1.xxxxxx小数部分 * 2^指数部分（0-2047）
其中，符号位有1位，指数部分占11位，小数部分占52位，决定精确度的是52位小数部分，IEEE 754规定，有效数字第一位默认是1，不保存在64位之中，也就是说有效数字的形式为1.xxxxxx，其中xxxxxxxx的部分保存在64位浮点数中，因此，JavaScript能提供的有效数字长度为53个二进制位。
#### 数值范围
JavaScript能够表示21024到2-1023（开区间），超过这个范围的数将无法表示。如果一个数大于等于2的1024次方，就会发生“正向溢出”，则JavaScript无法表示这么大的数字就会返回Infinity
如果一个数字小于等于2的-1075次方（指数部分最小值-1023，再加上小数部分的52位），那么就会发生为“负向溢出”，会直接返回0.

### 二进制中的负数
+ js中的数字都是64位双精度浮点数，某些运算必须要整数才可以运行，所以会自动将64位浮点数转化为32位整数，再进行运算。在js中，1和1.0是一样的
+ 负数在计算机中存储的是补码，首先计算机拿出负数的真码，符号位不动，其余位全部取反，取反的叫反码，然后将反码加上1就可以得到负数的补码，在计算机中负数就是存储的补码

```
a.-1 的二进制表示：
> 拿出真码    --> 1000 0000 0000 0000 0000 0000 0000 0001  // 也叫原码
> 得到反码    --> 1111 1111 1111 1111 1111 1111 1111 1110  // 真码取反
> 得到补码    --> 1111 1111 1111 1111 1111 1111 1111 1111  // 反码加1
由上述方法，那么-1在计算机存储的就是补码：1111 1111 1111 1111 1111 1111 1111 1111

注意：以上方法只针对负数存储，正数在计算机中，原反补码相同

b.对数字1取反：~1
1 对应的二进制是            --> 0000 0000 0000 0000 0000 0000 0000 0001
~1  对1的二进制序列进行取反  --> 1111 1111 1111 1111 1111 1111 1111 1110
这是得到的是存储在计算机中的补码，需要转换成真码，然后才能传换成十进制
 
> 取出补码       --> 1111 1111 1111 1111 1111 1111 1111 1110
> 得到反码       --> 1111 1111 1111 1111 1111 1111 1111 1101  //补码-1就得到反码
> 得到真码       --> 1000 0000 0000 0000 0000 0000 0000 0010  //符号位不变，其余全部取反，得到真码
> 转换成十进制 ---- 得到 -2
 
--所以 ~1 的结果为 -2

```
+ 实际js中可以通过number原型上的toString方法 把十进制数转为指定进制的数字，参数是指定的进制，返回值为字符串
+ 与toString对应的可以通过parseInt把指定进制的数字或数字字符串 转为十进制，第一个参数是要转换的数字或数字字符串，第二个参数是按照什么进制来转为10进制，返回值是一个十进制整数
+ parseFloat与parseInt的区别是只能解析10进制，没有第二个参数

```
var n = 9.625；
n.toString(2)； // '1001.101'  // 9.625转为二进制

parseInt(1001, 2); // 9 // 1001按二进制算 转为十进制后 对应的是 9
parseInt(1001, 3); // 28 // 1001按二进制算 转为十进制后 对应的是 28
```

### 位运算实例
```
  5&1 == 1; 0101&0001 == 0001;
  5|1 == 5; 0101|0001 == 0101;
  5^1 == 4; 0101^0001 == 0100;
  ~5 == 10; ~0101 == 1010;
  5 << 1 == 10; 0101 << 1 == 1010;
  5 >> 1 == 2; 0101 >> 1 == 0010;
  5 >>> 1 == 2; 0101 >>> 1 == 0010;
```

### 位运算应用
+ 非运算符判断数组中是否存在某一个值
```
  let arr = [4, 7, 10];
  if(~arr.indexOf(7)) {
    console.log('test');
  }
  // 原理：~-1 === 0
```
+ 按位左移运算符<< 迅速得出2的次方
```
console.log(1<<5);// 32 即2的5次方
// 注意：适合较小的数字，不要超出长度
var a = 2e10;
console.log(a<<2); // -1604378624
```
+ 按^ 切换变量0或1
```
// if判断 或 三目运算
let show；
show = show?0:1;
// 位运算
show^=1;
```
+ 按&判断奇偶性
```
console.log(7&1);
console.log(8&1);
```
+ 算法题：JS实现两个大数相加

### 总结
+ 位运算符针对的都是整数，所以对js完全无用，因为js内部，所有数字都保存为双精度浮点型，所用位运算时，js必须先将运算数转为整数，再进行运算，这样就降低了速度，所以js中应该少用位运算

