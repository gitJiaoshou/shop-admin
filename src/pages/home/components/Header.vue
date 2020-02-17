<template>
  <div class="header">
    <div class="menu">
      <el-button type="primary" icon="el-icon-s-fold" @click="collapse"></el-button>
    </div>
    <div class="shop">
      shop后台管理
    </div>
    <div class="quit">
      <el-button size="medium" round @click="quit">
        退出
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    quit () {
      this.$emit('quit')
    },
    collapse () {
      this.$store.dispatch('changCollapse', !this.$store.state.isCollapse)
      this.$emit('collapse', this.$store.state.isCollapse)
    }
  }
}
</script>

<style scoped>
  .menu>>>.el-header {
    padding: 0;
  }
  .header {
    background-color: #8cc5ff;
    width: 100%;
    height: 100%;
  }
  .menu {
    height: 100%;
    line-height: 60px;
    font-size: 30px;
    float: left;
  }
  .shop {
    color: #FFF;
    height: 100%;
    line-height: 60px;
    font-size: 30px;
    font-weight: 900;
    float: left;
    padding-left: 20px;
  }
  .quit {
    color: #FFF;
    height: 100%;
    line-height: 60px;
    float: right;
    padding-top: 0.2vh;
    padding-right: 2vh;
  }
</style>
