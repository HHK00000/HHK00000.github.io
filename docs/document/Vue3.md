# vue3

## vue3架构分层

Vue3整体分为四层，上层依赖下层，编译时做优化，运行时做渲染：
1.应用层：开发者编写组件、业务逻辑、使用组合式API
2.编译层：将模板解析成AST，经过转换优化，生成渲染函数
3.运行时层：包含虚拟DOM、diff算法、组件生命周期。负责VNode渲染与DOM更新
4.响应式层：给予Proxy实现依赖收集与派发更新，驱动视图相应变化

## Vue3 相比 Vue2 的区别

Vue内部根据功能可以分为三个模块：响应式 Reactivity、运行时 Runtime、编译器compiler，以及一些小的功能点。其中 响应式 Reactivity 是 运行时 Runtime的核心子模块，它是独立模块，可以单独抽离出来使用，但功能上、运行流程上属于运行时的一部分，且响应式是在程序运行时工作的

### 架构区别一 | 代码组织形式

+ Vue2 使用 Options API(选项式API)，代码按照data/methods/computed/watch分类，大型项目代码分散、难维护
+ Vue3 主推Composition API（组合式API），按业务逻辑组织代码，大型项目更清晰、复用性更强，兼容Vue2的写法

### 架构区别二 | 运行时 Runtime 和 编译时 Compile-time 的实现原理

#### Vue2运行时和编译时

+ Vue2整体架构：Vue 运行时为主，编译时很弱；编译时仅做模板解析，几乎不优化；运行时全量Diff、全量递归，负担很重；架构方便运行时更重
+ Vue2编译时具体工作：
  + 1.只把模板编译成render函数
  + 2.不做静态分析
  + 3.不做静态提升
  + 4.不打动态标记
  + 5.所有节点一律按动态节点处理
+ Vue2运行时具体工作：
  + 响应式：Object.defineProperty + 初始化全量递归
  + 虚拟 DOM：全量生成、全量Diff
  + 更新机制：组件级更新，一个数据变化 -> 整棵树Diff
  + 性能：静态节点也会参与Diff -> 浪费性能

#### Vue3运行时和编译时

+ Vue3整体架构：编译时做大量静态分析、标记优化，运行时偏向于精准更新、靶向更新，极轻量；架构方便编译时更重
+ Vue3编译时具体工作：
  + 1.静态提升(hoistStatic)：静态节点只创建一次，渲染时直接复用，+ 不参与更新
  + 2.PatchFlags(补丁标记)：给动态节点打上类型标记，运行时只更新变+ 化的部分
  + 3.Block Tree + 事件缓存:扁平化动态节点，事件函数缓存复用
+ Vue3运行时具体工作：
  + 响应式：Proxy + 懒代理，用到才代理
  + 虚拟 DOM：只比对动态节点
  + 更新机制：靶向更新，只更新需要更新的地方
  + 性能：极快、极轻量
+ Vue3 编译时流程：
  + 1.Parse（解析）：把模板字符串转为AST抽象语法树，识别标签、文本、插值、指令（v-if、v-for、@click）
  + 2.Transform（转换/优化，编译时核心），在AST上做编译时优化，全部在这里完成
  + 3.Generate（生成）：把优化后的AST 转为 可执行的render函数，注入运行时帮助函数（_createVNode/_openBlock）等
