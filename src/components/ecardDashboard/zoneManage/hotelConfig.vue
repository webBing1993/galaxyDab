<!--酒店配置列表-->
<template>
  <el-container class="ocontainer " >
    <el-header class="oheader" style="height: 4rem;">
      <h2 style="font-weight: bold">
        酒店配置
        <el-button type="success" style="float: right" @click="goto('addHotelConfig/new')">新建</el-button>
      </h2>
    </el-header>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%;flex: none;margin-bottom: 3rem"
    >
      <el-table-column
        prop="name"
        label="酒店名称">
      </el-table-column>
      <el-table-column
        prop="hotelType"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市">
      </el-table-column>
      <el-table-column
        prop="onlineTimeStr"
        label="上线日期">
      </el-table-column>
      <el-table-column
        prop="outOfServiceStr"
        label="停用日期">
      </el-table-column>
      <el-table-column
        prop="devNum"
        label="设备点数"
      >
      </el-table-column>
      <el-table-column
        label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="goto('addHotelConfig/'+scope.row.id)">查看详情</el-button>
          <el-button type="text" size="small"  @click="goto('zoneAndDevice')">管理空间和设备点</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      v-show="total > size"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-container>
</template>
<script>
  import rolelistUrl from '../../../common.js'
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        page: 1,
        size: 10,
        total: 0,
        tableData: [],
        hotelName:''
      }
    },
    computed: {

    },
    methods: {
      ...mapActions([
        'getHotelConfigList'
      ]),
      ...mapMutations(['SELECTMODULE']),

      handleSizeChange(val) {
        console.log(val)
        this.size = val;
        this.getList();
      },
      handleCurrentChange(val) {
        console.log('zsj:',val)
        this.page = val;
        this.getList();
      },
      // setStyle(row, rowIndex){
      //     console.log(row)
      //     if(row.rowIndex===1){
      //         console.log(777)
      //         return 'headerBg'
      //     }
      // }
      getList(){
        this.getHotelConfigList({
          page: this.page.toString(),
          num: this.size.toString(),
          name:this.hotelName,
          onsuccess: (body, headers) => {
            this.total = body.data.nums;
            console.log('list:',body.data)
            this.tableData=body.data.list
          }
        })
      }
    },
    mounted(){
      // this.SELECTMODULE('ecard');
      this.getList()
    }

  }
</script>
<style lang="less" scoped>

  .ocontainer{
    background-color: #ffffff;
    padding-left: 3rem;
    padding-right: 3rem;
    overflow: scroll;
    .el-table{

      .headerBg{
        background-color: #ee5427;
      }

    }

  }




</style>
