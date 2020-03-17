<template>
  <el-form :rules="rules" :model="bodyBanner" label-width="80px">
    <el-form-item label="菜单">
      <el-select v-model="bodyBanner.categoryId" placeholder="菜单" style="width: 25vh">
        <template v-for="item in categoryIds">
          <el-option v-if="item.pid !=0" :index="item.id" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="标题" prop="remark">
      <el-input v-model="bodyBanner.title" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="主图">
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
      <el-input v-model="bodyBanner.remark" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button v-if="this.edit"  type="primary" @click="handleEdit()">立即修改</el-button>
      <el-button v-else type="primary" @click="handleAdd()">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import BodyBanner from '../../../sdk/api/bodyBanner'
import Category from '../../../sdk/api/category'
export default {
  name: 'AddBodyBanner',
  props: {
    edit: Object
  },
  data () {
    return {
      bodyBanner: {},
      imagesUrl: '',
      categoryIds: [],
      rules: {
        null: [{required: true, message: '不能为空', trigger: 'change'}]
      }
    }
  },
  methods: {
    // 添加
    handleAdd () {
      BodyBanner.save({
        images: this.bodyBanner.images,
        title: this.bodyBanner.title,
        categoryId: this.bodyBanner.categoryId,
        remark: this.bodyBanner.remark,
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
    },
    // 编辑
    handleEdit () {
      BodyBanner.update({
        id: this.bodyBanner.id,
        images: this.bodyBanner.images,
        title: this.bodyBanner.title,
        categoryId: this.bodyBanner.categoryId,
        remark: this.bodyBanner.remark,
        onSuccess: (code, res) => {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        },
        onFailure: (code, err) => {
          this.$message.error(err)
        }
      })
      this.$emit('onEdit')
    },
    // 图片上传成功
    handleAvatarSuccess (res, file) {
      this.bodyBanner.images = res
      this.imagesUrl = '/api/shop_goods/file/down?fileId=' + res
      this.$message({
        message: file.name + '上传成功',
        type: 'success'
      })
    },
    // 图片上传之前
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    // 刷新
    refresh () {
      // 查询所有Category
      Category.queryAll({
        onSuccess: (code, res) => {
          this.categoryIds = res
        },
        onFailure: (code, err) => {
          this.$message.error(err)
        }
      })
    }
  },
  created () {
    this.refresh()
    if (this.edit) {
      let url = '/api/shop_goods/file/down?fileId='
      this.bodyBanner = this.edit
      this.imagesUrl = url + this.edit.images
    }
  },
  watch: {
    edit () {
      console.log('watch watch watch')
      let url = '/api/shop_goods/file/down?fileId='
      this.imagesUrl = url + this.edit.images
      this.bodyBanner = this.edit
      console.log('this.edit:', this.edit)
      console.log('this.banner:', this.bodyBanner)
      this.refresh()
    }
  }
}
</script>

<style scoped>
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
