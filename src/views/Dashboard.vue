<template>
    <div class="dashboard">
      <div id="home"></div>
      <div class="text-container">
        <h1 style="font-size: 5em;">服装推荐搭配平台</h1>
        <!-- 新增的炫酷登录按钮 -->
        <a class="login-btn-wrapper" href="/#/login">
          <button class="glow-on-hover">立即登录</button>
        </a>
      </div>
    </div>
  </template>
  
  <style>
  html, body {
    overflow: hidden;
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  .dashboard {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  
  #home {
    position: fixed;
    top: 55px;
    width: 100%;
    height: calc(100vh - 55px);
    background: url("/images/er.jpg") center center no-repeat;
    background-size: cover;
    z-index: 1;
  }
  
  .text-container {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column; /* 改为垂直排列 */
    margin-left: 35%;
    margin-top:40px;
    height: 100vh;

  }
  
  h1 {
    color: white;
    font-size: 3rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 30px; /* 为按钮留出空间 */
  }
  
  .login-btn-wrapper {
    margin-top: 155px;
    margin-left: 18.5%;
  }
  
  .glow-on-hover {
    width: 115px;
    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    background: #fff;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
  }
  
  .glow-on-hover:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left:-2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 10px;
  }
  
  .glow-on-hover:active {
    color: #fff;
    transform: scale(0.98);
  }
  
  .glow-on-hover:active:after {
    background: transparent;
  }
  
  .glow-on-hover:hover:before {
    opacity: 1;
  }
  
  .glow-on-hover:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #1859e3;
    left: 0;
    top: 0;
    border-radius: 10px;
  }
  
  @keyframes glowing {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
  }
  
  /* 添加按钮悬停放大效果 */
  .glow-on-hover:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
  }
  </style>