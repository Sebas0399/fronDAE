import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Dashboard from '@/modules/dashboard/pages/Dashboard.vue'
import PDF from '../modules/pdf/PDF.vue'
import Empresa from '@/modules/empresa/pages/Empresa.vue'
import Usuario from '@/modules/usuario/pages/Usuario.vue'
import Login from '@/modules/usuario/pages/Login.vue'
import Registro from '@/modules/usuario/pages/Registro.vue'
import Pago from '@/modules/pagos/pages/Pago.vue'
import Carrito from '@/modules/pagos/pages/Carrito.vue'
import HomeView from '@/views/HomeView.vue'
import Contact from '@/views/Contact.vue'
import Prices from '@/views/Prices.vue'

const routes = [{
  path: '/',
  name: 'home',
  component: HomeView
},
{
  path: '/registro',
  name: 'registro',
  component: Registro
},
{
  path: '/login',
  name: 'login',
  component: Login
},

{
  path: '/contacto',
  name: 'contacto',
  component: Contact
},
{
  path: '/precio',
  name: 'precio',
  component: Prices
},
{
  path: '/dashboard',
  name: 'dashboard',
  component: Dashboard,
  meta: {
    rutaProtegida: true,
  },
},
{
  path: '/carrito/:plan',
  name: 'carrito',
  component: Carrito,
  meta: {
    rutaProtegida: true,
  },
},
{
  path: '/usuario',
  name: 'usuario',
  component: Usuario,
  meta: {
    rutaProtegida: true,
  },
},
{
  path: '/pdf',
  name: 'pdf',
  component: PDF,
  meta: {
    rutaProtegida: true,

  },
},
{
  path: '/pago',
  name: 'pago',
  component: Pago,
  meta: {
    rutaProtegida: true,

  },
},
{
  path: '/empresa',
  name: 'empresa',
  component: Empresa,
  meta: {
    rutaProtegida: true,
  },
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
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const rutaIsProtected = to.matched.some(record => record.meta.rutaProtegida)
  if (rutaIsProtected && localStorage.getItem('token') === null) {
    next('/login')
  } else if (!rutaIsProtected && !!localStorage.getItem('token')) {
    next('/dashboard') //o cualquier ruta donde quieras que vuelva
  } else {
    next()
  }
})

export default router
