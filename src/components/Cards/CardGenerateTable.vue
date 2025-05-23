<template>
    <!-- Projects Table Card -->
    <a-card
      :bordered="false"
      class="header-solid h-full"
      :bodyStyle="{ padding: 0 }"
    >
      <template #title>
        <a-row type="flex" align="middle">
          <a-col :span="24" :md="12">
            <h6>项目记录</h6>
            <p>今日使用<span class="text-primary">+40%</span></p>
          </a-col>
          <a-col
            :span="24"
            :md="12"
            style="display: flex; align-items: center; justify-content: flex-end"
          >
            <a-radio-group v-model="projectHeaderBtns" size="small" @change="handleRadioChange">
              <a-radio-button value="1" >推荐</a-radio-button>
              <a-radio-button value="2">检索</a-radio-button>
              <a-radio-button value="3">生成</a-radio-button>
              <a-radio-button value="4">搭配</a-radio-button>
            </a-radio-group>
          </a-col>
        </a-row>
      </template>
      <a-table
        :columns="columns"
        :data-source="data.list"
        :pagination="{
          current: currentPage,
          pageSize: 6,
          total: data.total,
          onChange: handlePageChange,
        }"
        :loading="loading"
      >
      <template slot="user_img" slot-scope="text">
    <img
      v-if="text" 
      style="
      width: 64px; 
      height: 64px;
      object-fit: cover;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: all 0.3s;"
      :src="`data:image/jpeg;base64,${text}`"
    />
    <a-avatar v-else size="small" icon="user" />
  </template>
  
        <template slot="time" slot-scope="time">
          <h6 class="m-0">
            {{ time }}
          </h6>
        </template>
        <template slot="name" slot-scope="name">
          <h6 class="m-0">
            AI图像生成
          </h6>
        </template>
        <template slot="describe_text" slot-scope="describe_text">
          <h6 class="m-0 text-ellipsis">
            {{ describe_text }}
          </h6>
        </template>
      </a-table>
    </a-card>
    <!-- / Projects Table Card -->
  </template>
  
  <script>
  import axiosInstance from "@/plugins/axios";
  export default {
    data() {
      return {
        currentPage: 1,
        loading: false,
        data: {
          list: [],
          total: 0,
          has_next: false,
        },
          columns: [
          {
              title: '项目名称',
              dataIndex: 'name',
              scopedSlots: { customRender: 'name' },
              width: 200,
          },
          {
              title: '生成时间',
              dataIndex: 'time',
              scopedSlots: { customRender: 'time' },
              width: 300,
          },
          {
              title: '图片',
              dataIndex: 'user_img',
              scopedSlots: { customRender: 'user_img' },
          },
          {
              title: '文本信息',
              scopedSlots: { customRender: 'describe_text' },
              dataIndex: 'describe_text',
          },
          
      ],
      projectHeaderBtns: "3",
      }
    },
    mounted() {
      this.fetchData();
    },
    created() {
    // 根据当前路由设置默认选中项
    const routeMap = {
      "/history": "1",
      "/find_history": "2",
      "/generate_history": "3",
      "/match_history": "4"
    };
    const fullPath = this.$route.path;
    this.projectHeaderBtns = routeMap[fullPath] || "3";
    console.log('Current route:', fullPath);
  },
    methods: {
      async fetchData() {
        this.loading = true;
        try {
          const response = await axiosInstance.get("/generate_history/", {
            params: { page: this.currentPage },
          });
          this.data = {
            list: response.data.list,
            total: response.data.total,
            has_next: response.data.has_next,
          };
        //    console.log('Image data:', response.data.list[0].user_img);
        //    console.log('First record:', this.data.list[0]);
  
        } finally {
          this.loading = false;
        }
      },
      handlePageChange(page) {
        this.currentPage = page;
        this.fetchData();
      },
      handleRadioChange(e) {
      const value = e.target.value;
      const routes = {
        "1": { path: "/history" }, // 对应路由的name
        "2": { path: "/find_history" },
        "3": { path: "/generate_history" },
        "4": { path: "/match_history" }
      };
      this.$router.push(routes[value]); // 使用Vue Router跳转
    }
    },
  };
  </script>


<style scoped>
.text-ellipsis {
  display: inline-block; /* 或者 block，根据你的布局需要 */
  max-width: 100%; /* 或者设置一个固定宽度，如200px */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>