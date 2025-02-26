<template>
  <div id="app">
    <mobile-header></mobile-header>
    <mobile-swipe></mobile-swipe>
    <router-view/>
  </div>
</template>

<script>
import MobileHeader from '@/components/MobileHeader.vue'
import MobileSwipe from '@/components/MobileSwipe.vue'
export default {
  components: {
    MobileHeader,
    MobileSwipe
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 64px;
}
* {
  padding: 0;
  margin: 0;
}
</style>
