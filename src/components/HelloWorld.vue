<template>
  <div class="app-container">
    <DownloadManager :image-urls="imageSource"/>
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
        'https://ogliu-images.oss-cn-guangzhou.aliyuncs.com/blog/20201228114246.png',
        'https://ogliu-images.oss-cn-guangzhou.aliyuncs.com/avatar/ogliu.jpg'
      ]
    }
  }
}
</script>
