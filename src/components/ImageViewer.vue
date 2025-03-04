<template>
  <div class="image-container">
    <div class="decorative-element top-left"></div>
    <div class="decorative-element top-right"></div>

    <!-- Back Button -->
    <div class="back-button" @click="goBack">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <div class="content-area">
      <div class="image-wrapper" :class="{ 'loaded': imageLoaded }">
        <div class="loading-indicator" v-if="!imageLoaded">
          <div class="spinner"></div>
        </div>

        <img
          :src="imageUrl"
          alt="Preview Image"
          class="display-image"
          @load="imageLoaded = true"
        />
      </div>
    </div>

    <div class="tip-area" v-if="imageLoaded">
      <div class="save-tip">
        <span>
          <svg class="tip-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15V17M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          长按保存图片
        </span>
      </div>
    </div>

    <div class="decorative-element bottom-left"></div>
    <div class="decorative-element bottom-right"></div>
  </div>
</template>

<script>
export default {
  name: 'ImageViewer',
  data () {
    return {
      imageUrl: 'https://oss.ogliu.net/A062/%E6%89%8B%E6%9C%BA%E5%B0%BA%E5%AF%B8.png', // Using the provided image URL
      imageLoaded: false,
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    goBack () {
      if (window.history.length > 1) {
        window.history.back()
      } else {
        window.location.href = '/'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.image-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
  overflow: hidden;
  padding: 0;
  margin: 0;
  position: relative;
  color: #fff;
}

.content-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 2;
  margin-top: 80px;
}

.tip-area {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  padding-bottom: 20px;
}

.decorative-element {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  z-index: 1;

  &.top-left {
    top: -50px;
    left: -50px;
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, #9c27b0 0%, #673ab7 100%);
  }

  &.top-right {
    top: 10%;
    right: -40px;
    width: 120px;
    height: 120px;
    background: linear-gradient(45deg, #ff4081 0%, #f50057 100%);
  }

  &.bottom-left {
    bottom: 15%;
    left: -20px;
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, #7e57c2 0%, #5e35b1 100%);
  }

  &.bottom-right {
    bottom: -40px;
    right: -20px;
    width: 180px;
    height: 180px;
    background: linear-gradient(45deg, #651fff 0%, #3d5afe 100%);
  }
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
  transition: all 0.2s ease;

  svg {
    width: 24px;
    height: 24px;
    color: #fff;
  }

  &:hover {
    transform: translateX(-2px);
    background-color: rgba(255, 255, 255, 0.25);
  }

  &:active {
    transform: scale(0.95);
  }
}

.image-wrapper {
  position: relative;
  height: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: transparent;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.5s ease;

  &.loaded {
    transform: translateY(0);
    opacity: 1;
  }
}

.display-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
}

.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border-top-color: #bb86fc;
    animation: spin 1s ease-in-out infinite;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.save-tip {
  text-align: center;
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
  z-index: 5;

  span {
    background-color: rgba(255, 255, 255, 0.15);
    color: white;
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 14px;
    letter-spacing: 1px;
    display: inline-flex;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
  }

  .tip-icon {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    color: white;
  }
}

@keyframes fadeIn {
  to { opacity: 1; }
}

// Global styles to ensure full viewport usage
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
