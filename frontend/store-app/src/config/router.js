import {createWebHistory, createRouter} from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ByCategory from '@/components/product/ByCategory'
import ByTag from '@/components/product/ByTag'
import Auth from '@/components/auth/Auth'


const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
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

export default router