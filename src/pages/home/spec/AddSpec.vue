<template>
  <el-form ref="menuForm" :rules="rules" :model="spec" label-width="80px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="spec.name" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="单位">
      <el-input v-model="spec.unit" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="spec.desc" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button v-if="this.edit"  type="primary" @click="handleEdit()">立即修改</el-button>
      <el-button v-else type="primary" @click="handleAdd()">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Spec from '../../../sdk/api/spec'
export default {
  name: 'AddSpec',
  props: {
    edit: Object
  },
  data () {
    return {
      spec: {},
      rules: {
        name: [{required: true, message: '请填写名称', trigger: 'change'}]
      }
    }
  },
  methods: {
    // 添加
    handleAdd () {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          Spec.save({
            name: this.spec.name,
            unit: this.spec.unit,
            remark: this.spec.remark,
            onSuccess: (code, res) => {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            },
            onFailure: (code, err) => {
              this.$message.error(err)
            }
          })
        } else {
          this.$message({
            message: '请检查内容',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 修改
    handleEdit () {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          Spec.update({
            specId: this.spec.specId,
            name: this.spec.name,
            unit: this.spec.unit,
            remark: this.spec.remark,
            onSuccess: (code, res) => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            },
            onFailure: (code, err) => {
              this.$message.error(err)
            }
          })
          this.$emit('onEdit')
        } else {
          this.$message({
            message: '请检查内容',
            type: 'warning'
          })
          return false
        }
      })
    }
  },
  // created 生命周期
  created () {
    if (this.edit) {
      this.spec = this.edit
    }
  },
  // 监听
  watch: {
    edit () {
      this.spec = this.edit
    }
  }
}
</script>

<style scoped>
</style>