+ Vue3 编译时做的优化：
  + 1.静态分析 并进行 静态提升（hoistStatic）：把永远不变的节点提升到render外
  + 2.PatchFlags（动态标记优化）：给动态节点打标记，告诉运行时“我哪里会变”
  + 3.Block Tree：把含动态内容的节点编程Block，只diff动态子节点
  + 4.cacheHandlers（事件缓存）：缓存事件函数，避免每次渲染生成新函数
  + 5.其他：指令转JS（v-if->三元）、文本插值转_toDisplayString等
    + 什么是【静态分析】？
      静态分析 = 编译器在编译阶段，不执行代码，只看模板结构，分析：
      哪些节点是静态节点（永远不变）
      哪些节点是动态节点（会变：{{}}、:class、v-if 等）
      哪些节点是静态属性、动态属性
      哪些节点是纯文本、哪些是子节点变化
      编译器提前看懂模板，标记哪些要更新、哪些不用更新。

      ```html
        <div>
          <!-- 静态节点：永远不变 -->
          <h1>我是静态标题</h1>
          
          <!-- 动态节点：会变 -->
          <p>{{ msg }}</p>
        </div>
      ```

      ```js
        // Vue2 编译结果（不提升）
        render(){
          return h('div', [
            h('h1', '我是静态标题'), // 每次更新都重新创建
            h('p', ctx.msg)
          ])
        }
      ```

      ```js
      // Vue3 编译结果（静态提升）
      // 静态节点提升到外面，只创建 1 次
      const _hoisted_1 = h('h1', '我是静态标题')

      render(){
        return h('div', [
          _hoisted_1, // 直接复用，不重新创建
          h('p', ctx.msg)
        ])
      }
      ```

    + 静态树提升（hoistStatic 大型静态节点）
      连续多个静态节点 → 打包成一个静态树，整体提升，完全不参与 diff

      ```js
        // 静态提升：三个静态节点被整体打包提升，只创建一次
        const _hoisted_1 = [
          h('header'),
          h('nav'),
          h('footer')
        ]

        function render(ctx) {
          return h('div', [
            // 直接复用静态节点数组，不重新创建
            ..._hoisted_1,
            // 动态节点留在 render 里，每次更新都处理
            ctx.msg,
            // 同时给这个 div 打上 PatchFlag，告诉运行时只需要 diff 它的 CHILDREN
            PatchFlags.CHILDREN
          ])
        }
        // 编译器不会因为节点里有动态内容，就放弃优化它的静态部分，而是做了更细粒度的 “局部静态提升”：
        // 动态节点（如 {{ msg }}）留在 render 函数里，参与更新。
        // 它的静态兄弟节点被整体提升，一次创建、永久复用，完全不参与 diff。
        // 这就是 Vue3 比 Vue2 聪明的地方：编译时做的静态分析越细，运行时的负担就越轻。
      ```

    + PatchFlag（动态标记优化）【最重要】
      作用：给动态节点打标记，运行时只 diff 动态部分，跳过静态内容
      标记类型（常见）
        TEXT = 1 文本变化 {{}}
        CLASS = 2 class 变化
        STYLE = 4 style 变化
        PROPS = 8 属性变化（:data/:id）
        FULL_PROPS = 16 含动态key，需全量diff
        HYDRATE_EVENTS = 32 含事件

        ```ts
          export const enum PatchFlags {
          // 1. 文本动态
          TEXT = 1, // 0b000000000001

          // 2. class 动态
          CLASS = 1 << 1, // 2  0b000000000010

          // 3. style 动态
          STYLE = 1 << 2, // 4  0b000000000100

          // 4. 普通 props 动态（非 class/style）
          PROPS = 1 << 3, // 8  0b000000001000

          // 5. 含动态 key 的 props（需全量 diff）
          FULL_PROPS = 1 << 4, // 16 0b000000010000

          // 6. 服务端渲染：需要 hydrate 的事件
          HYDRATE_EVENTS = 1 << 5, // 32 0b000000100000

          // 7. Fragment：子节点顺序固定、稳定
          STABLE_FRAGMENT = 1 << 6, // 64 0b000001000000

          // 8. Fragment：子节点带 key
          KEYED_FRAGMENT = 1 << 7, // 128 0b000010000000

          // 9. Fragment：子节点无 key
          UNKEYED_FRAGMENT = 1 << 8, // 256 0b000100000000

          // 10. 仅 ref / 指令需要 patch，props 不用
          NEED_PATCH = 1 << 9, // 512 0b001000000000

          // 11. 动态插槽
          DYNAMIC_SLOTS = 1 << 10, // 1024 0b010000000000

          // 12. 开发环境：根 Fragment
          DEV_ROOT_FRAGMENT = 1 << 11, // 2048 0b100000000000

          // 特殊标记（非位运算）
          HOISTED = -1, // 静态提升节点
          BAIL = -2     // 退出优化（复杂动态结构）
        }
        ```

      Vue2：全量 diff 整棵树  -> O(n)
      Vue3：只 diff 标记的动态部分 -> O(1),性能提升巨大

      ```html
        <div>{{ msg }}</div>
        <div :class="cls"></div>
      ```

      ```js
        h('div', msg, **TEXT**)    // 只 diff 文本
        h('div', {class: cls}, **CLASS**) // 只 diff class
      ```

      ```html
        <div :class="activeClass" :title="tip">{{ message }}</div>
      ```

      ```js
        _createVNode(
          "div",
          {
            class: _normalizeClass(_ctx.activeClass),
            title: _ctx.tip
          },
          _toDisplayString(_ctx.message),
          1 | 2 | 8 // TEXT(1) + CLASS(2) + PROPS(8)
        )
      ```

    + Block Tree：把动态节点 “圈起来”，只 diff 圈内的变化
    + Block：含动态子节点的 VNode（根节点、v-if/v-for 自动成为 Block）
    + Block 会收集所有后代动态节点到 dynamicChildren 数组
    + 运行时 diff：只遍历 dynamicChildren，跳过所有静态节点

      ```html
        <form>
          <div>静态提示：</div>
          <input v-model="username" /> <!-- 动态 -->
          <div>静态密码：</div>
          <input v-model="pwd" />      <!-- 动态 -->
        </form>
      ```

      ```js
        // form 是 Block
        _createBlock("form", null, [
          _hoisted_1, // 静态 div（提升）
          _createVNode("input", { /* ... */ }, null, 8 /* PROPS */), // 动态
          _hoisted_2, // 静态 div（提升）
          _createVNode("input", { /* ... */ }, null, 8 /* PROPS */)  // 动态
        ], 
        // Block 的 dynamicChildren：只存动态节点
        [
          _createVNode("input", ...),
          _createVNode("input", ...)
        ])
      ```

    + 运行时 diff：
      + 不遍历整棵树，直接遍历 dynamicChildren 数组
      + 静态节点(div标签)完全跳过
    + DOM 树 100 个节点，5 个动态 → 只 diff 5 个，时间复杂度从 O(tree) → O(dynamic)

    + 事件缓存（cacheHandler）：事件函数 “只创建一次”
      事件缓存是 Vue3 编译时的优化之一，核心目的是：避免每次组件重新渲染时，为模板中的事件绑定创建新的函数实例，从而防止子组件因 props 变化而触发不必要的更新。

      ```html
        <!-- Vue2 未优化场景: -->
        <!-- 父组件模板 -->
        <Child @click="handleClick" />
      ```

      ```js
        // 每次父组件渲染，都会生成一个新的匿名函数
        function render() {
          return h(Child, {
            onClick: (...args) => handleClick(...args)
          })
        }
      ```

      vue2中，每次父组件更新，都会生成一个全新的函数对象传给 Child 组件。子组件的 props 对比时，会认为 onClick 发生了变化，触发不必要的更新（即使函数逻辑完全没变）
      vue3编译器会给事件绑定函数加上缓存标识，编译后在 render 函数里复用缓存的函数：
        1._cache 数组会和组件实例绑定，在组件生命周期内永久存在。
        2.第一次渲染时，创建 handleClick 的代理函数并存入_cache[0]。
        3.后续渲染时，直接复用 _cache[0] 中的函数实例，不会生成新函数。
        4.子组件收到的 onClick 永远是同一个引用，不会触发不必要更新。
        5.即使带参数，编译器依然会把整个函数表达式缓存到_cache 中，实现复用。

      ```html
        <button @click="handleClick(id)">删除</button>
      ```

      ```js
        // 编译后的 render 函数（带缓存）
        import { h, cacheHandlers } from 'vue'

        export function render(_ctx, _cache) {
          return h('button', {
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.handleClick(_ctx.id, $event))
          }, '删除')
        }
      ```

      注意事项：
        1.只有固定的事件绑定会被缓存：动态事件名（如 @[eventName]）不会被缓存，因为事件名本身可能变化。
        2.内联箭头函数无法缓存：如果直接写 @click="() => {}"，每次渲染都会生成新函数，缓存无效。建议统一写在 setup 中再引用。
        3.缓存仅在组件实例内有效：每个组件实例的 _cache 是独立的，不会跨实例复用。
