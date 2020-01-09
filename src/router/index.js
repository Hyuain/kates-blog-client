import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/Index'
import Login from '../pages/Login'
import Detail from '../pages/Detail'
import User from '../pages/User'
import Edit from '../pages/Edit'
import Create from '../pages/Create'
import My from '../pages/My'

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
    path: '/detail',
    component: Detail
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '/edit',
    component: Edit
  },
  {
    path: '/create',
    component: Create
  },
  {
    path: '/my',
    component: My
  },

]

const router = new VueRouter({
  routes
})

export default router
