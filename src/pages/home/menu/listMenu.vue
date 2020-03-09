<template>
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
      width="200">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleClick(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleClick(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Category from '../../../sdk/api/category'
export default {
  name: 'listMenu',
  methods: {
    handleClick (row) {
      console.log(row)
    },
    statusChange (row) {
      Category.changStatus({
        id: row.id,
        status: row.status,
        onSuccess: (code, res) => {
          console.log(code)
          console.log(res)
          this.$message({
            message: res,
            type: 'success'
          })
        },
        onFailure: (code, err) => {
          this.$message.error(err)
        }
      })
    }
  },

  data () {
    return {
      tableData: []
    }
  },
  created: function () {
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
  }
}
</script>
