<template>
    <div>
      <header class="configure_title">
        <span class="configure_title_span1">所有酒店</span>
        <span class="configure_title_span2">/</span>
        <span class="configure_title_span2">{{hotelListName}}</span>
      </header>
      <main class="configure_main">
        <div class="main_hotel_server">
          <div class="main_hotel_server_name">酒店服务</div>

            <div class="main_hotel_server_name_main">
              <div>
                <p class="hotel_server_main_p1">优图面部通行证</p>
                <p class="hotel_server_main_p2">（支持刷脸入住、吃早餐）</p>
              </div>
              <div>
                <el-switch
                  v-model="facein"
                  active-color="#13ce66"
                  inactive-color="#E8E8E8"
                  @change="changeTypeFacein"
                  :width="40">
                </el-switch>

              </div>
            </div>

            <div class="main_hotel_server_name_main">
              <div>
                <p class="hotel_server_main_p1">客史记录</p>
                <p class="hotel_server_main_p2">（酒店企业微信关闭功能，并隐藏栏目）</p>
              </div>
            <div>
              <el-switch
                v-model="guest"
                active-color="#13ce66"
                inactive-color="#E8E8E8"
                @change="changeTypeGuest"
                :width="40">
              </el-switch>

            </div>
          </div>

          <div class="main_hotel_server_name_main">
            <div>
              <p class="hotel_server_main_p1">基础信息</p>
              <p class="hotel_server_main_p2">（酒店企业微信基础信息关闭编辑权限）</p>
            </div>
            <div>
              <el-switch
                v-model="hotelinfo"
                active-color="#13ce66"
                inactive-color="#E8E8E8"
                @change="changeTypeHotelinfo"
                :width="40">
              </el-switch>

            </div>
          </div>

            <div class="main_hotel_server_name_main">
              <div>
                <p class="hotel_server_main_p1">WIFI管理</p>
                <p class="hotel_server_main_p2">（酒店企业微信关闭wifi管理权限，C端小程序不可点，提示“当前酒店暂未开通”）</p>
              </div>
            <div>
              <el-switch
                v-model="wifi"
                active-color="#13ce66"
                inactive-color="#E8E8E8"
                @change="changeTypeWifi"
                :width="40">
              </el-switch>
            </div>
            </div>

            <div class="main_hotel_server_name_main">
              <div>
                <p class="hotel_server_main_p1">活动广告</p>
                <p class="hotel_server_main_p2">（酒店企业微信活动广告关闭管理权限，C端小程序不显示）</p>
              </div>
              <div>
                <el-switch
                  v-model="activity"
                  active-color="#13ce66"
                  inactive-color="#E8E8E8"
                  @change="changeTypeActivity"
                  :width="40">
                </el-switch>
              </div>
            </div>

            <div class="main_hotel_server_name_main">
              <div>
                <p class="hotel_server_main_p1">摇一摇获取积分</p>
                <p class="hotel_server_main_p2">（C端小程序关闭摇一摇获取积分功能）</p>
              </div>
              <div>
                <el-switch
                  v-model="integral"
                  active-color="#13ce66"
                  inactive-color="#E8E8E8"
                  @change="changeTypeIntegral"
                  :width="40">
                </el-switch>
              </div>
            </div>

          <div class="main_hotel_server_name">客房在住服务</div>

          <div class="checkButton">
            <div>
              <p class="hotel_server_main_p1">客房服务</p>
              <p class="hotel_server_main_p2">（客房享有的餐券，SPA，迷你吧）</p>
              <div class="hotel_server_main_checkList">
                <span class="hotel_server_main_checkList_span">选择服务标签</span>
                <div>
                  <el-checkbox-group
                    v-model="checkedServer1"
                    @change="checkedServerType"
                    :min="1">
                    <el-checkbox v-for="list1 in optionList1" :disabled="roomService == false" :label="list1.id" :key="list1.id">{{list1.value}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <div class="hotel_server_main_checkList">
                <p class="hotel_server_main_checkList_span2">选择支持在线客服的房型</p>
                <p class="hotel_server_main_p2">（不选表示不启用该功能）</p>
                <div style="margin-top: 10px">
                  <el-checkbox-group
                    v-model="checkedServer2"
                    @change="changeTypeRoom"
                    :min="1">
                    <el-checkbox v-for="list2 in optionList2" :disabled="roomService == false" :label="list2.id" :key="list2.id">{{list2.value}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
            <div>
              <el-switch
                v-model="roomService"
                active-color="#13ce66"
                inactive-color="#E8E8E8"
                @change="changeTypeRoomService"
                :width="40">
              </el-switch>
            </div>
          </div>

          <div class="main_hotel_server_name_main">
            <div>
              <p class="hotel_server_main_p1">客房权益</p>
              <p class="hotel_server_main_p2">（客房享有的餐券，SPA，迷你吧）</p>

            </div>
            <div>
              <el-switch
                v-model="roomRestricts"
                active-color="#13ce66"
                inactive-color="#E8E8E8"
                @change="changeTypeRoomRestricts"
                :width="40">
              </el-switch>
            </div>
          </div>

          <div class="main_hotel_server_name_main">
            <div>
              <p class="hotel_server_main_p1">车牌登记</p>
              <p class="hotel_server_main_p2">（开启后住户可在小程序端录入车牌）</p>
            </div>
            <div>
              <el-switch
                v-model="car"
                active-color="#13ce66"
                inactive-color="#E8E8E8"
                @change="changeTypeCar"
                :width="40">
              </el-switch>
            </div>
          </div>

          <div class="main_hotel_server_name_main">
            <div>
              <p class="hotel_server_main_p1">预约发票</p>
              <p class="hotel_server_main_p2">（开启后住户可在小程序端预约发票）</p>
            </div>
            <div>
              <el-switch
                v-model="invoice"
                active-color="#13ce66"
                inactive-color="#E8E8E8"
                @change="changeTypeInvoice"
                :width="40">
              </el-switch>
            </div>
          </div>

          <div class="main_hotel_server_name_main">
            <div>
              <p class="hotel_server_main_p1">智能客控</p>
              <p class="hotel_server_main_p2">（开启后住户可在小程序端使用智能客控）</p>
            </div>
            <div>
              <el-switch
                v-model="guestControl"
                active-color="#13ce66"
                inactive-color="#E8E8E8"
                @change="changeTypeGuestControl"
                :width="40">
              </el-switch>
            </div>
          </div>


        </div>
      </main>
    </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'

    export default {
        name: "configure",
        data(){
          return{
            facein: false,
            faceinId: '',
            guest: false,
            guestId: '',
            hotelinfo: false,
            hotelinfoId: '',
            wifi: false,
            wifiId: '',
            activity: false,
            activityId: '',
            integral: false,
            integralId: '',
            roomService: false,
            roomServiceId: '',
            roomRestricts: false,
            roomRestrictsId: '',
            car:false,
            carId:'',
            invoice: false,
            invoiceId: '',
            guestControl:false,
            guestControlId:'',
            checkedServer1: [],
            checkedServer2: [],
            optionList1: [],
            optionList2: [],
          }
        },
        computed:{
          ...mapState(['hotelListId','hotelListName'])
        },
        methods:{
          ...mapActions(['getHotelServer','getHotelServiceConfigs','getHotelIdsStatus']),
          //酒店状态列表
          hotelServer(){
            this.getHotelServer(
              {
                data:{
                  hotelId:this.hotelListId,
                },
                onsuccess:body=>{
                  console.log(body.data)
                  let hotelStatusList = body.data.hotelConfig
                  if(hotelStatusList.length >0){
                    for (let i of hotelStatusList) {
                      if(i.key == 'facein'){
                        this.facein = i.value==0?false:true
                        this.faceinId = i.id
                      }else if(i.key == 'guest'){
                        this.guest = i.value==0?false:true
                        this.guestId = i.id
                      }else if(i.key == 'hotelinfo'){
                        this.hotelinfo = i.value==0?false:true
                        this.hotelinfoId = i.id
                      }else if(i.key == 'wifi'){
                        this.wifi = i.value==0?false:true
                        this.wifiId = i.id
                      }else if(i.key == 'activity'){
                        this.activity = i.value==0?false:true
                        this.activityId = i.id
                      }else if(i.key == 'integral'){
                        this.integral = i.value==0?false:true
                        this.integralId = i.id
                      }else if(i.key == 'roomService'){
                        this.roomService = i.value==0?false:true
                        this.roomServiceId = i.id
                      }else if(i.key == 'roomRestricts'){
                        this.roomRestricts = i.value==0?false:true
                        this.roomRestrictsId = i.id
                      }else if(i.key == 'car'){
                        this.car = i.value==0?false:true
                        this.carId = i.id
                      }else if(i.key == 'invoice'){
                        this.invoice = i.value==0?false:true
                        this.invoiceId = i.id
                      }else if(i.key == 'guestControl'){
                        this.guestControl = i.value==0?false:true
                        this.guestControlId = i.id
                      }
                    }
                  }

                  this.optionList1 = body.data.roomServiceConfig
                  if(this.optionList1.length>0){
                    for(let i of this.optionList1){
                        if(i.status == true){
                          this.checkedServer1.push(i.id)
                        }
                    }
                  }

                  this.optionList2 = body.data.roomType
                  if(this.optionList2.length>0){
                    for(let i of this.optionList2){
                      if(i.status == true){
                        this.checkedServer2.push(i.id)
                      }
                    }
                  }

                }
              }
            )
          },
          //修改状态
          hotelServiceConfigs(id, status){
            let type = status == true? 1:0
            this.getHotelServiceConfigs(
              {
                data:{
                  id: id,
                  value: type,
                },
                onsuccess:body=>{
                  console.log(body.data)
                }
              }
            )
          },


          //切换状态
          //优图面部通行证
          changeTypeFacein(){
            this.hotelServiceConfigs(this.faceinId,this.facein)
          },
          //常客管理
          changeTypeGuest(){
            this.hotelServiceConfigs(this.guestId,this.guest)
          },
          //基础信息
          changeTypeHotelinfo(){
            this.hotelServiceConfigs(this.hotelinfoId,this.hotelinfo)
          },
          //WIFI管理
          changeTypeWifi(){
            this.hotelServiceConfigs(this.wifiId,this.wifi)
          },
          //活动推广
          changeTypeActivity(){
            this.hotelServiceConfigs(this.activityId,this.activity)
          },
          //摇一摇获取积分
          changeTypeIntegral(){
            this.hotelServiceConfigs(this.integralId,this.integral)
          },
          //客房服务
          changeTypeRoomService(){
            this.hotelServiceConfigs(this.roomServiceId,this.roomService)
          },
          //客房权益
          changeTypeRoomRestricts(){
            this.hotelServiceConfigs(this.roomRestrictsId,this.roomRestricts)
          },
          //车牌登记
          changeTypeCar(){
            this.hotelServiceConfigs(this.carId,this.car)
          },
          //申请发票
          changeTypeInvoice(){
            this.hotelServiceConfigs(this.invoiceId,this.invoice)
          },
          //智能客控
          changeTypeGuestControl(){
            this.hotelServiceConfigs(this.guestControlId,this.guestControl)
          },

          //服务状态切换
          checkHotelIdsStatus(val,type){
            let ids = val.toString()
            this.getHotelIdsStatus(
              {
                data:{
                  ids: ids,
                  type: type,
                  hotelId: this.hotelListId,
                },
                onsuccess:body=>{
                  console.log(body)
                }
              }
            )
          },

          //切换状态客房服务
          checkedServerType(val){
            console.log('val1',val)
            this.checkHotelIdsStatus(val,1)
          },
          //切换状态客房权益
          changeTypeRoom(val){
            console.log('val2',val)
            this.checkHotelIdsStatus(val,2)
          }

        },
        mounted(){
          this.hotelServer()
          console.log('hotelListId', this.hotelListId)
        }
    }
</script>

<style lang="less" scoped>
  .el-checkbox.el-checkbox{
    margin-left: 0;
    margin-right: 30px;
  }
  .configure_title{
    height: 40px;
    line-height: 30px;
    border-bottom: 1px solid #C9C9C9;
    .configure_title_span1{
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      color: #000000;
    }
    .configure_title_span2{
      opacity: 0.7;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #000000;
    }

  }

  .configure_main{
    .main_hotel_server{
      padding-bottom: 100px;
      .main_hotel_server_name{
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #00CD78;
        height: 70px;
        line-height: 70px;
      }
      .checkButton{
        display: flex;
        min-height: 80px;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 1px solid #C9C9C9;
        .hotel_server_main_p1{
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #000000;
        }
        .hotel_server_main_p2{
          opacity: 0.4;
          font-family: PingFangSC-Regular;
          color: #000000;
        }
        .hotel_server_main_checkList{
          padding: 10px 0 10px 0;
          .hotel_server_main_checkList_span{
            display: inline-block;
            margin: 10px 0;
            font-family: PingFangSC-Medium;
            font-size: 12px;
            color: #000000;
          }
          .hotel_server_main_checkList_span2{
            display: inline-block;
            font-family: PingFangSC-Medium;
            font-size: 12px;
            color: #000000;
          }
        }
      }
      .main_hotel_server_name_main{
        display: flex;
        min-height: 80px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #C9C9C9;
        .hotel_server_main_p1{
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #000000;
        }
        .hotel_server_main_p2{
          opacity: 0.4;
          font-family: PingFangSC-Regular;
          color: #000000;
        }
        .hotel_server_main_checkList{
          padding: 10px 0 10px 0;
          .hotel_server_main_checkList_span{
            display: inline-block;
            margin: 10px 0;
            font-family: PingFangSC-Medium;
            font-size: 12px;
            color: #000000;
          }
          .hotel_server_main_checkList_span2{
            display: inline-block;
            font-family: PingFangSC-Medium;
            font-size: 12px;
            color: #000000;
          }
        }
      }
    }
  }


</style>
