<template>
  <div class="carous">
    <carousel trigger="click" :autoplay="false" :loop="false" indicator-position="outside" arrow="always">
      <carousel-item>
        <img src="/static/test1.png" alt="">
      </carousel-item>
      <carousel-item>
        <img src="/static/test2.png" alt="">
      </carousel-item>
    </carousel>
  </div>
</template>

<script>
export default {}
</script>

<style>
.carous .el-carousel .el-carousel__container {
  width: 100vw;
  height: calc(100vw / 3 * 4);
}
.carous .el-carousel .el-carousel__container img {
  width: 100%;
  height: 100%;
}
</style>
