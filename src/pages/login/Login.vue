<template>
  <div class="testLogin">
    <login-input @login="handleLogin"></login-input>
  </div>
</template>

<script>
import LoginInput from './components/LoginInput'
import http from '../../sdk/util/Http'
import config from '../../sdk/util/config'
import common from '../../sdk/util/common'
export default {
  name: 'Login',
  components: {LoginInput},
  comments: {
    LoginInput
  },
  methods: {
    handleLogin (loginForm) {
      config.init({
        appKey: loginForm.appKey,
        ygwId: loginForm.account
      })
      http.post({
        url: '/api/shop_user/user/admin/login',
        data: {
          appKey: loginForm.appKey,
          account: loginForm.account,
          password: loginForm.password
        },
        headers: common.getBaseHeader()
      })
        .then((res) => {
          console.log(res)
          if (res.data.code === 2000) {
            localStorage.setItem('ms_username', loginForm.account)
            this.$router.push('/home')
          } else {
            this.$message({
              showClose: true,
              message: '登录失败',
              type: 'error'
            })
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          this.$message({
            showClose: true,
            message: '登录失败',
            type: 'error'
          })
        })
    }
  }
}
</script>

<style scoped>
  .testLogin {
    overflow: hidden;
    height: 100vh;
    background-image: url('../../assets/loginBackImg.jpg');
    background-size: cover;
  }
</style>
