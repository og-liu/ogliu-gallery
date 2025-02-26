<template>
  <div class="image-downloader">
    <button class="download-all-btn" @click="handleDownloadAll">
      下载全部图片 ({{ imageList.length }}张)
    </button>

    <!-- PC端图片列表弹窗 -->
    <div v-if="showPcDialog" class="pc-dialog">
      <div class="dialog-content">
        <h3>选择要下载的图片</h3>
        <div class="image-list">
          <div v-for="(img, index) in imageList" :key="index" class="image-item">
            <div class="preview">
              <img :src="img.url" alt="预览" />
            </div>
            <div class="info">
              <span class="name">{{ img.name }}</span>
              <span class="size">{{ img.size }}</span>
            </div>
            <button class="download-btn" @click="downloadImage(img, index)">
              ↓ 下载
            </button>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="close-btn" @click="showPcDialog = false">关闭</button>
        </div>
      </div>
    </div>

    <!-- 移动端保存引导 -->
    <div v-show="showMobileGuide" class="mobile-guide">
      <div class="guide-content">
        <div class="info">
          <span class="name">{{ currentImage.name }}</span>
          <span class="size">{{ currentImage.size }}</span>
        </div>
        <div class="preview-wrap">
          <img :src="currentImage.url" :alt="currentImage.name" />
        </div>
        <div class="tips">
          <p>请长按图片选择「保存到相册」</p>
          <p>({{ currentIndex + 1 }}/{{ imageList.length }})</p>
        </div>
        <div class="controls">
          <button v-if="currentIndex > 0" @click="prevImage">上一张</button>
          <button @click="nextImage">
            {{ isLastImage ? '返回' : '下一张' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageList: {
      type: Array,
      required: true,
      validator: list =>
        list.every(img => img.url && img.name && typeof img.size === 'string')
    }
  },

  data () {
    return {
      showPcDialog: false,
      showMobileGuide: false,
      currentIndex: 0
    }
  },

  computed: {
    isMobile () {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    },
    isLastImage () {
      return this.currentIndex === this.imageList.length - 1
    },
    currentImage () {
      return this.imageList[this.currentIndex] || {}
    }
  },

  methods: {
    async handleDownloadAll () {
      if (this.isMobile) {
        this.showMobileGuide = true
        this.currentIndex = 0
      } else {
        this.showPcDialog = true
      }
    },

    async downloadImage (img, index) {
      try {
        const link = document.createElement('a')
        link.href = img.url
        link.download = img.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        console.error(`下载失败：${img.name}`, error)
      }
    },

    nextImage () {
      if (this.currentIndex < this.imageList.length - 1) {
        this.currentIndex++
      } else {
        this.showMobileGuide = false
      }
    },

    prevImage () {
      if (this.currentIndex > 0) this.currentIndex--
    }
  }
}
</script>

<style lang="less" scoped>
.image-downloader {
  position: relative;

  .download-all-btn {
    padding: 12px 24px;
    background: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s;

    &:hover {
      background: #66b1ff;
    }
  }

  .pc-dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .dialog-content {
      background: white;
      width: 80%;
      max-width: 800px;
      border-radius: 8px;
      padding: 20px;
      max-height: 80vh;
      overflow: auto;

      h3 {
        margin: 0 0 20px;
        color: #303133;
      }

      .image-list {
        display: grid;
        gap: 16px;

        .image-item {
          display: flex;
          align-items: center;
          padding: 12px;
          border: 1px solid #ebeef5;
          border-radius: 4px;

          .preview {
            width: 80px;
            height: 80px;
            margin-right: 16px;

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }

          .info {
            flex: 1;
            display: flex;
            flex-direction: column;

            .name {
              font-weight: 500;
              margin-bottom: 4px;
            }

            .size {
              color: #909399;
              font-size: 0.9em;
            }
          }

          .download-btn {
            padding: 8px 16px;
            background: #409eff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
              background: #66b1ff;
            }
          }
        }
      }

      .dialog-footer {
        margin-top: 20px;
        text-align: right;

        .close-btn {
          padding: 8px 16px;
          background: #909399;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }
  }

  .mobile-guide {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #FFF;
    z-index: 1000;
    display: flex;
    justify-content: center;

    .guide-content {
      width: 90%;
      padding: 20px;

      .preview-wrap {
        margin: 16px 0;
        img {
          max-width: 100%;
          max-height: 60vh;
          object-fit: contain;
          border-radius: 4px;
        }
      }

      .tips {
        text-align: center;
        color: #606266;
        margin: 12px 0;

        p:first-child {
          font-weight: 500;
          margin-bottom: 4px;
        }
      }

      .controls {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;

        button {
          padding: 8px 20px;
          border: none;
          border-radius: 20px;
          background: #409eff;
          color: white;
        }
      }
    }
  }
}
</style>
