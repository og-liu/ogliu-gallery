<template>
  <div id="mobile-header">
    <div class="left">
      <div class="logo">
        <div class="avatar">
          <img class="avatar-img" src="https://oss.ogliu.net/avatar.jpg">
        </div>
        <div class="title">OG-LIU 图库</div>
        <div class="ver">v0.0.1</div>
      </div>
    </div>
    <div class="right">&nbsp;</div>
  </div>
</template>

<style lang="less" scoped>
  #mobile-header {
    padding: 12px 16px;
    display: flex;
    background-color: #FFF;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    z-index: 9999;
    .left {
      .logo {
        display: flex;
        align-items: center;
        .avatar {
          display: flex;
          justify-content: center;
          align-items: center;
          .avatar-img {
            display: block;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            border: 1px solid rgba(0,0,0,0.08);
          }
        }
        .title {
          padding-left: 12px;
          font-size: 16px;
          color: #333;
        }
        .ver {
          font-size: 12px;
          color: #666;
          padding-left: 4px;
          padding-top: 4px;
        }
      }
    }
    .right {}
  }
</style>
