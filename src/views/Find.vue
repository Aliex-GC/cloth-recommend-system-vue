<template>
    <div class="billing-container">
      <a-row :gutter="24">
        <!-- 左侧输入区域 -->
        <a-col :span="12">
          <div class="input-card">
            <div class="card-header">
              <h3>Clip模型检索</h3>
            </div>
            <div class="card-body">
              <a-textarea
                v-model="inputText"
                placeholder="请输入内容（支持输入中文和英语）"
                :auto-size="{ minRows: 10, maxRows: 20 }"
              />
              <a-form layout="vertical">
            <a-form-item label="挑选你想要的类别">
            <a-select v-model="target_category">
              <a-select-option value="bottoms">下装</a-select-option>
              <a-select-option value="tops">上装</a-select-option>
              <a-select-option value="outerwear">外套</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
              <a-button
                type="primary"
                class="generate-btn"
                @click="handleText"
                :loading="loading"
              >
                实时生成
              </a-button>
            </div>
          </div>
        </a-col>
  
        <!-- 右侧图片展示区域 -->
        <a-col :span="12">
        <a-card title="推荐结果列表" v-if="imageList.length >= 0"  style="height: 100%;">
            <div style="height: 550px; overflow-y: auto;"> 
            <a-list
            :data-source="imageList"
            :grid="{ gutter: 16, column: 2 }"
            
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-card hoverable>
                <img
                  :src="item.url"
                  style="width: 100%; height: 150px; object-fit: contain"
                />
                <div class="image-info">
                    
                  <p class="image-name">{{ item.name }}</p>
                </div>
              </a-card>
            </a-list-item>
          </a-list>
            </div>
        </a-card>
      </a-col>
      </a-row>
    </div>
  </template>
  
  <script>
  import axiosInstance from "@/plugins/axios";
  import { message } from "ant-design-vue";
  export default {
    data() {
      return {
        inputText: "",
        item: { url: "" }, // 初始化 item
        imageList: [], // 存储已提交的图片
        loading: false, // 添加 loading 状态
        target_category: "tops", // 目标类别
      };
    },
    methods: {
      async handleText() {
        if (this.inputText == "") {
          this.$message.warning("请输入内容！");
          return;
        }
        this.loading = true; // 开始加载
        this.$message.success("提交成功！");
        // 创建 FormData 对象
        const formData = new FormData();
        formData.append("text", this.inputText);
        formData.append("target_category", this.target_category);
        try {
          // 发送 POST 请求
          const response = await axiosInstance.post("/find/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: 300000, // 设置超时时间为 30 秒
          });
  
          const results = response.data.results || [];
          this.imageList = results.map((item) => ({
            url: `data:image/png;base64,${item.image}`, // Base64 图片
            name: `ID: ${item.id}`, // 图片 ID
            combined_score:`${item.score}`, // 图片 ID
          }));
  
          this.$message.success("提交成功！");
          console.log("提交成功:", response.data);
        } catch (error) {
          this.$message.error(
            "提交失败：" + (error.response?.data.message || error.message)
          );
          console.error("提交失败:", error);
        } finally {
          this.loading = false; // 结束加载
        }
      },
  
      
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .billing-container {
    padding: 24px;
  
    .input-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      height: 100%;
      display: flex;
      flex-direction: column;
  
      .card-header {
        padding: 16px;
        border-bottom: 1px solid #f0f0f0;
  
        h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
        }
      }
  
      .card-body {
        padding: 16px;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 16px;
  
        .generate-btn {
          width: 120px;
          align-self: flex-end;
        }
      }
    }
  
  }
  </style>
  