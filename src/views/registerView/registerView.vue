<template>
  <div class="register-wrapper">
    <div class="register-main">
      <div><img :src="logo_title" width="100%"></div>
      <div class="register-title">
        <p class="t-text">注册验证</p>
        <p class="t-tip">温馨提示：平台启用短信验证<br />连续多次验证错误系统将被锁定，请谨慎操作！</p>
      </div>
      <div class="form-main">
        <el-form ref="registerFormRef" :model="registerForm" style="width: 380px">
          <el-form-item prop="phone"
            :rules="[
              { required: true, message: '请输入手机号'},
              { pattern: $globalRegexp.mobile, message: '请输入正确的手机号', trigger: 'blur' }
            ]">
            <el-input prefix-icon="el-icon-mobile" placeholder="请输入手机号" v-model="registerForm.phone" size="medium"></el-input>
          </el-form-item>
          <el-form-item 
            prop="messageCode"
            :rules="[
              { required: true, message: '请输入验证码'}
            ]">
            <div style="display: flex;">
              <el-input style="width:290px;" placeholder="请输入验证码" v-model="registerForm.messageCode" size="medium"></el-input>
              <el-button v-if="!isCouting" type="primary" plain style="width:105px;margin-left: 5px;" @click="getCode" :loading="isSending">获取验证码</el-button>
              <el-button v-else type="primary" plain style="width:105px;margin-left: 5px;" disabled key="count">{{ count }}s</el-button>
            </div>
          </el-form-item>
          <el-button type="primary" style="margin-top: 12px;width:100%" size="medium" @click="toNextStep" :loading="isNexting">下一步</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import logo_title from 'assets/img/register/logo_title.jpg';
import {
  sendMessageCode,
  checkMessageCode,
  registerTpzzjbTo
} from '@/api/registerApi.js';
export default {
  data() {
    return {
      logo_title,
      registerForm: {
        phone: '',
        messageCode: ''
      },
      isSending: false,
      isNexting: false,
      isCouting: false,
      count: 0
    }
  },
  methods: {
    getCode() {
      this.$refs.registerFormRef.validateField('phone', valid => {
        if (valid) {
          return false;
        }
        const {
          phone
        } = this.registerForm;
        sendMessageCode.bind(this)({
          phone,
          sendType: '1'
        }, 'isSending').then(res => {
          this.$message.success('发送验证码成功');
          this.countDown(60*1000);
        }).catch(rej => {
          if (rej.header && rej.header.ret === 1) {
            this.$message({
              type: "error",
              showClose: true,
              message: rej.header.msg
            });
          } else {
            console.log(rej)
          }
        });
      });
    },
    countDown(count, cb) {
      if (count > 0) {
        this.isCouting = true;
        let rest = count;
        this.count = count/1000;
        const timer = setInterval(() => {
          rest = rest - 1000;
          this.count = rest/1000;
          if (rest <= 0) {
            this.isCouting = false;
            clearInterval(timer);
          }
          cb && cb(rest);
        }, 1000);
      }
    },
    // 下一步
    toNextStep() {
      this.$refs.registerFormRef.validate(valid => {
        if (!valid) {
          return false;
        }
        const {
          registerForm
        } = this;
        checkMessageCode.bind(this)(registerForm, 'isNexting').then(res => {
          registerTpzzjbTo.bind(this)({
            phone: res.data
          }, 'isNexting').then(toRes => {
            if (!toRes.data || toRes.data.tpzjjb.shzt === '14') {
              this.$router.push({
                name: 'personalInfo',
                query: {
                  phone: res.data
                }
              })
            } else {
              this.$router.push({
                name: 'registerResult',
                query: {
                  phone: res.data
                }
              })
            }
          }).catch(rej => {
            if (rej.header && rej.header.ret === 1) {
              this.$message({
                type: "error",
                showClose: true,
                message: rej.header.msg
              });
            } else {
              console.log(rej)
            }
          });
        }).catch(rej => {
          if (rej.header && rej.header.ret === 1) {
            this.$message({
              type: "error",
              showClose: true,
              message: rej.header.msg
            });
          } else {
            console.log(rej)
          }
        });
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .register-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    align-items: center;
    min-height: 500px;
    .register-main {
      margin-top: -140px;
      width: 500px;
      height: 303px;
      .register-title {
        margin-top: -20px;
        text-align: center;
        .t-text {
          margin-bottom: 6px;
          color: rgb(85, 85, 85);
          font-size: 18px;
        }
        .t-tip {
          color: rgb(217, 0, 27);
          font-size: 14px;
        }
      }
      .form-main {
        display: flex;
        justify-content: center;
        margin-top: 6px;
      }
    }
  }
</style>