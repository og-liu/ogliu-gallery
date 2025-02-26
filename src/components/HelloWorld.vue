<template>
  <div class="app-container">
<!--    <DownloadManager :image-list="imageSource"/>-->
    <test></test>
  </div>
</template>

<script>
import test from '@/components/test.vue'
import DownloadManager from '@/components/DownloadManager.vue'

export default {
  components: {
    DownloadManager,
    test
  },
  data () {
    return {
      imageSource: [
        { url: 'https://ogliu-gallery.oss-cn-guangzhou.aliyuncs.com/A058/%E6%89%8B%E6%9C%BA%E5%B0%BA%E5%AF%B8.png', name: '手机尺寸', size: '8.73 MB(9,157,796 Byte)' },
        { url: 'https://ogliu-gallery.oss-cn-guangzhou.aliyuncs.com/A058/%E5%8E%9F%E5%9B%BE.png', name: '原图尺寸', size: '12.52 MB(13,125,095 Byte)' }
      ]
    }
  }
}
</script>
