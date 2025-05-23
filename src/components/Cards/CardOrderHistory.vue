<template>
    <!-- Orders History Timeline Card -->
    <a-card 
      :bordered="false" 
      class="header-solid h-full" 
      :bodyStyle="{paddingTop: '12px', display: 'flex', flexDirection: 'column'}"
      style="height: 570px;"
    >
      <template #title>
        <h6>历史记录</h6>      
        <p>最近提交</p>  
      </template>
      <div 
        class="scrollable-timeline" 
        @scroll="handleScroll"
        ref="timelineContainer"
      >
        <a-timeline :pending="!hasMore && !loading ? 'recording...' : null">
          <a-timeline-item 
            v-for="(item, index) in records" 
            :key="index" 
            :color="item.color"
          >
            {{ getTypeDescription(item.type) }}
            <p>{{ item.time }}</p>
          </a-timeline-item>
          <a-timeline-item v-if="loading">
            <a-spin size="small" />
          </a-timeline-item>
        </a-timeline>
      </div>
    </a-card>
  </template>
  
  <script>
  import axiosInstance from "@/plugins/axios";
  export default ({
    data() {
      return {
        timelineReverse: false,
        records: [],
        currentPage: 1,
        hasMore: true,
        loading: false,
        scrollDebounce: null
      }
    },
    mounted() {
      this.loadRecords();
    },
    methods: {
      async loadRecords() {
        if (!this.hasMore || this.loading) return;
        
        this.loading = true;
        try {
          const response = await axiosInstance.get(`/combined_history/?page=${this.currentPage}`);
          const data = response.data;
          this.records = [...this.records, ...data.items];
          this.hasMore = data.has_more;
          this.currentPage += 1;
        } catch (error) {
          console.error('Error loading records:', error);
        } finally {
          this.loading = false;
        }
      },
      handleScroll(event) {
        if (this.scrollDebounce) {
          clearTimeout(this.scrollDebounce);
        }
        
        this.scrollDebounce = setTimeout(() => {
          const container = event.target;
          // 检查是否滚动到底部
          if (container.scrollHeight - container.scrollTop <= container.clientHeight + 50) {
            this.loadRecords();
          }
        }, 200);
      },
      getTypeDescription(type) {
        const descriptions = {
          'RecommendRecord': '相似纹理推荐',
          'ClipFindRecord': 'Clip文本检索',
          'GenerateRecord': 'AI图像生成',
          'MatchRecord': '智能搭配'
        };
        return descriptions[type] || type;
      }
    }
  })
  </script>
  
  <style scoped>
  .scrollable-timeline {
    flex: 1; /* 占据剩余空间 */
    overflow-y: auto; /* 启用垂直滚动 */
    padding-right: 8px; /* 防止滚动条遮挡内容 */
    max-height: 450px;
  }
  
  /* 自定义滚动条样式 */
  .scrollable-timeline::-webkit-scrollbar {
    width: 6px;
  }
  .scrollable-timeline::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  .scrollable-timeline::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
  .scrollable-timeline::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  </style>