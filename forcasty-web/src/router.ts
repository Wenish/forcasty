import { getAuth } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import { getAnalytics, logEvent } from 'firebase/analytics';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./layouts/LayoutBasic.vue'),
      children: [
        {
          path: '',
          component: () => import('./pages/PageHome.vue'),
          meta: {
            requiresAuth: true
          }
        },
      ],
    },
    {
      path: '/project-new',
      component: () => import('./layouts/LayoutBasic.vue'),
      children: [
        {
          path: '',
          component: () => import('./pages/PageProjectNew.vue'),
          meta: {
            requiresAuth: true
          }
        },
      ],
    },
    {
      path: '/projects/:id',
      component: () => import('./layouts/LayoutBasic.vue'),
      children: [
        {
          path: '',
          component: () => import('./pages/PageProject.vue'),
          meta: {
            requiresAuth: true
          },
          props: true,
        },
        {
          path: 'edit',
          component: () => import('./pages/PageProjectEdit.vue'),
          meta: {
            requiresAuth: true
          },
          props: true,
        },
        {
          path: 'members',
          component: () => import('./pages/PageProjectMembers.vue'),
          meta: {
            requiresAuth: true
          },
          props: true,
        },
      ],
    },
    {
      path: '/login',
      component: () => import('./layouts/LayoutBasic.vue'),
      children: [
        {
          path: '',
          component: () => import('./pages/PageLogin.vue'),
          beforeEnter: (_to, _from, next) => {
            const auth = getAuth()
            if (auth.currentUser) {
              next('/')
            } else {
              next()
            }
          },
        },
      ],
    },
    {
      path: '/logout',
      name: 'PageLogout',
      redirect: () => {
        const auth = getAuth()
        auth.signOut()
        return '/login'
      },
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('./layouts/LayoutBasic.vue'),
        children: [
          {
            path: '',
            component: () => import('./pages/PageNotFound.vue')
          },
        ],
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const auth = getAuth()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth) {
    if (auth.currentUser) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    }
  } else {
    next()
  }
})

router.afterEach((to) => {
  const analytics = getAnalytics()
  logEvent(analytics, 'page_view', {
    page_path: to.fullPath,
    page_title: document.title
  })
})


export default router

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}