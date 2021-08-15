import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
const routes: Array<RouteRecordRaw> = [
  {  path: '/',      name: 'Home',  component: Home   },
  {  path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')  },
  {  path: '/list',  name: 'List',  component: () => import(/* webpackChunkName: "list" */ '../views/ListView.vue')  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router