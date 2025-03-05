import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../LandingPage/LandingPage.vue';

const routes = [
  { path: '/', component: LandingPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;