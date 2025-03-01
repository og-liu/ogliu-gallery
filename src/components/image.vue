<template>
  <div class="image-container">
    <!-- 加载中状态 -->
    <div v-if="isLoading" class="loading-wrapper">
      <div class="progress-bar">
        <div class="progress" :style="{ width: loadingProgress + '%' }"></div>
      </div>
      <div class="progress-text">{{ loadingProgress }}%</div>
    </div>

    <!-- 加载完成 -->
    <img v-if="!isLoading && !loadError" :src="imageUrl" alt="loaded image" class="loaded-image"/>

    <!-- 错误提示 -->
    <div v-if="loadError" class="error-message">图片加载失败，请刷新重试</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loadingProgress: 0, // 加载进度百分比
      isLoading: true, // 是否正在加载
      loadError: false, // 是否加载失败
      imageUrl: '' // 最终图片地址
    }
  },

  mounted () {
    this.loadImageWithProgress()
  },

  methods: {
    loadImageWithProgress () {
      const xhr = new XMLHttpRequest()
      const url = 'https://oss.ogliu.net/A035/%E7%94%B5%E8%84%91%E5%B0%BA%E5%AF%B8.png'

      xhr.open('GET', url, true)
      xhr.responseType = 'blob'

      // 进度事件
      xhr.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          this.loadingProgress = Math.round((e.loaded / e.total) * 100)
        }
      })

      // 加载完成
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const blob = xhr.response
          this.imageUrl = URL.createObjectURL(blob)
          this.isLoading = false
        } else {
          this.handleError()
        }
      })

      // 错误处理
      xhr.addEventListener('error', () => {
        this.handleError()
      })

      xhr.send()
    },

    handleError () {
      this.loadError = true
      this.isLoading = false
      URL.revokeObjectURL(this.imageUrl)
    }
  },

  beforeDestroy () {
    // 组件销毁时释放对象URL
    URL.revokeObjectURL(this.imageUrl)
  },

  reloadImage () {
    this.resetState()
    this.loadImageWithProgress()
  },
  resetState () {
    this.loadingProgress = 0
    this.isLoading = true
    this.loadError = false
    URL.revokeObjectURL(this.imageUrl)
    this.imageUrl = ''
  }
}
</script>

<style lang="less" scoped>
.image-container {
  position: relative;
  max-width: 800px;
  margin: 20px auto;
}

.loading-wrapper {
  text-align: center;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.progress-bar {
  width: 80%;
  height: 10px;
  background: #e0e0e0;
  border-radius: 5px;
  margin: 0 auto;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #2196f3;
  transition: width 0.3s ease;
}

.progress-text {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

.loaded-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

.error-message {
  color: #ff4444;
  padding: 20px;
  text-align: center;
  background: #ffecec;
  border-radius: 8px;
}
</style>
