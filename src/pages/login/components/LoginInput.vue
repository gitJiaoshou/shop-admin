<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="loginForm" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="appKey">
          <el-input v-model="loginForm.appKey" placeholder="appKey">
            <el-button slot="prepend" icon="el-icon-key"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" placeholder="account">
            <el-button slot="prepend" icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="loginForm.password"
            @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginInput',
  data () {
    return {
      loginForm: {
        appKey: '',
        account: '',
        password: ''
      },
      rules: {
        appKey: [
          {required: true, message: '请输入appKey', trigger: 'blur'},
          {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
        ],
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 6, message: '长度在大于6个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, message: '长度在大于6个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.login.validate(valid => {
        if (valid) {
          this.$emit('login', this.loginForm)
        } else {
          this.$message.error('登录失败')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('../../../assets/loginBackImg.jpg');
    background-size: 100%;
  }
  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
  }
  .ms-content {
    padding: 30px 30px;
  }
  .login-btn {
    text-align: center;
  }
  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }
</style>
