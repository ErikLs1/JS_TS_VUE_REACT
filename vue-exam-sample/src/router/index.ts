import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useAccountStore} from "@/stores/userStore.ts";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const account = useAccountStore();
  if (to.meta.requiresAuth && !account.isAuthenticated) {
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }

  if ((to.path === '/login' || to.path === '/register') && account.isAuthenticated) {
    return next({ path: '/' })
  }

  next();
})

export default router