import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../LandingPage/LandingPage.vue';
import Login from '../Auth/Login.vue';
import Signup from '../Auth/Signup.vue';
import Dashboard from '../Dashboard/DashboardSwitchBoard.vue';
import DashboardHome from '../Dashboard/Dashboard.vue';
import Students from '../Dashboard/Students.vue';
import Notes from '../Dashboard/Notes.vue';
import RequiredClasses from '../Dashboard/RequiredClasses.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: Login},
  { path: '/signup', component: Signup},
  { 
    path: '/dashboard', 
    component: Dashboard, 
    children: [
      { path: '', component: DashboardHome },
      { path: 'students', component: Students },
      { path: 'notes', component: Notes },
      { path: 'new-student', component: RequiredClasses }, 
    ] 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;