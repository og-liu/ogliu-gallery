import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 修改为路由懒加载（动态导入）：
// const Entry = () => import(/* webpackChunkName: "Entry" */ '@/view/entry.vue')
const Gallery = () => import(/* webpackChunkName: "Gallery" */ '@/components/Gallery.vue')

// 对于特殊依赖的异步加载（可选）
// const HeavyComponent = resolve => require.ensure([], () => resolve(
//   require('../views/HeavyComponent.vue'),
//   'heavy' // webpack chunk 命名
// ))

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'entry',
    //   component: Entry
    // },
    {
      path: '/',
      name: 'gallery',
      component: Gallery
    }
  ]
})
