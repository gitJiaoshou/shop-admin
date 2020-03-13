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
          prop="subTitle"
          label="副标题"
          width="200">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="200">
        </el-table-column>
        <el-table-column
          prop="nowPrice"
          label="现价"
          width="200">
        </el-table-column>
        <el-table-column
          prop="images"
          label="主图"
          width="400">
          <template slot-scope="scope">
            <el-image
              style="width: 50%; height: 50%"
              :src="'/api/shop_goods/file/down?fileId='+scope.row.images">
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
      <el-pagination
        class="pageBar"
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>
    <div>
      <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
        <add-spu :edit="editForm" @onEdit="handleOnEdit()"></add-spu>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import AddSpu from './AddSpu'
import Spu from '../../../sdk/api/spu'
export default {
  name: 'listMenu',
  data () {
    return {
      tableData: [],
      pageTotal: 0,
      editVisible: false,
      editForm: {}
    }
  },
  components: {
    AddSpu
  },
  methods: {
    // 刷新数据
    refresh ({index = 0}) {
      Spu.size({
        onSuccess: (code, res) => {
          this.pageTotal = res
        },
        onFailure: (code, err) => {
          this.$message.error(err)
        }
      })
      Spu.page({
        index: index,
        limit: index + 10,
        onSuccess: (code, res) => {
          this.tableData = res
        },
        onFailure: (code, err) => {
          this.$message.error(err)
        }
      })
    },
    // 修改状态
    statusChange (row) {
      Spu.status({
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
          this.refresh({index: 0})
        }
      })
    },
    // 编辑
    editHandle (row) {
      this.editForm = row
      this.editVisible = true
    },
    // 编辑
    handleOnEdit () {
      this.editVisible = false
      this.refresh({index: 0})
    },
    // 删除
    deleteHandle (row) {
      Spu.delete({
        id: row.id,
        onSuccess: (code, res) => {
          this.$message({
            message: res,
            type: 'success'
          })
          this.refresh({index: 0})
        },
        onFailure: (code, err) => {
          this.$message.error(err)
        }
      })
    },
    // 分页操作开始
    handleCurrentChange (val) {
      console.log('handleCurrentChange', val)
      let index = (val - 1) * 10
      this.refresh({index: index})
    }
  },
  created () {
    this.refresh({index: 0})
  }
}
</script>
<style scoped>
  .pageBar {
    float: right;
  }
</style>
