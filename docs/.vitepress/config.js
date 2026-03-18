export default {
  title: '个人博客',// 网站标题
  ignoreDeadLinks: true,// 最好加上，构建时会忽略md中的外链
  appearance: false,//可以选择深浅主题
  base: "./",
  // base: "/blog/HHK00000.github.io/docs/.vitepress/dist/",
  // 主题配置
  themeConfig: {
    // nav: [//右侧导航
      // { text: '首页', link: '/' },
    //   { text: '项目简介', link: '/page/index' },
    //   { text: '更新日志', link: 'https://github.com/Yinzhuo19970516/vue-template/blob/main/CHANGELOG.md' }
    // ],
    // 侧边导航
    sidebar: [
      {
        text: '技术文档',
        items: [
          { text: 'Html常见概念', link: '/document/HtmlBasic' },
            { text: 'Html标签', link: '/document/HtmlTag' },
            { text: 'Html5新特性', link: '/document/Html5' },
            { text: 'Css核心', link: '/document/CssCore' },
            { text: 'Css实用功能', link: '/document/CssCase' },
            { text: '数据类型和运算符', link: '/document/datatype' },
            { text: '闭包&作用域', link: '/document/closure' },
            { text: '面向对象&类&原型', link: '/document/oop' },
            { text: 'ES6相关', link: '/document/ES6' },
            { text: '事件循环', link: '/document/eventloop' },
            { text: 'WEB API', link: '/document/WEBAPI' },
            { text: '浏览器相关前端知识', link: '/document/Browser' },
            { text: 'vue2源码笔记', link: '/document/vue2' },
            { text: 'AJAX及跨域', link: '/document/AJAX' },
            { text: '数据结构', link: '/document/dataStructures' },
            { text: '常见算法之排序算法', link: '/document/sortAlgorithm' },
            { text: '常见算法之搜索算法', link: '/document/searchAlgorithm' },
            { text: '算法设计与技巧', link: '/document/AlgorithmDesign' },
            { text: '常见设计模式', link: '/document/DesignMode' },
            { text: '埋点和性能监控', link: '/document/PerformanceMonitoring' },
            { text: 'canvas', link: '/document/canvas' },
            { text: '单元测试', link: '/document/UnitTest' },
            { text: '微前端', link: '/document/MicroFrontend' },
            { text: 'Linux', link: '/document/Linux' },
            { text: 'PHP', link: '/document/PHP' },
        ]
      }
    ],
  }
}