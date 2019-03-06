<template>
  <div class="userListDetails">
    <div class="userListDetails_top">
      <div class="userListDetails_top_child">
       <el-input v-model="inputUser" placeholder="请输入员工名" class="searchInput"></el-input>
      </div>
      <div class="userListDetails_top_child">
       <el-button type="success" class="searchButton">搜索</el-button>
      </div>
    </div>
    <div class="userListDetails_bottom">
     <el-table
      :data="tableData"
      border>
      <el-xtable-column
        prop="date"
        label="账号"
        width="180">
      </el-xtable-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="手机号">
      </el-table-column>
       <el-table-column
         prop="address"
         label="部门">
       </el-table-column>
       <el-table-column
         prop="address"
         label="职务">
       </el-table-column>
       <el-table-column
         prop="address"
         label="企业微信凭证">
       </el-table-column>
       <el-table-column
         prop="address"
         label="角色">
       </el-table-column>
    </el-table>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    data(){
      return{
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        inputUser:''
      }
    },
    methods:{
      ...mapActions([
        'searchUserListDetails',
      ]),
      initList(){
        this.searchUserListDetails({
          "name":this.inputUser,
          "page":'1',
          "pagesize":'10',
          onsuccess: (body,headers) => {
            console.log('测试成功数据',body)
          }
        })
      }
    },
    mounted(){
      this.initList()
    }
  }
</script>
<style lang="less" scoped>
  .userListDetails{
    .userListDetails_top{
      display: flex;
      margin:50px 0 20px 0;
      .searchInput{
        margin:0 20px 0 20px;
      }
      .searchButton{
        width:100px;
        margin-left:50px;
      }
    }
    .userListDetails_bottom{
      padding:0 20px 0 20px;
    }

  }
</style>
