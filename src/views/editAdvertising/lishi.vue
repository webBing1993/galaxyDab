<template>
  <div>
    编辑广告
    <el-form :model="esAdvertisingForm" :rules="rules" ref="contentForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="类别" prop="viewAdvertising">
        <el-select v-model="esAdvertisingForm.viewAdvertising" placeholder="官方广告">
            <el-option
                 v-for="(classify, index) in classifyList"
                  :key="index"
                  :label="classify.classifyName"
                  :value="classify.id"
                >
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="advertisingName">
        <el-input v-model="esAdvertisingForm.advertisingName" placeholder="首页Banner"></el-input>
      </el-form-item>
      <el-form-item label="相册图片">
          <el-upload  action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
          :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
          <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="位置" prop="adverAdress">
        <el-select v-model="addressId" placeholder="首页">
              <el-option
                 v-for="(address, index) in roleList"
                  :key="index"
                  :label="address.roleName"
                  :value="address.id"
                >
                </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容类型" prop="introduce">
        <template>
          <el-radio v-model="radio" label="1" @change="lianjie">超链接</el-radio>
          <el-radio v-model="radio" label="2" @change="tuIntroduce">图文介绍</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="超链接URL" prop="superURL"  v-show="chaolian">
        <el-input type="url" v-model="esAdvertisingForm.superURL"></el-input>
      </el-form-item>
      <el-form-item label="介绍内容" prop="introduce"  v-show="introContent">
          <div>　
          <!--editor的div为富文本的承载容器-->
          　　<div id="editor" v-model="esAdvertisingForm.introduce"></div>
          <!-- 　　<button type="" @click="gettext">点击</button> -->
        </div>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="esAdvertisingForm.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="CancelContentForm('contentForm')">取消</el-button>
        <el-button type="primary" @click="SaveContentForm('contentForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "1",
      chaolian: true,
      addressId: "",
      classifyId: "",
      introContent: false,
      editor: null,
      editorContent: "",
      roleList: [{ id: 1, roleName: "首页" }, { id: 2, roleName: "正文" }],
      classifyList: [{ id: 1, classifyName: "官方广告" }],
      establist: [],
      esAdvertisingForm: {
        viewAdvertising: "",
        advertisingName: "",
        adverAdress: "",
        superURL: "",
        //还没有获取里面的内容注意王文本框里面没写数值
        sort: "",
        introduce: "",
        superURL: ""
      },
      fileList2: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      rules: {
        //现在只是简单的验证后面要改验证
        viewAdvertising: [
          {
            required: true,
            message: "请选择类别",
            trigger: "blur"
          }
        ],
        advertisingName: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ],
        adverAdress: [
          {
            required: true,
            message: "请选择位置",
            trigger: "blur"
          }
        ],
        adverSort: [
          {
            required: true,
            message: "排序不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    uploadDisabled: function() {
      return this.fileList2.length > 0;
    }
  },
  created: function() {
    this.initlist();
  },
  methods: {
    //图片内容显示到对应的框中
    initlist() {
      console.log(this.$store.state.editData);
      console.log(this.$store.state.editData.contents);
      this.esAdvertisingForm.advertisingName = this.$store.state.editData.name;
      this.esAdvertisingForm.superURL = this.$store.state.editData.url;
      this.esAdvertisingForm.sort = this.$store.state.editData.sort;
    },
    //上传图片的两种方法
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    lianjie(num) {
      this.introContent = false;
      this.chaolian = true;
    },
    tuIntroduce(num2) {
      console.log(num2);
      this.introContent = true;
      this.chaolian = false;
    },
    gettext() {
      // 获取editor中的文本
      // console.log(this.editor.getContent());
    },
    //保存
    SaveContentForm() {
      console.log(this.editor.getContent());
    }
  },
  destroyed() {
    // 将editor进行销毁

    this.editor.destroy();
  },
  mounted() {
    // 实例化editor编辑器

    this.editor = UE.getEditor("editor"); // console.log(this.editor.setContent("1223"))
  }
};
</script>
<style scoped>
.el-upload-list--picture .el-upload-list__item {
  width: 100px !important;
}

.el-input {
  width: 400px;
}
#editor {
  width: 700px;
}
/* .disabled .el-button {
  display: none;
} */
</style>
