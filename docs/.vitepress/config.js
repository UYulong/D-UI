module.exports = {
  title: 'D-UI',
  description: '一个Vue3 UI组件库',
  themeConfig: {
    lastUpdated: '最后更新时间',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '编辑此网站',
    repo: '',
    footer: {
      message: '',
      copyright: '@Copyright ©️ 2024'
    },
    nav: [
      { text: '指南', link: '/guide/installation', activeMatch: '/guide/' },
      { text: '组件', link: '/component/icon', activeMatch: '/component/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quickStart' }
          ]
        }
      ],
      '/component/': [
        {
          text: '基础组件',
          items: [
            {
              text: 'Icon',
              link: '/component/icon'
            }
          ]
        }
      ]
    }
  }
}
