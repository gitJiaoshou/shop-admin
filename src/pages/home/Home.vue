<template>
  <div>
    <el-container class="home">
      <el-header>
        <Header @quit="handleQuit" @collapse="handleCollapse"></Header>
      </el-header>
      <el-container>
        <el-aside  v-bind:style="{width:asideWidth+'px'}">
          <Aside></Aside>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
<!--    <el-container>-->
<!--      <el-container style="width: 15px">-->
<!--        <el-aside  v-bind:style="{width:asideWidth+'px'}">-->
<!--          <Aside></Aside>-->
<!--        </el-aside>-->
<!--      </el-container>-->
<!--      <el-container>-->
<!--        <el-header>-->
<!--          <Header @quit="handleQuit" @collapse="handleCollapse"></Header>-->
<!--        </el-header>-->
<!--        <el-main>Main</el-main>-->
<!--      </el-container>-->
<!--    </el-container>sssss-->
<!--    <el-container class="home">-->
<!--      <el-header>-->
<!--        <Header @quit="handleQuit"></Header>-->
<!--      </el-header>-->
<!--      <el-container class="body">-->
<!--        -->
<!--        <el-container>-->
<!--          <el-main>Main</el-main>-->
<!--          <el-footer>Footer</el-footer>-->
<!--        </el-container>-->
<!--      </el-container>-->
<!--    </el-container>-->
  </div>
</template>

<script>
import Header from './components/Header'
import Aside from './components/Aside'
export default {
  name: 'Home',
  components: {
    Header,
    Aside
  },
  data () {
    return {
      asideWidth: 200
    }
  },
  methods: {
    handleQuit () {
      this.$router.push('/')
    },
    handleCollapse (isCollapse) {
      if (isCollapse) {
        this.asideWidth = 64
      } else {
        this.asideWidth = 200
      }
    }
  }
}
</script>

<style scoped>
  .home>>>.el-header {
    padding: 0px;
  }
</style>
