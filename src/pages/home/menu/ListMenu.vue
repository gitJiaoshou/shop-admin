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
          prop="name"
          label="名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          width="200">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="描述"
          width="200">
        </el-table-column>
        <el-table-column
          prop="images"
          label="图标"
          width="400">
          <template slot-scope="scope">
            <el-image
              style="width: 50%; height: 50%"
              :src="'/api/shop_user/goods/file/down?fileId='+scope.row.images">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="200">
          <template slot-scope="scope">
            <div  @click = "statusChange(scope.row)">
              <el-switch
                style="display: block"
                v-model="scope.row.status"
                name="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="上线"
                inactive-text="下线"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-search"
              circle
              @click="handleClick(scope.row)">
            </el-button>
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
        <add-menu :edit="editForm"></add-menu>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Category from '../../../sdk/api/category'
import AddMenu from './AddMenu'
export default {
  name: 'listMenu',
  components: {
    AddMenu
  },
  methods: {
    // 刷新表单
    refresh () {
      Category.queryByPid({
        pid: 0,
        onSuccess: (code, res) => {
          this.tableData = res
        },
        onFailure: (code, err) => {
          console.log(code)
          console.log(err)
        }
      })
    },
    handleClick (row) {
      console.log(row)
    },
    // 编辑
    editHandle (row) {
      this.editForm = row
      this.editVisible = true
    },
    // 修改
    saveEditHandle () {
    },
    // 删除
    deleteHandle (row) {
      Category.delete({
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
    },
    // 修改状态
    statusChange (row) {
      Category.changStatus({
        id: row.id,
        status: row.status,
        onSuccess: (code, res) => {
          this.$message({
            message: res,
            type: 'success'
          })
        },
        onFailure: (code, err) => {
          this.$message.error(err)
          this.refresh()
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
