import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/Index'
import Login from '../pages/Login'
import Detail from '../pages/Detail'
import User from '../pages/User'
import Edit from '../pages/Edit'
import Create from '../pages/Create'
import My from '../pages/My'
import Register from '../pages/Register'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/detail/:blogId',
    component: Detail
  },
  {
    path: '/user/:userId',
    component: User
  },
  {
    path: '/edit/:blogId',
    component: Edit,
    meta: {requiresAuth: true}
  },
  {
    path: '/create',
    component: Create,
    meta: {requiresAuth: true}
  },
  {
    path: '/my',
    component: My,
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
