import { createRouter, createWebHashHistory, createMemoryHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const useHashHistory =
  typeof window !== 'undefined' &&
  window.history &&
  typeof window.history.pushState === 'function' &&
  typeof window.history.replaceState === 'function'

const router = createRouter({
  history: useHashHistory ? createWebHashHistory() : createMemoryHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView }
  ]
})

export default router
