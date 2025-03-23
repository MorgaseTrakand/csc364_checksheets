import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './LandingPage/LandingPage.vue';
import Login from './Auth/Login.vue';
import Signup from './Auth/Signup.vue';
import Dashboard from './Dashboard/DashboardSwitchBoard.vue';
import DashboardHome from './Dashboard/Dashboard.vue';
import Students from './Dashboard/Students.vue';
import Notes from './Dashboard/Notes.vue';
import NewStudent from './Dashboard/Students/NewStudent.vue';
import ChangeMajor from './Dashboard/Students/ChangeMajor.vue';
import SettingsSwitchBoard from './Dashboard/Settings/SettingsSwitchBoard.vue';
import AccountSettings from './Dashboard/Settings/AccountSettings.vue';
import ThemeSettings from './Dashboard/Settings/ThemeSettings.vue';

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
          { path: 'new-student', component: NewStudent },
          { path: 'change-major', component: ChangeMajor },
        ] 
      },
      { path: 'notes', component: Notes },
      { 
        path: '/settings', 
        component: SettingsSwitchBoard, 
        children: [
          { path: 'account', component: AccountSettings },
          { path: 'theme', component: ThemeSettings },
        ]
      },
    ] 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const publicPaths = ['/', '/login', '/signup'];
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');

  if (!token && !publicPaths.includes(to.path)) {
    // If there's no token and the user is trying to access a protected route, redirect to login
    next('/');
  } else {
    next();
  }
});

export default router;