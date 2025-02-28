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
          src: 'https://oss.ogliu.net/A034/%E5%B0%81%E9%9D%A2%E5%9B%BE%E5%B0%BA%E5%AF%B8.png',
          name: '封面尺寸（3:4）',
          size: '4.55 MB(4,770,344 Byte)',
          width: 2236,
          height: 2974
        },
        {
          src: 'https://oss.ogliu.net/A034/%E6%89%8B%E6%9C%BA%E5%B0%BA%E5%AF%B8.png',
          name: '手机尺寸(9:19.5)',
          size: '2.28 MB(2,389,612 Byte)',
          width: 1284,
          height: 2784
        },
        {
          src: 'https://oss.ogliu.net/A034/%E5%B9%B3%E6%9D%BF%E6%A8%AA%E5%B1%8F%E5%B0%BA%E5%AF%B8.png',
          name: '平板横屏尺寸（12.9:9）',
          size: '4.57 MB(4,787,110 Byte)',
          width: 3554,
          height: 2490
        },
        {
          src: 'https://oss.ogliu.net/A034/%E5%B9%B3%E6%9D%BF%E7%AB%96%E5%B1%8F%E5%B0%BA%E5%AF%B8.png',
          name: '平板竖屏尺寸（9:12.9）',
          size: '3.82 MB(4,002,831 Byte)',
          width: 2096,
          height: 2972
        },
        {
          src: 'https://oss.ogliu.net/A034/%E5%8E%9F%E5%9B%BE%E5%B0%BA%E5%AF%B8.png',
          name: '原图(最大)尺寸',
          size: '5..38 MB(5,644,026 Byte)',
          width: 3550,
          height: 2976
        }
      ]
    }
  }
}
</script>
