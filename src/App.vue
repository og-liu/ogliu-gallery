<template>
  <div id="app">
    <mobile-header></mobile-header>
    <router-view/>
  </div>
</template>

<script>
import MobileHeader from '@/components/MobileHeader.vue'
export default {
  name: 'App',
  components: { MobileHeader }
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
* {
  padding: 0;
  margin: 0;
}
</style>
