import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './config/router'

createApp(App).use(router).mount('#app')
