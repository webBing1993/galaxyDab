<template>
  <div>
    编辑基本信息
    <el-form :model="contentForm" :rules="rules" ref="contentForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="类别" prop="viewContent">
      <el-select v-model="selectClassify" placeholder="请选择分类">
          <el-option v-for="(item, index) in (this.$store.state.addClaData)" :key="index" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="contentName">
        <el-input v-model="contentForm.contentName"></el-input>
      </el-form-item>
      <el-form-item label="相册图片" class="tpicture">
        <div class="picture" v-for="(item,index) in imgarr" :key="index">
        <img :src="item.url">
        <p class="bgf" @click="setCover($event,item.url,item.sort,item.isCover)">设为封面</p>
        </div>
        <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update($event)"/>
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
          　　<div id="editor"></div>
          <!-- 　　<button type="" @click="gettext">点击</button> -->
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
export default {
  components: {
    BMapComponent
  },
  data() {
    return {
      lianxi: "",
      selectClassify: "",
      editor: null,
      picturesort: 1,
      options: regionDataPlus,
      selectedOptions: [],
      imgurl: "",
      imgarr: [],
      isCover: "n",
      cover: "y",
      showClassify: [],
      cityCode: "",
      longitude: "31.2304324029",
      latitude: "121.4737919321",
      contentForm: {
        viewContent: "",
        contentName: "",
        phone: "",
        address: "",
        //还没有获取里面的内容注意王文本框里面没写数值
        contentSort: ""
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
        phone: [
          {
            required: true,
            message: "请输入电话号码",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入地址",
            trigger: "blur"
          }
        ],
        introduce: [
          {
            required: true,
            message: "介绍不为空",
            trigger: "blur"
          }
        ],
        contentSort: [
          {
            required: true,
            message: "排序不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created: function() {
    this.initlist();
  },
  methods: {
    initlist() {
      console.log(this.$store.state.editContentData);
      // this.contentForm = this.$store.state.editContentData;
      this.contentForm.contentName = this.$store.state.editContentData.name;
      this.contentForm.phone = this.$store.state.editContentData.phone;
      this.contentForm.address = this.$store.state.editContentData.address;
      this.contentForm.contentSort = this.$store.state.editContentData.sort;
      this.selectClassify = this.$store.state.editContentData.categoryName;
      this.imgarr = this.$store.state.editContentData.pictures;
    },
    update(e) {
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append("file", file, file.name); //通过append向form对象添加数据
      param.append("chunk", "0"); //添加form表单中其他数据

      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      }; //添加请求头
      this.axios
        .post("http://qa.fortrun.cn:8121/upload/image", param, config)
        .then(res => {
          if (res.status == 200) {
            this.imgarr.push({
              // imgAdress: res.data.data,
              url: res.data.data,
              sort: Math.floor(Math.random() * 5 + 1),
              isCover: "n"
            });
          }
        });
    },
    SaveContentForm(formname) {
      let pictures = this.imgarr;
      let postData = qs.stringify(
        {
          id: this.$store.state.editContentData.id,
          catalogId: this.selectClassify,
          name: this.contentForm.contentName,
          pictures: JSON.stringify(pictures),
          phone: this.contentForm.phone,
          address: this.contentForm.address,
          description: this.editor.getContent(),
          sort: this.contentForm.contentSort,
          cityCode: this.cityCode,
          longitude: this.longitude,
          latitude: this.latitude
        },
        { indices: false }
      );
      this.axios({
        url: "http://qa.fortrun.cn:8121/discoveryContent/update",
        method: "post",
        data: postData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.$router.push({ name: "content" });
        }
      });
    },
    destroyed() {
      // 将editor进行销毁

      this.editor.destroy();
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
      this.imgarr.forEach(item => {
        if (item.url == img) {
          item.isCover = "y";
          console.log(item.url);
          // console.log(item.isCover);
        } else {
          item.isCover = "n";
        }
      });
      console.log(this.imgarr);
    }
  },
  mounted() {
    this.editor = UE.getEditor('editor',{
      BaseUrl: '',
      UEDITOR_HOME_URL: 'static/Ueditor/',
    }) // console.log(this.editor.setContent("1223"))
    UE.getEditor('editor').render('editor')
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
</style>
