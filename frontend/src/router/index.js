import Login from '@/components/Login/Index.vue'
import Inicio from '@/components/HelloWorld.vue'

// Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Inicio
  }
]

export default routes
