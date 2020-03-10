<template>
  <el-form :rules="rules" :model="spu" label-width="80px">
    <el-form-item label="标题" prop="null">
      <el-input v-model="spu.title" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="副标题" prop="null">
      <el-input v-model="spu.subTitle" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="价格" prop="null">
      <el-input v-model="spu.price" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="现价" prop="null">
      <el-input v-model="spu.nowPrice" style="width: 30vh"></el-input>
    </el-form-item>
    <el-form-item label="分类" prop="null">
      <el-select v-model="spu.categoryId" placeholder="请选择分类">
        <template v-for="item in categorys">
          <el-option :index="item.index" :key="item.index" :label="item.name" :value="item.id"></el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item>
<!--      <el-button v-if="this.edit"  type="primary" @click="handleEdit()">立即修改</el-button>-->
<!--      <el-button v-else type="primary" @click="handleAdd()">立即创建</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import Category from '../../../sdk/api/category'
export default {
  name: 'AddSpu',
  data () {
    return {
      categorys: [],
      spu: {},
      rules: {
        null: [{required: true, message: '不能为空', trigger: 'change'}]
      }
    }
  },
  methods: {
  },
  created () {
    Category.queryAll({
      onSuccess: (code, res) => {
        console.log(res)
      },
      onFailure: (code, err) => {
        this.$message.error(err)
      }
    })
  }
}
</script>

<style scoped>
</style>
