import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const A034 = () => import(/* webpackChunkName: "index" */ '@/view/sku/A034.vue')
const A056 = () => import(/* webpackChunkName: "index" */ '@/view/sku/A056.vue')
const A062 = () => import(/* webpackChunkName: "index" */ '@/view/sku/A062.vue')

export default new Router({
  routes: [
    { path: '/A034&yilmale', name: 'A034', component: A034 },
    { path: '/A056&vmaoish', name: 'A056', component: A056 },
    { path: '/A062&ndjw', name: 'A062', component: A062 }
  ]
})
