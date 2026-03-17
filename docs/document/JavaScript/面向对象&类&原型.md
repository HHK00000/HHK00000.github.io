## 面向对象编程
计算机程序由单个能够起到子程序作用的单元组成，核心概念是类和对象；
面向对象编程具有三个特性：封装、继承、多态；

- 封装 -- 封装一个类
- 继承 -- 类的继承
- 多态 -- 扩展类的多种方法

## 类

es5中没有类的类型，通过函数的原型prototype(作为构造函数)来模拟类，
new操作符可以为构造函数生成实例
es6中可以通过class定义一个类

## JS实现面向对象类的四种方法（https://juejin.cn/post/7089355670205497381）
- ES5中构造函数和原型式面向对象
- ES6中class定义类
- Object.create()式面向对象
- 对象模拟类

## 面向过程编程
一种以过程为中心的编程思想。

## ES6的类 class
+ 1.class类里面的constructor是构造方法，this代表实例对象，类不能被当做函数调用 只能通过 new 调用
+ 2.类的属性都挂在实例上;方法都挂在原型上,调用实例的方法，就是调用原型上的方法;如果单独调用内部方法，则this不存在
+ 3.静态属性和方法则只有类自身能够调用
+ 4.通过Object.assign可以很方便的一次向类添加多个方法
+ 5.类的内部定义的所有方法都是不可枚举的(enumerable)
+ 6.类的属性名、方法名可以采用变量、表达式
+ 7.constructor方法是类的默认方法，通过new命令生成对象实例时自动调用该方法。constructor方法默认返回实例对象(即this)，也可以返回另外一个对象，这会导致一些异常
    ```

    ```
+ 8.类的所有实例共用一个原型对象，可以通过实例的 __proto__ 为Class添加方法，出于这种共享对原始定义的改变，不推荐直接更改类的原型上的方法
+ 9.name属性 - 即类名
+ 10.可以像函数一样，通过表达式定义类，并写出一个立即执行的 Class
+ 11.Class 不存在变量提升  如果class有提升，会影响let声明的父类、class声明的子类的继承
+ 12.class 内部默认是严格模式（es6实际上把整个语言升级到了严格模式）
+ 13.Class之间可以通过extends关键字实现继承，在子类的constructor中使用super来更改this指向
+ 14.ES6 允许继承原生构造函数定义子类，因为ES6是先新建父类的实例对象this，然后再用子类的构造函数修饰this，这使得父类的所有行为都可以继承
+ 15.与ES5一样，在Class内部可以使用get和set关键字对某个属性设置存值函数和取值函数，拦截该属性的存取行为

## call

// call 的特点
// 1.可以改变当前函数的this指向，指向改为call的第一个参数
// 2.会让当前函数执行
// 3.可以通过arguments获取call中除第一个参数以外的其它参数

// 手写call方法

// 1.
// Function.prototype.call = function (context = window) {
//     console.log('call2')
//     context.fn = this;
//     let args = []; // 此处直接用 let args = [...arguments]; 会影响多次call时的this指向
//     for(let i = 1;i < arguments.length;i++){
//         args.push('arguments[' + i + ']');
//     }
//     // 利用数组的toString的特性
//     let r = eval('context.fn(' + args + ')');
//     delete context.fn;
//     return r;
// }

// 2.
// Function.prototype.call = function (target, ...args){
//     // this 指向调用myCall函数的函数
//     if(typeof this !== "function"){
//         throw new Error("not a function");
//     }
//     // target 更改后的this指向
//     target = target || window;
//     target.fn = this; // fn 字段不要与target已有字段冲突
//     let result = target.fn(...args);
//     delete target.fn;
//     return result;
// }

// call 的用法
// function fn1(){
//   console.log(this, arguments, 1);
// }
// fn1.call({a:1}, 2, 3, 4)

// function fn2(){
//   console.log(this, arguments, 2);
// }

// fn1.call.call.call(fn2);
// fn1.call2.call2.call2(fn2);

// fn1.call({a:1}, 2, 3, 4)
// fn1.call(fn2); // 指向fn1 同时修改this指向为fn2

## 手写apply方法

