import { Router, createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/components/layouts/AdminLayout.vue';
import UserLayout from '@/components/layouts/UserLayout.vue';
import { useAuthStore } from '@/Store/Auth';

const routes = [
  {
    path: '/',
    meta: { layout: AdminLayout },
    component: () => import('@/components/Index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/register',
    component: () => import('@/components/Register.vue')
  },
  {
    path: '/create',
    meta: { layout: AdminLayout },
    component: () => import('@/components/Admin/Create.vue')
  }
]


const router: Router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  if(!authStore.user && to.name !== 'login'){
    return {  path: '/login'}
  }

  if(authStore.user && to.meta.layout && !authStore.user.roles.find((role) => role == 'Admin')){
     to.meta.layout = UserLayout
  }


})

export default router