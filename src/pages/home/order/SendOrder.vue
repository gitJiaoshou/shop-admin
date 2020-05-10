<template>
  <div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="订单号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="totalPrice"
          label="总价"
          width="200">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="购买时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="payType"
          label="支付方式"
          width="400">
          <template slot-scope="scope">
            <p v-if="scope.row.payType === 0"> 微信</p>
            <p v-else>支付宝</p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-truck"
              circle
              @click="sendHandle(scope.row)">
            </el-button>
            <el-button
              type="primary"
              icon="el-icon-search"
              circle
              @click="searchHandle(scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog title="发货" :visible.sync="sendVisible" width="50%">
        <el-form :model="sendForm" label-width="80px">
          <el-form-item label="订单号" prop="name">
            <el-input v-model="sendForm.order" :disabled="true" style="width: 30vh"></el-input>
          </el-form-item>
          <el-form-item label="快递号码" prop="sort">
            <el-input v-model="sendForm.code" style="width: 30vh" placeholder="格式为 运单号：手机后四位"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sendLogistic()">确认</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-dialog title="详情" :visible.sync="searchVisible" width="50%">
        <el-table
          :data="skus"
          style="width: 100%">
          <el-table-column
            fixed
            prop="id"
            label="id"
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
            prop="price"
            label="价格"
            width="200">
          </el-table-column>
          <el-table-column
            prop="code"
            label="商品编号"
            width="200">
          </el-table-column>
          <el-table-column
            prop="specIds"
            label="规格"
            width="200">
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Order from '../../../sdk/api/order'
import Sku from '../../../sdk/api/sku'
import Logistic from '../../../sdk/api/logistic'
export default {
  name: 'sendOrder',
  methods: {
    // 刷新表单
    refresh () {
      Order.queryOrder({
        status: 2,
        payStatus: 2,
        onSuccess: (code, res) => {
          this.tableData = res
        },
        onFailure: (code, err) => {
          console.log(code)
          console.log(err)
        }
      })
    },
    // 发送快递窗口
    sendHandle (row) {
      this.sendForm.order = row.id
      this.sendForm.receiver = row.ygwId
      this.sendVisible = true
    },
    // 查看订单详情
    searchHandle (row) {
      console.log(row)
      this.searchVisible = true
      Order.queryOsku({
        orderId: row.id,
        onSuccess: (code, res) => {
          let skusT = []
          for (let o of res) {
            console.log(o.sku)
            Sku.queryById({
              sku: o.sku,
              onSuccess: (code, res) => {
                skusT.push(res)
                this.skus = skusT
              },
              onFailure: (code, err) => {
                console.log(code)
                console.log(err)
              }
            })
          }
        },
        onFailure: (code, err) => {
          console.log(code)
          console.log(err)
        }
      })
    },
    // 快递入库
    sendLogistic () {
      console.log(this.sendForm)
      Logistic.logisticAdd({
        code: this.sendForm.code,
        order: this.sendForm.order,
        receiver: this.sendForm.receiver,
        onSuccess: (code, res) => {
          this.$message({
            message: res,
            type: 'success'
          })
          this.sendVisible = false
          this.sendForm = {}
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
      tableData: [],
      sendVisible: false,
      searchVisible: false,
      sendForm: {},
      skus: []
    }
  },
  created () {
    this.refresh()
  }
}
</script>
