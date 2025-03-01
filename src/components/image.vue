<template>
  <div class="image-wrap">
    <div class="img-item">
      <img class="img" src="https://oss.ogliu.net/A034/%E5%B0%81%E9%9D%A2%E5%9B%BE%E5%B0%BA%E5%AF%B8.png">
    </div>
    <div class="img-item">
      <img style="display:block; width: 100%;" src="https://oss.ogliu.net/A034/%E6%89%8B%E6%9C%BA%E5%B0%BA%E5%AF%B8.png">
    </div>
  </div>
  <!-- 禁用长按缩略图默认行为，防止用户保存了缩略图 -->
</template>
<style lang="less" scoped>
.image-wrap {
  padding-top: 64px;
  .img {
    display: block;
    width: 100%;
    /* 禁用iOS/Android长按菜单 */
    -webkit-touch-callout: none;
    user-select: none;
    pointer-events: none;
    /* 防止拖拽触发 */
    -webkit-user-drag: none;
    user-drag: none;
  }

  /* 覆盖默认图像消息样式 (Android Chrome的隐藏功能) */
  .img::after {
    content: "";
    position: absolute;
    inset: 0;
  }

  .img-item {
    padding: 20px;
  }
}
</style>
<script setup>
</script>
