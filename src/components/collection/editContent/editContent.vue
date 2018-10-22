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
        <el-input v-model="contentForm.contentName"></el-input>
      </el-form-item>
      <el-form-item label="相册图片" prop="imgarr">
        <div v-for="(item,index) in contentForm.imgarr" :key="index" class="tupian">
          <img :src="item.url" alt="" width="200px" height="100px">
          <span class="cancelImg" @click="deleteImg($event,item.url,item.sort,item.isCover,index)">X</span>
          <p class="bgf" @click="setCover($event,item.url,item.sort,item.isCover)">设为封面</p>
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
            图片上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="电话" prop="phone" style="margin-top:70px">
        <el-input v-model="contentForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="省/市/区">
        <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="contentForm.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="获取定位">
        <div>
          <b-map-component></b-map-component>
        </div>
      </el-form-item>
      <el-form-item label="介绍" prop="introduce">
        <div>　
          <!--editor的div为富文本的承载容器-->
          <div id="editor" style="width:700px;height:300px;"></div>
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
  import { regionDataPlus } from "element-china-area-data";
  import BMapComponent from "@/components/collection/BMapComponent";
  import qs from "qs";
  import {mapActions} from 'vuex'
  export default {
    components: {
      BMapComponent
    },
    data() {
      var checksort = (rule, value, callback) => {
        // var reg =/\D/g/
        var re = new RegExp(/^[0-9]+$/)
        if(value===''){
          callback(new Error('请输入排序'))
        }
        else if(value>=6||value<1){
          callback(new Error('序号在0-5之间'))
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
        editor: null,
        editorContent: "",
        picturesort: 1,
        options: regionDataPlus,
        selectedOptions: [],
        classifyList:[],
        // imgarr: [],
        isCover: "n",
        cover: "y",
        showClassify: [],
        cityCode: "",
        longitude: "31.2304324029",
        latitude: "121.4737919321",
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
          imgarr:[]
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
          // phone: [
          //   {
          //     validator: checkphone,
          //     trigger: "blur"
          //   }
          // ],
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
              required: true,
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
      this.initUeditor();
    },
    methods: {
      ...mapActions([
        'editCon',
        'findAllClassify'
      ]),
      filterScriptSuccess(res, file, list) {
        if (res.data) {
          this.addEmployeeInfo.picUrl = res.data;
          this.contentForm.imgarr.push({
            url: this.addEmployeeInfo.picUrl,
            sort: this.contentForm.contentSort,
            isCover: "n"
          });
        }
      },
      initlist() {
        console.log(this.$store.state.editContentData)
        this.contentForm.contentName = this.$store.state.editContentData.name;
        this.contentForm.phone = this.$store.state.editContentData.phone;
        this.contentForm.address = this.$store.state.editContentData.address;
        this.contentForm.contentSort = this.$store.state.editContentData.sort;
        this.contentForm.viewContent = this.$store.state.editContentData.categoryId;
        this.contentForm.imgarr = this.$store.state.editContentData.pictures;
        this.findAllClassify({
          onsuccess:(body)=>{
            console.log(body.data)
            this.classifyList = body.data;
          }
        })
      },
      initUeditor(){
        UE.delEditor('editor');
        this.editor = UE.getEditor('editor', {
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/Ueditor/',
          serverUrl:   "http://qa.fortrun.cn:9201/adv/ueditor/upload",
        }); // 初始化UE
        this.editor.addListener("ready", () => {
          this.editor.execCommand('insertHtml', this.editorContent);
          this.editor.focus() // 确保UE加载完成后，放入内容。
          this.editor.setContent(this.$store.state.editContentData.description);
        })
      },
      getContent() { // 获取内容方法
        return this.editor.getContent()
      },
      clearContent() { // 清空编辑器内容
        return this.editor.execCommand('cleardoc');
      },
      CancelContentForm(){
        this.$router.push({name:'content'})

      },
      SaveContentForm(formname) {
        let pictures = this.contentForm.imgarr
        // this.$refs[formname].validate(valide => {
        //   if (valide) {
        this.editCon({
          id: this.$store.state.editContentData.id,
          catalogId: this.contentForm.viewContent,
          name: this.contentForm.contentName,
          picture: JSON.stringify(pictures),
          phone: this.contentForm.phone,
          address: this.contentForm.address,
          description: this.editor.getContent(),
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
        //   }
        // })
      },
      handleChange(value) {
        this.cityCode = value[2];
        console.log(this.cityCode);
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
            // console.log(item.isCover);
          } else {
            item.isCover = "n";
          }
        });
      },
      deleteImg(e, img, sort, cover,index){
        console.log(e)
        console.log(img)
        console.log(sort)
        console.log(cover)
        console.log(index)
        console.log(this.contentForm.imgarr)
        this.contentForm.imgarr.splice(index,1)
        console.log(this.contentForm.imgarr)

      },
    },
    destroyed () {
      // 将editor进行销毁
      // this.editor.destroy();
    },
    beforeDestroy() {
      // 组件销毁的时候，要销毁 UEditor 实例
      if (this.editor !== null && this.editor.destroy) {
        this.editor.destroy();
      }
    }
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
