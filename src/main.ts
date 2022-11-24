import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerApp } from './global'
import 'normalize.css'

import './assets/css/index.less'

const app = createApp(App)

registerApp(app)

app.use(store).use(router).mount('#app')