+ Vue3 运行时流程：（运行时 = 页面跑起来后，负责渲染、更新、销毁的核心引擎）
  + 1.创建虚拟DOM（VNode）：把 render 函数 -> 生成 VNode 树
  + 2.挂载（mount）：把VNode -> 生成真实DOM -> 插到页面中
  + 3.执行响应式副作用函数（effect）：数据变化 -> 响应式更新 -> 触发组件重新渲染
  + 4.更新（patch/diff）：数据变化 -> 生成新VNode -> 比对新旧VNode -> 更新DOM
  + 5.卸载（unmount）：组件销毁 -> 清理DOM、事件、副作用函数
+ Vue3 运行时做的优化：
  + 基于PatchFlag的靶向更新（最核心的运行时优化）：编译时已经打好PatchFlag标记，运行时根据标记只更新对应内容，不做全量比对
      1.只判断patchFlag
      2.只更新：文本/class/style/props
      3.其它内容完全不对比

      ```html
        <div>{{ msg }}</div>
      ```

      ```js
        // 编译后：
        _createVNode('div', null, ctx.msg, 1) // 1 = TEXT
      ```

      ```js
        // 运行时执行的优化逻辑：
        // 运行时内部 diff 代码
          function patch(n1, n2) {
            const { patchFlag } = n2

            // 👇 只看标记，只更文本，其他一律不看
            if (patchFlag & 1 /* TEXT */) {
              n2.el.textContent = n2.children
            }
          }
      ```

  + Block Tree + dynamicChildren 快速 diff（第二大运行时优化）
    + 运行时不遍历整棵 DOM 树
    + 只遍历 dynamicChildren

      ```js
        // 编译后结构
        _createBlock('div', null, [
          静态节点,
          静态节点,
          动态p,
          动态button
        ], [动态p, 动态button])
      ```

      ```js
        // 运行时 diff 逻辑
        // 运行时只遍历动态子节点
        function patchBlockChildren(n1, n2) {
          for (let i = 0; i < n2.dynamicChildren.length; i++) {
            patchElement(n1.dynamicChildren[i], n2.dynamicChildren[i])
          }
        }
      ```

  + 静态提升节点 跳过 Diff（运行时直接跳过）
    + 编译时提升好的静态节点 hoisted
    + 运行时直接跳过，不创建、不对比、不更新

      ```js
        // 编译后
        const _hoisted_1 = createVNode(...) // HOISTED=-1
      ```

      ```js
        // 运行时逻辑
        if (vnode.patchFlag === -1) {
          // 静态提升节点
          return // 直接跳过，什么都不做
        }
      ```

  + 响应式系统 懒代理 + 细粒度 effect（运行时优化）
    + 不递归全量代理，初始只代理第一层
    + 子对象、深层对象用到才代理（懒代理）
    + 组件更新是函数级 effect，不是整个组件更新

      ```js
        const state = reactive({
          user: { name: 'xx' }, // 一开始不代理深层
          list: [1, 2, 3]
        })

        // 运行时访问到才代理深层
        state.user.name // → 这时才深层代理
      ```

