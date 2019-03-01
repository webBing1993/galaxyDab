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
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>
<script>
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
      }
    }
    .userListDetails_bottom{
      padding:0 20px 0 20px;
    }

  }
</style>
