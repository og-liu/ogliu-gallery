<template>
  <div style="padding-top: 64px;">
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
  data () {
    return {
      loadedImages: [],
      images: [
        {
          id: 1,
          src: 'https://oss.ogliu.net/S001/54076a9c7eae255f9be533ba710b22d78be5240989cf19f1e4a6106645804665.png',
          name: '四鸣人合集',
          size: '7.55 MB(7,917,747 Byte)',
          width: 2560,
          height: 4568
        },
        {
          id: 2,
          src: 'https://oss.ogliu.net/S001/73231230841231232313.png',
          name: '吹风鸣人',
          size: '11.91 MB(12,486,822 Byte)',
          width: 3040,
          height: 5600
        },
        {
          id: 3,
          src: 'https://oss.ogliu.net/S001/823490184098098.png',
          name: '草原鸣人',
          size: '8.12 MB(8,510,275 Byte)',
          width: 2560,
          height: 4568
        },
        {
          id: 4,
          src: 'https://oss.ogliu.net/S001/83204323423750923790809.png',
          name: '九尾鸣人',
          size: '10.82 MB(11,345,970 Byte)',
          width: 3040,
          height: 5600
        },
        {
          id: 5,
          src: 'https://oss.ogliu.net/S001/c586965173e97376df37033e963f74a9fdf1e65e9b28163fc54332457d649799.png',
          name: '符咒鸣人',
          size: '6.19 MB(6,490,869 Byte)',
          width: 2560,
          height: 4568
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
