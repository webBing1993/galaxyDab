<template>
  <div>
    编辑基本信息
    <el-form :model="contentForm" :rules="rules" ref="contentForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="类别" prop="viewContent">
        <el-select v-model="contentForm.viewContent" placeholder="请选择分类">
          <el-option v-for="(item, index) in classifyList" :key="index" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="contentName">
        <el-input v-model="contentForm.contentName" ref="id"></el-input>
      </el-form-item>
      <el-form-item label="相册图片" prop="imgarr">
        <div v-for="(item,index) in contentForm.imgarr" :key="index" class="tupian">
          <img :src="item.url" alt="" width="150px" height="150px">
          <span class="cancelImg" @click="deleteImg($event,item.url,item.sort,item.isCover,index)">X</span>
          <!--<p class="bgf" @click="setCover($event,item.url,item.sort,item.isCover)">设为封面</p>-->
          <div v-if="item.isCover=='y'"><p class="bgf">封面图片</p></div>
          <div v-else><p class="bgf" @click="setCover($event,item.url,item.sort,item.isCover)">设为封面</p></div>
        </div>
        <el-upload
          class="upload-demo el-right"
          :action="scriptUpload"
          :show-file-list=false
          :headers="setHeader"
          name="file"
          :on-success="filterScriptSuccess"
          list-type="picture-card">
          <el-button size="small" type="primary" margin-left="0px">
            选择文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item style="color:#ccc;height:0px;margin-top: 30px;">
        建议图片尺寸750px*600px或4：3，JPG.PNG格式，图片小于2M
      </el-form-item>
      <el-form-item label="电话" prop="phone" style="margin-top:40px">
        <el-input v-model="contentForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="省/市/区" prop="selectedOptions">
        <el-cascader size="large" :options="options" v-model="contentForm.selectedOptions" @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="contentForm.address" autocomplete="off" id="suggestId" name="address_detail"></el-input>
        <div style="color:#ccc">请输入详细街道地址</div>
      </el-form-item>
      <el-form-item label="获取定位">
        <div>
          <div id="allmap"></div>
          <div>
            经度<input type="text" v-model="longitude" disabled>
            纬度<input type="text" v-model="latitude" disabled>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="介绍" prop="introduceMsg">
        <div>　
          <mavon-editor class="mavonEditor" v-model="contentForm.introduceMsg" @save="showmsg" ref="showm" :subfield="false" :ishljs="false"/>
        </div>
      </el-form-item>
      <el-form-item label="排序" prop="contentSort">
        <el-input v-model="contentForm.contentSort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="CancelContentForm('contentForm')">取消</el-button>
        <el-button type="primary" @click="SaveContentForm('contentForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
  import { regionData } from "element-china-area-data";
  import {mapActions} from 'vuex'
  export default {
    data() {
      var checksort = (rule, value, callback) => {
        var re = new RegExp(/^[0-9]+$/)
        if(!value){
          callback()
        }
        else if(value>=6||value<1){
          callback(new Error('序号在1-5之间'))
        }
        else if(!re.test(value)){
          callback(new Error('输入的必须是数字'))
        }
        else{
          callback();
        }
      }
      var checkphone =(rule,value,callback)=>{
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(value===''){
          return true
        }
        else if(!myreg.test(value)){
          callback(new Error('手机号输入不正确'))
        }
        else{
          callback();
        }

      }
      return {
        address_detail: null, //详细地址
        userlocation: {lng: "", lat: ""},
        editor: null,
        editorContent: "",
        picturesort: 1,
        backgroundCover:'设为封面',
        backCover:'封面图片',
        options: regionData,
        classifyList:[],
        isCover: "n",
        cover: "y",
        showClassify: [],
        cityCode: "",
        introduceMessage:'',
        longitude: "",
        latitude: "",
        addEmployeeInfo: {
          picUrl: ''
        },
        contentForm: {
          viewContent: "",
          contentName: "",
          phone: "",
          address: "",
          //还没有获取里面的内容注意王文本框里面没写数值
          contentSort: "",
          imgarr:[],
          selectedOptions:[],
          introduceMsg:''
        },
        rules: {
          //现在只是简单的验证后面要改验证
          contentName: [
            {
              required: true,
              message: "请输入用户名称",
              trigger: "blur"
            }
          ],
          selectedOptions:[{
            required:true,
            message:'请选择省市区',
            trigger:'blur'
          }
          ],
          imgarr:[{
            required:true,
            message:'图片不能为空',
            trigger:'blur'

          }
          ],
          introduceMsg:[
            {
              required:true,
              message:'请输入内容',
              trigger:'blur'
            }
          ],
          address: [
            {
              required: true,
              message: "请输入地址",
              trigger: "blur"
            }
          ],
          viewContent:[
            {
              required: true,
              message: "请选择分类",
              trigger: "blur"
            }
          ],
          contentSort: [
            {
              validator: checksort,
              trigger: "blur"
            }
          ],
        }
      };
    },
    created: function() {
      this.initlist();
    },
    computed: {
      scriptUpload() {
        return "/galaxy-front/adv/picture/upload";
      },
      setHeader() {
        return {
          Session: sessionStorage.getItem('session_id'),
          enctype: "multipart/form-data"
        }
      }
    },
    mounted() {
      this.myFocus()
      this.$nextTick(function () {
        var th = this
        // 创建Map实例
        var map = new BMap.Map("allmap");
        // 初始化地图,设置中心点坐标，
        var point = new BMap.Point(121.160724,31.173277); // 创建点坐标，汉得公司的经纬度坐标
        map.centerAndZoom(point, 15);
        map.enableScrollWheelZoom();
        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
          {
            "input": "suggestId"
            , "location": map
          })
        var myValue
        ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
          var _value = e.item.value;
          myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
          th.address_detail = myValue
          setPlace();
        });

        function setPlace() {
          map.clearOverlays();    //清除地图上所有覆盖物
          function myFun() {
            th.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            map.centerAndZoom(th.userlocation, 18);
            map.addOverlay(new BMap.Marker(th.userlocation));    //添加标注
          }

          var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
          });
          local.search(myValue);

          //测试输出坐标（指的是输入框最后确定地点的经纬度）
          map.addEventListener("click",function(e){
            //经度
            th.longitude = th.userlocation.lng
            th.latitude = th.userlocation.lat

          })
        }
      })
    },
    methods: {
      ...mapActions([
        'editCon',
        'findAllClassify'
      ]),
      showmsg(value,render){
        console.log(render)
        this.introduceMessage = render
      },
      myFocus:function(){
        this.$refs.id.focus();
      },
      filterScriptSuccess(res, file, list) {
        if (res.data) {
          this.addEmployeeInfo.picUrl = res.data;
          if(this.contentForm.imgarr.length<5){
            this.contentForm.imgarr.push({
              url: this.addEmployeeInfo.picUrl,
              sort:String(Math.floor(Math.random() * 5 + 1)),
              isCover: "n"
            })
            this.contentForm.imgarr[0].isCover ='y'
          }
          else{
            this.$message({
              type: 'error',
              message: '图片只能有5张!'
            })

          }
        }
      },
      initlist() {
        console.log(this.$store.state.editContentData.cityCode)
        let service = this.$store.state.editContentData.cityCode.substring(0,2)+'0000'
        let city = this.$store.state.editContentData.cityCode.substring(0,4)+'00'
        let xian = this.$store.state.editContentData.cityCode
        this.contentForm.contentName = this.$store.state.editContentData.name;
        this.contentForm.phone = this.$store.state.editContentData.phone;
        this.contentForm.address = this.$store.state.editContentData.address2;
        this.contentForm.contentSort = this.$store.state.editContentData.sort;
        this.contentForm.viewContent = this.$store.state.editContentData.categoryId;
        this.contentForm.imgarr = this.$store.state.editContentData.pictures;
        this.contentForm.introduceMsg =this.$store.state.editContentData.description2
        this.longitude = this.$store.state.editContentData.longitude
        this.latitude = this.$store.state.editContentData.latitude
        this.contentForm.selectedOptions = [service,city,xian]
        this.cityCode = this.$store.state.editContentData.cityCode
        this.findAllClassify({
          onsuccess:(body)=>{
            // console.log(body.data)
            this.classifyList = body.data;
          }
        })
      },
      CancelContentForm(){
        this.$router.push({name:'content'})

      },
      SaveContentForm(formname) {
        document.getElementsByClassName('fa-mavon-floppy-o')[0].click()
        let pictures = this.contentForm.imgarr
        this.$refs[formname].validate(valide => {
          if (valide) {
        this.editCon({
          id: this.$store.state.editContentData.id,
          catalogId: this.contentForm.viewContent,
          name: this.contentForm.contentName,
          picture: JSON.stringify(pictures),
          phone: this.contentForm.phone,
          address: this.contentForm.address,
          description: this.introduceMessage,
          sort: this.contentForm.contentSort,
          cityCode: this.cityCode,
          longitude: this.longitude,
          latitude: this.latitude,
          onsuccess: body => {
            console.log(body)
            if (body.errcode === '0') {
              this.$router.push({name: "content"});
            }
          }
        })
          }
        })
      },
      handleChange(value) {
        this.cityCode = value[value.length-1]
        value.forEach((item,index)=>{
          if(value[index] == ''){
            this.cityCode = value[index-1]
          }
        })
      },
      setCover(e, img, sort, cover) {
        console.log(img);

        this.$message({
          type: "success",
          message: "设置此张图片为背景图片!"
        });
        this.contentForm.imgarr.forEach(item => {
          if (item.url == img) {
            item.isCover = "y";
            console.log(item.url);
          } else {
            item.isCover = "n";
          }
        });
      },
      deleteImg(e, img, sort, cover,index){
        this.contentForm.imgarr.splice(index,1)


      },
    },
  };
