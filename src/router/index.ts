import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/LoginView.vue'),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