// 1.
// Function.prototype.apply = function (context = window) {
//     context.fn = this;
//     let args = arguments[0];
//     for(let i = 0;i < arguments.length;i++){
//         args.push('arguments[' + i + ']');
//     }
//     // 利用数组的toString的特性
//     let r = eval('context.fn(' + args + ')');
//     delete context.fn;
//     return r;
// }

// 2.
// Function.prototype.apply = function (context, args) {
//     context = context ? context : window;
//     context.fn = this;
//     console.log(args);
//     if(!args){
//         return context.fn();
//     }
//     // 利用数组的toString的特性
//     let r = eval('context.fn(' + args + ')');
//     delete context.fn;
//     return r;
// }



// 3.
// Function.prototype.myApply = function (target){
//     if(typeof this !== 'function'){
//         throw new Error("not a function");
//     }
//     if(!Array.isArray(arguments[1])){
//         throw new Error("not a Array");
//     }
//     target = target || window;
//     target.fn = this;
//     let args = arguments[1];
//     return target.fn(...args);
// }

// // test:
// let obj = { name: 123 };
// function foo(...args){
//     console.log(this.name, args);
// }
// foo.prototype.name = 125;
// const s1 = [1, 2, 3, 4, 5];
// const s = foo.myApply(obj, s1);
// console.log(obj);

## bind 的原理

// bind 基本用法
let obj = {
  name: 'hhk'
}
function fn (){
  console.log(this.name,arguments);
}
// let bindFunc = fn.bind(obj);
// bindFunc();
// bind 的特点
// 1.bind可以绑定this指向
// 2.bind可以返回一个绑定后的函数（高阶函数）
// 3.如果对绑定后的函数使用new操作符，那么绑定后的函数的this指向的是生成的实例

// 实现 bind
Function.prototype.bind = function (context){
  let that = this;
  let bindArgs = Array.prototype.slice(arguments, 1);
  function Fn (){}
  console.log('bind');
  function BindFunc() {
      let args = Array.prototype.slice(arguments, 1);
      return that.apply(this instanceof BindFunc ? this : context, bindArgs.concat(args));
  }
  Fn.prototype = this.prototype;
  BindFunc.prototype = new Fn();
  return BindFunc
}
let bindFunc = fn.bind(obj,1);
bindFunc(2);


// 其它实现
Function.prototype.myBind = function (thisArg){
  if(typeof this !== 'function'){
      throw new Error('Bind must be called on a function');
  }
  const args = Array.prototype.slice.call(arguments, 1),
      self = this,
      nop = function () {},
      bound = function () {
          // this instanceof nop //判断是否使用 new 来调用 bound
          // 如果是 new 来调用的话，this指向就是其实例
          // 如果不是 new 调用的话，就改变this指向到指定的对象 o
          return self.apply(
              this instanceof nop? this : thisArg,
              args.concat(Array.prototype.slice.call(arguments))
          );
      };
  // 箭头函数没有 prototype，箭头函数 this 永远指向它所在的作用域
  if(this.prototype){
      nop.prototype = this.prototype;
  }
  // 修改绑定函数的原型指向
  bound.prototype = new nop();
  return bound;
}

## 手写实现 new操作符

// 1.
// function mockNew (){
//     let Constructor = [].shift.call(arguments); // Constructor 是第一个参数 构造函数，arguments就是剩余的其它参数
//     let obj = {}; // new 返回的是一个 object，不能使用Object.create(null)是因为create出来的对象是一个纯对象 没有原型链关系
//     obj.__proto__ = Constructor.prototype;
//     let result = Constructor.apply(obj, arguments);
//     return typeof result === 'object'? result : obj;
// }

// let ani2 = mockNew(Animal, '动物类');
// console.log(ani2);

// 2.
// function myNew (fn){
//   let obj = {};
//   obj = Object.create(fn.prototype); // fn 是第一个参数 是构造函数
//   let args = Array.prototype.slice.call(arguments, 1); // 回去除fn以外的其它参数
//   // let result = fn.call(obj, args);
//   let result = fn.call(obj, ...args);
//   return typeof result === "object" || result instanceof Function ? result : obj; // 返回值不是object或function时 把创建出来的obj返回
// }

// function foo (){
//   this.name = 'ciel';
//   this.arg = arguments[0];
// }

// foo.prototype.callName = function (){
//   console.log(this.name);
// }

// let test = myNew(foo, 'hhh', 123, 'saf');
// test.callName();
// console.log(test, test.arg);