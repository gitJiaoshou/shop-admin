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
          prop="code"
          label="编码"
          width="200">
        </el-table-column>
        <el-table-column
          prop="stock"
          label="库存"
          width="200">
        </el-table-column>
        <el-table-column
          prop="specIds"
          label="规格"
          width="200">
        </el-table-column>
        <el-table-column
          prop="images"
          label="主图"
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
          v-if="false"
          prop="editSpecIds"
          label="隐藏内容"
          width="200">
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
      <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
        <add-sku :edit="editForm" @onEdit="handleOnEdit()"></add-sku>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import AddSku from './AddSku'
import Sku from '../../../sdk/api/sku'
import Spu from '../../../sdk/api/spu'
export default {
  name: 'listSku',
  data () {
    return {
      tableData: [],
      pageTotal: 0,
      editVisible: false,
      editForm: {}
    }
  },
  components: {
    AddSku
  },
  methods: {
    // 刷新数据
    refresh ({index = 0}) {
      Sku.size({
        onSuccess: (code, res) => {
          this.pageTotal = res
        },
        onFailure: (code, err) => {
          this.$message.error(err)
        }
      })
      // eslint-disable-next-line no-unused-vars
      let skus = []
      Sku.page({
        index: index,
        limit: index + 10,
        onSuccess: (code, res) => {
          for (let sku of res) {
            // eslint-disable-next-line no-unused-vars
            let item = sku
            Spu.queryBySpuId({
              spu: sku.spu,
              onSuccess: (code, res) => {
                item.title = res.title
                item.subTitle = res.subTitle
                item.editSpecIds = res.specIds
                skus.push(item)
              },
              onFailure: (code, err) => {
                this.$message.error(err)
              }
            })
          }
          this.tableData = skus
        },
        onFailure: (code, err) => {
          this.$message.error(err)
        }
      })
    },
    // 修改状态
    statusChange (row) {
      Sku.status({
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
      Sku.delete({
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
