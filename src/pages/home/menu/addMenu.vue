<template>
  <el-form ref="form" :model="menu" label-width="80px">
    <el-form-item label="上级菜单">
      <el-select v-model="menu.pid" placeholder="请选择上级菜单">
        <el-option label="一级菜单" value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="menu.name" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="menu.order" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="menu.desc" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="状态">
      <el-switch
        class="status"
        style="display: block"
        v-model="menu.status"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="上线"
        inactive-text="下线"
        active-value="1"
        inactive-value="0">
      </el-switch>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'addMenu',
  data () {
    return {
      menu: {
        pid: '',
        name: '',
        order: '',
        desc: '',
        status: '1'
      }
    }
  }
}
</script>

<style scoped>
.status {
  padding-top: 0.8vh;
}
</style>
