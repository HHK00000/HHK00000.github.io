import{_ as s,c as a,o as p,ae as e}from"./chunks/framework.CLNW5JS9.js";const h=JSON.parse('{"title":"数据结构","description":"","frontmatter":{},"headers":[],"relativePath":"document/dataStructures.md","filePath":"document/dataStructures.md"}'),l={name:"document/dataStructures.md"};function i(c,n,t,r,o,u){return p(),a("div",null,n[0]||(n[0]=[e(`<h1 id="数据结构" tabindex="-1">数据结构 <a class="header-anchor" href="#数据结构" aria-label="Permalink to &quot;数据结构&quot;">​</a></h1><p>推荐及参考书目《学习JavaScript数据结构与算法》第3版 （巴西）洛伊安妮·格罗纳著 无双 邓刚 孙晓博等译</p><h2 id="栈" tabindex="-1">栈 <a class="header-anchor" href="#栈" aria-label="Permalink to &quot;栈&quot;">​</a></h2><h2 id="队列" tabindex="-1">队列 <a class="header-anchor" href="#队列" aria-label="Permalink to &quot;队列&quot;">​</a></h2><h2 id="链表" tabindex="-1">链表 <a class="header-anchor" href="#链表" aria-label="Permalink to &quot;链表&quot;">​</a></h2><h2 id="集合" tabindex="-1">集合 <a class="header-anchor" href="#集合" aria-label="Permalink to &quot;集合&quot;">​</a></h2><h2 id="字段和散列表" tabindex="-1">字段和散列表 <a class="header-anchor" href="#字段和散列表" aria-label="Permalink to &quot;字段和散列表&quot;">​</a></h2><h2 id="二叉搜索树" tabindex="-1">二叉搜索树 <a class="header-anchor" href="#二叉搜索树" aria-label="Permalink to &quot;二叉搜索树&quot;">​</a></h2><h2 id="图" tabindex="-1">图 <a class="header-anchor" href="#图" aria-label="Permalink to &quot;图&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// JS 实现常见数据结构： 栈、队列、链表、字典、二叉树</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 1.栈结构 </span></span>
<span class="line"><span>// 栈的特点:先进后出</span></span>
<span class="line"><span>class Stack {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    this.items = [];</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 入栈</span></span>
<span class="line"><span>  push(ele) {</span></span>
<span class="line"><span>    this.items.push(ele);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 出栈</span></span>
<span class="line"><span>  pop() {</span></span>
<span class="line"><span>    return this.items.pop();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 末位</span></span>
<span class="line"><span>  get peek() {</span></span>
<span class="line"><span>    return this.items[this.items.length - 1];</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 是否为空栈</span></span>
<span class="line"><span>  get isEmpty() {</span></span>
<span class="line"><span>    return !this.items.length;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 长度</span></span>
<span class="line"><span>  get size() {</span></span>
<span class="line"><span>    return this.items.length;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 清空栈</span></span>
<span class="line"><span>  clear() {</span></span>
<span class="line"><span>    this.items = [];</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//</span><span> // 实例化一个栈</span></span>
<span class="line"><span>// const stack = new Stack();</span></span>
<span class="line"><span>// console.log(stack, stack.isEmpty);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//</span><span> // 添加元素</span></span>
<span class="line"><span>// stack.push(5);</span></span>
<span class="line"><span>// stack.push(8);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//</span><span> // 读取属性再添加</span></span>
<span class="line"><span>// console.log(stack.peek); </span></span>
<span class="line"><span>// stack.push(11);</span></span>
<span class="line"><span>// console.log(stack.size);</span></span>
<span class="line"><span>// console.log(stack.isEmpty);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 2.队列结构</span></span>
<span class="line"><span>// 队列：先进先出</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Queue {</span></span>
<span class="line"><span>  constructor(items) {</span></span>
<span class="line"><span>    this.items = items || [];</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  enqueue(element) {</span></span>
<span class="line"><span>    this.items.push(element);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  dequeue() {</span></span>
<span class="line"><span>    return this.items.shift();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  front() {</span></span>
<span class="line"><span>    return this.items[0];</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  clear() {</span></span>
<span class="line"><span>    this.items = [];</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  get size() {</span></span>
<span class="line"><span>    return this.items.length;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  get isEmpty() {</span></span>
<span class="line"><span>    return !this.items.length;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  print() {</span></span>
<span class="line"><span>    console.log(this.items.toString());</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// const queue = new Queue();</span></span>
<span class="line"><span>// console.log(queue)</span></span>
<span class="line"><span>// console.log(queue.isEmpty);</span></span>
<span class="line"><span>// queue.enqueue(&quot;Tom&quot;);</span></span>
<span class="line"><span>// queue.enqueue(&quot;Lucy&quot;);</span></span>
<span class="line"><span>// console.log(queue.isEmpty);</span></span>
<span class="line"><span>// console.log(queue.size);</span></span>
<span class="line"><span>// console.log(queue.dequeue());</span></span>
<span class="line"><span>// console.log(queue.size);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 3.链表</span></span>
<span class="line"><span>// 链表： 存储有序元素的集合；</span></span>
<span class="line"><span>// 但是不同于数组，链表的每个元素是一个存储元素本身节点 和 指向下一个元素的引用 组成</span></span>
<span class="line"><span>// 要想访问链表中间的元素，需要从起点开始遍历找到所需元素</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 节点</span></span>
<span class="line"><span>class Node {</span></span>
<span class="line"><span>  constructor(element) {</span></span>
<span class="line"><span>    this.element = element;  // 节点信息域</span></span>
<span class="line"><span>    this.next = null;  // 节点指针域</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 链表 （单向链表）</span></span>
<span class="line"><span>class LinkedList {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    this.head = null;</span></span>
<span class="line"><span>    this.length = 0;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 追加元素</span></span>
<span class="line"><span>  append(element) {</span></span>
<span class="line"><span>    const node = new Node(element);</span></span>
<span class="line"><span>    let current = null;</span></span>
<span class="line"><span>    if (this.head === null) {</span></span>
<span class="line"><span>      this.head = node;</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      current = this.head;</span></span>
<span class="line"><span>      while (current.next) {</span></span>
<span class="line"><span>        current = current.next;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      current.next = node;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    this.length++;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 任意索引位置添加元素</span></span>
<span class="line"><span>  insert(position, element) {</span></span>
<span class="line"><span>    if (position &gt;= 0 &amp;&amp; position &lt;= this.length) {</span></span>
<span class="line"><span>      const node = new Node(element);</span></span>
<span class="line"><span>      let current = this.head;</span></span>
<span class="line"><span>      let previous = null;</span></span>
<span class="line"><span>      let index = 0;</span></span>
<span class="line"><span>      if (position === 0) {</span></span>
<span class="line"><span>        this.head = node;</span></span>
<span class="line"><span>        node.next = current;</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span>        while (index++ &lt; position) {</span></span>
<span class="line"><span>          previous = current;</span></span>
<span class="line"><span>          current = current.next;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        previous.next = node;</span></span>
<span class="line"><span>        node.next = current;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      this.length++;</span></span>
<span class="line"><span>      return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return false;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 移除指定位置的元素</span></span>
<span class="line"><span>  removeAt(position) {</span></span>
<span class="line"><span>    // 检查越界值</span></span>
<span class="line"><span>    if (position &gt; -1 &amp;&amp; position &lt; this.length) {</span></span>
<span class="line"><span>      let current = this.head;</span></span>
<span class="line"><span>      let previous = null;</span></span>
<span class="line"><span>      let index = 0;</span></span>
<span class="line"><span>      if (position === 0) {</span></span>
<span class="line"><span>        this.head = current.next;</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span>        while (index++ &lt; position) {</span></span>
<span class="line"><span>          previous = current;</span></span>
<span class="line"><span>          current = current.next;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        previous.next = current.next;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      this.length--;</span></span>
<span class="line"><span>      return current.element;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return null;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 寻找元素下标</span></span>
<span class="line"><span>  findIndex (element) {</span></span>
<span class="line"><span>    let current = this.head;</span></span>
<span class="line"><span>    let index = 0;</span></span>
<span class="line"><span>    while (current) {</span></span>
<span class="line"><span>      if(current.element === element){</span></span>
<span class="line"><span>        return index;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      index++;</span></span>
<span class="line"><span>      current = current.next;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return -1;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 删除指定元素</span></span>
<span class="line"><span>  remove (element) {</span></span>
<span class="line"><span>    const index = this.findIndex(element);</span></span>
<span class="line"><span>    return this.removeAt(index);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 是否为空</span></span>
<span class="line"><span>  get isEmpty () {</span></span>
<span class="line"><span>    return !this.length;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  get size () {</span></span>
<span class="line"><span>    return this.length;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 转为字符串</span></span>
<span class="line"><span>  toString () {</span></span>
<span class="line"><span>    let current = this.head;</span></span>
<span class="line"><span>    let string = &quot;&quot;;</span></span>
<span class="line"><span>    while(current) {</span></span>
<span class="line"><span>      string += \`\${current.element}\`;</span></span>
<span class="line"><span>      current = current.next;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return string;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// const linkedList = new LinkedList();</span></span>
<span class="line"><span>// linkedList.insert(0,3);</span></span>
<span class="line"><span>// linkedList.insert(0,6);</span></span>
<span class="line"><span>// linkedList.insert(0,9);</span></span>
<span class="line"><span>// linkedList.append(10)</span></span>
<span class="line"><span>// console.log(linkedList);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 4.字典</span></span>
<span class="line"><span>// 字典：类似对象，以key、value存储值</span></span>
<span class="line"><span>class Dictionary {</span></span>
<span class="line"><span>  constructor () {</span></span>
<span class="line"><span>    this.items = {};</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  set (key, value) {</span></span>
<span class="line"><span>    this.items[key] = value;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  get (key) {</span></span>
<span class="line"><span>    return this.items[key];</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  remove (key) {</span></span>
<span class="line"><span>    delete this.items[key];</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  get keys () {</span></span>
<span class="line"><span>    return Object.keys(this.items);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  get values () {</span></span>
<span class="line"><span>    return Object.values(this.items);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// const dict = new Dictionary();</span></span>
<span class="line"><span>// dict.set(&quot;hhk&quot;, &quot;hebei&quot;);</span></span>
<span class="line"><span>// dict.set(&quot;ssy&quot;, &quot;haerbin&quot;);</span></span>
<span class="line"><span>// dict.set(&quot;jzd&quot;, &quot;jiangsu&quot;);</span></span>
<span class="line"><span>// console.log(dict);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 5.二叉树</span></span>
<span class="line"><span>// 二叉树：每个节点最多有两个子树的树结构;一个是左侧子节点，一个是右侧子节点，这样定义的好处是有利于写出更高效的插入、查找、删除节点的算法</span></span>
<span class="line"><span>// 二叉搜索树(BST) 只允许左侧节点存储比父节点小的值，右侧节点存储比父节点大/相等的值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class NodeTree {</span></span>
<span class="line"><span>  constructor (key) {</span></span>
<span class="line"><span>    this.key = key;</span></span>
<span class="line"><span>    this.left = null;</span></span>
<span class="line"><span>    this.right = null;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class BinarySearchTree {</span></span>
<span class="line"><span>  constructor () {</span></span>
<span class="line"><span>    this.root = null;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  insert (key) {</span></span>
<span class="line"><span>    const newNode = new NodeTree(key);</span></span>
<span class="line"><span>    const insertNode = (node, newNode) =&gt; {</span></span>
<span class="line"><span>      if(newNode.key &lt; node.key) {</span></span>
<span class="line"><span>        if(node.left === null){</span></span>
<span class="line"><span>          node.left = newNode;</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>          insertNode(node.left, newNode);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span>        if(node.right === null) {</span></span>
<span class="line"><span>          node.right = newNode;</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>          insertNode(node.right, newNode);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if(this.root) {</span></span>
<span class="line"><span>      insertNode(this.root, newNode);</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      this.root = newNode;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 访问树节点的三种方式：先序、中序、后序</span></span>
<span class="line"><span>  inOrderTraverse (callback) {</span></span>
<span class="line"><span>    const inOrderTraverseNode = (node, callback) =&gt; {</span></span>
<span class="line"><span>      if(node !== null) {</span></span>
<span class="line"><span>        inOrderTraverseNode(node.left, callback);</span></span>
<span class="line"><span>        callback(node.key);</span></span>
<span class="line"><span>        inOrderTraverseNode(node.right, callback);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    inOrderTraverseNode(this.root, callback);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  min (node) {</span></span>
<span class="line"><span>    const minNode = node =&gt; {</span></span>
<span class="line"><span>      return node ? (node.left ? minNode(node.left) : node) : null;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return minNode(node || this.root);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  max (node) {</span></span>
<span class="line"><span>    const maxNode = node =&gt; {</span></span>
<span class="line"><span>      return node ? (node.right ? maxNode(node.right) : node) : null;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return maxNode(node || this.root);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const tree = new BinarySearchTree();</span></span>
<span class="line"><span>tree.insert(11);</span></span>
<span class="line"><span>tree.insert(7);</span></span>
<span class="line"><span>tree.insert(5);</span></span>
<span class="line"><span>tree.insert(3);</span></span>
<span class="line"><span>tree.insert(9);</span></span>
<span class="line"><span>tree.insert(8);</span></span>
<span class="line"><span>tree.insert(10);</span></span>
<span class="line"><span>tree.insert(13);</span></span>
<span class="line"><span>tree.insert(12);</span></span>
<span class="line"><span>tree.insert(14);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(tree);</span></span>
<span class="line"><span>// tree.inOrderTraverse(value =&gt; {</span></span>
<span class="line"><span>//   console.log(value);</span></span>
<span class="line"><span>// });</span></span>
<span class="line"><span>// console.log(tree.min());</span></span>
<span class="line"><span>// console.log(tree.max());</span></span></code></pre></div>`,10)]))}const m=s(l,[["render",i]]);export{h as __pageData,m as default};
