import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import store from "@/store/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: "/home",
    component: () => import("../views/HomePage.vue"),
    meta: { requiredAuth: true }
  },
  {
    path: "/settings",
    component: () => import("../views/SettingsPage.vue"),
    meta: { requiredAuth: true }
  },
  {
    path: "/login",
    component: () => import("../views/LoginPage.vue")
  },
  {
    path: "/logout",
    component: () => import("../views/LogoutComponent.vue"),
    meta: { requiredAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function guard(to: any, from: any, next: any, authData: any) {
  if (to.meta && to.meta.requiredAuth) {
    if (authData && authData.userId > 0) {
      return next();
    }
    return next({ path: "/login" });
  } else {
    if (authData && authData.userId > 0) {
      return next({ path: "/home" });
    }
    return next();
  }
}

router.beforeEach((to, from, next) => {
  let authData = store.getters["auth/getAuthData"];
  if (authData.userId == 0) {
    store.dispatch("auth/loadStorageTokens").then(
      () => {
        authData = store.getters["auth/getAuthData"];
        return guard(to, from, next, authData);
      },
      (error) => {
        console.log(error);
        return guard(to, from, next, authData);
      }
    );
  } else {
    return guard(to, from, next, authData);
  }
})
export default router
