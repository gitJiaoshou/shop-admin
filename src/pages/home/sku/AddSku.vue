<template>
  <el-form :model="sku" label-width="80px">
    <el-form-item label="spu">
      <el-select v-model="sku.spu" placeholder="spu" style="width: 25vh" @change="handleSpuChange">
        <template v-for="item in spus">
          <el-option :index="item.index" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="价格">
      <el-input-number v-model="sku.price" :precision="2" :step="0.1" :min="0.10" style="width: 25vh"></el-input-number>
    </el-form-item>
    <el-form-item label="产品编码">
      <el-input v-model="sku.code" style="width: 25vh"></el-input>
    </el-form-item>
    <el-form-item label="库存">
      <el-input-number v-model="sku.stock" :precision="0" :min="1" style="width: 25vh"></el-input-number>
    </el-form-item>
    <el-form-item label="状态">
      <el-switch
        class="status"
        style="display: block"
        v-model="sku.status"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="上线"
        inactive-text="下线"
        :active-value="1"
        :inactive-value="0"
      ></el-switch>
    </el-form-item>
    <el-form-item label="图片">
      <el-upload
        class="avatar-uploader"
        action="/api/shop_user/goods/file/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imagesUrl" :src="imagesUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <template v-for="(value,index) in specs">
      <el-form-item :label="value" :key="index">
        <el-input v-model="specsItme[index]" style="width: 25vh"></el-input>
      </el-form-item>
    </template>
    <el-form-item>
      <el-button type="primary" @click="addSku()">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Spu from '../../../sdk/api/spu'
export default {
  name: 'AddSku',
  data () {
    return {
      sku: {
        price: 0,
        stock: 1,
        status: 1
      },
      specs: [],
      specsItme: [],
      spus: []
    }
  },
  methods: {
    addSku () {
      console.log(this.specsItme)
    },
    // spu改变时
    handleSpuChange (val) {
      this.specs = JSON.parse(this.spus.filter(item => item.id === val)[0].specIds)
    },
    // 图片上传成功
    handleAvatarSuccess (res, file) {
      this.sku.images = res
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
  // 计算
  computed: {
    imagesUrl () {
      if (this.sku.images) {
        return '/api/shop_user/goods/file/down?fileId=' + this.sku.images
      }
      return ''
    }
  },
  created () {
    Spu.size({
      onSuccess: (code, res) => {
        Spu.page({
          index: 0,
          limit: res,
          onSuccess: (code, res) => {
            this.spus = res
            console.log(this.spus)
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
}
</script>

<style scoped>
  .status {
    padding-left: 6vh;
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
</style>
