<template>
  <el-form :model="sku" label-width="80px">
    <el-form-item label="spu">
      <el-select v-model="sku.spu" v-if="this.edit" disabled placeholder="spu" style="width: 25vh" @change="handleSpuChange">
        <template v-for="item in spus">
          <el-option :index="item.index" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </template>
      </el-select>
      <el-select v-model="sku.spu" v-else placeholder="spu" style="width: 25vh" @change="handleSpuChange">
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
        action="/api/shop_goods/file/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imagesUrl" :src="imagesUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <template v-for="(value,index) in specs">
      <el-form-item :label="value.name" :key="index">
        <el-select v-model="specsItme[index]" placeholder="规格值" style="width: 25vh">
          <template v-for="item in value.values">
            <el-option :index="item.index" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </template>
        </el-select>
      </el-form-item>
    </template>
    <el-form-item>
      <el-button v-if="this.edit"  type="primary" @click="handleEdit()">立即修改</el-button>
      <el-button v-else type="primary" @click="handleAdd()">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Spu from '../../../sdk/api/spu'
import Sku from '../../../sdk/api/sku'
import Spec from '../../../sdk/api/spec'
export default {
  name: 'AddSku',
  props: {
    edit: Object
  },
  data () {
    return {
      sku: {
        price: 0,
        stock: 1,
        status: 1
      },
      specs: [],
      specsItme: [],
      spus: [],
      imagesUrl: ''
    }
  },
  methods: {
    // 添加
    handleAdd () {
      let specIdsTemp = []
      for (let i = 0; i < this.specsItme.length; i++) {
        let item = {
          key: this.specs[i].name,
          value: this.specsItme[i]
        }
        specIdsTemp.push(item)
      }
      Sku.save({
        spu: this.sku.spu,
        price: this.sku.price,
        code: this.sku.code,
        stock: this.sku.stock,
        status: this.sku.status,
        images: this.sku.images,
        specIds: JSON.stringify(specIdsTemp),
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
      let specIdsTemp = []
      for (let i = 0; i < this.specsItme.length; i++) {
        let item = {
          key: this.specs[i].name,
          value: this.specsItme[i]
        }
        specIdsTemp.push(item)
      }
      Sku.update({
        id: this.sku.id,
        spu: this.sku.spu,
        price: this.sku.price,
        code: this.sku.code,
        stock: this.sku.stock,
        status: this.sku.status,
        images: this.sku.images,
        specIds: JSON.stringify(specIdsTemp),
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
    },
    // spu改变时
    handleSpuChange (val) {
      this.specsItme = []
      let specIds = JSON.parse(this.spus.filter(item => item.id === val)[0].specIds)
      this.changSpecIds(specIds)
    },
    // specIds改变时
    changSpecIds (specIds) {
      // eslint-disable-next-line no-array-constructor
      let specs = new Array()
      for (let i = 0; i < specIds.length; i++) {
        Spec.queryBySpecId({
          specId: specIds[i],
          onSuccess: (code, res) => {
            if (code === 2000 && res) {
              specs.push(res)
            }
          },
          onFailure: (code, err) => {
            this.$message.error(err)
          }
        })
      }
      this.specs = specs
    },
    // 图片上传成功
    handleAvatarSuccess (res, file) {
      this.sku.images = res
      this.imagesUrl = '/api/shop_goods/file/down?fileId=' + this.sku.images
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
      this.specsItme = []
      this.sku = this.edit
      let specIds = JSON.parse(this.edit.editSpecIds)
      this.changSpecIds(specIds)
    }
  },
  watch: {
    edit () {
      this.specsItme = []
      this.refresh()
      this.sku = this.edit
      let specIds = JSON.parse(this.edit.editSpecIds)
      this.changSpecIds(specIds)
    }
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
