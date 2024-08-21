import { createApp } from 'vue'
import App from './App.vue'

import { DIcon } from '@d-ui/components/icon'
import '@d-ui/theme-chalk/src/index.scss'

import { DTree } from '@d-ui/components/tree'


const plugins = [DIcon, DTree]

const app = createApp(App)
plugins.map(plugin => app.use(plugin))

app.mount('#app')
