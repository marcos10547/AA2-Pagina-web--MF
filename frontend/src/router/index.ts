import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: () => {
                // Si ya está autenticado, ir al admin. Si no, al login.
                const token = localStorage.getItem('token')
                return token ? '/admin' : '/auth/login'
            }
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

router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore()

    // Si ya está autenticado y va al login, redirigir al admin
    if (authStore.isAuthenticated && (to.name === 'login' || to.name === 'register')) {
        next('/admin')
        return
    }

    // Si la ruta requiere auth y no está autenticado, al login
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/auth/login')
        return
    }

    next()
})

export default router
