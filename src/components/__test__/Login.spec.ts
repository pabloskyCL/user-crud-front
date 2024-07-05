/**
 * @vitest-environment happy-dom
 */

import { mount, flushPromises } from '@vue/test-utils'
import { routes } from '@/router/router'
import App from '@/App.vue'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import { Router, createRouter, createWebHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { useToast } from '../ui/toast'
import UserLayout from '../layouts/UserLayout.vue'
import { useAuthStore } from '@/Store/Auth'
import axios from 'axios'


describe('Login view test', () => {
  let testRouter: Router;
  const loginResponse = {
    "user": {
      "id": 1,
      "name": "Test User",
      "email": "test@example.com",
      "roles": [
        "Admin"
      ],
      "created_at": "2024-07-03 22:36:32"
    },
    "accessToken": "4|aOSTilJWkqquyjNGGBBusisjvdRKBngCvEk8AB9naa1d9a3a"
  }

  vi.spyOn(axios, 'post').mockResolvedValue(loginResponse)

  beforeEach(async () => {
    testRouter = createRouter({
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
      if (!authStore.user && to.name !== 'login' && to.name !== 'register') {
        return { path: '/login' }
      }

      const isAdmin = authStore.user?.roles.find((role) => role == 'Admin');

      if (authStore.user && to.meta.layout && !isAdmin) {
        to.meta.layout = UserLayout
      }
      if (!isAdmin && privateRoutes.includes(to.path)) {
        toast({
          title: 'no eres administrador',
          description: 'solo los usuarios con permiso administrador pueden entrar aquí'
        })
        return { path: '/' }
      }

    })
  })
  function mountApp() {
    const wrapper = mount(App, {
      global: {
        plugins: [testRouter, createTestingPinia({
          createSpy: vi.fn
        })],
        mocks: {
          $router: testRouter,
        }
      }
    })

    return wrapper
  }
  test('click register', async () => {
    const wrapper = mountApp();
    testRouter.push('/');

    await testRouter.isReady()

    expect(testRouter.currentRoute.value.name).toBe('login')
    expect(wrapper.find('a[href="/register"]').attributes('href')).toBe('/register')
    expect(wrapper.find('input').attributes('name') == "email").toBe(true)

    const push = vi.spyOn(testRouter, 'push')

    await wrapper.find('a[href="/register"]').trigger('click')

    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith('/register')

  })

  // test('login attempt', async () => {
  //   const wrapper = mountApp();
  //   testRouter.push('login');

  //   await testRouter.isReady();

  //   // const push = vi.spyOn(testRouter, 'push')

  //   await wrapper.find('input[name="email"]').setValue("test@example.com")
  //   await wrapper.find('input[name="password"]').setValue("password")

  //   await wrapper.find('form').trigger('submit')


  //   // expect(authStore.login).toHaveBeenCalledTimes(1)
  //   // expect(axios.post).toHaveBeenCalledWith('/login')

  //   await flushPromises()

  //   await testRouter.isReady();


  //   // expect(push).toHaveBeenCalledTimes(1)
  //   // expect(push).toHaveBeenCalledWith('/')

  // })
})
