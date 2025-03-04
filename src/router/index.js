import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const image = () => import(/* webpackChunkName: "index" */ '@/components/image.vue')
const imageViewer = () => import(/* webpackChunkName: "index" */ '@/components/ImageViewer.vue')
const A034 = () => import(/* webpackChunkName: "index" */ '@/view/sku/A034.vue')
const A035 = () => import(/* webpackChunkName: "index" */ '@/view/sku/A035.vue')
const A056 = () => import(/* webpackChunkName: "index" */ '@/view/sku/A056.vue')
const A062 = () => import(/* webpackChunkName: "index" */ '@/view/sku/A062.vue')

export default new Router({
  routes: [
    // { path: '/A0239/这是一段安全的图片提取链接，请放心前往下载，点击发货内容旁边的复制图标，快速复制全部内容,前往浏览器粘贴即可', name: 'image', component: image },

    { path: '/A034&yilmale', name: 'A034', component: A034 },
    { path: '/A035&nduamld', name: 'A035', component: A035 },
    { path: '/A056&vmaoish', name: 'A056', component: A056 },
    { path: '/A062&ndjw', name: 'A062', component: A062 },
    { path: '/', name: 'index', component: imageViewer },
    {
      path: '*',
      name: '404',
      component: image
    }
  ]
})
