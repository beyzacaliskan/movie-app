import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: () => import(/* webpackChunkName: "MovieDetail" */ '../views/MovieDetail.vue')
  },
  {
    path: '/404',
    alias: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "404" */ '../views/NotFound.vue')
  }
]

const router = new VueRouter({
  routes,
  // mode : 'history'
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
