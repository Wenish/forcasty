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
      path: '/projects/:id',
      component: () => import('./layouts/LayoutBasic.vue'),
      children: [
        {
          path: '',
          component: () => import('./pages/PageProject.vue'),
          props: true,
        },
      ],
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('./layouts/LayoutBasic.vue'),
        children: [
          {
            path: '',
            component: () => import('./pages/PageNotFound.vue'),
            props: true,
          },
        ],
    },
  ],
})

export default router
