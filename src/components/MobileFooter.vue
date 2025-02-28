<template>
  <div>
    <footer class="beian-footer">
      <div class="beian-container">
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer noopener">鄂ICP备19025890号-3</a>
      </div>
    </footer>
  </div>
</template>

<style>
.beian-footer {
  width: 100%;
  position: fixed; /* 移动端建议使用 fixed 固定在底部 */
  bottom: 0;
  left: 0;
  background: #f8f8f8; /* 浅灰背景 */
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
