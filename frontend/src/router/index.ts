import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Support from '../views/Support.vue'
import Subscription from '../views/Subscription.vue'
import Appointment from '../views/Appointment.vue'
import Services from '../views/Services.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import UserProfile from '../views/UserProfile.vue'
import Repair from '../views/Repair.vue'
import TrackRepair from '../views/TrackRepair.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminNewRepair from "../views/AdminNewRepair.vue"
import ImportAtlas from "../views/ImportAtlas.vue"
import ImportBoxy from "../views/ImportBoxy.vue"
const routes = [
  { path:'/', component:Home },
  { path:'/login', component:Login },
  { path:'/register', component:Register },
  { path:'/support', component:Support },
  { path:'/abonnement', component:Subscription },
  { path:'/appointment', component:Appointment },
  { path:'/services', component:Services },
  { path:'/admin', component:AdminDashboard },
  { path:'/profile', component:UserProfile },
  { path:'/repair', component:Repair },
  { path:'/track-repair', component:TrackRepair },
  { path:'/admin-login', component:AdminLogin },
  { path:'/admin/new-repair', component:AdminNewRepair },
  { path: "/admin/import-boxy", component: ImportBoxy },
  { path:'/admin/import-atlas', component:ImportAtlas }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/admin') && to.path !== '/admin-login') {
    const admin = localStorage.getItem('admin')

    if (admin === 'true') {
      next()
    } else {
      next('/admin-login')
    }
  } else {
    next()
  }
})

export default router