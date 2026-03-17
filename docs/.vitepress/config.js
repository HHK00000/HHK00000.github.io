export default {
  title: '个人博客',// 网站标题
  ignoreDeadLinks: true,// 最好加上，构建时会忽略md中的外链
  appearance: false,//可以选择深浅主题
  // 主题配置
  themeConfig: {
    // nav: [//右侧导航
    //   { text: '首页', link: '/' },
    //   { text: '项目简介', link: '/page/index' },
    //   { text: '更新日志', link: 'https://github.com/Yinzhuo19970516/vue-template/blob/main/CHANGELOG.md' }
    // ],
    // 侧边导航
    sidebar: [
      {
        text: '技术文档',
        items: [
          { text: 'Html', items: [
            { text: 'Html常见概念', link: '/document/Html/Html常见概念' },
            { text: 'Html标签', link: '/document/Html/Html标签' },
            { text: 'Html5新特性', link: '/document/Html/Html5新特性' },
          ] },
          { text: 'Css', items: [
            { text: 'Css核心', link: '/document/Css/Css核心' },
            { text: 'Css实用功能', link: '/document/Css/Css实用功能' },
          ] },
          { text: 'JavaScript', items: [
            { text: '数据类型和运算符', link: '/document/JavaScript/数据类型和运算符' },
            { text: '闭包&作用域', link: '/document/JavaScript/闭包&作用域' },
            { text: '面向对象&类&原型', link: '/document/JavaScript/面向对象&类&原型' },
            { text: 'ES6相关', link: '/document/JavaScript/ES6相关' },
            { text: '事件循环', link: '/document/JavaScript/事件循环' },
            { text: 'WEB API', link: '/document/JavaScript/WEB API' },
          ] },
          { text: '浏览器', items: [
            { text: '浏览器相关前端知识', link: '/document/浏览器/浏览器相关前端知识' },
          ] },
          { text: 'Vue', items: [
            { text: 'vue2源码笔记', link: '/document/Vue/vue2源码' },
          ] },
          { text: '网络', items: [
            { text: 'AJAX及跨域', link: '/document/网络/AJAX及跨域' },
          ] },
          { text: '数据结构与算法', items: [
            { text: '数据结构', link: '/document/数据结构与算法/数据结构' },
            { text: '常见算法之排序算法', link: '/document/数据结构与算法/常见算法之排序算法' },
            { text: '常见算法之搜索算法', link: '/document/数据结构与算法/常见算法之搜索算法' },
            { text: '算法设计与技巧', link: '/document/数据结构与算法/算法设计与技巧' },
          ] },
          { text: '设计模式', items: [
            { text: '常见设计模式', link: '/document/设计模式/常见设计模式' },
          ] },
          { text: '性能监控', items: [
            { text: '埋点和性能监控', link: '/document/性能监控/埋点和性能监控' },
          ] },
          { text: 'Canvas', items: [
            { text: 'canvas', link: '/document/Canvas/canvas' },
          ] },
          { text: '单元测试', items: [
            { text: '单元测试', link: '/document/单元测试/单元测试' },
          ] },
          { text: '微前端', items: [
            { text: '微前端', link: '/document/微前端/微前端' },
          ] },
          { text: 'Linux', items: [
            { text: 'Linux', link: '/document/Linux/Linux' },
          ] },
          { text: 'PHP', items: [
            { text: 'PHP', link: '/document/PHP/PHP' },
          ] },
        ]
      }
    ],
  }
}