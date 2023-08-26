import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

function bootstrap() {
    const pinia = createPinia()
    const app = createApp(App)
    app.use(pinia)
    app.use(router)
    app.mount('#app')
}

bootstrap()