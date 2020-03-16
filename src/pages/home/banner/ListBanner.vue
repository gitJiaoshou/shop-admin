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
        <add-banner :edit="editForm" @onEdit="handleOnEdit()"></add-banner>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Banner from '../../../sdk/api/banner'
import AddBanner from './AddBanner'
export default {
  name: 'ListBanner',
  components: {
    AddBanner
  },
  methods: {
    // 刷新表单
    refresh () {
      Banner.queryAll({
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
      Banner.delete({
        id: row.id,
        onSuccess: (code, res) => {
          this.$message({
            message: res,
            type: 'success'
          })
          this.refresh({pid: 0})
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
