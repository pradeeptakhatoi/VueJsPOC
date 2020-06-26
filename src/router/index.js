import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import ListUser from '../components/user/ListUser.vue'
import AddUser from '../components/user/AddUser.vue'
import EditUser from '../components/user/EditUser.vue'
import ViewUser from '../components/user/ViewUser.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'Users',
    component: ListUser
  },
  {
    path: '/add-user',
    name: 'AddUser',
    component: AddUser
  },
  {
    path: '/edit-user/:id',
    props: true,
    name: 'EditUser',
    component: EditUser
  },
  {
    path: '/view-user/:id',
    props: true,
    name: 'ViewUser',
    component: ViewUser
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
