import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Reports from '../views/Reports.vue'
import Resources from '../views/Resources.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/reports', component: Reports },
  { path: '/stadistics_purchases',redirect:'/dashboard'},
  { path: '/stadistics_inventory',redirect:'/dashboard'},
  { path: '/purchases',redirect:'/dashboard'},
  { path: '/inventory',redirect:'/dashboard'},
  { path: '/resources', component: Resources },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router