</script>
<style lang="less" scoped>
  .el-input {
    width: 400px;
  }

  #editor {
    width: 700px;
    position:relative;
  }
  .file {
    float: left;
    line-height: 25px;
    margin-top: 60.5px;
    margin-left: 50px;
  }
  .tpicture {
    line-height: 150px;
    .picture {
      width: 150px;
      height: 150px;
      float: left;
      margin-right: 40px;
      background: #f7f7f7;
      img {
        width: 100%;
        height: 100%;
        border: none;
      }
    }
  }
  .bgf {
    width: 150px;
    text-align: center;
    cursor: pointer;
  }
  .tupian{
    float:left;
    position:relative;
    margin-left:10px;
    margin-bottom:20px;
    .cancelImg{
      position:absolute;
      top:-10px;
      right:0px;
      cursor: pointer;
      width:20px;
      height:20px;
      line-height:20px;
      text-align: center;
      border:1px solid  #ccc;
      background-color: #ccc;
      border-radius: 50% ;

    }

  }
  .mavonEditor{
    width:700px;
  }
  #allmap{
    width: 700px;
    height: 300px;
    font-family: "微软雅黑";
    border:1px solid green;
  }
  /deep/ .el-upload--picture-card {
    background-color: #ffffff;
    border: none;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 0px;
    height: 0px;
    line-height: 0px;
    vertical-align: top;
  }
  /deep/ .el-button {
    margin-top:50px;
    margin-left:20px;
  }
</style>
