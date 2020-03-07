<template>
  <el-form ref="menuForm" :rules="rules" :model="menu" label-width="80px">
    <el-form-item label="上级菜单" prop="pid">
      <el-select v-model="menu.pid" placeholder="请选择上级菜单">
        <el-option label="一级菜单" value="0"></el-option>
        <template>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="menu.name" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="order">
      <el-input v-model="menu.order" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="desc">
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
        inactive-value="0"
      ></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addMenu()">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Category from '../../../sdk/api/category'
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
      },
      rules: {
        pid: [{ required: true, message: '请选择上级菜单', trigger: 'change' }],
        name: [{ required: true, message: '请填写名称', trigger: 'change' }]
      }
    }
  },
  methods: {
    addMenu () {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          console.log('sss')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created: function () {
    Category.queryByPid({
      pid: 0,
      onSuccess: (code, res) => {
      },
      onFailure: (code, err) => {
      }
    })
  }
}
</script>

<style scoped>
.status {
  padding-top: 0.8vh;
}
</style>
