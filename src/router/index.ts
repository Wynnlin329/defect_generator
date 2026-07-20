import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home_page/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects',
      name: 'projects',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this routeImageData[]
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/project/ProjectsView.vue'),
    },
    {
      path: '/project/:projectId',
      name: 'project',
      component: () => import('@/views/project/ProjectView.vue'),
      props: true,
      children: [
        // add labeller page here
        {
          path: 'trainer',
          component: () => import('@/views/project/ProjectTrainerView.vue'),
          props: true,
        },
        // add verifier page here
        {
          path: 'verifier',
          component: () => import('@/views/project/ProjectVerifier.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/account_page/AccountPage.vue'),
    },
    {
      path: '/system',
      component: () => import('@/views/system_page/SystemPage.vue'),
      children: [
        { path: '', redirect: '/system/user' },
        {
          path: 'user',
          component: () => import('@/views/system_page/UserAccountTable.vue'),
          props: true,
        },
        {
          path: 'admin',
          component: () => import('@/views/system_page/AdminListTable.vue'),
          props: true,
        },
        {
          path: 'announcement',
          component: () => import('@/views/system_page/AnnouncementTable.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/defect_generator',
      name: 'defect_generator',
      component: () => import('@/views/defect_generator_page/DefectGeneratorPage.vue'),
      props: true,
    },
    {
      path: '/trash-can',
      name: 'trash-can',
      component: () => import('@/views/project/ProjectsTrashCanView.vue'),
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('@/views/project/ProjectsScheduleView.vue'),
    },
  ],
})

export default router
