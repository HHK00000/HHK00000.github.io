import{_ as l,c as e,o as i,ae as p,j as a,a as n}from"./chunks/framework.CLNW5JS9.js";const m=JSON.parse('{"title":"React学习","description":"","frontmatter":{},"headers":[],"relativePath":"document/React.md","filePath":"document/React.md"}'),t={name:"document/React.md"};function c(r,s,o,u,h,d){return i(),e("div",null,s[0]||(s[0]=[p(`<h1 id="react学习" tabindex="-1">React学习 <a class="header-anchor" href="#react学习" aria-label="Permalink to &quot;React学习&quot;">​</a></h1><h1 id="react组件" tabindex="-1">react组件 <a class="header-anchor" href="#react组件" aria-label="Permalink to &quot;react组件&quot;">​</a></h1><ul><li>React 组件是一段可以 使用标签进行扩展 的 JavaScript 函数。</li><li>很多布局可以通过复用已经完成的组件来实现，从而加快开发进程。</li></ul><h2 id="创建组件" tabindex="-1">创建组件 <a class="header-anchor" href="#创建组件" aria-label="Permalink to &quot;创建组件&quot;">​</a></h2><ul><li>导出组件：export default（JavaScript 标准语法）</li><li>定义函数：React 组件是常规的 JavaScript 函数，但 组件的名称必须以大写字母开头，否则它们将无法运行！</li><li>添加标签：JSX语法 （没有括号包裹的话，任何在 return 下一行的代码都 将被忽略！）</li></ul><h3 id="组件的导入导出-默认导出-或-具名导出" tabindex="-1">组件的导入导出(默认导出 或 具名导出) <a class="header-anchor" href="#组件的导入导出-默认导出-或-具名导出" aria-label="Permalink to &quot;组件的导入导出(默认导出 或 具名导出)&quot;">​</a></h3><ul><li>1.创建 一个新的 JS 文件来存放该组件</li><li>2.导出 该文件中的函数组件（可以使用 默认导出 或 具名导出）</li><li>3.在需要使用该组件的文件中 导入（可以根据相应的导出方式使用 默认导入 或 具名导入）</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- app.js --&gt;</span></span>
<span class="line"><span>import Gallery from &#39;./Gallery.js&#39;;</span></span>
<span class="line"><span>import { Profile } from &#39;./Gallery.js&#39;;</span></span>
<span class="line"><span>&lt;!-- 默认导出 --&gt;</span></span>
<span class="line"><span>export default function App() {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;Profile /&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;!-- Gallery.js --&gt;</span></span>
<span class="line"><span>&lt;!-- 具名导出 --&gt;</span></span>
<span class="line"><span>export function Profile() {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;img</span></span>
<span class="line"><span>      src=&quot;https://i.imgur.com/QIrZWGIs.jpg&quot;</span></span>
<span class="line"><span>      alt=&quot;Alan L. Hart&quot;</span></span>
<span class="line"><span>    /&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default function Gallery() {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;section&gt;</span></span>
<span class="line"><span>      &lt;h1&gt;了不起的科学家们&lt;/h1&gt;</span></span>
<span class="line"><span>      &lt;Profile /&gt;</span></span>
<span class="line"><span>      &lt;Profile /&gt;</span></span>
<span class="line"><span>      &lt;Profile /&gt;</span></span>
<span class="line"><span>    &lt;/section&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="jsx语法" tabindex="-1">JSX语法 <a class="header-anchor" href="#jsx语法" aria-label="Permalink to &quot;JSX语法&quot;">​</a></h2><ul><li>JSX 是 JavaScript 语法扩展，可以让你在 JavaScript 文件中书写类似 HTML 的标签</li><li>在 React 中，渲染逻辑和标签共同存在于同一个地方——组件</li><li>其它相关内容：JSX 转化器</li></ul><h3 id="jsx语法规则" tabindex="-1">JSX语法规则 <a class="header-anchor" href="#jsx语法规则" aria-label="Permalink to &quot;JSX语法规则&quot;">​</a></h3><ul><li><ol><li>只能返回一个根元素</li></ol></li><li><ol start="2"><li>标签必须闭合</li></ol></li><li><ol start="3"><li>使用驼峰式命名法给 大部分 属性命名</li></ol></li></ul><h3 id="jsx中使用javascript语法" tabindex="-1">JSX中使用JavaScript语法 <a class="header-anchor" href="#jsx中使用javascript语法" aria-label="Permalink to &quot;JSX中使用JavaScript语法&quot;">​</a></h3>`,13),a("ul",null,[a("li",null,"使用单引号或双引号在JSX中传递一个字符串值"),a("li",null,[n('使用{}花括号替代引号""，以使用JavaScript变量 '),a("ul",null,[a("li",null,[n("场景1：用作 JSX 标签内的文本，如 "),a("h1",null,"{name}'s To Do List")]),a("li",{avatar:""},"场景2：用作紧跟在 = 符号后的 属性，如 src="),a("li",null,"场景3：JSX中使用内联CSS样式")]),a("div",{class:"language- vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"}),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[a("code",null,[a("span",{class:"line"},[a("span",null,"  export default function TodoList() {")]),n(`
`),a("span",{class:"line"},[a("span",null,"    return (")]),n(`
`),a("span",{class:"line"},[a("span",null,"      <ul style={{")]),n(`
`),a("span",{class:"line"},[a("span",null,"        backgroundColor: 'black',")]),n(`
`),a("span",{class:"line"},[a("span",null,"        color: 'pink'")]),n(`
`),a("span",{class:"line"},[a("span",null,"      }}>")]),n(`
`),a("span",{class:"line"},[a("span",null,"        <li>Improve the videophone</li>")]),n(`
`),a("span",{class:"line"},[a("span",null,"        <li>Prepare aeronautics lectures</li>")]),n(`
`),a("span",{class:"line"},[a("span",null,"        <li>Work on the alcohol-fuelled engine</li>")]),n(`
`),a("span",{class:"line"},[a("span",null,"      </ul>")]),n(`
`),a("span",{class:"line"},[a("span",null,"    );")]),n(`
`),a("span",{class:"line"},[a("span",null,"  }")])])])]),a("ul",null,[a("li",null,"场景4：JSX中使用对象 双花括号{")])])],-1),p(`<h2 id="组件通信-props父组件向子组件传值" tabindex="-1">组件通信(Props父组件向子组件传值) <a class="header-anchor" href="#组件通信-props父组件向子组件传值" aria-label="Permalink to &quot;组件通信(Props父组件向子组件传值)&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- 父组件向子组件传值 --&gt;</span></span>
<span class="line"><span>export default function Profile() {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;Avatar</span></span>
<span class="line"><span>      person={{ name: &#39;Lin Lanying&#39;, imageId: &#39;1bX5QH6&#39; }}</span></span>
<span class="line"><span>      size={100}</span></span>
<span class="line"><span>    /&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;!-- 子组件读取props --&gt;</span></span>
<span class="line"><span>（解构后）</span></span>
<span class="line"><span>function Avatar({ person, size }) {</span></span>
<span class="line"><span>  // 在这里 person 和 size 是可访问的</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>（解构前）</span></span>
<span class="line"><span>function Avatar(props) {</span></span>
<span class="line"><span>  let person = props.person;</span></span>
<span class="line"><span>  let size = props.size;</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="条件渲染" tabindex="-1">条件渲染 <a class="header-anchor" href="#条件渲染" aria-label="Permalink to &quot;条件渲染&quot;">​</a></h2><ul><li>选择性地返回 null，不想有任何东西进行渲染时，可以直接返回null</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!-- 如果组件的 isPacked 属性为 true，那么它将只返回 null。否则，它将返回相应的 JSX 用来渲染 --&gt;</span></span>
<span class="line"><span>if (isPacked) {</span></span>
<span class="line"><span>  return null;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>return &lt;li className=&quot;item&quot;&gt;{name}&lt;/li&gt;;</span></span></code></pre></div><ul><li>条件判断表达式——条件运算符 又称“三目运算符”</li></ul><h2 id="渲染列表" tabindex="-1">渲染列表 <a class="header-anchor" href="#渲染列表" aria-label="Permalink to &quot;渲染列表&quot;">​</a></h2><h3 id="从数组中渲染数据" tabindex="-1">从数组中渲染数据 <a class="header-anchor" href="#从数组中渲染数据" aria-label="Permalink to &quot;从数组中渲染数据&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const people = [</span></span>
<span class="line"><span>  &#39;凯瑟琳·约翰逊: 数学家&#39;,</span></span>
<span class="line"><span>  &#39;马里奥·莫利纳: 化学家&#39;,</span></span>
<span class="line"><span>  &#39;穆罕默德·阿卜杜勒·萨拉姆: 物理学家&#39;,</span></span>
<span class="line"><span>  &#39;珀西·莱温·朱利亚: 化学家&#39;,</span></span>
<span class="line"><span>  &#39;苏布拉马尼扬·钱德拉塞卡: 天体物理学家&#39;,</span></span>
<span class="line"><span>];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default function List() {</span></span>
<span class="line"><span>  const listItems = people.map(person =&gt;</span></span>
<span class="line"><span>    &lt;li&gt;{person}&lt;/li&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>  return &lt;ul&gt;{listItems}&lt;/ul&gt;;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>对数组项进行过滤:使用filter方法</li><li>用 key 保持列表项的顺序， <ul><li>key 值在兄弟节点之间必须是唯一的</li><li>key 值不能改变</li></ul></li></ul><h2 id="组件的纯粹性" tabindex="-1">组件的纯粹性 <a class="header-anchor" href="#组件的纯粹性" aria-label="Permalink to &quot;组件的纯粹性&quot;">​</a></h2><ul><li>组件作为公式，只负责自己的任务，输入相同，则输出相同</li><li>不添加副作用</li></ul><h2 id="将-ui-视为树" tabindex="-1">将 UI 视为树 <a class="header-anchor" href="#将-ui-视为树" aria-label="Permalink to &quot;将 UI 视为树&quot;">​</a></h2><ul><li>将react页面视为一棵渲染树</li></ul><h1 id="使用state添加交互" tabindex="-1">使用state添加交互 <a class="header-anchor" href="#使用state添加交互" aria-label="Permalink to &quot;使用state添加交互&quot;">​</a></h1><ul><li>在 React 中，随时间变化的数据被称为状态（state）。你可以向任何组件添加状态，并按需进行更新。</li><li>用 useState Hook 为组件添加状态（Hook 是能让你的组件使用 React 功能的特殊函数，state状态是这些功能之一）</li><li></li></ul><h2 id="react的渲染和提交机制" tabindex="-1">react的渲染和提交机制 <a class="header-anchor" href="#react的渲染和提交机制" aria-label="Permalink to &quot;react的渲染和提交机制&quot;">​</a></h2><p>请求和服务 UI 的过程有三个步骤（假设你的组件是厨房里的厨师，React 是服务员，负责提出顾客的要求，并给顾客上菜）：</p><ul><li><ol><li>触发渲染（将食客的订单送到厨房）</li></ol></li><li><ol start="2"><li>渲染组件（在厨房准备订单）</li></ol></li><li><ol start="3"><li>提交到 DOM（将订单送到桌前）</li></ol></li></ul><h2 id="state状态" tabindex="-1">state状态 <a class="header-anchor" href="#state状态" aria-label="Permalink to &quot;state状态&quot;">​</a></h2><ul><li>state 如同一张快照 ，与普通 JavaScript 变量不同，React 状态的行为更像一个快照。设置它并不改变你已有的状态变量，而是触发一次重新渲染</li><li>当有一系列 state 更新时，会把这些更新加入队列，并统一处理</li></ul><h3 id="更新-state-中的对象" tabindex="-1">更新 state 中的对象 <a class="header-anchor" href="#更新-state-中的对象" aria-label="Permalink to &quot;更新 state 中的对象&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { useState } from &#39;react&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default function Form() {</span></span>
<span class="line"><span>  const [person, setPerson] = useState({</span></span>
<span class="line"><span>    name: &#39;Niki de Saint Phalle&#39;,</span></span>
<span class="line"><span>    artwork: {</span></span>
<span class="line"><span>      title: &#39;Blue Nana&#39;,</span></span>
<span class="line"><span>      city: &#39;Hamburg&#39;,</span></span>
<span class="line"><span>      image: &#39;https://i.imgur.com/Sd1AgUOm.jpg&#39;,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function handleNameChange(e) {</span></span>
<span class="line"><span>    setPerson({</span></span>
<span class="line"><span>      ...person,</span></span>
<span class="line"><span>      name: e.target.value</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function handleTitleChange(e) {</span></span>
<span class="line"><span>    setPerson({</span></span>
<span class="line"><span>      ...person,</span></span>
<span class="line"><span>      artwork: {</span></span>
<span class="line"><span>        ...person.artwork,</span></span>
<span class="line"><span>        title: e.target.value</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function handleCityChange(e) {</span></span>
<span class="line"><span>    setPerson({</span></span>
<span class="line"><span>      ...person,</span></span>
<span class="line"><span>      artwork: {</span></span>
<span class="line"><span>        ...person.artwork,</span></span>
<span class="line"><span>        city: e.target.value</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function handleImageChange(e) {</span></span>
<span class="line"><span>    setPerson({</span></span>
<span class="line"><span>      ...person,</span></span>
<span class="line"><span>      artwork: {</span></span>
<span class="line"><span>        ...person.artwork,</span></span>
<span class="line"><span>        image: e.target.value</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>      &lt;label&gt;</span></span>
<span class="line"><span>        Name:</span></span>
<span class="line"><span>        &lt;input</span></span>
<span class="line"><span>          value={person.name}</span></span>
<span class="line"><span>          onChange={handleNameChange}</span></span>
<span class="line"><span>        /&gt;</span></span>
<span class="line"><span>      &lt;/label&gt;</span></span>
<span class="line"><span>      &lt;label&gt;</span></span>
<span class="line"><span>        Title:</span></span>
<span class="line"><span>        &lt;input</span></span>
<span class="line"><span>          value={person.artwork.title}</span></span>
<span class="line"><span>          onChange={handleTitleChange}</span></span>
<span class="line"><span>        /&gt;</span></span>
<span class="line"><span>      &lt;/label&gt;</span></span>
<span class="line"><span>      &lt;label&gt;</span></span>
<span class="line"><span>        City:</span></span>
<span class="line"><span>        &lt;input</span></span>
<span class="line"><span>          value={person.artwork.city}</span></span>
<span class="line"><span>          onChange={handleCityChange}</span></span>
<span class="line"><span>        /&gt;</span></span>
<span class="line"><span>      &lt;/label&gt;</span></span>
<span class="line"><span>      &lt;label&gt;</span></span>
<span class="line"><span>        Image:</span></span>
<span class="line"><span>        &lt;input</span></span>
<span class="line"><span>          value={person.artwork.image}</span></span>
<span class="line"><span>          onChange={handleImageChange}</span></span>
<span class="line"><span>        /&gt;</span></span>
<span class="line"><span>      &lt;/label&gt;</span></span>
<span class="line"><span>      &lt;p&gt;</span></span>
<span class="line"><span>        &lt;i&gt;{person.artwork.title}&lt;/i&gt;</span></span>
<span class="line"><span>        {&#39; by &#39;}</span></span>
<span class="line"><span>        {person.name}</span></span>
<span class="line"><span>        &lt;br /&gt;</span></span>
<span class="line"><span>        (located in {person.artwork.city})</span></span>
<span class="line"><span>      &lt;/p&gt;</span></span>
<span class="line"><span>      &lt;img</span></span>
<span class="line"><span>        src={person.artwork.image}</span></span>
<span class="line"><span>        alt={person.artwork.title}</span></span>
<span class="line"><span>      /&gt;</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="更新-state-中的数组" tabindex="-1">更新 state 中的数组 <a class="header-anchor" href="#更新-state-中的数组" aria-label="Permalink to &quot;更新 state 中的数组&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { useState } from &#39;react&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const initialList = [</span></span>
<span class="line"><span>  { id: 0, title: &#39;Big Bellies&#39;, seen: false },</span></span>
<span class="line"><span>  { id: 1, title: &#39;Lunar Landscape&#39;, seen: false },</span></span>
<span class="line"><span>  { id: 2, title: &#39;Terracotta Army&#39;, seen: true },</span></span>
<span class="line"><span>];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default function BucketList() {</span></span>
<span class="line"><span>  const [list, setList] = useState(</span></span>
<span class="line"><span>    initialList</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function handleToggle(artworkId, nextSeen) {</span></span>
<span class="line"><span>    setList(list.map(artwork =&gt; {</span></span>
<span class="line"><span>      if (artwork.id === artworkId) {</span></span>
<span class="line"><span>        return { ...artwork, seen: nextSeen };</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span>        return artwork;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }));</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;&gt;</span></span>
<span class="line"><span>      &lt;h1&gt;Art Bucket List&lt;/h1&gt;</span></span>
<span class="line"><span>      &lt;h2&gt;My list of art to see:&lt;/h2&gt;</span></span>
<span class="line"><span>      &lt;ItemList</span></span>
<span class="line"><span>        artworks={list}</span></span>
<span class="line"><span>        onToggle={handleToggle} /&gt;</span></span>
<span class="line"><span>    &lt;/&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function ItemList({ artworks, onToggle }) {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;ul&gt;</span></span>
<span class="line"><span>      {artworks.map(artwork =&gt; (</span></span>
<span class="line"><span>        &lt;li key={artwork.id}&gt;</span></span>
<span class="line"><span>          &lt;label&gt;</span></span>
<span class="line"><span>            &lt;input</span></span>
<span class="line"><span>              type=&quot;checkbox&quot;</span></span>
<span class="line"><span>              checked={artwork.seen}</span></span>
<span class="line"><span>              onChange={e =&gt; {</span></span>
<span class="line"><span>                onToggle(</span></span>
<span class="line"><span>                  artwork.id,</span></span>
<span class="line"><span>                  e.target.checked</span></span>
<span class="line"><span>                );</span></span>
<span class="line"><span>              }}</span></span>
<span class="line"><span>            /&gt;</span></span>
<span class="line"><span>            {artwork.title}</span></span>
<span class="line"><span>          &lt;/label&gt;</span></span>
<span class="line"><span>        &lt;/li&gt;</span></span>
<span class="line"><span>      ))}</span></span>
<span class="line"><span>    &lt;/ul&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>乘风破浪会有时 直挂云帆济沧海</li><li>更新数组时，可以使用 Immer 之类的库来减少重复代码</li></ul>`,26)]))}const b=l(t,[["render",c]]);export{m as __pageData,b as default};
