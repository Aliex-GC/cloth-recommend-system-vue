<template>
    <a-row :gutter="16">
      <!-- 左侧表单卡片 -->
      <a-col :span="12">
        <a-card title="虚拟试穿" class="form-card">
          <a-form layout="vertical">
            <a-form-item label="上传服装">
              <a-select v-model="selectedCategory">
                <a-select-option value=0>上装</a-select-option>
                <a-select-option value=1>下装</a-select-option>
                <a-select-option value=2>裙子</a-select-option>
              </a-select>
            </a-form-item>
            <div class="upload-wrapper"  >
            <a-upload-dragger
              name="cloth_file"
              :multiple="false"
              :before-upload="beforeclothUpload"
              :show-upload-list="false"
              accept="image/*"
              :custom-request="() => {}"
              :action="''"
              @change="handleclothChange"
            >
            <div class="upload-content">
                  <!-- 预览图片覆盖上传区域 -->
                  <div v-if="cloth_currentImage" class="preview-overlay">
                    <img
                      :src="cloth_currentImage"
                      class="preview-image"
                      alt="图片预览"
                    />
                    <div class="preview-meta">
                      <h6>{{ cloth_uploadedFileName }}</h6>
                      <a-button
                        type="link"
                        @click="handleclothPreviewDelete"
                        class="delete-btn"
                      >
                        删除
                      </a-button>
                    </div>
                  </div>
                  
                  <!-- 上传提示（只在没有图片时显示） -->
                  <div v-if="!cloth_currentImage" class="upload-hint">
                    <a-icon type="upload" style="font-size: 48px;margin-top: 48px; color: #1890ff" />
                    <div class="upload-text" style="margin-top: 28px;" >
                      <p class="upload-main-text">点击或拖拽上传图片</p>
                      <p class="upload-sub-text">支持格式：JPEG/PNG，最大5MB</p>
                    </div>
                  </div>
                </div>
            </a-upload-dragger>
  
           
            
          </div>
          </a-form>
        </a-card>
      </a-col>
  
      <!-- 右侧上传卡片 -->
      <a-col :span="12">
        <a-card title="上传模特图片" class="upload-card" style="min-height: 365px;">
          <div class="upload-wrapper" >
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
                  <!-- 预览图片覆盖上传区域 -->
                  <div v-if="currentImage" class="preview-overlay">
                    <img
                      :src="currentImage"
                      class="preview-image"
                      alt="图片预览"
                    />
                    <div class="preview-meta">
                      <h6>{{ uploadedFileName }}</h6>
                      <a-button
                        type="link"
                        @click="handlePreviewDelete"
                        class="delete-btn"
                      >
                        删除
                      </a-button>
                    </div>
                  </div>
                  
                  <!-- 上传提示（只在没有图片时显示） -->
                  <div v-if="!currentImage" class="upload-hint">
                    <a-icon type="upload" style="font-size: 48px;margin-top: 48px; color: #1890ff" />
                    <div class="upload-text" style="margin-top: 28px;" >
                      <p class="upload-main-text">点击或拖拽上传图片</p>
                      <p class="upload-sub-text">支持格式：JPEG/PNG，最大5MB</p>
                    </div>
                  </div>
                </div>
            </a-upload-dragger>
                

            <a-button
                type="primary"
                @click="handleSubmit"
                :disabled="!isFormValid "
                :loading="loading"
                style="width: 150px; margin-left: 220px; margin-top: 40px;"
              >
                看看效果
              </a-button>
           
            
          </div>
        </a-card>
      </a-col>
  
      <!-- 图片预览卡片 -->
        <a-col :span="24">
            <a-card title="图片预览" class="image-preview-card">
    <!-- 图片预览区域 -->
    <div v-if="wearImage" class="preview-container">
      <img 
        :src="wearImage" 
        alt="虚拟试衣结果" 
        class="preview-image"
      />
      <div class="action-buttons">
        <a-button 
          type="primary" 
          @click="downloadImage"
          icon="download"
        >
          下载图片
        </a-button>
        
      </div>
    </div>
    
    <!-- 空状态 -->
    <div v-else class="empty-preview">
      <a-empty description="暂无试衣结果" />
    </div>
  </a-card>
        </a-col>
    </a-row>
  </template>
    
    <script>
  import axiosInstance from "@/plugins/axios";
  export default {
    data() {
      return {
        selectedCategory: null,
        currentImage: null, // 当前预览图片
        cloth_currentImage: null, // 当前预览图片
        uploadedclothFile:null,
        uploadedFile: null, // 上传文件对象
        cloth_uploadedFile: null,
        wearimage:null, // 存储已提交的图片
        fileSize: 0, // 文件大小
        uploadedFileName: "", // 上传文件名
        cloth_uploadedFileName: "", // 上传文件名
        loading: false, // 添加 loading 状态
      };
    },
    computed: {
      isFormValid() {
        return this.selectedCategory && this.cloth_currentImage && this.currentImage ;
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
      handleclothChange(info) {
        console.log("handleChange event:", info);
        if (!info.file || !info.file.originFileObj) {
          console.error("Invalid file info:", info);
          return;
        }
  
        const file = info.file.originFileObj;
        console.log("File selected:", file);
        this.cloth_uploadedFileName = file.name;
        this.fileSize = Math.round(file.size / 1024);
  
        // 生成预览
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log("FileReader completed");
          this.cloth_currentImage = e.target.result;
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
      handleclothPreviewDelete() {
        this.cloth_currentImage = null;
        this.uploadedclothFile = null;
        this.$message.success("预览图片已删除");
      },
  
      async handleSubmit() {
        if (!this.isFormValid) {
          this.$message.warning("请填写完整信息并上传图片");
          return;
        }
        this.loading = true; // 开始加载
        // 创建 FormData 对象
        const formData = new FormData();
        formData.append("category", this.selectedCategory); // 添加类别
        formData.append("modelfile", this.uploadedFile); // 添加图片文件
        formData.append("clothfile", this.cloth_uploadedFile); // 添加类别
        try {
          // 发送 POST 请求
          const response = await axiosInstance.post(
            "/wear/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // 设置请求头
              },
              timeout: 60000,
            }
            
          );
  
          // 处理成功响应
        //   const results = response.data.image || [];
          this.wearImage = `data:image/png;base64,${response.data.image}`;
          this.$message.success("试穿成功！");
          console.log("提交成功:", response.data);
  
          // 清空表单
          //this.clearForm();
        } catch (error) {
          // 处理错误
          this.$message.error(
            "提交失败：" + (error.response?.data.message || error.message)
          );
          console.error("提交失败:", error);
        } finally {
          this.loading = false; // 结束加载
        }
      },
      
      clearForm() {
        this.selectedCategory = null;
        this.targetCategory = null;
        this.description = "";
        this.currentImage = null;
        this.uploadedFile = null;
        this.uploadedFileName = "";
        this.fileSize = 0;
      },
  
      beforeUpload(file) {
        console.log("beforeUpload called with:", file);
        const isValidType = ["image/jpeg", "image/png"].includes(file.type);
        const isValidSize = file.size / 1024 / 1024 < 15;
  
        if (!isValidType) {
          this.$message.error("仅支持 JPG/PNG 格式");
          return false;
        }
        if (!isValidSize) {
          this.$message.error("图片大小不能超过15MB");
          return false;
        }
  
        this.uploadedFile = file;
        return true;
      },

      beforeclothUpload(file) {
        console.log("beforeclothUpload called with:", file);
        const isValidType = ["image/jpeg", "image/png"].includes(file.type);
        const isValidSize = file.size / 1024 / 1024 < 15;
  
        if (!isValidType) {
          this.$message.error("仅支持 JPG/PNG 格式");
          return false;
        }
        if (!isValidSize) {
          this.$message.error("图片大小不能超过15MB");
          return false;
        }
  
        this.cloth_uploadedFile = file;
        return true;
      },
  
    },
  };
  </script>
    
    <style scoped>
  .upload-wrapper {
    padding: 2px;
  }
  
  .upload-content {
    padding: 2px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 225px;
  }
  
  .preview-container {
    margin-top: 8px;
    border: 1px dashed #e8e8e8;
    border-radius: 4px;
    padding: 4px;
  }
  
  
  
  .preview-image {
    max-width: 80%;
    max-height: 300px;
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
  