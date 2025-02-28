<template>
  <div id="app">
    <mobile-header></mobile-header>
    <router-view/>
    <mobile-footer></mobile-footer>
  </div>
</template>

<script>
import MobileHeader from '@/components/MobileHeader.vue'
import MobileFooter from '@/components/MobileFooter.vue'
export default {
  name: 'App',
  components: { MobileHeader, MobileFooter }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: #f8f8f8;
}
* {
  padding: 0;
  margin: 0;
}
</style>
