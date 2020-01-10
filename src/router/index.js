import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../pages/Index.vue')
  },
  {
    path: '/login',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/register',
    component: () => import('../pages/Register.vue')
  },
  {
    path: '/detail/:blogId',
    component: () => import('../pages/Detail.vue')
  },
  {
    path: '/user/:userId',
    component: () => import('../pages/User.vue')
  },
  {
    path: '/edit/:blogId',
    component: () => import('../pages/Edit.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/create',
    component: () => import('../pages/Create.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/my',
    component: () => import('../pages/My.vue'),
    meta: {requiresAuth: true}
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('checkLoginStatus').then(loginStatus => {
      if (!loginStatus) {
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      } else {
        next()
      }
    })
  } else {
    next() // 确保一定要调用 next()
  }

})

export default router
