import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import TotemView from '@/views/TotemView.vue'
import DisplayView from '@/views/DisplayView.vue'
import CounterView from '@/views/CounterView.vue'
import HomeView from '@/views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/totem',
    name: 'Totem',
    component: TotemView
  },
  {
    path: '/display',
    name: 'Display',
    component: DisplayView
  },
  {
    path: '/counter',
    name: 'Counter',
    component: CounterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router