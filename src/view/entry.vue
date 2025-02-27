<template>
  <div class="extraction-code-interface">
    <div class="container">
      <div class="header">
        <h1>图片提取</h1>
        <p>请输入提取码以下载图片</p>
      </div>
      <form class="form">
        <div class="input-group">
          <div class="input-wrapper">
            <key-icon class="icon"></key-icon>
            <input id="extractionCode" type="text" v-model="extractionCode" placeholder="请输入提取码" />
          </div>
        </div>
        <el-button type="primary" class="submit-button" style="line-height: normal;" :loading="loading" :disabled="loading" @click.native="verifyCode">
          {{ loading ? "验证中..." : "验证提取码" }}
        </el-button>
      </form>
    </div>
    <footer class="beian-footer">
      <div class="beian-container">
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer noopener">鄂ICP备19025890号-3</a>
      </div>
    </footer>
  </div>
</template>

<script>
import { KeyIcon, LoaderIcon, DownloadIcon } from 'vue-feather-icons'

export default {
  name: 'entry',
  components: {
    KeyIcon,
    LoaderIcon,
    DownloadIcon
  },
  data () {
    return {
      extractionCode: '',
      loading: false
    }
  },
  methods: {
    async verifyCode () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$router.push({path: '/gallery'})
      }, 1000)
    }
  }
}
</script>

<style scoped>
.extraction-code-interface {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
  padding: 0 1rem;
  font-family: Arial, sans-serif;
}

.container {
  width: 100%;
  max-width: 360px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem 1.5rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.header p {
  font-size: 0.875rem;
  color: #6b7280;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  width: calc(100% - 3.5rem);
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #1f2937;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
}
</style>

<style>
.beian-footer {
  width: 100%;
  position: fixed; /* 移动端建议使用 fixed 固定在底部 */
  bottom: 0;
  left: 0;
  background: #f5f5f7; /* 浅灰背景 */
  padding: 8px 0;
  z-index: 999; /* 确保不会被其他元素遮挡 */
}

.beian-container {
  text-align: center; /* 文本居中 */
  font-size: 12px;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.beian-container a {
  color: #666;
  text-decoration: none; /* 去除下划线 */
}

.beian-container a:hover {
  color: #1890ff; /* 链接悬停颜色（可自定义） */
}
</style>
