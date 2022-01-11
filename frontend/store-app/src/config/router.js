import {createWebHistory, createRouter} from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ByCategory from '@/components/product/ByCategory'
import ByTag from '@/components/product/ByTag'
import Auth from '@/components/auth/Auth'
import {userKey} from '@/global'


const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: {
        requiresAdmin: true
    }
}, {
    name: 'byCategory',
    path: '/category/:code/products',
    component: ByCategory
}, {
    name: 'byTag',
    path: '/category/search/:tag',
    component: ByTag
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}]

const router = createRouter ({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)
    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({path: '/'})
    } else {
        next()
    }
})

export default router