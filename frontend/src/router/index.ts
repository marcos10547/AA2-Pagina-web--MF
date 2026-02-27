import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/auth/login'
        },
        {
            path: '/home',
            component: () => import('../layouts/MainLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('../views/HomeView.vue')
                }
            ]
        },
        {
            path: '/auth',
            component: () => import('../layouts/AuthLayout.vue'),
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('../views/LoginView.vue')
                },
                {
                    path: 'register',
                    name: 'register',
                    component: () => import('../views/RegisterView.vue')
                }
            ]
        },
        {
            path: '/admin',
            component: () => import('../layouts/AdminLayout.vue'),
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'admin-dashboard',
                    component: () => import('../views/admin/AdminDashboard.vue')
                },
                {
                    path: 'products',
                    name: 'admin-products',
                    component: () => import('../views/admin/ProductList.vue')
                },
                {
                    path: 'vendors',
                    name: 'admin-vendors',
                    component: () => import('../views/admin/VendorList.vue')
                }
            ]
        },
        {
            path: '/login',
            redirect: '/auth/login'
        }
    ]
})

router.beforeEach((to, _, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/auth/login')
    } else {
        next()
    }
})

export default router
