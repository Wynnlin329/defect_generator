import '@/assets/main.css'
import '@/assets/global.scss'
import 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import { i18n } from '@/plugins/i18n'

import AppIcon from '@/components/AppIcon.vue'
import AppIconStatic from '@/components/AppIconStatic.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.component('AppIcon', AppIcon)
app.component('AppIconStatic', AppIconStatic)

app.mount('#app')
