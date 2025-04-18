import { createApp } from 'vue';
import { createPinia } from "pinia";
import './style.css';
import '@oruga-ui/theme-oruga/dist/oruga.css';
import "@mdi/font/css/materialdesignicons.min.css";
import router from './router.js';
import App from './App.vue';
import Oruga from '@oruga-ui/oruga-next';


createApp(App)
  .use(createPinia())
  .use(router)
  .use(Oruga)
  .mount('#app')