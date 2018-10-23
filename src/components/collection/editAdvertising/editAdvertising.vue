<template>
  <div>
    编辑广告
    <el-form :model="esAdvertisingForm" :rules="rules" ref="contentForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="类别" prop="viewContent">
        <el-select v-model="esAdvertisingForm.viewContent" placeholder="官方广告">
          <el-option v-for="(classify, index) in classifyList" :key="index" :label="classify.classifyName"
                     :value="classify.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="advertisingName">
        <el-input v-model="esAdvertisingForm.advertisingName" placeholder="首页Banner"></el-input>
      </el-form-item>
      <el-form-item label="相册图片" prop="picUrl">
        <div class="tupian">
          <img :src="esAdvertisingForm.picUrl" alt="" width="200px" height="100px">
          <span class="cancelImg" v-if="showpicUrl" @click="deleteImg($event,esAdvertisingForm.picUrl)">X</span>
        </div>
      </el-form-item>
      <el-form-item label="">
        <el-upload
          class="upload-demo el-right"
          :action="scriptUpload"
          :show-file-list=false
          :headers="setHeader"
          name="file"
          :on-success="filterScriptSuccess"
          list-type="picture-card">
          <el-button size="small" type="primary">
            图片上传
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="位置" prop="addressId">
        <el-select v-model="esAdvertisingForm.addressId" placeholder="首页">
          <el-option v-for="(address, index) in roleList" :key="index" :label="address.roleName"
                     :value="address.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容类型" prop="introduce">
        <template>
          <el-radio v-model="radio" label="1" @change="lianjie($event,1)" id="supeurl">超链接</el-radio>
          <el-radio v-model="radio" label="2" @change="tuIntroduce($event,2)" id="introdu">图文介绍</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="超链接URL" prop="superURL" v-show="chaolian">
        <el-input type="url" v-model="esAdvertisingForm.superURL"></el-input>
      </el-form-item>
      <el-form-item label="介绍内容" prop="introduce" v-show="introContent">
        <div>　
          <mavon-editor class="mavonEditor" v-model="introduceMsg" @save="showmsg" ref="showm" :subfield="false" :ishljs="false"/>
        </div>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input type="number" v-model="esAdvertisingForm.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="CancelContentForm('contentForm')">取消</el-button>
        <el-button type="primary" @click="editContentForm('contentForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    data () {
      var checksort = (rule, value, callback) => {
        // var reg =/\D/g/
        var re = new RegExp(/^[0-9]+$/)
        if(value===''){
          callback(new Error('请输入排序'))
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
      //url验证
      return {
        isDisabled: false,
        // officialId: "",
        isDis: true,
        radio: "1",
        chaolian: true,
        showpicUrl:true,
        // addressId: "",
        imgurl: "",
        introduceMsg:'',
        classifyId: "",
        introContent: false,
        editor: null,
        editorContent: "",
        // addEmployeeInfo: {
        //   picUrl: ''
        // },
        contentType: 1,
        roleList: [
          {
            id: 1,
            roleName: "首页"
          },
          {
            id: 2,
            roleName: "全部"
          }
        ],
        classifyList: [
          {
            id: 1,
            classifyName: "官方广告"
          }
        ],
        establist: [],
        esAdvertisingForm: {
          viewAdvertising: "",
          advertisingName: "",
          adverAdress: "",
          superURL: "",
          //还没有获取里面的内容注意王文本框里面没写数值
          sort: "",
          introduce: "",
          viewContent:"",
          picUrl: '',
          addressId:''
        },
        rules: {
          //现在只是简单的验证后面要改验证
          advertisingName: [
            {
              required: true,
              message: "请输入名称",
              trigger: "blur"
            }
          ],
          sort: [
            {
              validator: checksort,
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
          picUrl:[
            {
              required: true,
              message: '图片不能为空',
              trigger: 'blur'
            }
          ],
          addressId:[{
            required: true,
            message: '位置必选不能为空',
            trigger: 'blur'
          }
          ]
        }
      };
    },
    created: function () {
      this.initlist();
    },
    computed: {
      scriptUpload () {
        return "/galaxy-front/adv/picture/upload";
      },
      setHeader () {
        return {
          Session: sessionStorage.getItem('session_id'),
          enctype: "multipart/form-data"
        }
      },
    },
    mounted () {

    },
    methods: {
      ...mapActions([
        'editAdver'
      ]),
      showmsg(value,render){
        console.log(render)
        this.introduceMessage = render
      },
      //图片内容显示到对应的框中
      filterScriptSuccess (res, file, list) {
        if (res.data) {
          this.esAdvertisingForm.picUrl = res.data;
          this.showpicUrl=true;
        }
      },
      CancelContentForm(){
           this.$router.push({name:'advertising'})
      },
      initlist () {
        console.log(this.$store.state.editData);
        this.esAdvertisingForm.advertisingName = this.$store.state.editData.name;
        this.esAdvertisingForm.superURL = this.$store.state.editData.url;
        this.esAdvertisingForm.sort = this.$store.state.editData.sort;
        this.esAdvertisingForm.viewContent = this.$store.state.editData.type;
        this.esAdvertisingForm.addressId = this.$store.state.editData.location;
        this.imgurl = this.$store.state.editData.picture;
        this.esAdvertisingForm.picUrl = this.imgurl;
      },
      lianjie (e, num) {
        this.introContent = false
        this.chaolian = true
        this.contentType = num
      },
      tuIntroduce (e, num) {
        this.introContent = true
        this.chaolian = false
        this.contentType = num
      },
      //保存
      editContentForm (formname) {
        document.getElementsByClassName('fa-mavon-floppy-o')[0].click()
        // console.log(this.editor.getContent().length);
        var that = this;
        console.log(that.introduceMessage)
        console.log(that.esAdvertisingForm.superUR)
        this.$refs[formname].validate(valide => {
          if (valide) {
        //     console.log(this.contentType)
            if (this.contentType == 1) {
              that.introduceMessage = ''
            }
            else {
              that.esAdvertisingForm.superURL= ''

            }
            console.log( this.esAdvertisingForm.superUR)
            this.editAdver({
              id: that.$store.state.editData.id,
              type: that.esAdvertisingForm.viewContent,
              name: that.esAdvertisingForm.advertisingName,
              picture: that.esAdvertisingForm.picUrl,
              location: that.esAdvertisingForm.addressId,
              contentType: that.contentType,
              url: that.esAdvertisingForm.superURL,
              contents: that.introduceMessage,
              sort: that.esAdvertisingForm.sort,
              onsuccess: (body) => {
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                this.$router.push({ name: "advertising" });
              }
            })
          }
        })
      },
      deleteImg(e,url){
        console.log(e)
        console.log(url)
        this.esAdvertisingForm.picUrl=''
        console.log(url)
        this.showpicUrl=false

      }
    }
  }
</script>
<style lang="less" scoped>
  .el-upload-list--picture .el-upload-list__item {
    width: 100px !important;
  }

  .el-input {
    width: 400px;
  }

  #editor {
    width: 700px;
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

      background: #f7f7f7;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .mavonEditor{
    width:700px;
  }
  .tupian{
    width:200px;
    height:100px;
    position:relative;
    .cancelImg{
      position:absolute;
      top:-10px;
      right:0px;
      cursor: pointer;
      width:20px;
      height:20px;
      text-align: center;

    }
  }
</style>
