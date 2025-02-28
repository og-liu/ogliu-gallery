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
          src: 'https://oss.ogliu.net/A062/%E6%89%8B%E6%9C%BA%E5%B0%BA%E5%AF%B8.png',
          name: '手机尺寸(9:19.5)',
          size: '6.43 MB(6,747,207 Byte)',
          width: 2358,
          height: 5104
        },
        {
          src: 'https://oss.ogliu.net/A062/%E5%B0%81%E9%9D%A2%E5%B0%BA%E5%AF%B8.png',
          name: '封面尺寸（3:4）',
          size: '7.12 MB(7,464,393 Byte)',
          width: 3040,
          height: 5600
        },
        {
          src: 'https://oss.ogliu.net/A062/%E5%8E%9F%E5%9B%BE%E5%B0%BA%E5%AF%B8.png',
          name: '原图(最大)尺寸',
          size: '6.57 MB(6,886,160 Byte)',
          width: 3456,
          height: 5104
        }
      ]
    }
  }
}
</script>
