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
          src: 'https://oss.ogliu.net/A056/%E5%B0%81%E9%9D%A2%E5%B0%BA%E5%AF%B8.png',
          name: '封面尺寸（3:4）',
          size: '5.31 MB(5,569,371 Byte)',
          width: 2078,
          height: 2768
        },
        {
          src: 'https://oss.ogliu.net/A056/%E6%89%8B%E6%9C%BA%E5%B0%BA%E5%AF%B8.png',
          name: '手机尺寸(9:19.5)',
          size: '8.24 MB(8,643,275 Byte)',
          width: 2448,
          height: 5396
        },
        {
          src: 'https://oss.ogliu.net/A056/%E6%A8%AA%E5%B1%8F%E5%B9%B3%E6%9D%BF%E5%B0%BA%E5%AF%B8.png',
          name: '平板横屏尺寸（12.9:9）',
          size: '11.55 MB(12,115,817 Byte)',
          width: 5696,
          height: 3980
        },
        {
          src: 'https://oss.ogliu.net/A056/%E7%AB%96%E5%B1%8F%E5%B9%B3%E6%9D%BF%E5%B0%BA%E5%AF%B8.png',
          name: '平板竖屏尺寸（9:12.9）',
          size: '11.31 MB(11,860,301 Byte)',
          width: 3768,
          height: 5396
        }
      ]
    }
  }
}
</script>
