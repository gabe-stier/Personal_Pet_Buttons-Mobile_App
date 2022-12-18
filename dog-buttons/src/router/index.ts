import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: "/home",
    component: () => import("../views/FolderPage.vue")
  },
  {
    path: "/settings",
    component: () => import("../views/SettingsPage.vue")
  },
  {
    path: "/login",
    component: () => import("../views/LoginPage.vue")
  },
  {
    path: "/logout",
    component: () => import("../views/LogoutComponent.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
