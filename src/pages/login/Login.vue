<template>
  <div class="testLogin">
    <login-input></login-input>
  </div>
</template>

<script>
import LoginInput from './components/LoginInput'
export default {
  name: 'Login',
  components: {LoginInput},
  comments: {
    LoginInput
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
