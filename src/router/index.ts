// src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
    guestOnly?: boolean
    layout?: 'default' | 'auth'
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: 'Головна | Vue Lottery App',
        layout: 'default',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: {
        title: 'Про автора | Vue Lottery App',
        layout: 'default',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        title: 'Авторизація | Vue Lottery App',
        layout: 'auth',
        guestOnly: true,
      },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/UsersListView.vue'),
      meta: {
        title: 'Користувачі | Vue Lottery App',
        requiresAuth: true,
        layout: 'default',
      },
    },
    {
      path: '/users/:id',
      component: () => import('@/views/UserDetailView.vue'),
      props: true,
      children: [
        {
          path: 'edit',
          name: 'user-edit',
          component: () => import('@/views/UserEditView.vue'),
          props: true,
          meta: {
            title: 'Редагування користувача | Vue Lottery App',
            requiresAuth: true,
            layout: 'default',
          },
        },
      ],
      meta: {
        title: 'Деталі користувача | Vue Lottery App',
        requiresAuth: true,
        layout: 'default',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        title: '404 - Сторінку не знайдено | Vue Lottery App',
        layout: 'default',
      },
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: 'users' }
  }
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
