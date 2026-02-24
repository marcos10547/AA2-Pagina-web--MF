import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
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
                }
            ]
        },
        {
            path: '/admin',
            component: () => import('../layouts/AdminLayout.vue'),
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
                // Aquí irán las rutas de Vendors
            ]
        },
        {
            path: '/login',
            redirect: '/auth/login'
        }
    ]
});

export default router;
