<!--有证使用统计页面-->
<template>
  <div>
    <div class="all">
      <div class="expenseCalendar">
        <div class="title">有证使用统计</div>
        <StatisticsHeader @searchData="searchData"></StatisticsHeader>
        <el-row class="secondRowData">
          <el-col :span="4">
            <div class="topTitle">数据汇总</div>
          </el-col>
          <el-col :span="4">
            <div class="topTitle">使用总数统计</div>
            <span class="bottomData">{{countObj.summary}}</span>
          </el-col>
          <el-col :span="4">
            <div class="topTitle">通过人数</div>
            <span class="bottomData">{{countObj.pass_summary}}</span>
          </el-col>
          <el-col :span="4">
            <div class="topTitle">不通过人数</div>
            <span class="bottomData">{{countObj.refused_summary}}</span>
          </el-col>
          <el-col :span="4">
            <div class="topTitle">通过占比</div>
            <span class="bottomData">{{countObj.pass_percent}}</span>
          </el-col>
          <el-col :span="4">
            <div class="topTitle">不通过占比</div>
            <span class="bottomData">{{countObj.refused_percent}}</span>
          </el-col>
        </el-row>
        <div class="myChart11">
          <div class="myChartLeft">
             <div class="pass"><p></p>通过</div>
             <div class="noPass"><p></p>不通过</div>
          </div>
          <div id="myChart2" :style="{width: '1500px', height: '300px'}"></div>
        </div>
        <div class="importExcel" @click="exportExcelClick">
          <p><img src="../../../../assets/img/xiazai.png">导出xls</p>
        </div>
        <tableStatistics :list="list"></tableStatistics>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions,mapState} from 'vuex'
  import tableStatistics from './tables/table-statistics.vue'
  import  StatisticsHeader from './StatisticsHeader.vue'
  import  axios from 'axios'
  let now = new Date()
  let cmonth = now.getMonth() + 1
  let day = now.getDate()
  if (cmonth < 10) cmonth = '0' + cmonth
  if (day < 10) day = '0' + day
  const endDay1 = now.getFullYear() + '-' + cmonth + '-' + day// 获取当前的日期
  now.setDate(now.getDate() - 6)
  var y = now.getFullYear()
  var m = now.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = now.getDate()
  d = d < 10 ? ('0' + d) : d
  const startDay1 = y + '-' + m + '-' + d // 获取前七天的日期
  export default {
    components:{
      tableStatistics,
      StatisticsHeader
    },
    data(){
      return{
        countObj: {      // 数据汇总
        },
        list:[
        ],
        startDay:startDay1,
        endDay:endDay1,
        allObj:[],
      }
    },
    methods:{
      ...mapActions([
        'goto','getCertificateStatistics'
      ]),
      exportExcelClick(){
        console.log("this.allObj",this.allObj);
          let data={
            ...this.allObj,
            "startDay":this.startDay,             // 起始日期，必需
            "endDay":this.endDay,                // 结束日期，必需
            'type':'license',
          }
          this.exportExcel(data,'/data/IdentityCheckData/download');
      },
      searchData(obj){
        var time1 = Date.parse(new Date(obj.dateTimeArray[0]));
        var time2 = Date.parse(new Date(obj.dateTimeArray[1]));
        var nDays = Math.abs(parseInt((time2 - time1)/1000/3600/24));
        console.log(nDays);
        if(nDays>6){
          this.$message({
            message: '日期仅限七天内，请重新选择',
            center: true,
            type: 'error',
          });
          return;
        }
       this.initCertificateStatistics(obj);
      },
      initCertificateStatistics(obj){
        if(obj==undefined){
          this.allObj.groupId='';
          this.allObj.hotelId='';
          this.allObj.lvyeId='';
          this.allObj.cityCode='';
        }else{
          this.allObj={...obj};
          this.startDay=obj.dateTimeArray[0];
          this.endDay=obj.dateTimeArray[1];
        }
        this.getCertificateStatistics({
          data:{
            "startDay":this.startDay,             // 起始日期，必需
            "endDay":this.endDay,                // 结束日期，必需
            "groupId":this.allObj.groupId,                // 集团ID
            "hotelId":this.allObj.hotelId,                // 酒店ID
            "lvyeId":this.allObj.lvyeId,                  // 旅业ID
            'city':this.allObj.cityCode
          },
          onsuccess:body=>{
            this.list=body.data.items;
            this.countObj=body.data.summanry;
            this.licenseData=[];
            this.noLicenseData=[];
            for(let item of this.list){
              this.licenseData.push(item.pass_summary);
              this.noLicenseData.push(item.refused_summary);
            }
            this.drawLine();
          }
        });
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart2'))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            textStyle:{
              align:'left',
            },
          },
          legend: {
            data:['通过','不通过'],
            orient: 'vertical',
            x: 'left',
            y:'top',
            show:false,
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
            data: this.getDiffDate(this.startDay,this.endDay),
          },
          yAxis: {
            type: 'value',
            show:false,
          },
          series: [
            {
              name:'通过',
              type:'line',
              data:this.licenseData,
              itemStyle : {
                normal : {
                  color:'#35C13D',
                  lineStyle:{
                    color:'#35C13D'
                  }
                }
              },
            },
            {
              name:'不通过',
              type:'line',
              data:this.noLicenseData,
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
      }

    },
    watch:{

    },
    computed:{
      ...mapState([
        'route',
        'Interface'
      ]),
    },
    mounted(){
      this.initCertificateStatistics();
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
    }
    .secondRowData{
      border-top:1px solid #EAEDF0;
    }
    .topTitle{
      margin-bottom:-15px;
      opacity: 0.5;
      font-size: 14px;
      color: #000000;
    }
    .bottomData{
       text-align: right;
       font-size: 18px;
       color: #000000;
    }
  }

  .myChart11{
    width:100%;
    text-align: -webkit-right;
    text-align: -moz-right;
    display:flex;
    .myChartLeft{
      width:200px;
      text-align: left;
      padding-top:20px;
      opacity: 0.6;
       div{
         display: flex;
         align-items: center;
         height:20px;
          p{
             width:8px;
             height:8px;
             background-color: #35C13D;
             border-radius: 10px;
             margin-right:10px;
          }
       }
       .noPass>p{
         background-color: #338BFF;
       }
      .finish>p{
        background-color: #FFD33E;
      }
    }
  }
  .importExcel{
    width:100%;
    text-align: right;
    text-align: -webkit-right;
    text-align: -moz-right;
    margin:15px 0;
    p{
      display:flex;
      width:172px;
      height:48px;
      background: #F0F0F0;
      border: 1px solid #EDEDED;
      justify-content: center;
      align-items: center;
      img{
        width:14px;
        height:17px;
        margin-right:5px;
      }
    }
  }

  /deep/ .el-table th{
    background-color: #D8D8D8;
    font-size: 14px;
    height: 38px;
    padding:0;
    opacity: 0.5;
  }

</style>
