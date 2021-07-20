import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/able-inquiryprocess/create',
        name: 'Create',
        component: () => import('../views/Create.vue'),
    },
    {
        path: '/able-inquiryprocess/overview',
        name: 'Overview',
        component: () => import('../views/Overview.vue'),
    },
    {
        path: '*',
        name: 'Seite konnte nicht gefunden werden',
        component: () => import('../views/NotFound.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
