import { createApp } from 'vue'
import App from './App.vue'

import { DIcon } from '@d-ui/components/icon/index'
import '@d-ui/theme-chalk/src/index.scss'
const app = createApp(App)
app.use(DIcon)

app.mount('#app')
