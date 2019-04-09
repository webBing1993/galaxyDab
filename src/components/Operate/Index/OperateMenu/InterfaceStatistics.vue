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
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions,mapState} from 'vuex'
  import tableInterfaceStatistics from './tables/table-interfaceStatistics.vue'
  let now = new Date();
  let cmonth = now.getMonth() + 1;
  let day = now.getDate();
  if (cmonth < 10) cmonth = '0' + cmonth;
  if (day < 10) day = '0' + day;
  const nowDate1 = now.getFullYear() + '-' + cmonth + '-' + day;//获取当前的日期

  now.setDate(now.getDate() - 6 );
  var y = now.getFullYear();
  var m = now.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = now.getDate();
  d = d < 10 ? ('0' + d) : d;
  const qianDate1 = y + "-" + m + "-" + d; //获取前七天的日期
  export default {
    components:{
      tableInterfaceStatistics
    },
    data(){
      return{
        dateTimeArray:[qianDate1,nowDate1],
        nowDate:nowDate1,
        qianDate:qianDate1,
        chart:'',
        xdataArr:[],
        list:[

        ],
        lineList:[],
      }
    },
    methods:{
      ...mapActions([
        'goto','getInterfaceStatistics'
      ]),
      formatdate(param, status) {
        if (param) {
          var date = new Date(param);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate();
          D = D < 10 ? ('0' + D) : D;
          var h = date.getHours() + ':';
          var m = date.getMinutes() + ':';
          var s = date.getSeconds();
          if (status == 'YYYY-MM-DD') {
            return Y + M + D
          } else {
            return Y + M + D + h + m + s;
          }
        }
      },
      searchData(){
         this.qianDate=this.formatdate(this.dateTimeArray[0],'YYYY-MM-DD')
         this.nowDate=this.formatdate(this.dateTimeArray[1],'YYYY-MM-DD')
         var time1 = Date.parse(new Date(this.dateTimeArray[0]));
         var time2 = Date.parse(new Date(this.dateTimeArray[1]));
         var nDays = Math.abs(parseInt((time2 - time1)/1000/3600/24));
         console.log(nDays);
         if(nDays>60){
          this.$message({
            message: '日期仅限60天内，请重新选择',
            center: true,
            type: 'error',
          });
          return;
        }
         this.initInterfaceStatistics();
      },
      initInterfaceStatistics(){
         this.getInterfaceStatistics({
            data:{
              "startDay":this.qianDate,     // 起始日期，必需
              "endDay":this.nowDate,       // 结束日期，必需
              "groupId":"",                // 集团ID
              "hotelId":"",                // 酒店ID
              "lvyeId":"",
               'city':'',
            },
            onsuccess:body=>{
              if(body.data.items!=null){
                this.list=body.data.items;
                this.lineList=[];
                for(let item of this.list){
                  this.lineList.push(item.total);
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
