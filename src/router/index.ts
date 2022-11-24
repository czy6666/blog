import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/',
        redirect: '/home',
        component: () => import('@/layout/layout.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                redirect: '/articleList',
                component: () => import('@/views/home/home.vue'),
                children: [
                    {
                        path: '/articleList',
                        name: 'articleList',
                        component: () =>
                            import('@/views/home/cpns/article-list.vue')
                    },
                    {
                        path: '/article/:article_id',
                        name: 'article',
                        component: () =>
                            import('@/views/home/cpns/article-detail.vue'),
                        props: true
                    }
                ]
            },
            {
                path: '/classify',
                name: 'classify',
                component: () => import('@/views/classify/classify.vue')
            },
            {
                path: '/label',
                name: 'label',
                component: () => import('@/views/label/label.vue')
            },
            {
                path: 'label/:labelName',
                name: 'labelItem',
                component: () => import('@/views/label/cpns/label-item.vue'),
                props: true
            },
            {
                path: '/archive',
                name: 'archive',
                component: () => import('@/views/archive/archive.vue')
            },
            {
                path: '/about',
                name: 'about',
                component: () => import('@/views/about/about.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
