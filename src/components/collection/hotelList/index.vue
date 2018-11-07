<template>
    <div style="padding-bottom: 50px">
      <header class="hotelList_header">
        <div class="hotelList_header_left">
          所有酒店
        </div>
        <div>
          <input type="text" v-model="hotelNameInput" class="hotelList_header_input" placeholder="请输入酒店名称">
          <span @click="serachHotelList" class="hotelList_header_span">搜索</span>
        </div>
      </header>
      <main>
        <div class="main_title">
          <div class="main_title_left_div1">
            <div class="main_title_left_div1_div">编号</div>
            <div class="main_title_left_div1_div">酒店名称</div>
            <div class="main_title_left_div1_div">所属集团</div>
          </div>
          <div class="main_title_left_div2">
            <div>操作</div>
          </div>
        </div>

        <div class="main_row" v-for="item,index in hotelList">
          <div class="main_row_left">
            <div class="main_row_left_div">
              <span>{{page>1?(pageSizeNum)*(page-1)+1+index:index+1}}</span>
            </div>
            <div class="main_row_left_div">{{item.name}}</div>
            <div class="main_row_left_div">{{item.groupName}}</div>
          </div>
          <div class="main_row_right">
            <div @click="toConfigure(item.id,item.name)">配置</div>
          </div>
        </div>

      </main>
      <div class="page_box">
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
</template>

<script>
    import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
    export default {
        name: "hotelList",
        data(){
            return{
              currentPage4: 4,
              hotelList: [],
              page:1,
              nums:10,
              total:10,
              pageSizeNum:10,
              hotelName:'',
              hotelNameInput:''
            }
        },
        methods: {
          ...mapActions(['getHotelList','goto']),
          ...mapMutations(['HOTELLISTID','HOTELLISTNAME']),
          initHotelList(){
            this.getHotelList(
              {
                data:{
                  page: this.page,
                  pageSize: this.nums,
                  name: this.hotelName
                },
                onsuccess:body=>{
                  console.log(body.data)
                  this.hotelList = body.data.list
                  this.total = body.data.total

                }
              }
            )
          },
          //搜索酒店
          serachHotelList(){
            this.hotelName = this.hotelNameInput
            this.initHotelList()
          },
          //配置
          toConfigure(id,name){
            this.HOTELLISTID(id)
            this.HOTELLISTNAME(name)
            this.goto('/configure')
          },

          //分页
          handleSizeChange(val) {
            //每页多少条
            console.log(`每页 ${val} 条`);
            this.pageSizeNum = val
            this.nums = val
            this.initHotelList()

          },
          //当前页
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val
            this.initHotelList()
          },

        },
        mounted(){
          this.initHotelList()
        }
    }
</script>

<style lang="less" scoped>
  .hotelList_header{
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .hotelList_header_left{
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #000000;
      padding-left: 20px;
    }
    .hotelList_header_input{
      width: 330px;
      height: 38px;
      border: 1px solid #E7E7E7;
      outline: none;
      background-color: #F5F8FA;
      border-radius: 5px;
      opacity: 0.4;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #000000;
      padding-left: 22px;
    }
    .hotelList_header_span{
      display: inline-block;
      width: 88px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      background-color: #2574ED;
      color: white;
      margin-left: 10px;
      border-radius: 5px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .main_title{
    height: 48px;
    background-color: #F5F8FA;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .main_title_left_div1{
      display: flex;
      flex: 2;
      justify-content: flex-start;
      align-items: center;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #000000;
      .main_title_left_div1_div{
        width: 30%;
      }
    }
    .main_title_left_div2{
      display: flex;
      flex: 1;
      justify-content: flex-end;
      align-items: center;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #000000;
    }
  }
  .main_row{
    height: 68px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #E7E7E7;
    .main_row_left{
      display: flex;
      flex: 2;
      justify-content: flex-start;
      align-items: center;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #000000;
      .main_row_left_div{
        width: 30%;
        overflow: hidden;
        padding-right: 20px;
      }
    }
    .main_row_right{
      display: flex;
      flex: 1;
      justify-content: flex-end;
      align-items: center;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #2574ED;
      cursor: pointer;
    }
  }

  .page_box{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 90px;
  }


</style>
