<template>
  <div class="download-container">
    <!-- 主下载按钮 -->
    <button class="download-btn" :disabled="processing" @click="startBulkDownload">
      <template v-if="!processing">
        下载全部图片 ({{ imageUrls.length }}张)
      </template>
      <template v-else>
        处理中 {{ processedCount }}/{{ imageUrls.length }}
      </template>
    </button>

    <!-- iOS引导弹窗 -->
    <div v-if="showIOSGuide" class="ios-guide">
      <div class="guide-content">
        <h3>保存指引</h3>
        <p>请长按图片 → 点击「保存到相册」</p>
        <div class="preview-wrap">
          <img :src="currentPreview" alt="图片预览">
        </div>
        <div class="guide-footer">
          <button @click="closeIOSGuide">取消</button>
          <button @click="nextIOSImage">{{ isLastImage ? '完成' : '下一张' }}</button>
        </div>
      </div>
    </div>

    <!-- 错误提示 -->
    <div v-if="downloadError" class="error-tip">
      {{ downloadError }}
      <button @click="startBulkDownload">重试</button>
    </div>
  </div>
</template>

<script>
const BrowserCapability = {
  isIOS: () => /iPad|iPhone|iPod/.test(navigator.userAgent),
  isAndroid: () => /Android/.test(navigator.userAgent),
  supportsDownload: () => typeof HTMLAnchorElement.prototype.download !== 'undefined'
}

export default {
  name: 'BatchImageDownloader',

  props: {
    imageUrls: {
      type: Array,
      required: true,
      validator: urls => urls.every(url => typeof url === 'string' && url.startsWith('http'))
    },
    fileNamePrefix: {
      type: String,
      default: 'download'
    }
  },

  data () {
    return {
      processing: false,
      processedCount: 0,
      downloadError: null,
      showIOSGuide: false,
      currentPreview: null,
      currentIndex: 0,
      abortController: null
    }
  },

  computed: {
    isLastImage () {
      return this.currentIndex === this.imageUrls.length - 1
    }
  },

  methods: {
    // 主下载流程
    async startBulkDownload () {
      try {
        this.resetState()
        this.processing = true

        if (BrowserCapability.isIOS()) {
          await this.handleIOSDownload()
        } else {
          await this.handleNormalDownload()
        }
      } catch (error) {
        this.handleError(error)
      } finally {
        this.processing = false
      }
    },

    // iOS处理流程
    async handleIOSDownload () {
      this.showIOSGuide = true
      this.currentIndex = 0
      await this.showNextIOSImage()
    },

    async showNextIOSImage () {
      if (this.currentIndex >= this.imageUrls.length) return

      this.currentPreview = this.imageUrls[this.currentIndex]
      await new Promise(resolve => setTimeout(resolve, 1000))
    },

    nextIOSImage () {
      this.currentIndex += 1
      if (this.currentIndex < this.imageUrls.length) {
        this.showNextIOSImage()
      } else {
        this.closeIOSGuide()
      }
    },

    closeIOSGuide () {
      this.showIOSGuide = false
      this.currentPreview = null
      this.currentIndex = 0
    },

    // 常规下载处理
    async handleNormalDownload () {
      this.abortController = new AbortController()

      try {
        for (const [index, url] of this.imageUrls.entries()) {
          await this.downloadWithBlob(url, index)
          this.processedCount = index + 1
        }
      } catch (error) {
        throw new Error(`下载失败: ${error.message}`)
      }
    },

    // Blob下载核心方法
    async downloadWithBlob (url, index) {
      let blob = null
      try {
        const response = await fetch(url, {
          mode: 'cors',
          credentials: 'omit',
          signal: this.abortController.signal
        })

        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        blob = await response.blob()
        const objectURL = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = objectURL
        link.download = this.generateFileName(url, index)
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()

        // 清理资源
        requestAnimationFrame(() => {
          document.body.removeChild(link)
          URL.revokeObjectURL(objectURL)
        })

        await this.delay(300) // 防止浏览器阻塞
      } catch (error) {
        throw new Error(`第${index + 1}张下载失败: ${error.message}`)
      }
    },

    // 工具方法
    generateFileName (url, index) {
      const extension = this.getFileExtension(url)
      const basename = url.split('/').pop().split('.')[0] || this.fileNamePrefix
      return `${this.sanitizeName(basename)}_${index + 1}.${extension}`
    },

    getFileExtension (url) {
      const ext = url.split('.').pop().toLowerCase().replace(/[^a-z]/g, '')
      return ['png', 'jpeg', 'jpg', 'gif', 'webp'].includes(ext) ? ext : 'jpg'
    },

    sanitizeName (name) {
      return name
        .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_')
        .substring(0, 50)
    },

    delay (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },

    resetState () {
      this.processedCount = 0
      this.downloadError = null
      if (this.abortController) {
        this.abortController.abort()
      }
      this.abortController = new AbortController()
    },

    handleError (error) {
      console.error('下载错误:', error)
      this.downloadError = error.message || '下载过程中发生未知错误'
    }
  }
}
</script>

<style lang="less">
@primary-color: #2196F3;
@error-color: #ff5252;

.download-container {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.download-btn {
  padding: 12px 32px;
  font-size: 16px;
  background: @primary-color;
  color: white;
  border: none;
  border-radius: 28px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(@primary-color, 0.3);
  }

  &:disabled {
    background: #BDBDBD;
    cursor: not-allowed;
    box-shadow: none;
  }
}

.ios-guide {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s;

  .guide-content {
    background: white;
    padding: 24px;
    border-radius: 16px;
    width: 90%;
    max-width: 400px;

    h3 {
      margin: 0 0 16px;
      font-size: 20px;
      color: #212121;
    }

    p {
      margin: 0 0 20px;
      color: #757575;
      font-size: 14px;
    }

    .preview-wrap {
      margin: 16px 0;
      img {
        max-width: 100%;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }

    .guide-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;

      button {
        padding: 8px 16px;
        border: none;
        border-radius: 20px;
        font-size: 14px;

        &:last-child {
          background: @primary-color;
          color: white;
        }
      }
    }
  }
}

.error-tip {
  margin-top: 16px;
  padding: 12px;
  background: rgba(@error-color, 0.1);
  border-radius: 8px;
  color: @error-color;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  button {
    background: @error-color;
    color: white;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 13px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 480px) {
  .download-btn {
    width: 100%;
    padding: 16px;
    font-size: 15px;
  }

  .ios-guide .guide-content {
    padding: 20px;
  }
}
</style>
