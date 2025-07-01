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
          { text: '浏览器的进程与线程', link: '/document/process' },
          { text: 'vue2原理', link: '/document/vue2' },
        ]
      }
    ],
  }
}