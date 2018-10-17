<template>
  <div>
    <el-row>
      <el-button type="success" class="establish" @click="establishAdvertising">创建广告</el-button>
      <div class="searchname">
        <el-select v-model="value" placeholder="请选择分类">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input placeholder="请输入名称" v-model="wrname" class="writeName" clearable>
        </el-input>
        <el-button type="success" class="search" @click="initlist">搜索</el-button>
      </div>
    </el-row>
    <el-table :data="AdvertisingTableData" style="width: 100%"  v-loading="loading" ref="advertisForm" prop="adverForm">
      <el-table-column type="index" :index="typeIndex" label="编号" width="80">
      </el-table-column>
      <el-table-column prop="typeName" label="类别" width="100">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="100">
      </el-table-column>
      <el-table-column prop="picture" label="图片素材" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.picture" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="locationName" label="位置" width="80">
      </el-table-column>
      <el-table-column prop="contents" label="介绍内容">
        <template slot-scope="scope">
           <div v-html="scope.row.contents"></div>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="URL">
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="80">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="editAdvertising(scope.row)" type="text" size="small">
            编辑
          </el-button>
          <el-button class="deleteall" @click="deleteAdvertising(scope.row)" type="text" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
        :page-sizes="[5, 10, 15, 20]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
     </div>
   </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      changshi: '',
      total: 0,
      page: 1,
      pagesize: 5,
      pagenum: 1,
      loading: false,
      index: '1',
      wrname: '',
      value: '',
      options: [
        {
          value: '',
          label: ''
        },
        {
          value: '1',
          label: '官方广告'
        }
      ],
      AdvertisingTableData: []
    }
  },
  mounted() {
    this.initlist()
  },
  methods: {
    ...mapActions([
      'advertisinList',
      'deleteAdver'
    ]),
    fun (row) {
      // console.log(row.picture);
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val
      this.initlist()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.page = val
      // console.log(`当前页: ${val}`);
      this.initlist()
    },
    typeIndex (index) {
      return index + (this.page - 1) * this.pagesize + 1
    },
    // ...mapActions(["advertisingList"]),
    // 分页方法
    initlist () {
      this.loading = true
      var that = this
      this.advertisinList({
        name:this.wrname,
        pageSize:this.pagesize,
        pageNum:this.pagenum,
        onsuccess: (body,headers) => {
          if (body) {
             // console.log(headers["x-total"])
            this.AdvertisingTableData = body.data
            this.total = Number(headers['x-total'])
            this.loading = false
          } else {
          }
        }
      })
    },
    establishAdvertising () {
      this.$router.push({
        name: 'esadvertising'
      })
    },
    editAdvertising (row) {
      // console.log(row);
      this.$store.commit('geteData', row)
      this.$router.push({
        name: 'editAdvertising'
      })
    },
    deleteAdvertising (row) {
      // console.log(row);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteAdver({
            id: row.id,
            onsuccess: body => {
              console.log(body)
              if (body) {
                this.initlist();
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              } else {
              }
            }
          })
          // console.log(row.id);
          // this.axios
          //   .delete(
          //     `http://qa.fortrun.cn:9201/adv/delete/${row.id}`
          //   )
          //   .then(res => {
          //     // console.log(res);
          //     if (res.status === 200) {
          //       this.$message({
          //         type: 'success',
          //         message: '删除成功!'
          //       })
          //       this.initlist()
          //     }
          //   })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
<style lang="less" scoped>
.el-row {
  position: relative;
  margin-bottom: 20px;

  .establish {
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

.el-pagination {
  text-align: center;
  margin-top: 20px;
}

img {
  width: 100px;
  height: 100px;
}
.el-select {
  width: 200px;
  margin-right: 20px;
}
.deleteall {
  color: red;
}
</style>
