import { createApp } from 'vue';
import './style.css';
import '@oruga-ui/theme-oruga/dist/oruga.css';
import router from './router.js';
import App from './App.vue';
import Oruga from '@oruga-ui/oruga-next';


createApp(App)
  .use(router)
  .use(Oruga)
  .mount('#app')