import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './config/router'

const store = {
    debug: true,
    state: reactive({
        currentUser: {}
    })
}

export default {store}

createApp(App).use(router).mount('#app')
