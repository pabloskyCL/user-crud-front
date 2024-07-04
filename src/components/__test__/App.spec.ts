/**
 * @vitest-environment happy-dom
 */

import { mount } from '@vue/test-utils'
import { routes } from '@/router/router'
import App from '@/App.vue'
import { describe, expect, test ,vi } from 'vitest'
import { Router, createRouter, createWebHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { useToast } from '../ui/toast'
import UserLayout from '../layouts/UserLayout.vue'
import { useAuthStore } from '@/Store/Auth'

const testRouter: Router = createRouter({
  history: createWebHistory(),
  routes
})

let privateRoutes = [
  '/create',
  '/show'
]


testRouter.beforeEach(async (to) => {
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

function mountApp() {
  const wrapper = mount(App, {
    global: {
      plugins: [testRouter, createTestingPinia({
        createSpy: vi.fn
      }) ]
    }
  })

  return wrapper
}

describe('Run spa for the first time', () => {

  test('render app for first time', async () => {
    const wrapper = mountApp();
    testRouter.push('/');
    
    await testRouter.isReady()

    expect(testRouter.currentRoute.value.name).toBe('login')
    expect(wrapper.html()).toContain('Iniciar Sesión')
    expect(wrapper.find('a[href="/register"]').attributes('href')).toBe('/register')
    expect(wrapper.find('input').attributes('name') == "email").toBe(true)

  })

})
