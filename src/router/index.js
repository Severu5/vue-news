import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home'),
        meta: { requiresAuth: false }
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa'),
        meta: { requiresAuth: false }
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: { requiresAuth: false }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/profile'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true,
    meta: { requiresAuth: false }
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
    meta: { requiresAuth: false }
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.user) {
      next()
    } else {
      Dialog.confirm({
        title: '访问提示',
        message: '该功能需要登录，确认登录吗？'
      })
        .then(() => {
          next({
            name: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        })
        .catch(() => {
          next(false)
        })
    }
  } else {
    next()
  }
})

export default router
