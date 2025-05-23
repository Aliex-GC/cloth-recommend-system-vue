<!-- 
	This is the sign in page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
  <div class="sign-in">
    <a-row type="flex" :gutter="[0, 24]" justify="space-around" align="start" style="padding-top: 30px;" >
      <!-- Sign In Form Column -->
      <a-col
        :span="24"
        :md="12"
        :lg="{ span: 12, offset: 0 }"
        :xl="{ span: 6, offset: 2 }"
        class="col-form"
      >
        <h1 class="mb-15" style="color: #000;">登录</h1>
        <h5 class="font-regular text-muted">请输入你的账号和密码</h5>

        <!-- Sign In Form -->
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
          :hideRequiredMark="true"
        >
          <a-form-item class="mb-10" label="账号" :colon="false">
            <a-input
              v-decorator="[
                'username',
                { rules: [{ required: true, message: '请输入账号!' }] },
              ]"
              placeholder="账号"
            />
          </a-form-item>
          <a-form-item class="mb-5" label="密码" :colon="false">
            <a-input
              v-decorator="[
                'password',
                { rules: [{ required: true, message: '请输入密码!' }] },
              ]"
              type="password"
              placeholder="密码"
            />
          </a-form-item>
          <a-form-item class="mb-10">
            <a-switch v-model="rememberMe" /> 记住我
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              block
              html-type="submit"
              class="login-form-button"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">
          还没有账号?
          <router-link to="/sign-up" class="font-bold text-dark"
            >点我注册</router-link>
        </p>
      </a-col>
      <!-- / Sign In Form Column -->

      <!-- Sign In Image Column -->
      <a-col :span="14" :md="6" :lg="6" :xl="6" class="col-img" style="padding-top: 0px;margin-left: -16px;">
        <img src="images/login.png" alt="" />
      </a-col>
      <!-- Sign In Image Column -->
    </a-row>
  </div>
</template>

<script>
import axiosInstance from "@/plugins/axios";
import { message } from "ant-design-vue";

export default {
  data() {
    return {
      // Binded model property for "Sign In Form" switch button for "Remember Me" .
      rememberMe: true,
    };
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    // Handles form submission and sends data to backend API
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            const response = await axiosInstance.post(
              "/login/",
              {
                username: values.username,
                password: values.password,
              },
              {
                withCredentials: true, // 启用凭证（Cookie）
              }
            );
            this.$message.success(response.data.message);
            this.$router.push("/index");
          } catch (error) {
            this.$message.error(error.response.data.message);
           
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #ffffff;
}
</style>
