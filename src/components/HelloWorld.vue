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
        '/static/logo.png'
      ]
    }
  }
}
</script>
