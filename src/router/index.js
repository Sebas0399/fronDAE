import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/modules/dashboard/pages/Dashboard.vue'
import PDF from '../modules/pdf/PDF.vue'
import Empresa from '@/modules/empresa/pages/Empresa.vue'

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/pdf',
    name: 'pdf',
    component: PDF
  },
  {
    path: '/empresa',
    name: 'empresa',
    component: Empresa
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
