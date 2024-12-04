<template>
  <div class="login-wrapper">
    <!-- <el-dialog custom-class="bid-el-dialog"  :visible.sync="agreementVisible" width="75%" :close-on-click-modal="false">
      <Agreement></Agreement>
    </el-dialog> -->
    <div class="login-main">
      <div class="logo-con">
        <symbol-icon name="login-big-logo" class="logo" />
        <!-- <img :src="logo" class="logo"> -->
        <span class="logo_text">评标系统</span>
      </div>
      <div class="main-top">
        <img :src="login_left" class="login_left">
        <div class="login-form-con">
          <div class="hy-login">欢迎登录</div>
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
            <el-form-item prop="username">
              <el-input prefix-icon="el-icon-user-solid" placeholder="身份证号" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input prefix-icon="el-icon-lock" type="password" placeholder="密码" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-button type="primary" round class="login-btn" v-if="!isLogining" @click="login">登录</el-button>
            <el-button type="primary" round class="login-btn" v-else :loading="true">登录中</el-button>
          </el-form>
        </div>
      </div>
    </div>
    <div class="login-back">
      <img :src="back_1" class="back_1" />
      <img :src="back_4" class="back_4" />
      <img :src="back_2" class="back_2" />
      <img :src="back_3" class="back_3" />
    </div>
  </div>
</template>
<script>
import back_1 from 'assets/img/login/back_1.png';
import back_2 from 'assets/img/login/back_2.png';
import back_3 from 'assets/img/login/back_3.png';
import back_4 from 'assets/img/login/back_4.png';
import login_left from 'assets/img/login/login_left.png';
import login_author from 'assets/img/login/login_author.png';
import logo from 'assets/img/login/logo.png';
import loginFormConfig from './loginFormConfig.js';
export default {
  data() {
    return {
      back_1,
      back_4,
      back_2,
      back_3,
      login_left,
      login_author,
      logo,
      loginForm: JSON.parse(JSON.stringify(loginFormConfig.ruleForm)),
      loginRules: loginFormConfig.rules,
      // agreementVisible: false,
      isLogining: false,
      isVscode: false,
      loginData: {}
    }
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate((valid, fields) => {
        if (valid) {
          this.$router.push({
            name: 'system'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-wrapper {
  min-width: 1280px;
  position: relative;
  .login-main {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 1280px;
    height: 720px;
    left: 50%;
    margin-left: -640px;
    top: 50%;
    margin-top: -360px;
    .login_left {
      width: 637px;
      margin-left: 67px;
      margin-top: 74px;
      float: left;
    }
    .login-form-con {
      float: left;
      margin-top: 76px;
      margin-left: 19px;
      width: 379px;
      height: 427px;
      background: #fff;
      box-shadow: 0px 4px 21px 9px rgba(3,85,136,0.13);
      border-radius: 47px;
      .hy-login {
        color: #565554;
        font-size: 20px;
        padding-left: 9px;
        border-left: 2px solid #4DA8E1;
        margin-top: 50px;
        margin-left: 54px;
      }
      .login-form {
        width: 269px;
        margin-top: 57px;
        margin-left: 55px;
        .login-btn {
          width: 100%;
        }
      }
    }
    .login_author {
      display: inline-block;
      width: 71.1%;
      margin-top: 70px;
      margin-left: 60px;
    }
    .author-btn-con {
      display: flex;
      justify-content: space-between;
      margin-left: 60px;
      width: 71.1%;
      margin-top: 40px;
      .exit-btn, .system-btn {
        width: 47.8%;
      }
    }
    .logo-con {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-top: 31px;
      height: 38px;
      line-height: 38px;
      vertical-align: center;
      .logo {
        width: 356px;
        height: 36px;
        border-right: 1px solid #fff;
        padding-right: 10px;
        margin-right: 10px;
      }
      .logo_text {
        color: #fff;
        font-size: 19px;
      }
    }
  }
  .main-top::after {
    content: "";
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
  }
}
.login-back {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 720px;
  min-width: 1280px;
  background: #4DA8E1;
  .back_1 {
    width: 34.1%;
  }
  .back_4 {
    float: right;
    width: 27.6%;
  }
  .back_2 {
    width: 26%;
    position: absolute;
    bottom: 3.5vh;
    left: 44.8%;
  }
  .back_3 {
    width: 30.4%;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
