<template>
  <div class="hello">
    <button @click="downloadFile(url)">测试</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      url: 'https://ogliu-images.oss-cn-guangzhou.aliyuncs.com/blog/20201228114246.png'
    }
  },
  methods: {
    // 文件下载
    downloadFile (url) {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('网络错误或文件不存在')
          }
          return response.blob()
        })
        .then(blob => {
          // 创建下载链接
          const downloadUrl = URL.createObjectURL(blob)

          // 创建隐藏的a标签
          const a = document.createElement('a')
          a.href = downloadUrl
          a.download = 'download' // 下载时的文件名，可以自定义

          // 将a标签插入DOM
          document.body.appendChild(a)

          // 触发点击事件
          a.click()

          // 移除a标签
          document.body.removeChild(a)

          // 释放URL对象
          URL.revokeObjectURL(downloadUrl)
        })
        .catch(error => {
          console.error('下载失败:', error)
        })
    }
  }
}
</script>
