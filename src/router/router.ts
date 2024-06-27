import { Router, createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/components/layouts/AdminLayout.vue';

const routes = [
  {
    path: '/',
    meta: { layout: AdminLayout },
    component: () => import('@/components/Index.vue')
  },
  {
    path: '/login',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/register',
    component: () => import('@/components/Register.vue')
  }
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

export default router