### 响应式的区别

+ vue2响应式：
  + 底层：ES5 Object.defineProperty
  + 方式：属性劫持（遍历对象每个key，逐个劫持）
  + 劫持范围：属性级别，必须递归遍历所有属性才能劫持
  + 局限性（无法监听）：
      1.对象新增属性无法监听 -- hack手段：this.$set
      2.对象删除属性无法监听 -- hack手段：Vue.delete
      3.数组下表修改无法监听 (arr[0] = 1) -- hack手段：重写数组7个方法(push/pop/shift/unshift/splice/sort/reverse)
      4.数组长度修改无法监听 (arr.length = 0) -- hack手段：重写数组7个方法(push/pop/shift/unshift/splice/sort/reverse)
  + 性能：初始化必须递归遍历所有属性，耗性能
  + 兼容性：支持IE9+
  + 对循环引用对象的支持：完全不支持，无限递归之后栈溢出
+ vue3响应式（reactive）：
  + 底层：ES6 代理 Proxy + 反射 Reflect
  + 方式：对象代理（直接代理整个对象，不遍历属性）
  + 劫持范围：对象级别，直接代理整个对象，不用遍历
  + 优势（全部能监听）：
      1.对象增删
      2.数组下标/长度修改
      3.Map/Set
      4.深层对象
  + 性能：懒代理，初始化只代理第一层,嵌套子对象及深层属性用到才代理，速度更快
  + 兼容性：不支持IE（因为Proxy无法polyfill）
  + 对循环引用对象的支持：可以运行和使用，但在JSON.stringify序列化时会报错。 -- 基于WeakMap模式的 代理Proxy 保证了循环引用在读取和运行时不会报错，基于JSON标准，所有循环引用对象都无法被序列化
    + 为什么循环引用对象不能被序列化:
      1.基于JSON标准，JSON是树形结构，不能有环
      2.序列化时会递归遍历对象，遇到循环引用，会导致无限递归
      3.触发 浏览器/Node 的保护机制，直接报错，这是JSON标准规定的，不是Vue或JS的问题
