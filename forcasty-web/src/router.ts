import { createRouter, createWebHistory } from 'vue-router'

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
        },
      ],
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('./pages/PageNotFound.vue')
      },
  ],
})

export default router
