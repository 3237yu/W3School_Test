import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles.css'; // 引入全局样式

createApp(App)
    .use(store)
    .use(router)
    .mount('#app');
