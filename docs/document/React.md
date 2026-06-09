# React学习

# react组件
- React 组件是一段可以 使用标签进行扩展 的 JavaScript 函数。
- 很多布局可以通过复用已经完成的组件来实现，从而加快开发进程。

## 创建组件
- 导出组件：export default（JavaScript 标准语法）
- 定义函数：React 组件是常规的 JavaScript 函数，但 组件的名称必须以大写字母开头，否则它们将无法运行！
- 添加标签：JSX语法 （没有括号包裹的话，任何在 return 下一行的代码都 将被忽略！）


### 组件的导入导出(默认导出 或 具名导出)
- 1.创建 一个新的 JS 文件来存放该组件
- 2.导出 该文件中的函数组件（可以使用 默认导出 或 具名导出）
- 3.在需要使用该组件的文件中 导入（可以根据相应的导出方式使用 默认导入 或 具名导入）

```
<!-- app.js -->
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';
<!-- 默认导出 -->
export default function App() {
  return (
    <Profile />
  );
}
<!-- Gallery.js -->
<!-- 具名导出 -->
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家们</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}

```

## JSX语法
- JSX 是 JavaScript 语法扩展，可以让你在 JavaScript 文件中书写类似 HTML 的标签
- 在 React 中，渲染逻辑和标签共同存在于同一个地方——组件
- 其它相关内容：JSX 转化器

### JSX语法规则
- 1. 只能返回一个根元素 
- 2. 标签必须闭合
- 3. 使用驼峰式命名法给 大部分 属性命名

### JSX中使用JavaScript语法
- 使用单引号或双引号在JSX中传递一个字符串值
- 使用{}花括号替代引号""，以使用JavaScript变量
  - 场景1：用作 JSX 标签内的文本，如 <h1>{name}'s To Do List</h1>
  - 场景2：用作紧跟在 = 符号后的 属性，如 src={avatar}
  - 场景3：JSX中使用内联CSS样式
  ```
    export default function TodoList() {
      return (
        <ul style={{
          backgroundColor: 'black',
          color: 'pink'
        }}>
          <li>Improve the videophone</li>
          <li>Prepare aeronautics lectures</li>
          <li>Work on the alcohol-fuelled engine</li>
        </ul>
      );
    }
  ```
  - 场景4：JSX中使用对象 双花括号{{}}

## 组件通信(Props父组件向子组件传值)
```
<!-- 父组件向子组件传值 -->
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
<!-- 子组件读取props -->
（解构后）
function Avatar({ person, size }) {
  // 在这里 person 和 size 是可访问的
}
（解构前）
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

## 条件渲染

- 选择性地返回 null，不想有任何东西进行渲染时，可以直接返回null
```
<!-- 如果组件的 isPacked 属性为 true，那么它将只返回 null。否则，它将返回相应的 JSX 用来渲染 -->
if (isPacked) {
  return null;
}
return <li className="item">{name}</li>;
```
- 条件判断表达式——条件运算符 又称“三目运算符”

## 渲染列表

### 从数组中渲染数据
```
const people = [
  '凯瑟琳·约翰逊: 数学家',
  '马里奥·莫利纳: 化学家',
  '穆罕默德·阿卜杜勒·萨拉姆: 物理学家',
  '珀西·莱温·朱利亚: 化学家',
  '苏布拉马尼扬·钱德拉塞卡: 天体物理学家',
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
```
- 对数组项进行过滤:使用filter方法
- 用 key 保持列表项的顺序，
  - key 值在兄弟节点之间必须是唯一的
  - key 值不能改变

## 组件的纯粹性
- 组件作为公式，只负责自己的任务，输入相同，则输出相同
- 不添加副作用

## 将 UI 视为树
- 将react页面视为一棵渲染树

# 使用state添加交互
- 在 React 中，随时间变化的数据被称为状态（state）。你可以向任何组件添加状态，并按需进行更新。
- 用 useState Hook 为组件添加状态（Hook 是能让你的组件使用 React 功能的特殊函数，state状态是这些功能之一）
- 
## react的渲染和提交机制

请求和服务 UI 的过程有三个步骤（假设你的组件是厨房里的厨师，React 是服务员，负责提出顾客的要求，并给顾客上菜）：
- 1. 触发渲染（将食客的订单送到厨房）
- 2. 渲染组件（在厨房准备订单）
- 3. 提交到 DOM（将订单送到桌前）

## state状态
- state 如同一张快照 ，与普通 JavaScript 变量不同，React 状态的行为更像一个快照。设置它并不改变你已有的状态变量，而是触发一次重新渲染
- 当有一系列 state 更新时，会把这些更新加入队列，并统一处理

### 更新 state 中的对象
```
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img
        src={person.artwork.image}
        alt={person.artwork.title}
      />
    </>
  );
}

```
### 更新 state 中的数组 
```
import { useState } from 'react';

const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [list, setList] = useState(
    initialList
  );

  function handleToggle(artworkId, nextSeen) {
    setList(list.map(artwork => {
      if (artwork.id === artworkId) {
        return { ...artwork, seen: nextSeen };
      } else {
        return artwork;
      }
    }));
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={list}
        onToggle={handleToggle} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}

```
- 乘风破浪会有时 直挂云帆济沧海
- 更新数组时，可以使用 Immer 之类的库来减少重复代码






