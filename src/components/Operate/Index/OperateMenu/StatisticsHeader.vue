<!--有证无证搜索头部组件-->
<template>
  <div>
    <el-row class="firstRowData">
      <el-col :span="1">
        <div class="datetitle">
          <span>时间:</span>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="firstdate">
          <el-date-picker
            v-model="dateTimeArray"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-value="[qianDate,nowDate]"
          >
          </el-date-picker>
          <span>限7天内</span>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="datetitle mcenter">
          <span>城市:</span>
        </div>
      </el-col>
      <el-col :span="2">
        <el-select class="el-right-address"  v-model="cityCode" name="cityCode"
                     placeholder="不限">
          <el-option
            v-for="(obj, index) of cityList"
            :key="index"
            :label="obj.name"
            :value="obj.name">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="1">
        <div class="datetitle mcenter">
          <span>酒店:</span>
        </div>
      </el-col>
      <el-col :span="2" style="display: flex;align-items: center">
        <div>
          <el-select class="el-right-address"  v-model="hotelGroupId" name="hotelGroupId"
                      placeholder='酒店集团' @change="groupChange(hotelGroupId)">
            <el-option
              v-for="(obj, index) of hotelGroupsList"
              :key="index"
              :label="obj.name"
              :value="obj.id">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="3">
        <el-select class="el-right-address"  v-model="hotelId" name="hotelId"
                    filterable  placeholder='请输入酒店名称'>
          <el-option
            v-for="(obj, index) of hotelList"
            :key="index"
            :label="obj.name"
            :value="obj.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <div class="datetitle mcenter">
          <span>旅业ID:</span>
        </div>
      </el-col>
      <el-col :span="2">
        <el-input class="el-right" v-model="lvyeId" placeholder="请输入旅业ID" ></el-input>
      </el-col>
      <el-col :span="3">
        <div style="text-align:right">
          <el-button @click="searchData">搜索</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
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

  },
  data(){
      return{
        dateTimeArray:[qianDate1,nowDate1],
        cityCode:'',
        lvyeId:'',
        nowDate:nowDate1,
        qianDate:qianDate1,

        hotelGroupsList:[  {
          "id": "3b47f4b8e54e4ccab86782c53e09f2cf",
          "name": "中软"
        },
          {
            "id": "7914d9936e954629bae794a8b8d296c2",
            "name": "北创集团"
          },
          {
            "id": "88e76ca49c1b4526b0e0cf10c8514330",
            "name": "西软集团"
          }
        ],  // 酒店集团列表
        hotelGroupId:'',     //酒店集团id
        hotelList:[
        ],        //酒店列表
        hotelId:'',          //酒店Id
        cityList:[],
      }
    },
    methods:{
      ...mapActions([
        'goto','getHotelGroups','getHotelsByGroupId','getCitys'
      ]),
      formatdate(param, status) {
        if (param) {
          var date = new Date(param);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate();
          D = D < 10 ? ('0' + D): D;
          if (status == 'YYYY-MM-DD') {
            return Y + M + D
          } else {
            return Y + M + D + h + m + s;
          }
        }
      },
      initCity(){
        this.getCitys({
           onsuccess:body=>{
             console.log();
             for(let i=0;i<body.data.length;i++ ){
                if(body.data[i]!=null&&body.data[i]!=''){
                    let obj = {};
                    obj.name = body.data[i];
                    this.cityList.push(obj);
                }
             }
           }
        })
      },
      groupChange(id){
         this.hotelId='';
         this.getHotelsByGroupId({
           group_id:id,
           onsuccess:body=>{
             this. hotelList=body.data;
           }
         })

      },
      searchData(){
          let obj={};
          let dateTime=[];
          dateTime[0]=this.formatdate(this.dateTimeArray[0],'YYYY-MM-DD')
          dateTime[1]=this.formatdate(this.dateTimeArray[1],'YYYY-MM-DD')
          obj.dateTimeArray=dateTime;
          obj.cityCode=this.cityCode;
          obj.lvyeId=this.lvyeId;
          obj.groupId=this.hotelGroupId;
          obj.hotelId=this.hotelId;
          this.$emit('searchData',obj)
      },
      initHotelGroups(){
        this.getHotelGroups({
           onsuccess:(body)=>{
               this.hotelGroupsList=body.data;
           }
        })
      }
    },
    computed:{
      ...mapState([
        'route',
        'Interface'
      ]),
    },
    mounted(){
       this.initHotelGroups();
       this.initCity();
    }
  }
</script>
<style lang="less" scoped>
  .firstRowData{
    display: flex;
    align-items: center;
    padding-bottom: 15px;
  }
  /deep/ .el-row{
     margin:0px;
  }
  /deep/ .el-button{
    padding:12px 18px;
    background:#35C13D;
    width:80px;
    height:40px;
    color:#fff;
    font-size:14px;
    font-family:normal;
    font-weight:300;
    border:none;
    outline:none;
    border-radius: 0;
    &:hover{
      background:green
    }
  }
  .mcenter{
    text-align:center
  }
</style>
