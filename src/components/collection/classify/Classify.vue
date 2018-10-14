<template>
  <div>
    <el-row>
      <el-button type="success" class="addClassify" @click="addClassify">添加分类</el-button>
      <div class="searchname">
        <el-input placeholder="请输入名称" v-model="searchName" class="writeName" clearable @keydown.native.enter="initlist">
        </el-input>
        <el-button type="success" class="search" @click="initlist">搜索</el-button>
      </div>
    </el-row>
    <el-table class="margin-20" v-loading="loading" :data="classifyList" border style="width: 100%">
      <el-table-column type="index" :index="typeIndex" label="编号" width="80">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="400">
      </el-table-column>
      <el-table-column prop="sort" label="排序">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="editClassify(scope.row)" type="text" size="small">
            编辑
          </el-button>
          <el-button class="deleteall" @click="deleteClassify(scope.row)" type="text" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分类弹框 -->
    <el-dialog title="添加分类" :visible.sync="addClassifyDialog">
      <el-form :model="addClassifyForm" :rules="rules" ref="addClassifyForm">
        <el-form-item label="名称" label-width="120px" prop="classifyName">
          <el-input v-model="addClassifyForm.classifyName" placeholder="请输入分类名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" label-width="120px" prop="classifySort">
          <el-input v-model.number="addClassifyForm.classifySort" placeholder="请输入排序，如1，2，3" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="CancelAddClassifyDialog">取 消</el-button>
        <el-button type="primary" @click="SureAddClassifyDialog('addClassifyForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑分类弹框 -->
    <el-dialog title="编辑" :visible.sync="editClassifyDialog">
      <el-form :model="editClassifyForm" :rules="rules" ref="editClassifyForm">
        <el-form-item label="名称" label-width="120px" prop="editclassifyName">
          <el-input v-model="editClassifyForm.editclassifyName" placeholder="请输入分类名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" label-width="120px" prop="editclassifySort">
          <el-input v-model.number="editClassifyForm.editclassifySort" placeholder="请输入排序，如1，2，3" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="CancelEditClassifyDialog">取 消</el-button>
        <el-button type="primary" @click="SureEditClassifyDialog('editClassifyForm')">确 定</el-button>
      </div>
    </el-dialog>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
        :page-sizes="[5, 10, 20, 20]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
      total: 0,
      pagesize: 5,
      pagenum: 1,
      userlist: '',
      loading: false,
      searchName: '',
      addClassifyDialog: false,
      editClassifyDialog: false,
      editId: '',
      addClassifyForm: {
        classifyName: '',
        classifySort: ''
      },
      editClassifyForm: {
        editclassifyName: '',
        editclassifySort: ''
      },
      classifyList: [],
      rules: {
        classifyName: [
          {
            required: true,
            message: '请输入用户名称',
            trigger: 'blur'
          }
        ],
        classifySort: [
          {
            required: true,
            type: 'number',
            message: '请输入排序并且为数值类型',
            trigger: 'blur'
          }
        ],
        editclassifyName: [
          {
            required: true,
            message: '请输入用户名称',
            trigger: 'blur'
          }
        ],
        editclassifySort: [
          {
            required: true,
            type: 'number',
            message: '请输入排序并且为数值类型',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.initlist()
  },
  methods: {
    // 分页用到的方法
    handleSizeChange (val) {
      this.pagesize = val
      this.initlist()
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.page = val
      // console.log(`当前页: ${val}`)
      this.initlist()
    },
    // 列表渲染
    initlist () {
      this.axios
        .post(
          `http://qa.fortrun.cn:8121/discoveryCatalog/page/${
            this.pagenum
          }?pageSize=${this.pagesize}&name=${this.searchName}`
        )
        .then(res => {
          if (res.status === 200) {
            // console.log(res)
            // console.log(1)
            this.classifyList = res.data.data.items
            this.total = res.data.data.totalNum
            this.$store.commit('getAddclassifyData', res.data.data.items)
            // console.log(this.$store.state.addClaData)
          }
        })
    },
    // 添加分类方法
    addClassify () {
      this.addClassifyDialog = true;
    },
    // 删除分类方法
    deleteClassify (row) {
      this.initlist()
      // console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // console.log(row.id);
          this.axios
            .post(
              `http://qa.fortrun.cn:8121/discoveryCatalog/delete?id=${row.id}`
            )
            .then(res => {
              // console.log(res)
              if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.initlist()
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    CancelAddClassifyDialog () {
      this.addClassifyDialog = false
    },
    SureAddClassifyDialog (formname) {
      this.$refs[formname].validate(valide => {
        if (valide) {
          this.axios
            .post(
              `http://qa.fortrun.cn:8121/discoveryCatalog/save?name=${
                this.addClassifyForm.classifyName
              }&sort=${this.addClassifyForm.classifySort}`
            )
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '添加失败',
                  type: 'error'
                })
              }
              this.addClassifyDialog = false
              this.initlist()
            })
        }
      })
    },
    // 编辑分类方法
    editClassify (row) {
      // console.log(row)
      this.editId = row.id
      this.editClassifyDialog = true
      this.editClassifyForm.editclassifyName = row.name
      this.editClassifyForm.editclassifySort = row.sort
    },
    CancelEditClassifyDialog () {
      this.editClassifyDialog = false
    },
    SureEditClassifyDialog (formname) {
      this.$refs[formname].validate(valide => {
        if (valide) {
          this.axios
            .post(
              `http://qa.fortrun.cn:8121/discoveryCatalog/update?id=${
                this.editId
              }&name=${this.editClassifyForm.editclassifyName}&sort=${
                this.editClassifyForm.editclassifySort
              }`
            )
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '修改失败',
                  type: 'error'
                })
              }
              this.editClassifyDialog = false
              this.initlist()
            })
        }
      })
    },
    typeIndex (index) {
      return index + (this.pagenum - 1) * this.pagesize + 1
    }
  }
}
</script>
<style lang="less" scoped>
.el-row {
  position: relative;
  margin-bottom: 20px;

  .addclassify {
    background: #00cd78 !important;
  }

  .searchname {
    position: absolute;
    top: 0px;
    right: 20px;

    .search {
      background: #2574ed !important;
    }

    .writeName {
      width: 200px;
    }
  }
}
.deleteall {
  color: red;
}
</style>
