import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/admin',
        component: () => import('layouts/main-layout.vue'),
        meta: {
            access: 'auth-only',
        },
        children: [
            {
                path: 'coins',
                component: () => import('pages/coins.vue'),
            },
            {
                path: 'researches',
                component: () => import('pages/research.vue'),
            },
            {
                path: '',
                component: () => import('pages/publish.vue'),
            },
        ],
    },
    {
        path: '/',
        component: () => import('layouts/login-layout.vue'),
        children: [
            {
                path: '', component: () => import('pages/index.vue'),
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
