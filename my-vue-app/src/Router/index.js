import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../LandingPage/LandingPage.vue';
import Login from '../Auth/Login.vue';
import Signup from '../Auth/Signup.vue';
import Dashboard from '../Dashboard/Dashboard.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: Login},
  { path: '/signup', component: Signup},
  { path: '/dashboard', component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;