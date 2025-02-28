import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const A062 = () => import(/* webpackChunkName: "index" */ '@/view/sku/A062.vue')

export default new Router({
  routes: [
    { path: '/A062&ndjw', name: 'A062', component: A062 }
  ]
})
