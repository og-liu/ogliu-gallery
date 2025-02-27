<template>
  <div class="image-gallery">
    <div class="alert">
      <p><strong>提示：</strong>请长按图片选择「保存到相册」</p>
    </div>
    <div class="masonry-layout">
      <div v-for="image in processedImages" :key="image.id" class="masonry-item">
        <div class="image-card">
          <div class="image-wrapper">
            <img :src="image.src" :alt="image.name" @load="onImageLoad($event, image.id)" :style="{ opacity: loadedImages.includes(image.id) ? 1 : 0 }">
          </div>
          <div class="image-info">
            <h3>{{ image.name }}</h3>
            <p>{{ image.resolution }}</p>
            <p>{{ image.size }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageGallery',
  data () {
    return {
      loadedImages: [],
      images: [
        {
          id: 1,
          src: 'https://ogliu-gallery.oss-cn-guangzhou.aliyuncs.com/A058/%E5%B0%81%E9%9D%A2%E5%B0%BA%E5%AF%B8.png',
          name: '封面尺寸',
          resolution: '3496x4640',
          size: '12.52 MB(13,125,095 Byte)',
          width: 1080,
          height: 1920
        },
        {
          id: 2,
          src: 'https://ogliu-gallery.oss-cn-guangzhou.aliyuncs.com/A058/%E6%89%8B%E6%9C%BA%E5%B0%BA%E5%AF%B8.png',
          name: '手机尺寸',
          resolution: '2144x4640',
          size: '8.73 MB(9,157,796 Byte)',
          width: 1920,
          height: 1080
        }
      ]
    }
  },
  computed: {
    processedImages () {
      return this.images.map(image => ({
        ...image,
        aspectRatio: (image.height / image.width) * 100
      }))
    }
  },
  methods: {
    onImageLoad (event, imageId) {
      // Add image to loaded images array once it's loaded
      if (!this.loadedImages.includes(imageId)) {
        this.loadedImages.push(imageId)
      }
    }
  }
}
</script>

<style scoped>
.image-gallery {
  padding: 12px;
  background-color: #f8f8f8;
}

.alert {
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  color: #856404;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 8px;
  font-size: 14px;
}

.masonry-layout {
  column-count: 2;
  column-gap: 12px;
  width: 100%;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 12px;
  position: relative;
  width: 100%;
}

.image-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.image-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.image-wrapper img {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.image-info {
  padding: 10px;
  background-color: white;
}

.image-info h3 {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 600;
}

.image-info p {
  margin: 0;
  font-size: 12px;
  color: #666;
  line-height: 1.4;
}

@media (min-width: 768px) {
  .masonry-layout {
    column-count: 3;
  }
}

@media (max-width: 480px) {
  .masonry-layout {
    column-gap: 8px;
  }

  .masonry-item {
    margin-bottom: 8px;
  }
}
</style>