+ vue3响应式（ref）
  + 底层：基础类型用ES5 getter/setter，完全不依赖 Proxy；对象类型会自动调用reactive，底层变为 Proxy + Reflect
  + 方式：包装一层对象，劫持对象的`.value`属性；对象类型会自动转为reactive代理
  + 劫持范围：属性级别，进劫持.value属性，为基础类型提供响应式能力
  + 优势：
      1.支持基础类型（number/string/boolean/undefined等）的响应式
      2.模板中可自动解包，不用写.value
      3.结构赋值不丢失响应式，本质是对.value的引用（reactive直接解构赋值会丢失响应式）
  + 性能：基础类型唔额外遍历开销，对象类型自动复用 reactive 的懒代理逻辑
  + 兼容性：不支持IE，依赖Proxy，虽然getter/setter在IE9+中可用，但整体受限于 Proxy

### 生命周期变化

+ Vue2与Vue3生命周期对比：
  + 创建阶段/执行时机变化：
    + vue2中必须先创建实例，再执行生命周期，再初始化data/methods，this指向实例，生命周期即是实例的同步步骤
    + vue3中setup在实例创建前执行，没有this，生命周期不是步骤而是注册回调，setup = beforeCreate + created + 数据初始化
  + 实现原理架构差异：
    + Vue2生命周期 = 选项式 + 选项顺序驱动，生命周期是实例的属性
    + Vue3生命周期 = 组件实例 + 副作用(Effect)驱动
    + Vue3生命周期从【选项】变成【函数注册】，生命周期变成可注册的钩子函数，是独立的Hook函数，通过injectHook注册到实例上；可函数调用、可写多个、可抽离到独立文件、可逻辑复用 -- Vue3要支持函数式编程、逻辑复用
+ vue2 单组件生命周期（初始化 -> 更新 -> 销毁）：
  + 全生命周期：beforeCreate → created → beforeMount → mounted → beforeUpdate → updated → beforeDestroy → destroyed
  + 初始化：beforeCreate → created → beforeMount → mounted
  + 更新：beforeUpdate → updated
  + 销毁：beforeDestroy → destroyed
+ vue2 父子组件顺序：
  + 初始化：父beforeCreate → 父created → 父beforeMount → 子beforeCreate → 子created → 子beforeMount → 子mounted → 父mounted
  + 更新：父beforeUpdate → 子beforeUpdate → 子updated → 父updated
  + 销毁：父beforeDestroy → 子beforeDestroy → 子destroyed → 父destroyed
+ vue3单组件生命周期（初始化 -> 更新 -> 销毁）：
  + 全生命周期：setup → onBeforeMount → onMounted → onBeforeUpdate → onUpdated → onBeforeUnmount → onUnmounted
  + 初始化：setup → onBeforeMount → onMounted
  +更新：onBeforeUpdate → onUpdated
  +销毁：onBeforeUnmount → onUnmounted
+ vue3 父子组件顺序：
  + 初始化：父setup → 父onBeforeMount → 子setup → 子onBeforeMount → 子onMounted → 父onMounted
  + 更新：父onBeforeUpdate → 子onBeforeUpdate → 子onUpdated → 父onUpdated
  + 销毁：父onBeforeUnmount → 子onBeforeUnmount → 子onUnmounted → 父onUnmounted
+ Vue3 新增钩子
  + onRenderTracked：响应式依赖被追踪时触发（调试用）
  + onRenderTriggered：响应式数据变化触发重新渲染时（调试用）
  + onErrorCaptured：捕获子组件错误（Vue2 也有，Vue3 组合式需手动引入）

