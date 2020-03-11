<template>
  <el-form :rules="rules" :model="spu" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="spu.title" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="副标题">
      <el-input v-model="spu.subTitle" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="价格">
      <el-input v-model="spu.price" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="现价">
      <el-input v-model="spu.nowPrice" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="分类">
      <el-select v-model="spu.categoryId" placeholder="请选择分类">
        <template v-for="item in categorys">
          <el-option v-if="item.pid != 0" :index="item.index" :key="item.index" :label="item.name" :value="item.id"></el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="状态">
      <el-switch
        class="status"
        style="display: block"
        v-model="spu.status"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="上线"
        inactive-text="下线"
        :active-value="1"
        :inactive-value="0"
      ></el-switch>
    </el-form-item>
    <el-form-item label="主图">
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
    <el-form-item label="轮播图">
      <el-upload
        action="/api/shop_user/goods/file/upload"
        list-type="picture-card"
        :file-list="fileList"
        :on-preview="handlePictureCardPreview"
        :on-success="handleBannerSuccess"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>
    <el-form-item label="标签">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </el-form-item>
    <el-form-item label="规格">
      <el-select v-model="spu.specIds" multiple placeholder="请选择">
        <el-option
          v-for="item in specs"
          :key="item.specId"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="描述" prop="remark">
      <el-input v-model="spu.remark" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button v-if="this.edit"  type="primary" @click="handleEdit()">立即修改</el-button>
      <el-button v-else type="primary" @click="handleAdd()">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Category from '../../../sdk/api/category'
import Spec from '../../../sdk/api/spec'
import Spu from '../../../sdk/api/spu'
export default {
  name: 'AddSpu',
  props: {
    edit: Object
  },
  data () {
    return {
      categorys: [],
      spu: {},
      dialogImageUrl: '',
      imagesUrl: '',
      dialogVisible: false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      specs: [],
      banners: new Map(),
      fileList: [],
      rules: {
        null: [{required: true, message: '不能为空', trigger: 'change'}]
      }
    }
  },
  methods: {
    // 添加
    handleAdd () {
      let tempBanners = []
      for (let value of this.banners.values()) {
        tempBanners.push(value)
      }
      Spu.save({
        title: this.spu.title,
        subTitle: this.spu.subTitle,
        price: this.spu.price,
        nowPrice: this.spu.nowPrice,
        categoryId: this.spu.categoryId,
        status: this.spu.status,
        images: this.spu.images,
        bannerImgs: JSON.stringify(tempBanners),
        tages: JSON.stringify(this.dynamicTags),
        specIds: JSON.stringify(this.spu.specIds),
        remark: this.spu.remark,
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
      let tempBanners = []
      for (let value of this.banners.values()) {
        tempBanners.push(value)
      }
      Spu.update({
        id: this.spu.id,
        title: this.spu.title,
        subTitle: this.spu.subTitle,
        price: this.spu.price,
        nowPrice: this.spu.nowPrice,
        categoryId: this.spu.categoryId,
        status: this.spu.status,
        images: this.spu.images,
        bannerImgs: JSON.stringify(tempBanners),
        tages: JSON.stringify(this.dynamicTags),
        specIds: JSON.stringify(this.spu.specIds),
        remark: this.spu.remark,
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
      this.spu.images = res
      this.imagesUrl = '/api/shop_user/goods/file/down?fileId=' + res
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
    // 轮播图上传成功
    handleBannerSuccess (res, file) {
      this.banners.set(file.name, res)
      this.$message({
        message: file.name + '上传成功',
        type: 'success'
      })
    },
    // 轮播图
    handleRemove (file, fileList) {
      this.banners.delete(file.name)
    },
    // 轮播图
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  },
  created () {
    if (this.edit) {
      let url = '/api/shop_user/goods/file/down?fileId='
      this.spu = this.edit
      this.dynamicTags = JSON.parse(this.edit.tages)
      this.spu.specIds = JSON.parse(this.edit.specIds)
      this.imagesUrl = url + this.edit.images
      let banners = JSON.parse(this.edit.bannerImgs)
      for (let i = 0, len = banners.length; i < len; i++) {
        let unit = {
          name: i + '.png',
          url: url + banners[i]
        }
        this.fileList.push(unit)
        this.banners.set(unit.name, banners[i])
      }
    }
    Category.queryAll({
      onSuccess: (code, res) => {
        this.categorys = res
      },
      onFailure: (code, err) => {
        this.$message.error(err)
      }
    })
    Spec.queryAll({
      onSuccess: (code, res) => {
        this.specs = res
      },
      onFailure: (code, err) => {
        this.$message.error(err)
      }
    })
  },
  watch: {
    edit () {
      console.log('watch watch watch')
      this.spu = this.edit
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
