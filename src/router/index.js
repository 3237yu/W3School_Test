// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import { recordPageVisit } from '../services/analyticsService';
import store from '../store'; // 引入 Vuex store
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import QuestionManagement from '../views/QuestionManagement.vue';
import UserManagement from '../views/UserManagement.vue';
import Analytics from '../views/Analytics.vue';
import HomeAdmin from '../views/HomeAdmin.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminDashboard,
        redirect: '/admin/home',
        meta: { requiresAuth: true, requiresAdmin: true },
        children: [
            {
                path: 'home',
                name: 'homeadmin',
                component: HomeAdmin
            },
            {
                path: 'questions',
                name: 'questionManagement',
                component: QuestionManagement
            },
            {
                path: 'users',
                name: 'userManagement',
                component: UserManagement
            },
            {
                path: 'analytics',
                name: 'analytics',
                component: Analytics
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach(async (to, from, next) => {
    // 记录访问量
    if (to.path !== '/login') {
        try {
            await recordPageVisit(to.path);
        } catch (error) {
            console.error('Error recording visit:', error);
        }
    }

    // 检查登录状态和权限
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.user.isLoggedIn) {
            next({ name: 'login' });
        } else if (to.matched.some(record => record.meta.requiresAdmin) && !store.state.user.isAdmin) {
            next({ name: 'home' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
