<template>
  <div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位"
          width="200">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="描述"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-search"
              circle
              @click="handleSub(scope.row)">
            </el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.row)">
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
        <add-spec :edit="editForm" @onEdit="handleOnEdit()"></add-spec>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Spec from '../../../sdk/api/spec'
import AddSpec from './AddSpec'
export default {
  name: 'ListSpec',
  components: {
    AddSpec
  },
  methods: {
    // 刷新表单
    refresh () {
      Spec.queryAll({
        onSuccess: (code, res) => {
          this.tableData = res
        },
        onFailure: (code, err) => {
          console.log(code)
          console.log(err)
        }
      })
    },
    handleSub () {
    },
    // 编辑
    handleEdit (row) {
      this.editForm = row
      this.editVisible = true
    },
    // 修改成功
    handleOnEdit () {
      this.editVisible = false
      this.refresh({pid: 0})
    },
    // 删除
    handleDelete (row) {
      Spec.delete({
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
    this.refresh({pid: 0})
  }
}
</script>
