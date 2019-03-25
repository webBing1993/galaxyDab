<template id="aaa">
  <el-container class="ocontainer">

    <el-header class="oheader" style="height: 30px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 17px;">
        <!-- <el-breadcrumb-item :to="{ path: '/device/run' }">设备</el-breadcrumb-item> -->
        <el-breadcrumb-item>设备详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>

    <el-main class="ocontainer">
      <template>
        <div>
          <div style="width:100%;">
            <ul class="ocontainer_ul">
              <li style="flex:1"><el-button style="float: right" type="success" size="small">刷新</el-button></li>
            </ul>
          </div>
          <div style="width:100%;">
            <ul class="ocontainer_ul1">
              <li style="flex:1" class="biaoti">通用信息</li>
            </ul>
          </div>
          <div class="ocontainer_odiv1">
            <div style='flex:1;font-size:12px'>
              <el-form ref="form" class="form_el" label-position='left' :model="form" label-width="40%" style='font-size:12px'>
                <el-form-item  label="设备生产序列号">
                  <span class="spancolor">{{form.mac}}</span>
                </el-form-item>

                <el-form ref="form" label-position='left' :model="form" label-width="120px">
                  <el-form-item label="mac 地址">
                    <span class="spancolor">{{form.mac}}</span>
                  </el-form-item>
                </el-form>

                <el-form-item label="固件版本号">
                  <span class="spancolor">{{form.hardwareVersion}}</span>
                </el-form-item>
                <el-form-item label="生产批次">
                  <span class="spancolor">{{form.productionBatch}}</span>
                </el-form-item>
              </el-form>
            </div>
            <div style='flex:1'>
              <el-form ref="form" class="form_el" label-position='left' :model="form" label-width="100px">

                <el-form-item label="设备状态">
                  <span class="spancolor">{{form.devStatus}}</span>
                </el-form-item>
                <el-form-item label="电池余量">
                  <span class="spancolor">{{form.devElectricity}}</span>
                </el-form-item>
                <el-form-item label="设备类型">
                  <span class="spancolor">{{form.devType}}</span>
                </el-form-item>

                <el-form-item label="设备属性">
                  <span class="spancolor">{{form.deviceAttributes}}</span>
                </el-form-item>
              </el-form>
            </div>
            <div style='flex:1'>
              <el-form ref="form" label-position='left' :model="form" label-width="50%">
                <img src="https://i1.mifile.cn/f/i/g/2015/cn-index/dfb.jpg" style="width:200px;height:100px">

              </el-form>
            </div>
          </div>

          <div class="ocontainer_div">
            <ul class="ocontainer_ul1">
              <li style="flex:1" class="biaoti">特殊信息</li>
            </ul>
          </div>
          <div class="ocontainer_padding">
            <div style="display:flex">
              <div style='flex:1;font-size:12px'>
                <el-form ref="form" label-position='left' :model="form" label-width="120px" style='font-size:12px'>

                  <el-form-item label="网络名称">
                    <span class="spancolor">{{form.wifiSsid}}</span>
                  </el-form-item>

                </el-form>
              </div>
              <div style='flex:2'>

              </div>
            </div>
          </div>

          <div class="ocontainer_div">
            <ul class="ocontainer_ul1">
              <li style="flex:1" class="biaoti">业务信息</li>
            </ul>
          </div>
          <div class="ocontainer_padding">
            <template>
              <el-table
                :data="tableData"  :header-row-style="rowClass">
                <el-table-column prop="date" label="所属空间ID"  width="180"> </el-table-column>
                <el-table-column  label="所属空间二维码" width="180">
                  <template slot-scope="scope">
                    <span class="tabledata_span" @click="dialogFormVisible = true">{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="miaoshu" label="描述" width="180"> </el-table-column>
                <el-table-column prop="address" label="操作">
                  <template slot-scope="scope">
                    <span class="tabledata_span"  @click="dialogFormVisible1 = true">查看详情</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>



          <div style="margin:16px 0px 16px 0px;">
            <div style="margin:16px">
              <span class="biaoti">操作日志</span>
            </div>
            <template>
              <el-table
                :data="tableData1"  :header-row-style="rowClass">
                <el-table-column prop="content" label="日志内容"  width="180"> </el-table-column>
                <el-table-column prop="name" label="操作人" width="180"> </el-table-column>
                <el-table-column prop="time" label="日志产生时间" width="180"> </el-table-column>
              </el-table>
              <el-pagination
                style="margin-top:16px"
                background
                layout="total,sizes, prev, pager, next, jumper"
                :page-sizes="[5, 10, 20, 30]"
                :page-size='num'
                :total="nums"
                :page-count="total"
              >
              </el-pagination>
            </template>
            <div style="margin:16px">
              <span class="biaoti">通用日志列表</span>
            </div>
            <template>
              <el-table
                :data="tableData2" :header-row-style="rowClass">
                <el-table-column prop="data" label="日志内容"  width="180"> </el-table-column>
                <el-table-column prop="time" label="日志生成时间" width="180"> </el-table-column>
              </el-table>

            </template>
            <div style="margin:16px">
              <span class="biaoti">设备用水日志列表</span>
            </div>
            <el-table
              :data="tableData3" :header-row-style="rowClass">
              <el-table-column prop="data" label="日志内容"  width="180"> </el-table-column>
              <el-table-column prop="time" label="日志生成时间" width="180"> </el-table-column>
            </el-table>
            <div style="margin:16px">
              <span class="biaoti">设备用电日志列表</span>
            </div>
            <el-table
              :data="tableData4" :header-row-style="rowClass">
              <el-table-column prop="data" label="日志内容"  width="180"> </el-table-column>
              <el-table-column prop="time" label="日志生成时间" width="180"> </el-table-column>
            </el-table>

          </div>

        </div>
      </template>
      <el-dialog title="二维码" :visible.sync="dialogFormVisible" style="overflow: auto;" width="30%">
      </el-dialog>
      <el-dialog title="详情" :visible.sync="dialogFormVisible1" style="overflow: auto;" width="30%">
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import detailsurl from '../common.js'
  export default {
    data () {
      return {
        radio: '1',
        dialogFormVisible: false,
        dialogFormVisible1: false,
        form: {
          mac: '',
          wifiSsid: '',
          hardwareVersion: '',
          productionBatch: '',
          devType: '',
          devElectricity: '',
          devStatus: '',
          deviceAttributes: ''
        },
        tableData: [{
          date: 'mq-yu',
          name: '二维码',
          miaoshu: '圣陶沙酒店',
          address: '查看该空间其他设备'
        }],
        tableData1: [],
        tableData2: [],
        tableData3: [],
        tableData4: [],
        index: '',
        nums: 0,
        num: 5,
        page:1,
        total: 0
      }
    },
    beforeMount:function() {
      this.index = this.$route.params.val
    },
    methods: {
      rowClass: function (row, index) {
        return { "background-color": "#eee" }
      }
    },
    mounted: function () {
      let devOptionLog = detailsurl.url().devOptionLog
      let devInfo = detailsurl.url().devInfo
      let devlog = detailsurl.url().devlog
      let water = detailsurl.url().water
      let mac = this.index
      this.loading = true
      let num = this.num
      //通用信息
      this.$http.get(devInfo,
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
          this.form.mac=response.data.data.mac
          this.form.wifiSsid=response.data.data.wifiSsid
          this.form.hardwareVersion=response.data.data.hardwareVersion
          this.form.productionBatch=response.data.data.productionBatch
          this.form.devType=response.data.data.devType
          this.form.devElectricity=response.data.data.devElectricity
          this.form.devStatus=response.data.data.devStatus
          this.form.deviceAttributes=response.data.data.deviceAttributes
        }
      }, (response) => {
        this.$message('请求出错')
      }),
        //操作日志
        this.$http.get(devOptionLog,
          {
            params: {
              mac:mac,
              page: 1,
              num: num
            }
          },
          {
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            if(response.data.data!=''){
              let data=response.data.data
              let listlength=data.length
              this.nums=listlength
              let nums=listlength
              if(nums%num==0){
                this.total=(nums/num)*num
              }else{
                this.total=Math.ceil(nums/num)*num
              }
              // for (let i=0; i<listlength; i++) {
              //   this.tableData1.push(data[i])
              // }
              this.tableData1=data
            }
          }
        }, (response) => {
          this.$message('请求出错')
        }),
        //通用日志列表
        this.$http.get(devlog,
          {
            params: {
              mac:mac,
              page: 1,
              offset: 10000
            }
          },
          {
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            if(response.data.data!=''){
              let data=response.data.data
              let list=data.list
              let listlength=list.length
              this.nums=data.nums
              let nums=data.nums
              if(nums%num==0){
                this.total=(nums/num)*num
              }else{
                this.total=Math.ceil(nums/num)*num
              }
              this.tableData2=list
            }
          }
        }, (response) => {
          this.$message('请求出错')
        }),
        //用水日志列表
        this.$http.get(water,
          {
            params: {
              mac:mac,
              page: 1,
              offset: 10000
            }
          },
          {
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            if(response.data.data!=''){
              let data=response.data.data
              let list=data.list
              let listlength=list.length
              this.nums=data.nums
              let nums=data.nums
              if(nums%num==0){
                this.total=(nums/num)*num
              }else{
                this.total=Math.ceil(nums/num)*num
              }
              this.tableData3=list
            }
          }
        }, (response) => {
          this.$message('请求出错')
        }),
        //用电日志列表
        this.$http.get(water,
          {
            params: {
              mac:mac,
              page: 1,
              offset: 10000
            }
          },
          {
            emulateJSON: true
          }
        ).then((response) => {
          if (response.data.code==0) {
            if(response.data.data!=''){
              let data=response.data.data
              let list=data.list
              let listlength=list.length
              this.nums=data.nums
              let nums=data.nums
              if(nums%num==0){
                this.total=(nums/num)*num
              }else{
                this.total=Math.ceil(nums/num)*num
              }
              this.tableData4=list
            }
          }
        }, (response) => {
          this.$message('请求出错')
        })

    }
  }
</script>

<style>
  .form_el .el-form-item{
    margin-bottom: 0px
  }
  .el-form-item__content,.el-form-item__label{
    line-height: 26px
  }
  .spancolor{
    color: #929292;
  }
  .biaoti{
    font-weight:600
  }
  .ocontainer{
    background-color:#fff
  }
  .ocontainer_ul{
    display: flex;
    line-height:42px;
    margin:0px;
    margin-bottom:16px
  }
  .ocontainer_ul1{
    display: flex;
    margin:0px;
    background-color: #eee;
    line-height:42px;
    padding: 0px 16px 0px 16px;
  }
  .ocontainer_odiv1{
    display:flex;
    border: 1px solid #eee;
    padding: 16px;
    height:100px
  }
  .ocontainer_div{
    width:100%;
    margin-top:16px
  }
  .tabledata_span{
    cursor:pointer;
    color:#16D032
  }
  .ocontainer_padding{
    border: 1px solid #eee;
    padding: 16px
  }
  el-table{
    width:100%;
  }
</style>
