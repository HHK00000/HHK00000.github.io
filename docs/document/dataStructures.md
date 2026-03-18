# 数据结构
推荐及参考书目《学习JavaScript数据结构与算法》第3版 （巴西）洛伊安妮·格罗纳著 无双 邓刚 孙晓博等译
## 栈

## 队列

## 链表

## 集合

## 字段和散列表

## 二叉搜索树

## 图

```
// JS 实现常见数据结构： 栈、队列、链表、字典、二叉树

// 1.栈结构 
// 栈的特点:先进后出
class Stack {
  constructor() {
    this.items = [];
  }

  // 入栈
  push(ele) {
    this.items.push(ele);
  }

  // 出栈
  pop() {
    return this.items.pop();
  }

  // 末位
  get peek() {
    return this.items[this.items.length - 1];
  }

  // 是否为空栈
  get isEmpty() {
    return !this.items.length;
  }

  // 长度
  get size() {
    return this.items.length;
  }

  // 清空栈
  clear() {
    this.items = [];
  }

}

// // 实例化一个栈
// const stack = new Stack();
// console.log(stack, stack.isEmpty);

// // 添加元素
// stack.push(5);
// stack.push(8);

// // 读取属性再添加
// console.log(stack.peek); 
// stack.push(11);
// console.log(stack.size);
// console.log(stack.isEmpty);

// 2.队列结构
// 队列：先进先出

class Queue {
  constructor(items) {
    this.items = items || [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  clear() {
    this.items = [];
  }

  get size() {
    return this.items.length;
  }

  get isEmpty() {
    return !this.items.length;
  }

  print() {
    console.log(this.items.toString());
  }

}

// const queue = new Queue();
// console.log(queue)
// console.log(queue.isEmpty);
// queue.enqueue("Tom");
// queue.enqueue("Lucy");
// console.log(queue.isEmpty);
// console.log(queue.size);
// console.log(queue.dequeue());
// console.log(queue.size);

// 3.链表
// 链表： 存储有序元素的集合；
// 但是不同于数组，链表的每个元素是一个存储元素本身节点 和 指向下一个元素的引用 组成
// 要想访问链表中间的元素，需要从起点开始遍历找到所需元素

// 节点
class Node {
  constructor(element) {
    this.element = element;  // 节点信息域
    this.next = null;  // 节点指针域
  }
}

// 链表 （单向链表）
class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // 追加元素
  append(element) {
    const node = new Node(element);
    let current = null;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }

  // 任意索引位置添加元素
  insert(position, element) {
    if (position >= 0 && position <= this.length) {
      const node = new Node(element);
      let current = this.head;
      let previous = null;
      let index = 0;
      if (position === 0) {
        this.head = node;
        node.next = current;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = node;
        node.next = current;
      }
      this.length++;
      return true;
    }
    return false;
  }

  // 移除指定位置的元素
  removeAt(position) {
    // 检查越界值
    if (position > -1 && position < this.length) {
      let current = this.head;
      let previous = null;
      let index = 0;
      if (position === 0) {
        this.head = current.next;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      this.length--;
      return current.element;
    }
    return null;
  }

  // 寻找元素下标
  findIndex (element) {
    let current = this.head;
    let index = 0;
    while (current) {
      if(current.element === element){
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  // 删除指定元素
  remove (element) {
    const index = this.findIndex(element);
    return this.removeAt(index);
  }

  // 是否为空
  get isEmpty () {
    return !this.length;
  }

  get size () {
    return this.length;
  }

  // 转为字符串
  toString () {
    let current = this.head;
    let string = "";
    while(current) {
      string += `${current.element}`;
      current = current.next;
    }
    return string;
  }
}
// const linkedList = new LinkedList();
// linkedList.insert(0,3);
// linkedList.insert(0,6);
// linkedList.insert(0,9);
// linkedList.append(10)
// console.log(linkedList);

// 4.字典
// 字典：类似对象，以key、value存储值
class Dictionary {
  constructor () {
    this.items = {};
  }

  set (key, value) {
    this.items[key] = value;
  }

  get (key) {
    return this.items[key];
  }

  remove (key) {
    delete this.items[key];
  }

  get keys () {
    return Object.keys(this.items);
  }

  get values () {
    return Object.values(this.items);
  }

}

// const dict = new Dictionary();
// dict.set("hhk", "hebei");
// dict.set("ssy", "haerbin");
// dict.set("jzd", "jiangsu");
// console.log(dict);

// 5.二叉树
// 二叉树：每个节点最多有两个子树的树结构;一个是左侧子节点，一个是右侧子节点，这样定义的好处是有利于写出更高效的插入、查找、删除节点的算法
// 二叉搜索树(BST) 只允许左侧节点存储比父节点小的值，右侧节点存储比父节点大/相等的值

class NodeTree {
  constructor (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor () {
    this.root = null;
  }

  insert (key) {
    const newNode = new NodeTree(key);
    const insertNode = (node, newNode) => {
      if(newNode.key < node.key) {
        if(node.left === null){
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else {
        if(node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
    }
    if(this.root) {
      insertNode(this.root, newNode);
    } else {
      this.root = newNode;
    }
  }

  // 访问树节点的三种方式：先序、中序、后序
  inOrderTraverse (callback) {
    const inOrderTraverseNode = (node, callback) => {
      if(node !== null) {
        inOrderTraverseNode(node.left, callback);
        callback(node.key);
        inOrderTraverseNode(node.right, callback);
      }
    }
    inOrderTraverseNode(this.root, callback);
  }

  min (node) {
    const minNode = node => {
      return node ? (node.left ? minNode(node.left) : node) : null;
    }
    return minNode(node || this.root);
  }

  max (node) {
    const maxNode = node => {
      return node ? (node.right ? maxNode(node.right) : node) : null;
    }
    return maxNode(node || this.root);
  }

}

const tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);

console.log(tree);
// tree.inOrderTraverse(value => {
//   console.log(value);
// });
// console.log(tree.min());
// console.log(tree.max());
```