<template>

  <el-container style="background-color:#fff">

    <el-header style="text-align: left; font-size: 12px;height: 30px;margin-bottom:5px; border-bottom: 1px solid #eee;">
      <span style="font-size:17px;font-weight: 600">区域管理</span>
    </el-header>
    <el-main style="background-color: #fff">
      <div class="opagination1">
        <el-button style="float: right"  type="primary" size="small" @click="add1">添加区域</el-button>
        <el-button class="obutton1" type="primary" style="margin-left:0px" size="small" @click="add2">添加门禁点</el-button>
        <el-button class="obutton1" type="primary" size="small" @click="add3">添加门禁点镜像</el-button>

        <el-select
          v-model="value9"
          v-show="selectshow"
          filterable
          remote
          reserve-keyword
          placeholder="搜索酒店"
          @change="tosure"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="(item,i) in options4"
            :key="item.hotelCode"
            :label="item.hotelName"
            :value="item.hotelCode">
          </el-option>
        </el-select>

        <el-dialog :title="dialogName1" :visible.sync="dialogFormVisible1" width="40%" v-loading='loading'>
          <el-form :label-position="left" label-width="120px">
            <el-form-item label="区域名字" >
              <el-input class="inputWidth" placeholder="请输入内容" v-model="regionValue"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" style="display:none">
              <el-switch
                v-model="switchvalue"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="绑定的旅业房号">
              <el-select v-model="bindroom" placeholder="可选" @change="changedevice1" class="inputWidth">
                <el-option
                  v-for="(item,index) in bindroomList"
                  :label="item.roomName"
                  :value="item.roomCode"
                  :key="index">
                </el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" size="small" @click="addRegion(editdialog1)">确定</el-button>
          </el-form>
        </el-dialog>

        <el-dialog :title="dialogName2" :visible.sync="dialogFormVisible2" width="40%" v-loading='loading'>
          <el-form :label-position="left" label-width="120px">
            <el-form-item label="门禁点名字">
              <el-input class="inputWidth" v-model="pointName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="门禁点类型">
              <el-select v-model="deviceType" placeholder="请选择" @change="changedevice" class="inputWidth">
                <el-option
                  v-for="item in doorType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="楼层" v-show="floorshow">
              <div class="el-form-item__content">
                <div class="el-input">
                  <input placeholder="请输入内容" type="text" @input="floorchange" v-model="floor" rows="2" validateevent="true" class="el-input__inner inputWidth">
                </div>
              </div>
              <!--<input style="width:36%;display: inline-block" @input='floorchange' v-model="floor" placeholder="请输入内容"></input>-->
            </el-form-item>

            <el-form-item label="是否启用：" style="display:none">
              <el-switch
                v-model="switchpoint"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>

            <el-form-item label="设备sn" v-show="deviceSn">
              <el-input class="inputWidth" placeholder="未施工" :disabled="thedisabled"  v-model="theChangevalue"  v-on:input="changevalue"></el-input>
              <a v-show="theshow" @click="Unbind" style="cursor: pointer;">解除绑定</a>
            </el-form-item>
            <el-button type="primary" size="small" @click="addPoint(editdialog2)">确定</el-button>
          </el-form>

        </el-dialog>


        <el-dialog :title="dialogName3" :visible.sync="dialogFormVisible3" width="40%" v-loading='loading'>
          <el-form :label-position="left" label-width="120px">
            <el-form-item label="楼层" style="display:none">
              <!--<el-input class="inputWidth" @input='floorchange' placeholder="请输入内容" v-model="addPointImagevalue"></el-input>-->
              <div class="el-form-item__content">
                <div class="el-input">
                  <input placeholder="请输入内容" type="text" @input="floorchange" v-model="addPointImagevalue" rows="2" validateevent="true" class="el-input__inner inputWidth">
                </div>
              </div>

            </el-form-item>
            <el-form-item label="要复制门禁点">
              <el-select v-model="value10" placeholder="请选择" class="inputWidth">
                <el-option
                  v-for="item in findNotImagesByHotelList"
                  :key="item.id"
                  :label="item.pointName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <!--</el-select>-->
            <el-button type="primary" size="small" @click="addPointImageClick(editdialog3)">确定</el-button>
          </el-form>
        </el-dialog>
      </div>
      <template>
        <!--<span>{{tohotelName}}</span>-->
        <span v-for="(i,j) in treeHotelName" @click="togoback(i,j)" style="cursor: pointer;" class="el-breadcrumb__inner">
          <!-- <span v-show="j!=0" :class="{ i.length==j+1: el-breadcrumb__inner, 'thefont_size': isB}">></span>-->
          <!-- <span :class="classA ? 'class-a' : 'class-b' "></span>-->
          <i v-show="j!=0" class="el-breadcrumb__separator el-icon-arrow-right"></i>
          {{i.hotelName}}
        </span>
        <div  class="parent">
          <div class="child" :class="{ 'a1': i.type==1&&!i.image, 'a2': i.type==0,'a3':i.type==1&&i.image}"  :title='i.bindDeviceSn' v-loading='loading' style="position:relative;cursor: pointer;" @click="gotoentranceguardPoint(i)" v-for="(i,j) in entranceguardPointData" @contextmenu="showMenu(j,$event)">

            <span class="bottom" v-show="i.type==1&&!i.image">门禁点</span>
            <span class="bottom"v-show="i.type==0">区域</span>
            <span class="bottom"v-show="i.type==1&&i.image">门禁点镜像</span>

            <span class="center" v-show="i.areaName">{{i.areaName}}</span>
            <span class="center" v-show="i.pointName">{{i.pointName}}</span>
            <vue-context-menu :contextMenuData="contextMenuData"
                              :transferIndex="transferIndex"
                              @savedata="savedata(i)"
                              @newdata="newdata(i)" ></vue-context-menu>
          </div>

        </div>
      </template>
    </el-main>
  </el-container>
