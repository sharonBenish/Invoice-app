import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import InvoiceInfo from '../views/InvoiceInfo.vue'
import AuthPage from '../views/AuthPage.vue'

const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthPage,
  },
  {
    path: '/invoices',
    name: 'invoices',
    component: MainPage,
    meta: { transition: 'fade-right' },
  },
  {
    path:'/invoice/:id',
    name:'InvoiceInfo',
    component:InvoiceInfo,
    meta: { transition: 'fade-left' },
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router