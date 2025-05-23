<template>
    <div class="fullpage-container">
      <div class="container" ref="container">
        <div 
          class="box" 
          v-for="(slide, index) in slides" 
          :key="index"
        >
          <div 
            class="image-bg" 
            :style="{ backgroundImage: `url(${slide.image})` }"
          ></div>
          <transition :name="textTransition" mode="out-in">
            <div class="content" :key="pageIndex">
              <h2 class="title">{{ slide.title }}</h2>
              <a :href="slide.url" class="subtitle">{{ slide.subtitle }}</a>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FullPageGallery',
    data() {
      return {
        slides: [
          {
            image: 'images/index/1.jpg',
            title: '时尚推荐',
            subtitle: '精选当季最IN穿搭指南',
            url: "/#/recommend",
          },
          {
            image: 'images/index/2.jpg',
            title: '潮流搭配',
            subtitle: '打造你的专属风格公式',
            url: "/#/match",
          },
          {
            image: 'images/index/4.png',
            title: 'AI生图',
            subtitle: '智能生成你的理想穿搭',
            url:"/#/generate"
          },
          {
            image: 'https://picsum.photos/1920/1080?random=5',
            title: '虚拟试穿',
            subtitle: '足不出户体验上身效果',
            url:"/#/wear"
          },
          
        ],
        pageIndex: 0,
        pageScroll: true,
        prevIndex: 0,
        textTransition: 'slide-up'
      }
    },
    mounted() {
      this.initContainer();
      window.addEventListener('wheel', this.handleWheel, { passive: false });
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('resize', this.handleResize);
      
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    },
    beforeDestroy() {
      window.removeEventListener('wheel', this.handleWheel);
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      initContainer() {
        this.$refs.container.style.height = `${this.slides.length}00%`;
      },
      scrollUp() {
        if (this.pageIndex > 0 && this.pageScroll) {
          this.textTransition = 'slide-down';
          this.prevIndex = this.pageIndex;
          this.pageIndex--;
          this.scrollToPage(this.pageIndex);
        } else if (this.pageIndex <= 0) {
          this.pageIndex = 0;
        }
      },
      scrollDown() {
        if (this.pageIndex < this.slides.length - 1 && this.pageScroll) {
          this.textTransition = 'slide-up';
          this.prevIndex = this.pageIndex;
          this.pageIndex++;
          this.scrollToPage(this.pageIndex);
        } else if (this.pageIndex >= this.slides.length - 1) {
          this.pageIndex = this.slides.length - 1;
        }
      },
      scrollToPage(pageIndex) {
        this.$refs.container.style.top = `-${pageIndex}00%`;
        this.pageScroll = false;
        this.scrollTimer();
      },
      scrollTimer() {
        setTimeout(() => {
          this.pageScroll = true;
        }, 500);
      },
      handleWheel(e) {
        e.preventDefault();
        if (e.deltaY < 0) {
          this.scrollUp();
        } else {
          this.scrollDown();
        }
      },
      handleKeyDown(e) {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.scrollUp();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.scrollDown();
        }
      },
      handleResize() {
        this.initContainer();
      }
    }
  }
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .fullpage-container {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
  
  .container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.3s ease-in-out;
  }
  
  .box {
    width: 80vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    margin-left: 70px;
  }
  
  .image-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 90%;
    height: 90%;
    background-size: contain;
    background-position:center;
    background-repeat: no-repeat;

     /* 新增遮罩效果 */
     mask-image: linear-gradient(
        to right, 
        transparent 0%,
        rgba(0,0,0,1) 5%,
        rgba(0,0,0,1) 95%,
        transparent 100%
    );
    -webkit-mask-image: linear-gradient(
        to right, 
        transparent 0%,
        black 5%,
        black 95%,
        transparent 100%
    );
  }
  
  .image-bg::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(252, 250, 250, 0.4); */
  }
  
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 1200px;
    color: white;
    text-align: center;
    z-index: 2;
  }
  
  .title {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .subtitle {
    font-size: 1.5rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    color: #fff;
  }
  
  /* 文字过渡效果 */
  .slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-in-out; /* 保持与容器动画时间一致 */
}

.slide-up-enter-from {
  opacity: 0;
  transform: translate(-50%, 100%); /* 从下方进入 */
}
.slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%); /* 向上离开 */
}

.slide-down-enter-from {
  opacity: 0;
  transform: translate(-50%, -100%); /* 从上方进入 */
}
.slide-down-leave-to {
  opacity: 0;
  transform: translate(-50%, 100%); /* 向下离开 */
}

.content {
  /* 添加perspective让动画更立体 */
  perspective: 1000px;
}
  </style>