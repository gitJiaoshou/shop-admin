<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="9">
          <div>
            <el-form ref="menuForm" label-width="10vh">
              <div style="height: 5vh"></div>
              <el-form-item label="specId">
                <el-input v-model="specId" disabled style="width: 20vh"></el-input>
              </el-form-item>
              <el-form-item label="规格名称">
                <el-input v-model="specName" disabled style="width: 20vh"></el-input>
              </el-form-item>
              <el-form-item label="规格值名称">
                <el-input v-model="specValueName" style="width: 20vh"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleAdd()">立即创建</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="15">
          <div>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="specId"
                label="specId"
                width="200">
              </el-table-column>
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
        </el-col>
      </el-row>
    </div>
    <div>
      <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
        <div>
          <el-form label-width="10vh">
            <div style="height: 5vh"></div>
            <el-form-item label="specId">
              <el-input v-model="editForm.specId" disabled style="width: 20vh"></el-input>
            </el-form-item>
            <el-form-item label="规格名称">
              <el-input v-model="specName" disabled style="width: 20vh"></el-input>
            </el-form-item>
            <el-form-item label="规格值名称">
              <el-input v-model="editForm.name" style="width: 20vh"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onHandleEdit()">立即创建</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import SpecValue from '../../../sdk/api/specValue'
export default {
  name: 'ListSpecValue',
  data () {
    return {
      specId: '',
      specValueName: '',
      specName: '',
      editForm: {},
      tableData: [],
      editVisible: false
    }
  },
  methods: {
    // 修改
    handleEdit (row) {
      this.editForm = row
      this.editVisible = true
    },
    // 删除
    handleDelete (row) {
      console.log('handleDelete', row)
      SpecValue.delete({
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
    // 添加
    handleAdd () {
      SpecValue.save({
        specId: this.specId,
        name: this.specValueName,
        onSuccess: (code, res) => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.refresh()
        },
        onFailure: (code, err) => {
          this.$message.error(err)
        }
      })
    },
    // 编辑
    onHandleEdit () {
      SpecValue.update({
        id: this.editForm.id,
        specId: this.editForm.specId,
        name: this.editForm.name,
        onSuccess: (code, res) => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.refresh()
        },
        onFailure: (code, err) => {
          this.$message.error(err)
        }
      })
      this.editVisible = false
      this.refresh()
    },
    // 刷新
    refresh () {
      SpecValue.queryBySpecId({
        specId: this.specId,
        onSuccess: (code, res) => {
          this.tableData = res
        },
        onFailure: (code, err) => {
          this.$message.error(err)
        }
      })
    }
  },
  // created 生命周期
  created () {
    this.specId = this.$route.query.specId
    this.specName = this.$route.query.name
  },
  watch: {
    specId () {
      if (this.specId.length > 0) {
        this.refresh()
      }
    }
  }
}
</script>
