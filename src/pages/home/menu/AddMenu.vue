<template>
  <el-form ref="menuForm" :rules="rules" :model="menu" label-width="80px">
    <el-form-item label="上级菜单" prop="pid">
      <el-select v-model="menu.pid" placeholder="请选择上级菜单">
        <el-option label="一级菜单" value="0"></el-option>
        <template v-for="item in pids">
          <el-option :index="item.index" :key="item.index" :label="item.name" :value="item.id"></el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="menu.name" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input v-model="menu.sort" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="图片">
      <el-upload
        class="avatar-uploader"
        action="/api/shop_goods/file/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imagesUrl" :src="imagesUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="描述" prop="remark">
      <el-input v-model="menu.remark" style="width: 30vh"></el-input>
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
        :active-value="1"
        :inactive-value="0"
      ></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button v-if="this.edit"  type="primary" @click="editMenu()">立即修改</el-button>
      <el-button v-else type="primary" @click="addMenu()">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Category from '../../../sdk/api/category'
export default {
  name: 'AddMenu',
  props: {
    edit: Object
  },
  data () {
    return {
      menu: {status: '1'},
      pids: [],
      rules: {
        pid: [{required: true, message: '请选择上级菜单', trigger: 'change'}],
        name: [{required: true, message: '请填写名称', trigger: 'change'}]
      }
    }
  },
  methods: {
    // 添加菜单
    addMenu () {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          Category.addMenu({
            pid: this.menu.pid,
            name: this.menu.name,
            sort: this.menu.sort,
            images: this.menu.images,
            remark: this.menu.remark,
            status: this.menu.status,
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
    editMenu () {
      console.log(this.menu)
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          Category.update({
            id: this.menu.id,
            pid: this.menu.pid,
            name: this.menu.name,
            sort: this.menu.sort,
            images: this.menu.images,
            remark: this.menu.remark,
            status: this.menu.status,
            onSuccess: (code, res) => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$emit('onEdit')
            },
            onFailure: (code, err) => {
              this.$message.error(err)
              this.$emit('onEdit')
            }
          })
        } else {
          this.$message({
            message: '修改失败',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 图片上传成功
    handleAvatarSuccess (res, file) {
      this.menu.images = res
    },
    // 图片上传之前
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  },
  // created 生命周期
  created () {
    if (this.edit) {
      this.menu = this.edit
    }
    Category.queryByPid({
      pid: 0,
      onSuccess: (code, res) => {
        this.pids = res
      },
      onFailure: (code, err) => {
        console.log(code)
        console.log(err)
      }
    })
  },
  // 计算
  computed: {
    imagesUrl () {
      if (this.menu.images) {
        return '/api/shop_goods/file/down?fileId=' + this.menu.images
      }
      return ''
    }
  },
  watch: {
    edit () {
      this.menu = this.edit
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
