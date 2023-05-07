import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/customers',
        component: () => import('layouts/main-layout.vue'),
        meta: {
            access: 'auth-only',
        },
        children: [
            {
                path: 'news', component: () => import('pages/researches.vue'),
            },
            {
                path: 'analysts', component: () => import('pages/notifications.vue'),

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
    {
        path: '/events',
        component: () => import('layouts/events-layout.vue'),
        meta: {
            access: 'auth-only',
        },
        children: [
            {
                path: '', component: () => import('pages/events.vue'),
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
