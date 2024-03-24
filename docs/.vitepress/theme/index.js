import DefaultTheme from 'vitepress/theme'

import ZIcon from '@d-ui/components/icon'
import '@d-ui/theme-chalk/src/index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ZIcon)
  }
}