+ Vue3用setup替换beforeCreate和created的思考：
beforeCreate /created 本质是实例初始化流程；而 setup 是全新的函数式入口，本质是一个组件入口函数，完全不需要这两个步骤，且setup执行时机比beforeCreate还早，这是一种架构的重新设计，深层原因有一下以下几个：
  + 1.彻底去掉 this，让组件变成纯函数， 从 “基于实例的类模式” 彻底转向了 “函数式组合模式”，更容易类型推导（TS）
  + 2.把 “数据创建” 和 “组件实例” 解耦
  + 3.让逻辑可复用、可组合（Composables）
  + 4.生命周期从 “实例步骤” 变成 “独立 Hook”

```html
<!-- Vue2完整demo -->
  <div id="app"></div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.7/dist/vue.js"></script>
  <script>
  new Vue({
    el: '#app',
    template: `<div>{{ msg }}</div>`,
    data() {
      return { msg: 'hello' }
    },
    beforeCreate() {
      console.log('Vue2 beforeCreate：实例刚创建，data 未初始化')
    },
    created() {
      console.log('Vue2 created：data 已就绪，DOM 未生成', this.msg)
    },
    beforeMount() {
      console.log('Vue2 beforeMount：挂载前')
    },
    mounted() {
      console.log('Vue2 mounted：DOM 挂载完成，可操作 DOM')
    },
    beforeUpdate() {
      console.log('Vue2 beforeUpdate：数据变，DOM 更新前')
    },
    updated() {
      console.log('Vue2 updated：DOM 更新完成')
    },
    beforeDestroy() {
      console.log('Vue2 beforeDestroy：实例销毁前，清定时器')
    },
    destroyed() {
      console.log('Vue2 destroyed：实例完全销毁')
    }
  })
  </script>
```

```html
<!-- Vue3完整demo -->
  <div id="app"></div>

  <script type="module">
  import { createApp, ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

  createApp({
    setup() {
      console.log('Vue3 setup：最早执行，替代 beforeCreate + created + 数据初始化')
      const msg = ref('hello')

      onBeforeMount(() => {
        console.log('Vue3 onBeforeMount：挂载前')
      })
      onMounted(() => {
        console.log('Vue3 onMounted：DOM 挂载完成')
      })
      onBeforeUpdate(() => {
        console.log('Vue3 onBeforeUpdate：更新前')
      })
      onUpdated(() => {
        console.log('Vue3 onUpdated：更新完成')
      })
      onBeforeUnmount(() => {
        console.log('Vue3 onBeforeUnmount：卸载前')
      })
      onUnmounted(() => {
        console.log('Vue3 onUnmounted：卸载完成')
      })

      return { msg }
    },
    template: `<div>{{ msg }}</div>`
  }).mount('#app')
  </script>
```

