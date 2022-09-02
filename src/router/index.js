import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InvoiceInfo from '../views/InvoiceInfo.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/invoice/:id',
    name:'InvoiceInfo',
    component:InvoiceInfo
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router