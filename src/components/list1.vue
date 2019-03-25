<template id="aaa">

  <el-container class="ocontainer">

    <el-header class="oheader" style="height: 30px;">

      <span class="oheader_span">运行设备</span>
    </el-header>
    <!-- <el-header class="oheader" style="height: 30px;">
         <theheader :theheaderone="theheaderone"></theheader>
   </el-header>-->

    <el-main class="ocontainer">
      <div style="height: 30px;">
        <el-checkbox label='设备mac地址' v-model='checked1' @click='change1'></el-checkbox>
        <el-checkbox label="酒店名字" v-model='checked2' @click='change2'></el-checkbox>
        <el-checkbox label="固件版本号" v-model='checked3' @click='change3'></el-checkbox>
        <el-checkbox label='生产批次' v-model='checked4' @click='change4'></el-checkbox>
        <el-checkbox label="设备类型" v-model='checked5' @click='change5'></el-checkbox>
        <el-checkbox label="电池余量" v-model='checked6' @click='change6'></el-checkbox>
        <el-checkbox label='设备状态' v-model='checked7' @click='change7'></el-checkbox>
        <el-checkbox label="设备属性" v-model='checked8' @click='change8'></el-checkbox>
      </div>

      <div class="opagination">
        <!--<span style="font-size:14px;float:left" v-show="n==1">设备列表 符合筛选条件的共（<i style="font-style: normal">{{nums}}</i>条）</span> -->
        <div class="block" style="clear:both">
          <span class="demonstration"></span>
          <el-pagination
            style="width: 200px;float: left;"
            background
            layout="total,sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 30, 40]"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-size='num'
            :total="nums"
            :page-count="total">
          </el-pagination>
        </div>

        <el-button style="float: right" type="primary" size="small" @click="dialogFormVisible = true">筛选</el-button>
        <router-link to="/list21"><el-button style="float:right;margin-right: 15px;display:none" type="primary" size="small">添加</el-button></router-link>

        <el-dialog title="筛选条件" :visible.sync="dialogFormVisible" style="overflow: auto;">
          <liste :notOnline='notOnline' @ievent = "ievent"></liste>
        </el-dialog>

      </div>
      <template>
        <el-table ref="multipleTable" :data="tableData3" stripe tooltip-effect="dark"  style="width: 100%;" :header-row-style="rowClass" v-loading='loading'>
          <el-table-column type="selection"  width="55"></el-table-column>
          <el-table-column  label="设备mac地址" prop="mac" width="120" v-if="checked1"></el-table-column>
          <el-table-column  prop="hotelName" label="酒店名字"  width="120" v-if='checked2'></el-table-column>
          <el-table-column  prop="hardwareVersion"  label="固件版本号" v-if='checked3'></el-table-column>
          <el-table-column  prop="productionBatch"  label="生产批次" v-if='checked4'></el-table-column>
          <el-table-column  prop="devType"  label="设备类型" v-if='checked5'></el-table-column>
          <el-table-column  prop="devElectricity"  label="电池余量" v-if='checked6'></el-table-column>
          <el-table-column  prop="devStatus"  label="设备状态" v-if='checked7'></el-table-column>
          <el-table-column  prop="deviceAttributes"  label="设备属性" v-if='checked8'></el-table-column>

          <el-table-column  label="操作"  align=center>
            <template slot-scope="scope">
              <a class="cursor" @click="setnotRun(scope.row.mac,scope.$index)">回收</a><span class="ospan_table">|</span>
              <!-- <router-link :to="{name:'deviceparam',params:{val: scope.row.mac } }" class="cursor">查看详情</router-link>-->
              <router-link :to="{name:'seedetails',params:{val: scope.row.mac } }" class="cursor">查看详情</router-link>
              <!--<a class="cursor" @click="setdata(scope.row.mac)">设置参数</a>-->
              <router-link :to="{name:'deviceparam',params:{val: scope.row.mac,name:1 } }" style="color:#16D032">设置参数</router-link>
              <router-link :to="{name:'todeviceRssiList',params:{val: scope.row.mac,name:1} }" style="color:#16D032">查看rssi</router-link>

            </template>
          </el-table-column>
        </el-table>

        <div class="block" style="clear:both">
          <span class="demonstration"></span>
          <el-pagination
            style="margin-top:15px"
            background
            layout="total,sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 30, 40]"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-size='num'
            :total="nums"
            :page-count="total"
          >
          </el-pagination>
        </div>
      </template>
    </el-main>
  </el-container>
