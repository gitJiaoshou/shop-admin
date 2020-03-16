<template>
  <el-form :rules="rules" :model="banner" label-width="80px">
    <el-form-item label="spu">
      <el-select v-model="banner.spu" placeholder="spu" style="width: 25vh">
        <template v-for="item in spus">
          <el-option :index="item.index" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </template>
      </el-select>
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
      <el-input v-model="banner.remark" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button v-if="this.edit"  type="primary" @click="handleEdit()">立即修改</el-button>
      <el-button v-else type="primary" @click="handleAdd()">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Banner from '../../../sdk/api/banner'
import Spu from '../../../sdk/api/spu'
export default {
  name: 'AddBanner',
  props: {
    edit: Object
  },
  data () {
    return {
      banner: {},
      imagesUrl: '',
      spus: [],
      rules: {
        null: [{required: true, message: '不能为空', trigger: 'change'}]
      }
    }
  },
  methods: {
    // 添加
    handleAdd () {
      Banner.save({
        images: this.banner.images,
        spu: this.banner.spu,
        remark: this.banner.remark,
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
      Banner.update({
        id: this.banner.id,
        images: this.banner.images,
        spu: this.banner.spu,
        remark: this.banner.remark,
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
      this.banner.images = res
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
      // 查询大小
      Spu.size({
        onSuccess: (code, res) => {
          // 获取全量数据
          Spu.page({
            index: 0,
            limit: res,
            onSuccess: (code, res) => {
              this.spus = res
            },
            onFailure: (code, err) => {
              this.$message.error(err)
            }
          })
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
      this.banner = this.edit
      this.imagesUrl = url + this.edit.images
    }
  },
  watch: {
    edit () {
      console.log('watch watch watch')
      let url = '/api/shop_goods/file/down?fileId='
      this.imagesUrl = url + this.edit.images
      this.banner = this.edit
      console.log('this.edit:', this.edit)
      console.log('this.banner:', this.banner)
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
