<template>
  <div class="body">
    <div class="topBox">
      <span>没有账号？ <router-link to="/register">去注册</router-link></span>
    </div>
    <div class="containerBox">
      <!-- 背景 -->
      <div class="wrap">
        <div class="wall wall-front"></div>
        <div class="wall wall-top"></div>
        <div class="wall wall-bottom"></div>
        <div class="wall wall-left"></div>
        <div class="wall wall-right"></div>
        <div class="wall wall-back"></div>
      </div>

      <div class="form-box">
        <el-card>
          <marquee
            loop="2"
            width="360px"
            scrollAmount="2"
            onMouseOver="this.stop()"
            onMouseOut="this.start()"
          >
            没有账号？请点击右上角注册
          </marquee>
          <el-form
            ref="formRef"
            :rules="formRules"
            status-icon
            :model="formData"
            @submit.native.prevent
          >
            <!-- 标题 -->
            <h1 class="title">医疗物资管理系统</h1>
            <!-- 用户名 -->
            <el-form-item prop="account">
              <el-input
                prefix-icon="el-icon-user"
                v-model="formData.account"
                placeholder="账号"
                @keyup.enter.native="submitFormData"
                maxlength="20"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                show-password
                prefix-icon="el-icon-suitcase"
                v-model="formData.password"
                placeholder="密码"
                maxlength="20"
                @keyup.enter.native="submitFormData"
              ></el-input>
            </el-form-item>
            <!-- 4位验证码 -->
            <el-form-item prop="verifyCode">
              <div style="display: flex">
                <el-input
                  v-model="formData.verifyCode"
                  prefix-icon="el-icon-mobile"
                  class="verify_code"
                  placeholder="验证码"
                  @keyup.enter.native="submitFormData"
                ></el-input>
                <img
                  :src="imgCode"
                  alt=""
                  class="verify_img"
                  style="
                    margin-left: 10px;
                    cursor: pointer;
                    height: 40px;
                    border-radius: 10px;
                  "
                  @click="uploadeImgCode"
                />
              </div>
            </el-form-item>

            <!-- 记住密码 -->
            <el-checkbox v-model="checked" style="margin-left: 130px"
              >记住密码</el-checkbox
            >
            <!-- 登录按钮 -->
            <el-form-item class="form-commit">
              <el-button
                type="primary"
                icon="el-icon-finished"
                @click="submitFormData"
                >登录</el-button
              >
              <el-button
                icon="el-icon-refresh"
                type="primary"
                @click="resetForm"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
        <!-- 滑动验证码模块 -->
        <Vcode
          :canvasWidth="450"
          :canvasHeight="300"
          :show="isShow"
          @success="success"
          @close="close"
        />
      </div>
    </div>
  </div>
</template>

<script scoped>
// import nprogress from "nproc"
import Vcode from "vue-puzzle-vcode";
export default {
  name: "Login",
  components: {
    Vcode,
  },
  data() {
    return {
      isShow: false, //滑块验证码模态框是否出现
      checked: false, //是否记住密码
      imgCode: "", //验证码图片
      code: "", //验证码
      formData: {
        account: "",
        password: "",
        verifyCode: "",
      },
      formRules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 11,
            message: "长度在 1 到 11 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, max: 15, message: "长度在 4 到 15 个字符", trigger: "blur" },
        ],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为4个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.uploadeImgCode();
    //如果本地session存在密码则在本地得到
    let account = sessionStorage.getItem("account");
    let password = sessionStorage.getItem("password");
    if (password) {
      this.checked = true;
      this.formData.account = account;
      this.formData.password = password;
    }
  },
  methods: {
    //提交表单
    submitFormData() {
      this.$refs.formRef.validate((valid) => {
        if (!valid) {
          return;
        } else {
          this.isShow = true;
        }
      });
    },

    //加载图形验证码
    async uploadeImgCode() {
      try {
        const res = await this.$http({
          method: "get",
          url: "user/showCode",
          responseType: "arraybuffer",
        });
        if (res.status === 200) {
          console.log(res);
          let binaryData = [];
          binaryData.push(res.data);
          this.imgCode = window.URL.createObjectURL(new Blob(binaryData)); //获取验证码图片
          this.code = res.headers.code.toLowerCase();
        } else {
          this.$message.error("访问错误！");
        }
      } catch (err) {
        this.$message.error("好像服务器跑丢了哦！");
      }
    },

    //验证码通过之后的回调
    async success(msg) {
      //判断验证码的正误
      if (this.code !== this.formData.verifyCode.toLowerCase()) {
        this.isShow = false;
        return this.$message.error("验证码出错！");
      }

      const res = await this.$http.post("user/login", {
        account: this.formData.account,
        password: this.formData.password,
      });

      if (res.status === 200) {
        if (res.data.code === 404) {
          this.$message.error("账号或密码错误！");
          this.isShow = false;
        } else {
          const data = res.data.data;

          sessionStorage.setItem("token", data.token); //保存本地token

          //记住密码则保存在本地session中
          if (this.checked) {
            sessionStorage.setItem("account", this.formData.account);
            sessionStorage.setItem("password", this.formData.password);
          } else {
            sessionStorage.removeItem("account");
            sessionStorage.removeItem("password");
          }

          //将用户信息放在local暂存
          localStorage.setItem("account", data.user.account);
          localStorage.setItem("department", data.user.department);
          localStorage.setItem("password", data.user.password);
          localStorage.setItem("role", data.user.role);
          localStorage.setItem("userName", data.user.userName);

          this.$store.commit("setUserInfo", data.user); //存放用户信息

          //七天登录数据
          localStorage.setItem("recent_login", data.recent_login);
          this.$store.commit("setRecentLogin", data.recent_login); //存放用户信息

          this.$message.success(
            "登陆成功！欢迎，" + data.user.role + data.user.userName
          );
          this.$router.push({ path: "/home" });
          location.reload();
        }
      } else {
        this.$message.error("服务器出错了!");
      }
    },

    //重置表单
    resetForm() {
      this.$refs.formRef.resetFields();
    },

    // 用户点击遮罩层，应该关闭模态框
    close() {
      this.isShow = false;
    },
  },
};
</script>

<style scoped>
/* 引入特效css */
@import url(../assets/css/login-style.css);

.topBox {
  position: absolute;
  top: 20px;
  right: 50px;
  z-index: 10;
  transition: 0.8s;
}

.topBox:hover {
  right: 70px;
}

.topBox a {
  transition: 0.4s;
}

.topBox a:hover {
  color: #fff;
}

.el-card {
  width: 400px;
  height: 550px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 15px;
}

.form-commit {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}

.el-input__inner {
  border-radius: none;
}

marquee {
  position: absolute;
  top: 10px;
  background: transparent;
  color: rgba(170, 169, 169, 0.8);
  font-size: 12px;
}
</style>