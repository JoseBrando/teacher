import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// === CSS ===
import 'bootstrap/dist/css/bootstrap.min.css'
import 'admin-lte/dist/css/adminlte.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

// === JS ===
import 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'admin-lte/dist/js/adminlte.min.js'

const app = createApp(App)

app.use(router)

app.mount('#app')
