<template>
  <div class="login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
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
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
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
  .login {
    width: 20%;
    margin-top: 150px;
    margin-left: 35%;
  }
</style>
