<template>
  <div style="padding-top: 64px; height: calc(100vh - 64px)">
    <div class="image-gallery">
      <div class="alert">
        <p><strong>提示：</strong>请长按图片选择「保存到相册」</p>
      </div>
      <div class="masonry-layout">
        <div v-for="(image, index) in processedImages" :key="index" class="masonry-item">
          <div class="image-card">
            <div class="image-wrapper">
              <img :src="image.src" :alt="image.name">
            </div>
            <div class="image-info">
              <h3>{{ image.name }}</h3>
              <p>{{ image.width + 'x' + image.height }}</p>
              <p>{{ image.size }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageGallery',
  props: {
    imageAttrs: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    processedImages () {
      return this.imageAttrs.map(image => ({
        ...image,
        aspectRatio: (image.height / image.width) * 100
      }))
    }
  }
}
</script>

<style scoped>
.image-gallery {
  height: 100%;
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
</style>
