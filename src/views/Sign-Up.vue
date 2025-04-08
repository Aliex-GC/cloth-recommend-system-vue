<!-- 
	This is the sign up page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
  <div>
    <!-- Sign Up Image And Headings -->
    <div
      class="sign-up-header"
      style="background-image: url('images/bg-signup.jpg')"
    >
      <div class="content">
        <h1 class="mb-5">注册</h1>
      </div>
    </div>
    <!-- / Sign Up Image And Headings -->

    <!-- Sign Up Form -->
    <a-card
      :bordered="false"
      class="card-signup header-solid h-full"
      :bodyStyle="{ paddingTop: 0 }"
    >
      <template #title>
        <h5 class="font-semibold text-center"></h5>
      </template>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item class="mb-10">
          <a-input
            v-decorator="[
              'username',
              { rules: [{ required: true, message: '请输入用户名' }] },
            ]"
            placeholder="Name"
          >
          </a-input>
        </a-form-item>

        <a-form-item class="mb-5">
          <a-input
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入密码!' }] },
            ]"
            type="password"
            placeholder="Password"
          >
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            block
            html-type="submit"
            class="login-form-button"
          >
            注册
          </a-button>
        </a-form-item>
      </a-form>
      <p class="font-semibold text-muted text-center">
        已经有账号?
        <router-link to="/sign-in" class="font-bold text-dark"
          >点此登录</router-link
        >
      </p>
    </a-card>
    <!-- / Sign Up Form -->
  </div>
</template>

<script>
import { message } from "ant-design-vue";
import axiosInstance from "@/plugins/axios";
export default {
  data() {
    return {};
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    // Handles input validation after submission.
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        console.log("Request data:", { username: values.username, password: values.password });
        if (!err) {
          try {
            console.log("Request data:", { username: values.username, password: values.password });
            const response = await axiosInstance.post("/register/", {
                
              username: values.username,
              password: values.password,
            });
            message.success(response.data.message);
          } catch (error) {
            console.error("Error:", error); // 打印错误信息
            console.log("Form values:", values); // 打印表单数据
            message.error(
              "Login failed:",
              error.response ? error.response.data.message : error.message
            );
            // Handle login error (e.g., show error message to user)
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
</style>