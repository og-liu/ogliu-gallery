<template>
  <div>
    <button :disabled="isDownloading" @click="startDownload">
      {{ isDownloading ? '下载中...' : '批量下载' }}
    </button>
    <div id="status">{{ downloadStatus }}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      isDownloading: false,
      downloadStatus: ''
    }
  },
  methods: {
    startDownload () {
      const urls = [
        'https://ogliu-images.oss-cn-guangzhou.aliyuncs.com/blog/20201228114246.png',
        'https://ogliu-images.oss-cn-guangzhou.aliyuncs.com/avatar/ogliu.jpg'
      ]
      this.sequentialDownload(urls)
        .catch(err => {
          this.downloadStatus = '下载出现错误'
          console.error(err)
        })
    },
    sequentialDownload (urls, fileNamePrefix = 'download') {
      const statusElement = document.getElementById('status')
      // 验证输入
      if (!Array.isArray(urls) || urls.length === 0) {
        console.error('参数必须是包含URL的数组')
        return Promise.reject(new Error('无效的URL列表'))
      }
      // 初始化状态
      let currentIndex = 0
      this.isDownloading = true
      if (statusElement) statusElement.textContent = '开始下载...'

      // 生成递归下载器
      const downloadNext = () => {
        if (currentIndex >= urls.length) {
          this.isDownloading = false
          if (statusElement) statusElement.textContent = '下载完成'
          return Promise.resolve()
        }

        const url = urls[currentIndex]
        currentIndex++

        if (statusElement) {
          statusElement.textContent = `正在下载第${currentIndex}/${urls.length}个文件`
        }

        return this._downloadSingleFile(url, fileNamePrefix)
          .then(downloadNext)
          .catch(error => {
            this.isDownloading = false
            if (statusElement) statusElement.textContent = `下载失败：${error.message}`
            return Promise.reject(error)
          })
      }

      // 启动下载流程
      return downloadNext()
    },
    _downloadSingleFile (url, prefix) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'blob'

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const blob = xhr.response
            const filename = this._generateFileName(url, prefix)

            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = filename
            link.style.display = 'none'

            document.body.appendChild(link)
            link.click()

            // 清理资源
            setTimeout(() => {
              document.body.removeChild(link)
              URL.revokeObjectURL(link.href)
              resolve()
            }, 100)
          } else {
            reject(new Error(`HTTP错误: ${xhr.status}`))
          }
        }

        xhr.onerror = () => {
          reject(new Error('网络连接失败'))
        }

        xhr.send()
      })
    },
    _generateFileName (url, prefix) {
      try {
        const fileName = url.split('/').pop().split('?')[0]
        return fileName ? `${prefix}_${fileName}` : `${prefix}_file`
      } catch (e) {
        return `${prefix}_file`
      }
    }
  }
}
</script>