</template>

<script>
  import VueContextMenu from './vueContextMenu.vue'
  import baseUrl from '../../common.js'
  export default {
    components: {
      VueContextMenu,
    },
    data () {
      return {
        thedisabled:true,
        selectshow:true,
        bindroom:'',
        deviceSn:false,
        bindroomList:[{roomName:'',roomCode:''}],
        floorshow:false,
        dialogName1:'',
        dialogName2:'',
        dialogName3:'',
        theChangevalue:'',
        nametwo:'',
        value10:'',
        findImagesByHotelList:null,
        findNotImagesByHotelList:null,
        editdialog1:false,
        editdialog2:false,
        editdialog3:false,
        addPointImagevalue:0,
        parentEntranceGuardAreaId:0,
        pointId:'',
        deviceType:'',
        doorType:[
          {id:'11',name:'取电开关'},
          {id:'12',name:'门锁'},
          {id:'1B',name:'梯控'},
          {id:'16',name:'门禁'}],
        treeHotelName:[],
        _treeHotelName:[],
        switchpoint:true,
        pointName:'',
        floor:0,
        tohotelName:'',
        thehotelCode:null,
        dialogFormVisible1:false,
        dialogFormVisible2:false,
        dialogFormVisible3:false,
        loading:false,
        switchvalue:true,
        left:'right',
        regionValue:'',
        theshow:false,
        options4: [],
        a:{
          color:'red',
          left:'100px',
          top:'100px',
          position:'absolute',
        },
        transferIndex: null, // Show the menu that was clicked
        contextMenuData: {
          menuName: 'demo',
          axios: {
            x: null,
            y: null
          },
          menulists: [
            {
              fnHandler: 'savedata',
              icoName: 'fa fa-home fa-fw',
              btnName: '编辑'
            },
            {
              fnHandler: 'newdata',
              icoName: 'fa fa-home fa-fw',
              btnName: '删除'
            }
          ]
        },
        value9: [],
        list: [],
        loading: false,
        entranceguardPointData:[],
        hotelName:'',
        theparentAreaId:0,
        thehotelCode:null

      }
    },
    watch:{

    },
    methods:{
      changedevice(val){
        this.floor=0
        if(val=='1B'){
          this.floorshow=true
        }else{
          this.floorshow=false
        }
      },
      changedevice1(){

      },
      floorchange(){
        // return;
        // var reg=/^[0-9]*$/
        var reg=/^[0-9a-zA-Z-]+$/;
        var _floorvalue=this.floor
        var _addPointImagevalue=this.addPointImagevalue
        if(_floorvalue){
          if(!(reg.test(_floorvalue))){
            this.floor=''
          }
        }

      },
      showMenu (index,event) {

        this.transferIndex = index // tranfer index to child component
        var a=document.getElementsByClassName('vue-contextmenu-listWrapper')
        for(var i=0;i<a.length;i++){
          a[i].style.display='none'
        }
        // document.getElementsByClassName('vue-contextmenu-listWrapper').style.display='none'
        let checkshow = document.getElementsByClassName('vue-contextmenu-listWrapper')[this.transferIndex]
        checkshow.style.display = 'block'

        event.preventDefault()
        var x = event.clientX
        var y = event.clientY
        this.contextMenuData.axios = {
          x, y
        }
      },
      Unbind(){
        //解除绑定
        // return;
        this.$confirm('此操作将解除绑定, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.Unbindtoajax(this)
          location.reload()
        }).catch(() => {
          this.$message({type: 'info',message: '已取消'});
        });

      },
      Unbindtoajax(that){
        var _unbindDevice=baseUrl.url().unbindDevice
        var _id=this.pointId
        that.$http.post(_unbindDevice,
          {
            pointId:_id
          },
          {
            emulateJSON: true
          },
        ).then((response) => {
          if (response.data.code==0) {
            this.$message({type: 'success',message: '解除绑定成功!'});
          }
        }, (response) => {
          this.$message.error('请求出错')
        })
      },
      savedata (e) {
        let checkshow = document.getElementsByClassName('vue-contextmenu-listWrapper')[this.transferIndex]
        checkshow.style.display = 'none'
        //编辑
        this.pointId=e.id
        //门禁点
        if(e.type==1){
          this.pointName=e.pointName
          this.deviceType=e.deviceType
          if(e.image){
            //门禁点镜像
            this.dialogName3="编辑门禁点镜像"
            this.editdialog3=true
            this.dialogFormVisible3=true;
            //获取酒店下的所有非门禁点镜像
            var _hotelCode=this.thehotelCode
            var findNotImagesByHotelUrl=baseUrl.url().findNotImagesByHotel
            this.$http.get(findNotImagesByHotelUrl,
              {
                params:{hotelCode:_hotelCode}
              },
              {
                emulateJSON: true
              },
            ).then((response) => {
              if (response.data.code==0) {
                this.findNotImagesByHotelList=response.data.data
                this.loading=false
              }
            }, (response) => {
              this.$message.error('请求出错')
            })
            return;
          }
          //门禁点
          this.dialogName2="编辑门禁点"
          this.editdialog2=true
          this.dialogFormVisible2=true;

          if(!e.bindDeviceSn){
            this.theChangevalue=''
            this.deviceSn=true
            this.theshow=false
          }else{
            this.theChangevalue=e.bindDeviceSn
            this.deviceSn=true
            this.theshow=true
          }
          return;
        }
        //门禁区域
        this.dialogName1="编辑区域"
        this.regionValue=e.areaName
        this.bindroom = e.roomName
        this.editdialog1=true
        this.dialogFormVisible1=true;
        var _hotelCode=this.thehotelCode
        this.bindroomList=[]
        var getHotelAllRoomsUrl=baseUrl.url().getHotelAllRooms
        this.$http.get(getHotelAllRoomsUrl,
          {
            params:{hotelCode:_hotelCode}
          },
          {
            emulateJSON: true
          },
        ).then((response) => {
          if (response.data.code==0) {
            if(!response.data.data.length){
              this.bindroomList.push({roomName:'不绑定',roomCode:' '})
              this.bindroom=''
              return;
            }
            this.bindroomList=response.data.data
            this.bindroomList.push({roomName:'不绑定',roomCode:' '})
          }
        }, (response) => {
          this.$message.error('请求出错')
        })
      },
      tipshow(e){
        var tipshow=''
        var repeattipshow=''
        if(e.type==0){
          //门禁区域
          tipshow='删除该区域及其所有子门禁区域和门禁点后将不可恢复，确定删除？'
          repeattipshow='删除失败，请先解绑门禁区域下包含的所有设备'
        }
        if(e.type==1 && !e.image){
          //门禁点
          tipshow='删除该门禁点会关联删除所有该门禁点镜像且将不可恢复，确定删除？'
          repeattipshow='删除失败，请先解绑设备'
        }
        if(e.type==1 && e.image){
          //门禁点镜像
          tipshow='是否删除该镜像点，其关联的门禁点不会被删除。'
        }
        return [tipshow,repeattipshow]
      },
      newdata (e) {
        let checkshow = document.getElementsByClassName('vue-contextmenu-listWrapper')[this.transferIndex]
        checkshow.style.display = 'none'
        //判断是什么类型的出现的删除提示语
        var _tipshow=this.tipshow(e)

        var that=this
        var pointId=e.id
        var _hotelCode=this.thehotelCode
        var delpoint=function(that,_params,deletePointurl){
          that.$http.get(deletePointurl,
            {
              params:_params
            },
            {
              emulateJSON: true
            },
          ).then((response) => {
            if (response.data.code==0) {
              var _data=response.data.data
              if(_data==0){
                that.$message.success(response.data.msg)
                location.reload()
                return
              }
              //第二次提示
              var _confirmDescribe=_tipshow[1]
              delfuc(that,1,_confirmDescribe)
            }
          }, (response) => {
            that.$message.error('请求出错')
          })
        }
        var delfuc=function(that,f,confirmDescribe){
          that.$confirm(confirmDescribe, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            if(f==1){
              //即再次删除的时候
              return;
            }
            //删除
            if(e.type==1){
              //门禁点deletePoint
              var deletePointurl=baseUrl.url().deletePoint
              var _params={pointId:pointId,f:f,hotelCode:_hotelCode}
              delpoint(that,_params,deletePointurl)
              return;
            }
            //门禁区域deleteArea
            var deleteAreaurl=baseUrl.url().deleteArea
            var _params={areaId:pointId,f:f,hotelCode:_hotelCode}
            delpoint(that,_params,deleteAreaurl)

          }).catch((res) => {
            // console.log(res)
            that.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
        //第一次删除
        var confirmDescribe=_tipshow[0]
        delfuc(that,0,confirmDescribe)




      },
      add1(){
        this.bindroomList=[]
        var _hotelCode=this.thehotelCode
        var getHotelAllRoomsUrl=baseUrl.url().getHotelAllRooms
        if(!_hotelCode){
          this.$message.error('请先选择酒店')
          return;
        }
        this.regionValue=''
        this.dialogName1="添加区域"
        this.dialogFormVisible1=true
        this.$http.get(getHotelAllRoomsUrl,
          {
            params:{hotelCode:_hotelCode}
          },
          {
            emulateJSON: true
          },
        ).then((response) => {
          if (response.data.code==0) {
            if(!response.data.data.length){
              this.bindroomList.push({roomName:'不绑定',roomCode:' '})
              this.bindroom=''
              return;
            }
            this.bindroomList=response.data.data
            this.bindroomList.push({roomName:'不绑定',roomCode:' '})
          }
        }, (response) => {
          this.$message.error('请求出错')
        })
      },
      add2(){
        if(!this.thehotelCode){
          this.$message.error('请先选择酒店')
          return;
        }
        this.pointName=''
        this.deviceType=''
        this.dialogName2="添加门禁点"
        this.dialogFormVisible2=true
        var _hotelCode=this.thehotelCode
        this.floorshow=false
        //设备sn
        this.theChangevalue=''
        this.deviceSn=true
        this.theshow=false
      },
      add3(){
        var _hotelCode=this.thehotelCode
        if(!_hotelCode){
          this.$message.error('请先选择酒店')
          return;
        }
        this.dialogName3="添加门禁点镜像"
        this.value10=''
        // this.loading=true
        this.dialogFormVisible3=true
        //获取酒店下的所有非门禁点镜像

        var findNotImagesByHotelUrl=baseUrl.url().findNotImagesByHotel
        this.$http.get(findNotImagesByHotelUrl,
          {
            params:{hotelCode:_hotelCode}
          },
          {
            emulateJSON: true
          },
        ).then((response) => {
          if (response.data.code==0) {
            this.findNotImagesByHotelList=response.data.data
            // this.loading=false
          }
        }, (response) => {
          this.$message.error('请求出错')
        })
      },
      addRegion(editdialog1){
        var hotelCode=this.thehotelCode
        var areaName=this.regionValue
        var status=this.switchvalue
        var _theparentAreaId=this.theparentAreaId
        var _bindRoomCode=this.bindroom
        if(status){
          status=1
        }else{
          status=0
        }
        if(!hotelCode){
          this.$message.error('请先选择酒店')
          return;
        }
        if(!areaName){
          this.$message.error('请填写门禁区域名字')
          return;
        }

        var thedata={hotelCode:hotelCode,areaName:areaName,parentAreaId:_theparentAreaId,status:status,bindRoomCode:_bindRoomCode}
        var areaId={areaId:this.pointId}
        var addRegion=function(that,addAreaurl,thedata,areaId){
          that.$http.post(addAreaurl,thedata,
            {
              params:areaId,
              headers: {},
              emulateJSON: true
            },
          ).then((response) => {
            // console.log(response)
            if (response.data.code==0) {
              that.dialogFormVisible1=false
              that.$message.success(response.data.msg)
              location.reload()
            }
          }, (response) => {
            that.$message.error('请求出错')
          })
        }
        if(editdialog1){
          //编辑状态
          var updateAreaurl=baseUrl.url().updateArea
          addRegion(this,updateAreaurl,thedata,areaId)
          return;
        }
        var addAreaurl=baseUrl.url().addArea
        addRegion(this,addAreaurl,thedata,areaId)

      },
      addPoint(editdialog2){
        var hotelCode=this.thehotelCode
        var deviceType=this.deviceType
        var status=this.switchpoint
        var pointName=this.pointName
        var _theparentAreaId=this.theparentAreaId
        var theChangevalue=this.theChangevalue
        var floor=this.floor
        if(status){
          status=1
        }else{
          status=0
        }
        // console.log(hotelCode)
        if(!hotelCode){
          this.$message.error('请先选择酒店')
          return;
        }
        if(!pointName){
          this.$message.error('请填写门禁点名称')
          return;
        }
        //当时梯控的时候,楼层不能是空的
        if(deviceType=='1B'&&!floor){
          this.$message.error('请填写楼层')
          return;
        }
        // if(!floor){
        //   this.$message.error('请填写楼层')
        //   return;
        // }
        if(!deviceType){
          this.$message.error('请填写设备类型')
          return;
        }
        var _data={hotelCode:hotelCode,parentEntranceGuardAreaId:_theparentAreaId,deviceType:deviceType,status:status,pointName:pointName,floor:floor}

        var theaddPoint=function(that,_data,addPointurl,pointId){
          that.$http.post(addPointurl,_data,
            {
              params:pointId,
              emulateJSON: true
            },
          ).then((response) => {
            if (response.data.code==0) {
              that.dialogFormVisible2=false
              that.$message.success(response.data.msg)
              location.reload()
            }
          }, (response) => {
            that.$message.error('请求出错')
          })
        }
        if(editdialog2){
          //编辑状态updatePoint
          var pointId={pointId:this.pointId}
          var updatePointurl=baseUrl.url().updatePoint
          theaddPoint(this,_data,updatePointurl,pointId)
          return;
        }
        var pointId={pointId:this.pointId}
        var addPointurl=baseUrl.url().addPoint
        theaddPoint(this,_data,addPointurl,pointId)

      },
      addPointImageClick(editdialog3){
        var pointId=this.value10
        var floor=this.addPointImagevalue
        var parentEntranceGuardAreaId=this.parentEntranceGuardAreaId
        var _theparentAreaId=this.theparentAreaId

        var theId={id:this.pointId}
        var add= function(addPointImageurl,pointId,floor,parentEntranceGuardAreaId,that,theId){
          // console.log(addPointImageurl)
          that.$http.post(addPointImageurl,
            {
              "pointId":pointId,
              "floor":floor,
              "parentEntranceGuardAreaId":_theparentAreaId
            },
            {
              params:theId,
              headers: {},
              emulateJSON: true
            },
          ).then((response) => {
            if (response.data.code==0) {
              that.dialogFormVisible3=false
              that.$message.success(response.data.msg)
              location.reload()
            }
          }, (response) => {
            that.$message.error('请求出错')
          })
        }
        if(editdialog3){
          //编辑门禁镜像
          var updatePointImageurl=baseUrl.url().updatePointImage
          add(updatePointImageurl,pointId,floor,parentEntranceGuardAreaId,this,theId)
          return;
        }
        //添加门禁镜像
        var addPointImageurl=baseUrl.url().addPointImage

        add(addPointImageurl,pointId,floor,parentEntranceGuardAreaId,this,theId)
      },
      togoback(i,j){
        this.treeHotelName=this.treeHotelName.slice(0,j+1)
        sessionStorage.setItem('treeHotelName', JSON.stringify(this.treeHotelName))
        this.theparentAreaId=i.id
        if(j==0){
          this.selectshow=true
          this.$router.replace({ name: 'datapanel',query:{hotelCode: i.thehotelCode,id:i.id}})

        }
        this.$router.replace({ name: 'datapanel',query:{id:i.id,thehotelCode:i.thehotelCode,name:i.hotelName}})

        var areasurl=baseUrl.url().areas+'/'+i.id
        this.$http.get(areasurl,
          {
            params:{hotelCode:i.thehotelCode}
          },
          {
            emulateJSON: true
          },
        ).then((response) => {
          if (response.data.code==0) {

            var _entranceguardPointData=response.data.data
            for(var i=0;i<_entranceguardPointData.length;i++){
              _entranceguardPointData[i]['youjian']=false
            }
            this.entranceguardPointData=_entranceguardPointData

          }
        }, (response) => {
          this.$message.error('请求出错')
        })

      },
      gotoentranceguardPoint(thedo){

        if(thedo.type==1){
          return;
        }
        this.selectshow=false
        var _id=thedo.id
        if(!thedo.areaName){
          var _name=thedo.pointName
        }else{
          var _name=thedo.areaName
        }

        this.treeHotelName.push({'hotelName':_name,id:_id,thehotelCode:thedo.hotelCode})
        sessionStorage.setItem('treeHotelName', JSON.stringify(this.treeHotelName))

        var _thehotelquery=thedo.hotelCode
        var _theparentAreaId=thedo.id
        this.theparentAreaId=_theparentAreaId
        if(_thehotelquery==0){
          sessionStorage.removeItem('treeHotelName')
        }
        // console.log(_hotelCode)
        this.$router.replace({ name: 'datapanel',query:{id:_id,thehotelCode:_thehotelquery,name:_name}})

        var areasurl=baseUrl.url().areas+'/'+_theparentAreaId
        this.$http.get(areasurl,
          {
            params:{hotelCode:_thehotelquery}
          },
          {
            emulateJSON: true
          },
        ).then((response) => {
          if (response.data.code==0) {

            var _entranceguardPointData=response.data.data
            for(var i=0;i<_entranceguardPointData.length;i++){
              _entranceguardPointData[i]['youjian']=false
            }
            this.entranceguardPointData=_entranceguardPointData

          }
        }, (response) => {
          this.$message.error('请求出错')
        })

      },
      tosure(ew){
        var _list=this.list
        for (var i = 0; i < _list.length; i++) {
          var obj = _list[i];
          for (var x in obj) {
            if (x== 'hotelCode' && obj[x] == ew) {
              this.tohotelName=obj.hotelName
              break;
            }
          }
        }
        // this.tohotelName=this.options4[ew].hotelName
        this.thehotelCode=ew
        var _hotelCode=this.thehotelCode
        this.theparentAreaId=0
        var _theparentAreaId=this.theparentAreaId
        this.$router.replace({ name: 'datapanel', query:{thehotelCode: _hotelCode,id:_theparentAreaId}})
        sessionStorage.removeItem('treeHotelName')
        this.treeHotelName=[{'hotelName':this.tohotelName,id:_theparentAreaId,thehotelCode:this.thehotelCode}]


        //取到酒店下的所有区域
        var areasurl=baseUrl.url().areas+'/'+0
        this.$http.get(areasurl,
          {
            params:{hotelCode:_hotelCode}
          },
          {
            emulateJSON: true
          },
        ).then((response) => {
          if (response.data.code==0) {
            var _entranceguardPointData=response.data.data
            // if(!_entranceguardPointData){
            //   this.entranceguardPointData=response.data.data
            // }
            for(var i=0;i<_entranceguardPointData.length;i++){
              _entranceguardPointData[i]['youjian']=false
            }
            this.entranceguardPointData=_entranceguardPointData
          }
        }, (response) => {
          this.$message.error('请求出错')
        })

      },
      show1(event,j){
        this.entranceguardPointData[j].youjian=true
        this.a.left=event.offsetX+'px'
        this.a.top=event.offsetY+'px'
        // console.log(event)
      },
      remoteMethod(query) {
        if (query !== '') {
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.hotelName.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
          this.loading = true;
        } else {
          this.options4 = [];
        }
      },


      changevalue(event){
        if(!this.theChangevalue){
          this.theshow=false
          return
        }
        this.theshow=true
      }
    },
    mounted() {
      this.hotelName=this.$route.query.val
      this.theparentAreaId=this.$route.query.id
      this.thehotelCode=this.$route.query.thehotelCode
      this.nametwo=this.$route.query.name

      var _thehotelquery=this.thehotelCode
      var _theparentAreaId=this.theparentAreaId
      this.loading=true
      var searchHotelurl=baseUrl.url().searchHotel
      this.$http.get(searchHotelurl,
        {
          params: {k: ''}
        },
        {
          emulateJSON: true
        },
      ).then((response) => {
        if (response.data.code==0) {
          var _list=response.data.data
          this.list=_list
          this.loading=false
          gethotelCode(this,_list)
        }
      }, (response) => {
        this.$message.error('请求出错')
      })

      var gethotelCode=function(that,_list){

        var thehotelquery=that.$route.query.thehotelCode
        if(!thehotelquery){
          return;
        }
        // console.log('909999999')
        that.thehotelCode=thehotelquery
        for (var i = 0; i < _list.length; i++) {
          var obj = _list[i];
          for (var x in obj) {
            if (x=== 'hotelCode' && obj[x] === thehotelquery) {
              that.tohotelName=obj.hotelName
              break;
            }
          }
        }
        //根据hotelCode获取列表
        var areasurl=baseUrl.url().areas+'/'+_theparentAreaId
        that.$http.get(areasurl,
          {
            params:{hotelCode:thehotelquery}
          },
          {
            emulateJSON: true
          },
        ).then((response) => {
          if (response.data.code==0) {
            var _entranceguardPointData=response.data.data
            for(var i=0;i<_entranceguardPointData.length;i++){
              _entranceguardPointData[i]['youjian']=false
            }
            that.entranceguardPointData=_entranceguardPointData

          }
        }, (response) => {
          that.$message.error('请求出错')
        })
        that.loading=false
        var _thehotelName=that.tohotelName

        that.treeHotelName.push({'hotelName':_thehotelName,id:_theparentAreaId,thehotelCode:that.thehotelCode})
        if(sessionStorage.getItem('treeHotelName')){
          that.treeHotelName=JSON.parse(sessionStorage.getItem('treeHotelName'))
        }
        if(_theparentAreaId==0){
          that.selectshow=true
        }else{
          that.selectshow=false
        }
      }
    },
  }
</script>

<style>
  .el-row {
    margin-top: 20px;
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-form-item {
    margin-bottom: 22px;
  }
  .el-col {
    border-radius: 4px;
    margin-bottom: 20px;
  }
  .bg-purple-dark {

    border:1px solid #99a9bf
  }
  .bg-purple {

    border:1px solid #99a9bf
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 80px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .parent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
  }

  .child {
    box-sizing: border-box;
    margin:10px;
    background-color: white;
    flex: 0 0 10%;
    height: 100px;
    border-radius: 4px;
    font-size:12px;
    position: relative;
  }
  .center{
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
  }
  .bottom{
    display: inline-block;
    position: absolute;
    width: 95%;
    height: 30px;
    line-height: 30px;
    text-align: right;
    left: -10px;
    right: 0px;
    top: 70px;
  }
  .thefont_size{
    font-weight:600
  }
  .a1{
    color:#16D032;
    border: 1px solid #16D032;
  }
  .a2{
    color:#409EFF;
    border: 1px solid #409EFF;
  }
  .a3{
    color:#E6A23C;
    border: 1px solid #E6A23C;
  }
  .el-message-box--center .el-message-box__status {
    position: relative;
    top: auto;
    padding-right: 5px;
    text-align: center;
    transform: translateY(0px);
  }
  .inputWidth{
    width:250px;
  }
  /*.cell{text-align: center}*/
</style>
