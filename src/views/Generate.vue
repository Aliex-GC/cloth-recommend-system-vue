<template>
  <div class="billing-container">
    <a-row :gutter="24">
      <!-- 左侧输入区域 -->
      <a-col :span="12">
        <div class="input-card">
          <div class="card-header">
            <h3>AI文生图</h3>
          </div>
          <div class="card-body">
            <a-form layout="vertical">
              <a-form-item label="选择模型">
                <a-select v-model="model" style="width: 100%">
                  <a-select-option value="wanx2.1-t2i-turbo">wanx2.1-t2i-turbo</a-select-option>
                  <a-select-option value="diffusion-model">diffusion-model</a-select-option>
                </a-select>
              </a-form-item>
              </a-form>
            <a-textarea
              v-model="inputText"
              placeholder="请输入内容"
              :auto-size="{ minRows: 10, maxRows: 20 }"
            />
            <a-button
              type="primary"
              class="generate-btn"
              @click="generateImage"
              :loading="loading"
            >
              实时生成
            </a-button>
          </div>
        </div>
      </a-col>

      <!-- 右侧图片展示区域 -->
      <a-col :span="12">
        <div class="image-card">
          <div class="card-header">
            <h3>图片预览</h3>
          </div>
          <div class="card-body">
            <div class="main-image-container">
              <img
                v-if="item.url"
                :src="item.url"
                alt="生成图片"
                class="main-image"
              />
              <div v-else style="text-align: center">
                <img :src="defaultImage" alt="默认图片" class="main-image" />
                <p>暂无图片，请先生成图片</p>
              </div>
            </div>
          </div>
        </div>
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
      isZoomed: false,
      item: { url: "" }, // 初始化 item
      defaultImage: require("@/assets/test.jpg"),
      loading: false,
      model: "wanx2.1-t2i-turbo", // 默认模型
    };
  },
  methods: {
    async generateImage() {
      if (this.inputText == "") {
        this.$message.warning("请输入内容！");
        return;
      }
      this.loading = true; // 开始加载
      this.$message.success("提交成功！");
      // 创建 FormData 对象
      const formData = new FormData();
      formData.append("text", this.inputText);
      formData.append("model", this.model); 
      try {
        // 发送 POST 请求
        const response = await axiosInstance.post("/generate/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 300000, // 设置超时时间为 30 秒
        });

        // 处理响应
        const imageBase64 = response.data.image;
        this.item = { url: `data:image/png;base64,${imageBase64}` }; // 更新 item

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

    zoomImage() {
      this.isZoomed = true;
    },
    closeZoom() {
      this.isZoomed = false;
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

  .image-card {
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
      position: relative;

      .main-image-container {
        position: relative;
        width: 100%;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

        .main-image {
          width: 50%;
          max-width: 600px;
          height: auto;
          display: block;
          border-radius: 4px;
          margin-left: 100px;
        }

        .image-controls {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          text-align: center;

          .zoom-button {
            display: inline-block;
            padding: 8px 16px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.2s;

            &:hover {
              background: rgba(0, 0, 0, 0.9);
            }
          }
        }
      }

      .zoom-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;

        .zoomed-image-container {
          position: relative;
          max-width: 90%;
          max-height: 90%;

          .zoomed-image {
            width: 100vw;
            height: 100vh;
            object-fit: contain;
            border-radius: 0;
          }

          .close-button {
            position: absolute;
            top: -30px;
            right: -30px;
            background: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

            &:hover {
              background: #f0f0f0;
            }
          }
        }
        .placeholder-image {
          height: auto;
          width: auto;
        }
      }
    }
  }
}
</style>
