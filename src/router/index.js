import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/',           name: 'home',         component: () => import('@/views/HomeView.vue') },
  { path: '/oils',       name: 'oils',         component: () => import('@/views/EncyclopediaView.vue') },
  { path: '/oils/:id',   name: 'oil-detail',   component: () => import('@/views/OilDetailView.vue') },
  { path: '/consult',    name: 'consult',      component: () => import('@/views/ConsultationView.vue') },
  { path: '/favorites',  name: 'favorites',    component: () => import('@/views/FavoritesView.vue') },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})