</template>
<router-view></router-view>
<script>
  import liste from './alertui.vue'
  // import theheader from './header.vue'
  import runurl from '../common.js'
  export default {
    components: {
      liste,
    },
    data () {
      return {
        input: '',
        checked1: true,
        checked2: true,
        checked3: true,
        checked4: true,
        checked5: true,
        checked6: true,
        checked7: true,
        checked8: true,
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        value1: [],
        value: '',
        multipleSelection: [],
        checkList: [],
        wc: '123',
        page:  1,
        num: 10,
        total: 0,
        loading: false,
        tableData3: [],
        notOnline: '',
        loading: false,
        n:2,
        add2:'',
        nums: 0,
        runurlone:'',
        // theheaderone:''
      }
    },
    methods: {
      add: function (ev) {
        this.option1.push({ 'message': 'woo' })
      },
      // setdata(val){
      //     this.theheaderone='dashdj'
      //     this.$router.push({name:'deviceparam',params:{val: val } })
      // },
      del: function (n) {
        this.option1.splice(n, 1)
      },
      shaixuan: function () {
      },
      change1: function () {
        this.checked1 = !(this.checked1)
      },
      change2: function () {
        this.checked2 = !(this.checked2)
      },
      change3: function () {
        this.checked3 = !this.checked3
      },
      change4: function () {
        this.checked4 = !this.checked4
      },
      change5: function () {
        this.checked5 = !this.checked5
      },
      change6: function () {
        this.checked6 = !this.checked6
      },
      change7: function () {
        this.checked7 = !this.checked7
      },
      change8: function () {
        this.checked8 = !this.checked8
      },
      // 设备回收
      setnotRun(val,index){
        this.$confirm('确定回收吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.prompt (val,index)
        }).catch((res) => {
          this.$message({
            type: 'info',
            message: '已取消回收'
          });
        });
      }

      ,prompt (val,index) {
        this.loading=true
        let setNotRun=runurl.url().setNotRun
        let mac=val
        this.$http.get(setNotRun,
          {
            params: {
              mac: mac
            }
          },
          {
            headers: {},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.loading=false
            this.tableData3.splice(index, 1);
            this.$message.success(response.data.msg)
          }else{
            this.$message.error(response.data.msg)
          }
        }, (response) => {
          this.$message.error('请求出错')
        })
      },
      ievent (data,val1,n,nums,add1) {
        this.dialogFormVisible=false
        this.total=val1
        this.n=1
        this.add2=add1
        this.tableData3=data
        this.nums=nums
        this.$router.replace({name:'run',query:{val: add1 } })
      },
      rowClass: function (row, index) {
        return { "background-color": "#eee" }
      },
      handleSizeChange (val) {
        this.tableData3=this.tableData3.splice(0,0)
        let runurlone=runurl.url().run
        let notOnlineUrlone=runurl.url().online
        this.notOnline=notOnlineUrlone
        let page=this.page
        let num=val
        this.$http.get(runurlone,
          {
            params: {
              page: page,
              num: num
            }
          },
          {
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            let data=response.data.data;
            let list=data.list
            let listlength=list.length
            let nums=data.nums
            if(nums%num==0){
              this.total=(nums/num)*num
            }else{
              this.total=Math.ceil(nums/num)*num
            }
            this.tableData3=list
          }
        }, (response) => {
          this.$message.error('请求出错')
        })
      },
      handleCurrentChange(val) {
        this.loading=true
        let runurlone=runurl.url().run
        this.tableData3=this.tableData3.splice(0,0)
        let page=val
        let num=this.num
        if(this.n==2){
          this.runurlone=runurl.url().run
          this.$http.get(this.runurlone,
            {
              params: {
                page: page,
                num: num
              }
            },
            {
              headers: {},
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              this.loading=false
              let data=response.data.data;
              let list=data.list
              let listlength=list.length
              let nums=data.nums
              if(nums%num==0){
                this.total=(nums/num)*num
              }else{
                this.total= Math.ceil(nums/num)*num
              }
              this.tableData3=list
            }
          }, (response) => {
            this.$message.error('请求出错')
          })
        }else{
          this.runurlone=runurl.url().online
          var add=this.add2
          this.$http.post(this.runurlone,{s: add},
            {
              params: {
                page: page,
                num: num
              },
              emulateJSON: true
            }
          ).then((response) => {
            if (response.data.code==0) {
              this.loading=false
              let data=response.data.data;
              let list=data.list
              let listlength=list.length
              let nums=data.nums
              if(nums%num==0){
                this.total=(nums/num)*num
              }else{
                this.total= Math.ceil(nums/num)*num
              }
              this.tableData3=list
            }
          }, (response) => {
            this.$message.error('请求出错')
          })
        }


      },
      //请求
      backPost(add){
        var notOnlineUrlone=runurl.url().online
        let page=this.page
        let num=this.num
        this.$http.post(notOnlineUrlone,
          {
            s: add
          },
          {
            params: {page: page,num: num},
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            this.loading=false
            let data=response.data.data
            let list=data.list
            this.nums=data.nums
            let nums=data.nums
            if(nums%num==0){
              this.total=(nums/num)*num
            }else{
              this.total=Math.ceil(nums/num)*num
            }
            this.tableData3=list

          }
        }, (response) => {

        })
      }
    },
    mounted: function () {
      let runurlone=runurl.url().run
      let notOnlineUrlone=runurl.url().online
      this.notOnline=notOnlineUrlone
      let page=this.page
      let num=this.num
      this.loading=true
      if(this.$route.query.val){
        this.backPost(this.$route.query.val)
        return;
        // this.tableData3=sessionStorage.setItem('tableData')
      }
      this.$http.get(runurlone,
        {
          params: {
            page: page,
            num: num
          }
        },
        {
          emulateJSON: true
        }
      ).then((response) => {
        if (response.data.code==0) {
          this.loading=false
          let data=response.data.data;
          console.log('************',data)
          let list=data.list
          let listlength=list.length
          this.nums=data.nums
          let nums=data.nums
          if(nums%num==0){
            this.total=(nums/num)*num
          }else{
            this.total=Math.ceil(nums/num)*num
          }
          // for (let i=0; i<listlength; i++) {
          //   this.tableData3.push(list[i])
          // }
          this.tableData3=list
        }
      }, (response) => {
        this.$message('请求出错')
      })
    }
  }
</script>

<style>
  .el-dialog__body{
    overflow:auto
  }

  .ospan_table{
    margin:0px 0px 0px 2px
  }
  .ocontainer{
    background-color:#fff
  }
  /*.cell{text-align: center}*/
</style>
