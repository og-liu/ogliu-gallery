// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { Carousel, CarouselItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/carousel.css'
import 'element-ui/lib/theme-chalk/carousel-item.css'

Vue.component('carousel', Carousel)
Vue.component('carouselItem', CarouselItem)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
