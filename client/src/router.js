import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './LandingPage/LandingPage.vue';
import Login from './Auth/Login.vue';
import Signup from './Auth/Signup.vue';

//dashboard imports
import DashboardSwitchBoard from './Dashboard/Dashboard/DashboardSwitchBoard.vue';
import DashboardHome from './Dashboard/Dashboard/Dashboard.vue';

//student imports
import StudentsSwitchBoard from './Dashboard/Students/StudentsSwitchBoard.vue';
import Students from './Dashboard/Students/Students.vue';
import CreateNewStudent from './Dashboard/Students/New Student Pipeline/CreateNewStudent.vue';
import EditStudentClasses from './Dashboard/Students/New Student Pipeline/EditStudentClasses.vue'

//settings imports
import SettingsSwitchBoard from './Settings/SettingsSwitchBoard.vue';
import AccountSettings from './Settings/AccountSettings.vue';
import ThemeSettings from './Settings/ThemeSettings.vue';

//notes imports
import Notes from './Dashboard/Notes.vue';


const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: Login},
  { path: '/signup', component: Signup},
  { 
    path: '/dashboard', 
    component: DashboardSwitchBoard, 
    children: [
      { path: '', component: DashboardHome },
      { 
        path: 'students', 
        component: StudentsSwitchBoard, 
        children: [
          { path: '', component: Students },
          { path: 'new-student', component: CreateNewStudent },
          { path: 'edit-student-classes', component: EditStudentClasses}
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
  const token = localStorage.getItem('token');

  if (!token && !publicPaths.includes(to.path)) {
    // If there's no token and the user is trying to access a protected route, redirect to login
    next('/');
  } else {
    next();
  }
});

export default router;