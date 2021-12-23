import {createWebHistory, createRouter} from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ByCategory from '@/components/home/ByCategory'


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
    path: '/category/:cat',
    component: ByCategory
}]

const router = createRouter ({
    history: createWebHistory(),
    routes
})

export default router