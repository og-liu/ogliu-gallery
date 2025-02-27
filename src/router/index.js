import Vue from 'vue'
import Router from 'vue-router'
import Entry from '@/view/entry.vue'
import Gallery from '@/components/Gallery.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'entry',
      component: Entry
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery
    }
  ]
})
