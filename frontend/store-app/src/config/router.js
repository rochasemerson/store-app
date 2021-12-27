import {createWebHistory, createRouter} from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ByCategory from '@/components/product/ByCategory'


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
}]

const router = createRouter ({
    history: createWebHistory(),
    routes
})

export default router