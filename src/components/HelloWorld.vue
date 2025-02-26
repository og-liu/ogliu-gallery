<template>
  <div class="app-container">
<!--    <DownloadManager :image-list="imageSource"/>-->
  </div>
</template>

<script>
import DownloadManager from '@/components/DownloadManager.vue'

export default {
  components: {
    DownloadManager
  },
  data () {
    return {
      imageSource: [
        { url: 'https://ogliu-images.oss-cn-guangzhou.aliyuncs.com/blog/20201228114246.png', name: '风景照', size: 2456789 },
        { url: 'https://ogliu-images.oss-cn-guangzhou.aliyuncs.com/avatar/ogliu.jpg', name: '产品图', size: 1234567 }
      ]
    }
  }
}
</script>
