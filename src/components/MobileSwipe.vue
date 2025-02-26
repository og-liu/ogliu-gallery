<template>
  <div class="carous">
    <carousel trigger="click" :autoplay="false" :loop="false" indicator-position="outside" arrow="always">
      <carousel-item>
        <img src="/static/test1.png" alt="">
      </carousel-item>
      <carousel-item>
        <img src="/static/test2.png" alt="">
      </carousel-item>
      <carousel-item>
        <img src="https://ogliu-gallery.oss-cn-guangzhou.aliyuncs.com/A058/%E5%8E%9F%E5%9B%BE.png?Expires=1740560586&OSSAccessKeyId=TMP.3KhtY1WRDvAW175Je91qYs1y8Whz35Wu4LKsBB6jL8WynGsXS724ZjASgAS2GPYCdFM99LcCBx4f3tEXoDDuhyD4eVjQCY&Signature=p9Z33hgixyE6UnDfRz479PIgORc%3D" alt="">
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
