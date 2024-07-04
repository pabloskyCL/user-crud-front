import { Router, createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/components/layouts/AdminLayout.vue';
import UserLayout from '@/components/layouts/UserLayout.vue';
import { useAuthStore } from '@/Store/Auth';
import { useToast } from '@/components/ui/toast';

export const routes = [
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
    name: 'register' ,
    component: () => import('@/components/Register.vue')
  },
  {
    path: '/create',
    meta: { layout: AdminLayout },
    component: () => import('@/components/Admin/Create.vue')
  },
  {
    path: '/edit/:id',
    meta: { layout: AdminLayout },
    component: () => import('@/components/Edit.vue')
  },
  {
    path: '/show/:id',
    meta: { layout: AdminLayout },
    component: () => import('@/components/Admin/Show.vue')
  }
]


const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

let privateRoutes = [
  '/create',
  '/show'
]


router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const { toast } = useToast();
  if(!authStore.user && to.name !== 'login' && to.name !== 'register'){
    return {  path: '/login'}
  }

  const isAdmin = authStore.user?.roles.find((role) => role == 'Admin');

  if(authStore.user && to.meta.layout && !isAdmin){
     to.meta.layout = UserLayout
  }
  if(!isAdmin && privateRoutes.includes(to.path)){
    toast({
      title: 'no eres administrador',
      description: 'solo los usuarios con permiso administrador pueden entrar aquí'
    })
    return { path: '/' }
  }

})

export default router