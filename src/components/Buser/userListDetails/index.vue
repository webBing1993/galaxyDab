<template>
  <div class="userListDetails">
    <div class="userListDetails_top">
      <div class="userListDetails_top_child">
       <el-input v-model="inputUser" placeholder="请输入员工名" class="searchInput" @keyup.enter.native="initList"></el-input>
      </div>
      <div class="userListDetails_top_child">
       <el-button type="success" class="searchButton" @click="initList">搜索</el-button>
      </div>
    </div>
    <div class="userListDetails_bottom">
     <el-table
      :data="tableData"
      border>
       <el-table-column
         prop="account"
         label="账号"
         width="180">
       </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号">
      </el-table-column>
       <el-table-column
         prop="orgName"
         label="所属酒店">
       </el-table-column>
       <el-table-column
         prop="position"
         label="职务">
       </el-table-column>
       <el-table-column
         prop="hasWechatWorkCredential"
         label="企业微信凭证">
       </el-table-column>
       <el-table-column
         prop="roleNames"
         label="角色">
       </el-table-column>
    </el-table>
      <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
                       :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total!=0">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    data(){
      return{
        tableData:[],
        inputUser:'',
        pagesize:10,
        pagenum:1,
        total: 0,

      }
    },
    methods:{
      ...mapActions([
        'searchUserListDetails',
      ]),
      handleSizeChange (val) {
        // console.log(`每页 ${val} 条`);
        this.pagesize = val
        this.initList()
      },
      handleCurrentChange (val) {
        this.pagenum = val
        // console.log(`当前页: ${val}`);
        this.initList()
      },
      initList(){
      this.inputUser = this.inputUser.replace(/\s*/g,"")
        this.searchUserListDetails({
          "page":this.pagenum,
          "pagesize":this.pagesize,
          "name":this.inputUser,
          onsuccess: (body,headers) => {
            if(body.errcode == "0"){
                body.data.list.forEach(item=>{
                  item.hasWechatWorkCredential =  (item.hasWechatWorkCredential == true)?'有':'无'
                })
                this.tableData = body.data.list
                this.total = body.data.total
            }
          }
        })
      }
    },
    mounted(){
      this.initList()
    },
    watch:{
      inputUser(newval){
        if(newval.length == 0){
           this.initList()
        }


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
        margin-left:50px;
      }
    }
    .userListDetails_bottom{
      padding:0 20px 0 20px;
    }

  }
</style>
