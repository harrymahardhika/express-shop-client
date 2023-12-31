import { createPinia } from 'pinia'
import { createApp } from 'vue'

import Toast from 'vue-toastification'

import 'vue-toastification/dist/index.css'
import './assets/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: false,
  rtl: false,
  transition: 'Vue-Toastification__fade'
})

app.mount('#app')