+ vue2 生命周期钩子函数源码

  ```js
    // 
    // 1.vue2 入口 _init初始化

    // src/core/instance/index.js
    Vue.prototype._init = function (options) {
      const vm = this
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {}
      )

      // 初始化生命周期相关状态
      initLifecycle(vm)
      // 初始化事件监听
      initEvents(vm)
      // 初始化渲染相关
      initRender(vm)

      // 调用 beforeCreate 钩子
      callHook(vm, 'beforeCreate')

      // 初始化注入
      initInjections(vm)
      // 初始化 data/props/computed/watch（核心）
      initState(vm)
      // 初始化 provide
      initProvide(vm)

      // 调用 created 钩子
      callHook(vm, 'created')

      // 如果配置了 el，自动挂载
      if (vm.$options.el) {
        vm.$mount(vm.$options.el)
      }
    }
    // 2.vue2 挂载阶段：$mount → mountComponent
    // src/core/instance/lifecycle.js
    Vue.prototype.$mount = function (el) {
      el = el && inBrowser ? query(el) : undefined
      return mountComponent(this, el)
    }

    function mountComponent(vm, el) {
      vm.$el = el

      // 调用 beforeMount 钩子
      callHook(vm, 'beforeMount')

      // 定义更新函数
      const updateComponent = () => {
        vm._update(vm._render())
      }

      // 创建渲染 watcher，触发首次渲染
      new Watcher(vm, updateComponent, noop, {
        before() {
          // 数据更新时，在 patch 前调用 beforeUpdate
          if (vm._isMounted && !vm._isDestroyed) {
            callHook(vm, 'beforeUpdate')
          }
        }
      }, true)

      vm._isMounted = true
      // 调用 mounted 钩子
      callHook(vm, 'mounted')
    }
    // 3.vue2 更新阶段：_update 后触发 updated
    // src/core/instance/lifecycle.js
    Vue.prototype._update = function (vnode) {
      const vm = this
      const prevVnode = vm._vnode
      vm._vnode = vnode

      if (!prevVnode) {
        // 首次渲染：挂载 DOM
        vm.$el = vm.__patch__(vm.$el, vnode)
      } else {
        // 更新：diff 新旧 VNode，更新 DOM
        vm.$el = vm.__patch__(prevVnode, vnode)
      }

      // 如果是更新过程，且已挂载，调用 updated 钩子
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'updated')
      }
    }
    // 4.vue2 销毁阶段：$destroy
    // src/core/instance/lifecycle.js
    Vue.prototype.$destroy = function () {
      const vm = this
      if (vm._isBeingDestroyed) return

      // 调用 beforeDestroy 钩子
      callHook(vm, 'beforeDestroy')
      vm._isBeingDestroyed = true

      // 移除父组件引用
      const parent = vm.$parent
      if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
        remove(parent.$children, vm)
      }

      // 销毁 watcher
      if (vm._watcher) {
        vm._watcher.teardown()
      }
      let i = vm._watchers.length
      while (i--) {
        vm._watchers[i].teardown()
      }

      // 移除事件监听
      vm.$off()

      // 标记已销毁
      vm._isDestroyed = true
      // 调用 destroyed 钩子
      callHook(vm, 'destroyed')

      // 解绑 DOM
      vm.$el = vm.$parent = null
    }
    // 5.vue2 通用钩子调用工具函数 callHook
    // src/core/instance/lifecycle.js
    export function callHook(vm, hook) {
      const handlers = vm.$options[hook]
      if (handlers) {
        for (let i = 0; i < handlers.length; i++) {
          try {
            // 钩子函数的 this 指向 vm
            handlers[i].call(vm)
          } catch (e) {
            handleError(e, vm, `${hook} hook`)
          }
        }
      }
    }
  ```

+ vue3 生命周期钩子函数源码

  ```ts
  // 1.关键枚举（源码 component.ts）
    export const enum LifecycleHooks {
      BEFORE_CREATE = 'bc',
      CREATED = 'c',
      BEFORE_MOUNT = 'bm',
      MOUNTED = 'm',
      BEFORE_UPDATE = 'bu',
      UPDATED = 'u',
      BEFORE_UNMOUNT = 'bum',
      UNMOUNTED = 'um',
      ACTIVATED = 'a',
      DEACTIVATED = 'da'
    }
  // 2.钩子注册：createHook + injectHook（源码简化）
    // 2.1 injectHook：把钩子存入组件实例
    // packages/runtime-core/src/apiLifecycle.ts
    export function injectHook(
      type: LifecycleHooks,
      hook: Function,
      target = currentInstance
    ) {
      if (!target) return
      // 实例上对应 key 存数组，多次注册就 push
      const hooks = target[type] || (target[type] = [])
      hooks.push(hook)
    }
    // 2.2 createHook：生成 onXxx 函数
    export function createHook(type: LifecycleHooks) {
      return function (hook: Function, target?: ComponentInternalInstance | null) {
        injectHook(type, hook, target)
      }
    }

    // 导出给用户用的 API
    export const onBeforeMount = createHook('bm')
    export const onMounted = createHook('m')
    export const onBeforeUnmount = createHook('bum')
    export const onUnmounted = createHook('um')
    export const onActivated = createHook('a')
    export const onDeactivated = createHook('da')

    //2.3 业务代码
    import { onMounted, onUnmounted } from 'vue'

    onMounted(() => { console.log('挂载完成') })
    onUnmounted(() => { console.log('卸载完成') })
    // 等价于
    injectHook('m', () => { ... })
    injectHook('um', () => { ... })
  // 3.钩子触发：callHook + 渲染流程（patch
    // 3.1 callHook：执行实例上的钩子数组
      // packages/runtime-core/src/component.ts
      export function callHook(
        instance: ComponentInternalInstance,
        type: LifecycleHooks
      ) {
        const hooks = instance[type]
        if (hooks) {
          for (const hook of hooks) {
            hook() // 逐个执行
          }
        }
      }
    // 3.2 挂载阶段执行顺序（简化版）
      // patch -> processComponent -> mountComponent
      function mountComponent(instance) {
        // 1. 执行 setup（替代 beforeCreate + created）
        setup()

        // 2. beforeMount
        callHook(instance, 'bm')

        // 3. 渲染 DOM（生成 vnode -> 真实 DOM）
        render()

        // 4. mounted
        callHook(instance, 'm')
      }
    // 3.3卸载阶段（关键：unmount 只管 DOM）
      function unmountComponent(instance) {
        // 1. beforeUnmount（DOM 卸载前）
        callHook(instance, 'bum')

        // 2. 移除 DOM
        removeDOM()

        // 3. unmounted（DOM 卸载后）
        callHook(instance, 'um')
      }
  // 4.KeepAlive 如何劫持生命周期（源码逻辑
        // KeepAlive 缓存组件的核心
        // 缓存 vnode + 组件实例
        // 切走：不执行 unmount，只执行 deactivated
        // 切回：不执行 mount，只执行 activated
      // KeepAlive 渲染时
        function render() {
          const cachedVNode = this.cache[key]
          if (cachedVNode) {
            // 命中缓存：复用实例，不走 mount
            vnode.componentInstance = cachedVNode.componentInstance
            // 触发 activated
            callHook(vnode.componentInstance, 'a')
          } else {
            // 首次渲染：正常 mount
            mountComponent(vnode.componentInstance)
          }
        }

        // 切走时（离开 KeepAlive）
        function deactivate(vnode) {
          // 不调用 unmountComponent！
          // 只触发 deactivated
          callHook(vnode.componentInstance, 'da')
          // 缓存实例
          this.cache[key] = vnode
        }

  ```

