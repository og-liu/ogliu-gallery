<template>
  <div class="carous">
    <el-carousel trigger="click" :autoplay="false" :loop="false" indicator-position="outside" arrow="always">
      <el-carousel-item>
        <img src="https://ogliu-gallery.oss-cn-guangzhou.aliyuncs.com/A058/%E5%B0%81%E9%9D%A2%E5%9B%BE%E6%A8%A1%E6%9D%BF.png" alt="">
      </el-carousel-item>
      <el-carousel-item>
        <img src="https://ogliu-gallery.oss-cn-guangzhou.aliyuncs.com/A058/%E6%89%8B%E6%9C%BA%E6%A8%A1%E6%9D%BF.png" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: 'https://ogliu-gallery.oss-cn-guangzhou.aliyuncs.com/A058/%E5%B0%81%E9%9D%A2%E5%9B%BE%E6%A8%A1%E6%9D%BF.png',
      srcList: [
        'https://ogliu-gallery.oss-cn-guangzhou.aliyuncs.com/A058/%E6%89%8B%E6%9C%BA%E5%B0%BA%E5%AF%B8.png',
        'https://ogliu-gallery.oss-cn-guangzhou.aliyuncs.com/A058/%E5%8E%9F%E5%9B%BE.png'
      ]
    }
  }
}
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
