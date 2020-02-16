<template>
  <div class="login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
      <el-form-item label="AppKey" prop="appKey">
        <el-input v-model="loginForm.appKey"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <span class="nbsp"></span>
        <el-button type="primary" size="medium" @click="submitForm('loginForm')">登录</el-button>
        <span class="nbsp"></span>
        <el-button type="primary" size="medium" @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .login >>> .el-form-item__label{
    color: #409EFF;
  }
  .login >>> .el-button--medium{
    padding: 10px 20px;
    font-size: 30px;
    border-radius: 30px;
  }
  .login {
    overflow: hidden;
    width: 45vh;
    margin-top: 25vh;
    margin-left: 70vh;
  }
  .nbsp {
    padding-left: 5vh;
  }
</style>
