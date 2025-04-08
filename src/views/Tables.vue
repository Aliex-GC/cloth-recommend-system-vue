<template>
  <a-row :gutter="16">
    <!-- 左侧表单卡片 -->
    <a-col :span="12">
      <a-card title="服装纹理推荐" class="form-card">
        <div class="upload-wrapper">
          <a-upload-dragger
            name="file"
            :multiple="false"
            :before-upload="beforeUpload"
            :show-upload-list="false"
            accept="image/*"
            :custom-request="() => {}"
            :action="''"
            @change="handleChange"
          >
            <div class="upload-content">
              <a-icon type="upload" style="font-size: 48px; color: #1890ff" />
              <div class="upload-text">
                <p class="upload-main-text">点击或拖拽上传图片</p>
                <p class="upload-sub-text">支持格式：JPEG/PNG，最大5MB</p>
              </div>
            </div>
          </a-upload-dragger>

          <!-- 预览区域集成在卡片内 -->
          <div v-if="currentImage" class="preview-container">
            <div class="preview-meta">
              <h4>{{ uploadedFileName }}</h4>
              <a-button
                type="link"
                @click="handlePreviewDelete"
                style="margin-left: 8px"
              >
                删除
              </a-button>
            </div>
            <img
              :src="currentImage"
              style="width: 100%; height: 75px; object-fit: contain"
              alt="图片预览"
            />
          </div>
        </div>
      </a-card>

      <a-form-item>
        <a-button
          type="primary"
          @click="handleSubmit"
          :disabled="!isFormValid || loading"
          :loading="loading"
          block
        >
          提交全部信息
        </a-button>
      </a-form-item>
    </a-col>

    <!-- 右侧上传卡片 -->
    <a-col :span="12">
      <a-card title="生成图片列表" v-if="imageList.length > 0">
        <a-list
          :data-source="imageList"
          :grid="{ gutter: 16, column: 4 }"
          :pagination="{ pageSize: 8 }"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card hoverable>
              <img
                :src="item.url"
                style="width: 100%; height: 200px; object-fit: contain"
              />
              <div class="image-info">
                <p class="image-name">{{ item.name }}</p>
              </div>
            </a-card>
          </a-list-item>
        </a-list>
      </a-card>
    </a-col>
  </a-row>
</template>
    
    <script>
import axiosInstance from "@/plugins/axios";
export default {
  data() {
    return {
      currentImage: null, // 当前预览图片
      uploadedFile: null, // 上传文件对象
      imageList: [], // 存储已提交的图片
      fileSize: 0, // 文件大小
      uploadedFileName: "", // 上传文件名
      loading: false, // 添加 loading 状态
    };
  },
  computed: {
    isFormValid() {
      return this.currentImage;
    },
  },
  methods: {
    handleChange(info) {
      console.log("handleChange event:", info);
      if (!info.file || !info.file.originFileObj) {
        console.error("Invalid file info:", info);
        return;
      }

      const file = info.file.originFileObj;
      console.log("File selected:", file);
      this.uploadedFileName = file.name;
      this.fileSize = Math.round(file.size / 1024);

      // 生成预览
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("FileReader completed");
        this.currentImage = e.target.result;
        this.$message.success("文件读取成功");
      };
      reader.onerror = (e) => {
        console.error("FileReader error:", e.target.error);
        this.$message.error("文件读取失败");
      };
      reader.readAsDataURL(file);
    },

    handlePreviewDelete() {
      this.currentImage = null;
      this.uploadedFile = null;
      this.$message.success("预览图片已删除");
    },

    async handleSubmit() {
      if (!this.isFormValid) {
        this.$message.warning("请填写完整信息并上传图片");
        return;
      }
      this.loading = true; // 开始加载
      this.$message.success("提交成功！");
      // 创建 FormData 对象
      const formData = new FormData();
      formData.append("file", this.uploadedFile); // 添加图片文件
      try {
        // 发送 POST 请求
        const response = await axiosInstance.post("/recommend/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 300000,
        });

        // 处理响应
        const results = response.data.results || [];
        this.imageList = results.map((item) => ({
          url: `data:image/png;base64,${item.image}`, // Base64 图片
          name: `ID: ${item.id}`, // 图片 ID
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

    clearForm() {
      this.currentImage = null;
      this.uploadedFile = null;
      this.uploadedFileName = "";
      this.fileSize = 0;
    },

    beforeUpload(file) {
      console.log("beforeUpload called with:", file);
      const isValidType = ["image/jpeg", "image/png"].includes(file.type);
      const isValidSize = file.size / 1024 / 1024 < 5;

      if (!isValidType) {
        this.$message.error("仅支持 JPG/PNG 格式");
        return false;
      }
      if (!isValidSize) {
        this.$message.error("图片大小不能超过5MB");
        return false;
      }

      this.uploadedFile = file;
      return true;
    },

    handleDelete(index) {
      this.imageList.splice(index, 1);
      this.$message.success("图片已删除");
    },
  },
};
</script>
    
    <style scoped>
.upload-wrapper {
  padding: 16px;
}

.upload-content {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.preview-container {
  margin-top: 8px;
  border: 1px dashed #e8e8e8;
  border-radius: 4px;
  padding: 4px;
}

.preview-container {
  max-width: 100%;
  overflow: auto;
  padding: 16px;
  background: #f8f9fa;
  margin-top: 16px;
}

.preview-image {
  max-width: 80%;
  max-height: 400px;
  object-fit: contain;
  margin: 12px auto;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  display: block;
}

.preview-meta {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.preview-meta h4 {
  margin: 0;
  color: rgba(0, 0, 0, 0.85);
}

.preview-meta p {
  margin: 4px 0 0;
  color: rgba(0, 0, 0, 0.45);
}

.list-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  background: #f5f5f5;
}

.image-info {
  padding: 8px;
  text-align: center;
}

.image-percentage {
  margin: 4px 0 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 13px;
  font-weight: 500;
}

.image-name {
  margin: 0;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
  