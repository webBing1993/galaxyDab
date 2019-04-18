<!--设备无证接口统计页面-->
<template>
  <div>
    <div class="all">
      <div class="expenseCalendar">
        <div class="title">设备无证接口统计</div>
        <el-row class="firstRowData">
          <el-col :span="1">
            <div class="datetitle">
              <span>时间:</span>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="firstdate">
              <el-date-picker
                v-model="dateTimeArray"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-value="[qianDate,nowDate]"
              >
              </el-date-picker>
              <span>限制60天之内</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="selectButton mcenter">
              <span @click="searchData">搜索</span>
            </div>
          </el-col>
        </el-row>
        <div class="myChart11">
          <div id="myChart3" :style="{width: '1550px', height: '300px'}"></div>
        </div>
        <div class="allHoteltext">
          所有酒店
        </div>
        <tableInterfaceStatistics :list="list"></tableInterfaceStatistics>
        <div class="page_box" v-if="list.length>0">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              background
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSizeNum"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import tableInterfaceStatistics from './tables/table-interfaceStatistics.vue'
let now = new Date()
let cmonth = now.getMonth() + 1
let day = now.getDate()
if (cmonth < 10) cmonth = '0' + cmonth
if (day < 10) day = '0' + day
const nowDate1 = now.getFullYear() + '-' + cmonth + '-' + day// 获取当前的日期
now.setDate(now.getDate() - 6)
var y = now.getFullYear()
var m = now.getMonth() + 1
m = m < 10 ? '0' + m : m
var d = now.getDate()
d = d < 10 ? ('0' + d) : d
const qianDate1 = y + '-' + m + '-' + d// 获取前七天的日期
export default {
  components: {
    tableInterfaceStatistics
  },
  data () {
    return {
      dateTimeArray: [qianDate1, nowDate1],
      nowDate: nowDate1,
      qianDate: qianDate1,
      chart: '',
      xdataArr: [],
      list: [],
      lineList: [],
      page: 1,
      nums: 10,
      total: 10,
      pageSizeNum: 10,
      currentPage4: 4
    }
  },
  methods: {
    ...mapActions([
      'goto', 'getInterfaceStatistics', 'getNoLicensePage'
    ]),
    formatdate (param, status) {
      if (param) {
        var date = new Date(param)
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate()
        D = D < 10 ? ('0' + D) : D
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        if (status == 'YYYY-MM-DD') {
          return Y + M + D
        } else {
          return Y + M + D + h + m + s
        }
      }
    },
    searchData () {
      this.qianDate = this.formatdate(this.dateTimeArray[0], 'YYYY-MM-DD')
      this.nowDate = this.formatdate(this.dateTimeArray[1], 'YYYY-MM-DD')
      var time1 = Date.parse(new Date(this.dateTimeArray[0]))
      var time2 = Date.parse(new Date(this.dateTimeArray[1]))
      var nDays = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24))
      console.log(nDays)
      if (nDays > 59) {
        this.$message({
          message: '日期仅限60天内，请重新选择',
          center: true,
          type: 'error'
        })
        return
      }
      this.initInterfaceStatistics()
      this.initNoLicensePage()
    },// 分页
    handleSizeChange (val) {
      // 每页多少条
      console.log(`每页 ${val} 条`)
      this.pageSizeNum = val
      this.nums = val
      this.initNoLicensePage()
    },
    // 当前页
    handleCurrentChange (val) {
        console.log(`当前页: ${val}`);
        this.page = val
        this.initNoLicensePage();
      },
      initNoLicensePage(){
         this.getNoLicensePage({
          data: {
            "startDay":this.qianDate,     // 起始日期，必需
            "endDay":this.nowDate,       // 结束日期，必需
            "groupId": "",                // 集团ID
            "hotelId": "",                // 酒店ID
            "lvyeId": "",                  // 旅业ID
            "city": "",                   // 城市
            "pageNo": 1,                  // 分页查询参数，当前页数
            "pageSize": this.pageSizeNum                // 分页查询参数，每页大小
          },
           onsuccess:body=> {
             if (body.data != null) {
               if(body.data.items !=null){
                 this.list=body.data.items;
               }
               this.total=body.data.total;
             }
           }
         })
      },
    formatdate1(param, status) {
      if (param) {
        var date = new Date(param);
        var Y = date.getFullYear() + '.';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
        var D = date.getDate();
        D = D < 10 ? ('0' + D): D;
        if (status == 'YYYY-MM-DD') {
          return Y + M + D
        } else {
          return Y + M + D + h + m + s;
        }
      }
    },
      initInterfaceStatistics(){
      this.getInterfaceStatistics({
            data: {
              "startDay":this.qianDate,     // 起始日期，必需
              "endDay":this.nowDate,       // 结束日期，必需
              "groupId":"",                // 集团ID
              "hotelId":"",                // 酒店ID
              "lvyeId":"",
               'city':'',
            },
            onsuccess:body=>{
              let arr=this.getDiffDate(this.qianDate,this.nowDate)
              this.lineList=[];
              if(body.data!=null) {
                for (let i = 0; i < arr.length; i++) {
                  this.lineList[i]=0;
                  for (let item of body.data) {
                    if (item.day == arr[i]) {
                      console.log(item.day,arr[i])
                      this.lineList[i]=item.total;
                      console.log( this.lineList)
                      continue;
                    }
                  }
                }
              }
              else
                {
                  for (let i = 0; i < arr.length; i++) {
                    this.lineList.push(0);
                  }
                }

              this.drawLine();
            }
         })
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
         this.chart = this.$echarts.init(document.getElementById('myChart3'))
        // 绘制图表
        console.log();
         this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            textStyle:{
              align:'left',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            },
            show:false,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data:this.getDiffDate(this.qianDate,this.nowDate),
          },
          yAxis: {
            type: 'value',
            show:false,
          },
          series: [
            {
              type:'line',
              data:this.lineList,
              itemStyle : {
                normal : {
                  color:'#338BFF',
                  lineStyle:{
                    color:'#338BFF'
                  }
                }
              },
            },
          ]
        });
      },
    },

    computed:{
      ...mapState([
        'route',
        'Interface'
      ])
    },
    mounted(){
      this.initInterfaceStatistics();
      this.initNoLicensePage();
    }
  }
</script>
<style lang="less" scoped>
  .all {
    width: 100%;
    .expenseCalendar {
      padding: 0px 20px 20px 20px;
      font-size: 14px;
      font-weight: normal;
      height: 40px;
      line-height: 40px;
      .title {
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        margin: 20px 0
      }
      .firstdate{
        display: flex;
        flex-direction: row;
      }
      .selectButton{
        display: flex;
        justify-content: center;
        width:100%;
        span{
          width:90px;
          height:44px;
          background-color: #39C240;
          color: #ffffff;
        }
      }
      .mcenter{
        text-align:center
      }

    }
  }
  .allHoteltext{
     margin:50px 0px 30px;
  }
</style>
