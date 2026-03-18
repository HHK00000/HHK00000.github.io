export default {
  title: '个人博客',// 网站标题
  ignoreDeadLinks: true,// 最好加上，构建时会忽略md中的外链
  appearance: false,//可以选择深浅主题
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
          { text: 'Html', items: [
            { text: 'Html常见概念', link: '/document/Html/HtmlBasic' },
            { text: 'Html标签', link: '/document/Html/HtmlTag' },
            { text: 'Html5新特性', link: '/document/Html/Html5' },
          ] },
          { text: 'Css', items: [
            { text: 'Css核心', link: '/document/Css/CssCore' },
            { text: 'Css实用功能', link: '/document/Css/CssCase' },
          ] },
          { text: 'JavaScript', items: [
            { text: '数据类型和运算符', link: '/document/JavaScript/datatype' },
            { text: '闭包&作用域', link: '/document/JavaScript/closure' },
            { text: '面向对象&类&原型', link: '/document/JavaScript/oop' },
            { text: 'ES6相关', link: '/document/JavaScript/ES6' },
            { text: '事件循环', link: '/document/JavaScript/eventloop' },
            { text: 'WEB API', link: '/document/JavaScript/WEBAPI' },
          ] },
          { text: 'Browser', items: [
            { text: '浏览器相关前端知识', link: '/document/Browser/Browser' },
          ] },
          { text: 'Vue', items: [
            { text: 'vue2源码笔记', link: '/document/Vue/vue2' },
          ] },
          { text: 'Network', items: [
            { text: 'AJAX及跨域', link: '/document/Network/AJAX' },
          ] },
          { text: 'dataAlg', items: [
            { text: '数据结构', link: '/document/dataAlg/dataStructures' },
            { text: '常见算法之排序算法', link: '/document/dataAlg/sortAlgorithm' },
            { text: '常见算法之搜索算法', link: '/document/dataAlg/searchAlgorithm' },
            { text: '算法设计与技巧', link: '/document/dataAlg/AlgorithmDesign' },
          ] },
          { text: 'DesignMode', items: [
            { text: '常见设计模式', link: '/document/DesignMode/DesignMode' },
          ] },
          { text: 'PerformanceMonitoring', items: [
            { text: '埋点和性能监控', link: '/document/PerformanceMonitoring/PerformanceMonitoring' },
          ] },
          { text: 'Canvas', items: [
            { text: 'canvas', link: '/document/Canvas/canvas' },
          ] },
          { text: 'UnitTest', items: [
            { text: '单元测试', link: '/document/UnitTest/UnitTest' },
          ] },
          { text: 'MicroFrontend', items: [
            { text: '微前端', link: '/document/MicroFrontend/MicroFrontend' },
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