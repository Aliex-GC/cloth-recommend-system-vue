<template>
    <div class="dashboard">
      <div id="home"></div>
      <div class="text-container">
        <h1>服装推荐搭配平台</h1>
      </div>
      <a-space>
            <a-button type="primary"  :size="large">登录</a-button>
        </a-space>
    </div>
  </template>
  
  <style>
  html, body {
    overflow: hidden; /* 禁用页面滚动 */
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  .dashboard {
    position: relative;
    width: 100%;
    height: 100vh; /* 充满整个视口高度 */
    overflow: hidden; /* 防止内容溢出 */
  }
  
  #home {
    position: fixed;
    top: 55px; /* 图片从导航栏下方开始 */
    width: 100%;
    height: calc(100vh - 55px); /* 减去导航栏高度 */
    background: url("/images/er.jpg") center center no-repeat;
    background-size: cover;
    z-index: 1; /* 图片在文字下方 */
  }
  
  .text-container {
    position: relative; /* 相对定位 */
    z-index: 2; /* 文字在图片上方 */
    display: flex;
    justify-content: center; /* 水平居中 */
    margin-top: 70px;
    height: 100vh; /* 充满整个视口高度 */
  }
  
  h1 {
    color: white; /* 文字颜色 */
    font-size: 3rem; /* 文字大小 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 文字阴影，增强可读性 */
  }
  </style>