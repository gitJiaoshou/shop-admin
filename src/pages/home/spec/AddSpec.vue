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
        console.log('handleEdit')
        console.log(this.spec)
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
  .status {
    padding-top: 0.8vh;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 360px;
    height: 180px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
