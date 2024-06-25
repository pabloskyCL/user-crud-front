import { createApp, markRaw } from 'vue'
import './assets/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/router'

const pinia = createPinia()
pinia.use(({store}) => {
  store.$router = markRaw(router)
})
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')