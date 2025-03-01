<template>
  <div>
    <gallery :imageAttrs="images"></gallery>
  </div>
</template>

<script>
import Gallery from '@/components/Gallery.vue'

export default {
  name: 'ImageGallery',
  components: { Gallery },
  data () {
    return {
      images: [
        {
          src: 'https://oss.ogliu.net/A035/%E7%94%B5%E8%84%91%E5%B0%BA%E5%AF%B8.png',
          name: '电脑尺寸（16:9）',
          size: '17.76 MB(18,624,484 Byte)',
          width: 7680,
          height: 4320
        },
        {
          src: 'https://oss.ogliu.net/A035/%E6%89%8B%E6%9C%BA%E5%B0%BA%E5%AF%B8%EF%BC%88%E9%AB%98%E6%B8%85%E4%BF%AE%E5%A4%8D%E7%89%88%EF%BC%89.png',
          name: '手机尺寸(9:19.5)',
          size: '12.27 MB(12,869,724 Byte)',
          width: 1958,
          height: 4320
        }
      ]
    }
  }
}
</script>
