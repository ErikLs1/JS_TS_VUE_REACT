import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import {useAccountStore} from "@/stores/userStore.ts";


const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
    },
    {
        path: '/categories',
        name: 'Categories',
        component: CategoriesView,
        meta: { requiresAuth: true },
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
