<template>
  <div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="id"
          width="200">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="200">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="描述"
          width="200">
        </el-table-column>
        <el-table-column
          prop="images"
          label="图片"
          width="400">
          <template slot-scope="scope">
            <el-image
              style="width: 50%; height: 50%"
              :src="'/api/shop_goods/file/down?fileId='+scope.row.images">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editHandle(scope.row)">
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteHandle(scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
        <add-body-banner :edit="editForm" @onEdit="handleOnEdit()"></add-body-banner>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import BodyBanner from '../../../sdk/api/bodyBanner'
import AddBodyBanner from './AddBodyBanner'
export default {
  name: 'ListBodyBanner',
  components: {
    AddBodyBanner
  },
  methods: {
    // 刷新表单
    refresh () {
      BodyBanner.queryAll({
        onSuccess: (code, res) => {
          this.tableData = res
        },
        onFailure: (code, err) => {
        }
      })
    },
    // 编辑
    editHandle (row) {
      this.editForm = row
      console.log('editHandle:', this.editForm)
      this.editVisible = true
    },
    // 修改成功
    handleOnEdit () {
      this.editVisible = false
      console.log('更新成功')
      this.refresh()
    },
    // 删除
    deleteHandle (row) {
      BodyBanner.delete({
        id: row.id,
        onSuccess: (code, res) => {
          this.$message({
            message: res,
            type: 'success'
          })
          this.refresh()
        },
        onFailure: (code, err) => {
          this.$message.error(err)
        }
      })
    }
  },
  data () {
    return {
      editForm: {},
      tableData: [],
      editVisible: false
    }
  },
  created () {
    this.refresh()
  }
}
</script>
