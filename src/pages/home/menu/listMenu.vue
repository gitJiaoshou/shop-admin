<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="id"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sort"
      label="排序"
      width="120">
    </el-table-column>
    <el-table-column
      prop="remark"
      label="描述"
      width="120">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="300">
      <template slot-scope="scope">
        <el-switch
          class="status"
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
      </template>

    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
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
