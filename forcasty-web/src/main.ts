import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import './style.css'
import App from './App.vue'
import router from './router'
import { firebaseConfig } from './firebaseConfig';
import { getAuth } from 'firebase/auth';

async function bootstrap() {
    const appFirebase = initializeApp(firebaseConfig);
    getAnalytics(appFirebase);
    const auth = getAuth()
    await new Promise((resolve) => {
      const unsub = auth.onAuthStateChanged((user) => {
        unsub()
        resolve(user)
      })
    })
    const pinia = createPinia()
    const app = createApp(App)
    app.use(pinia)
    app.use(router)
    app.mount('#app')
}

bootstrap()