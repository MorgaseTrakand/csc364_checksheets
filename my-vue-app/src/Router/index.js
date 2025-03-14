import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../LandingPage/LandingPage.vue';
import Login from '../Auth/Login.vue';
import Signup from '../Auth/Signup.vue';
import Dashboard from '../Dashboard/DashboardSwitchBoard.vue';
import DashboardHome from '../Dashboard/Dashboard.vue';
import Students from '../Dashboard/Students.vue';
import Notes from '../Dashboard/Notes.vue';
import RequiredClasses from '../Dashboard/RequiredClasses.vue';
import Settings from '../Dashboard/Settings.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: Login},
  { path: '/signup', component: Signup},
  { 
    path: '/dashboard', 
    component: Dashboard, 
    children: [
      { path: '', component: DashboardHome },
      { 
        path: 'students', 
        component: Students, 
        children: [
          { path: 'new-student', component: RequiredClasses }
        ] 
      },
      { path: 'notes', component: Notes },
      { path: '/settings', component: Settings },
    ] 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const publicPaths = ['/', '/login', '/signup'];
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('authToken');

  if (!token && !publicPaths.includes(to.path)) {
    // If there's no token and the user is trying to access a protected route, redirect to login
    next('/');
  } else {
    next();
  }
});

export default router;