### 全局API变化

+ vue2所有全局方法都在Vue 构造函数上 Vue.component()、Vue.directive()、Vue.use()、Vue.mixin()、Vue.prototype.$http = xxx；有以下弊端：
  + 所有Vue实例共享，容易全局污染
  + 多应用无法隔离 -> 两个app回互相影响
  + Tree-shaking 无效 -> 不用的方法也会被打包
+ vue2 与 vue3 全局API对照

  ```js
  // 1.创建应用实例
  // vue2
  import Vue from 'vue'
  import App from './App.vue'

  new Vue({
    render: h => h(App)
  }).$mount('#app')
  // vue3
  import { createApp } from 'vue'
  import App from './App.vue'

  const app = createApp(App)
  app.mount('#app')
  // 2.注册全局组件
  // vue2
  Vue.component('MyButton', MyButton)
  // vue3
  app.component('MyButton', MyButton)
  // 3.注册全局指令
  // vue2
  Vue.directive('focus', { ... })
  // vue3
  app.directive('focus', { ... })
  // 4.安装插件（Vue.use）
  // vue2
  Vue.use(router)
  Vue.use(vuex)
  // vue3
  app.use(router)
  app.use(vuex)
  // 5.全局混入（mixin）
  // vue2
  Vue.mixin({ ... })
  // vue3
  app.mixin({ ... })
  // 6.全局配置（config）
  // vue2
  Vue.config.productionTip = false
  Vue.config.devtools = true
  // vue3
  app.config.productionTip = false
  app.config.devtools = true
  // 7.全局属性挂载（Vue.prototype）
  // vue2（所有组件共享）
  Vue.prototype.$http = axios
  // vue3（app.config.globalProperties 仅对当前实例生效）
  app.config.globalProperties.$http = axios
  // 8.提供 / 注入（依赖注入）
  // vue2
  Vue.prototype._provided = { ... }
  // vue3
  app.provide('key', value)
  ```

+ 被删除的全局API
  + vue2的 Vue.observable()删除；vue3用reactive()替代
  + Vue.config.productionTip → 删除；Vue3 自动关闭
  + Vue.util → 私有化；不再对外暴露
+ Vue3新增的全局API
  + app.unmount()
  + app.provide() / inject
  + createApp()
+ 1

### 其它重要变化

  1.Vue3 对 TS 的支持更好
  2.Vue3 支持 Fragments（多根节点）
  3.Vue3 移除了过滤器 filter
  4.Vue3 移除了 on、off事件总线
  5.Vue3 打包体积更小（Tree-shaking更好）
