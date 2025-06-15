import './assets/main.css'
import './echo';
import router from './router/index.js';
import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import fontawesome from './plugins/fontawesome'

const app = createApp(App)
fontawesome(app)
app.use(router)
app.mount('#app')
