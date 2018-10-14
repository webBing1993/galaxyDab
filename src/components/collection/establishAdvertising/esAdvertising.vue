<template>
  <div>
    创建广告
    <el-form :model="esAdvertisingForm" :rules="rules" ref="contentForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="类别">
        <el-select v-model="officialId" placeholder="官方广告">
          <el-option v-for="(classify, index) in classifyList" :key="index" :label="classify.classifyName" :value="classify.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="advertisingName">
        <el-input v-model="esAdvertisingForm.advertisingName" placeholder="首页Banner"></el-input>
      </el-form-item>
      <el-form-item label="相册图片" class="tpicture">
        <div class="picture">
        <img :src="imgurl">
        </div>
        <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update($event)"/>
      </el-form-item>
      <el-form-item label="位置">
        <el-select v-model="addressId" placeholder="首页">
          <el-option v-for="(address, index) in roleList" :key="index" :label="address.roleName" :value="address.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容类型" prop="introduce">
        <template>
          <el-radio v-model="radio" label="1"  @change="lianjie($event,1)" id="supeurl">超链接</el-radio>
          <el-radio v-model="radio" label="2" @change="tuIntroduce($event,2)" id="introdu">图文介绍</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="超链接URL" prop="superURL" v-show="chaolian">
        <el-input type="url" v-model="esAdvertisingForm.superURL"></el-input>
      </el-form-item>
      <el-form-item label="介绍内容" prop="introduce" v-show="introContent">
        <div>
          <!--editor的div为富文本的承载容器-->
          <div id="editor"></div>
        </div>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.number="esAdvertisingForm.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="CancelContentForm('contentForm')">取消</el-button>
        <el-button type="primary" @click="SaveContentForm('contentForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      isDisabled: false,
      officialId: '',
      isDis: true,
      radio: '1',
      chaolian: true,
      addressId: '',
      imgurl: '',
      classifyId: '',
      introContent: false,
      editor: null,
      editorContent: '',
      contentType: 1,
      roleList: [
        {
          id: 1,
          roleName: '首页'
        },
        {
          id: 2,
          roleName: '正文'
        }
      ],
      classifyList: [
        {
          id: 1,
          classifyName: '官方广告'
        }
      ],
      establist: [],
      esAdvertisingForm: {
        viewAdvertising: '',
        advertisingName: '',
        adverAdress: '',
        superURL: '',
        // 还没有获取里面的内容注意王文本框里面没写数值
        sort: '',
        introduce: ''
      },
      rules: {
        // 现在只是简单的验证后面要改验证
        advertisingName: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ],
        sort: [
          {
            required: true,
            type: 'number',
            message: '请输入排序并且为数值类型',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  mounted () {
    // 实例化editor编辑器
    this.editor = UE.getEditor('editor',{
      BaseUrl: '',
      UEDITOR_HOME_URL: 'static/Ueditor/',
    }) // console.log(this.editor.setContent("1223"))
    UE.getEditor('editor').render('editor')
  },
  methods: {
    ...mapActions([
      'updateMsg',
      'saveAdver'
    ]),
    // 图片内容显示到对应的框中
    update (e) {
      let file = e.target.files[0]
      let param = new FormData() // 创建form对象
      param.append('file', file, file.name) // 通过append向form对象添加数据
      param.append('chunk', '0') // 添加form表单中其他数据
      // console.log(e)
      // let config = {
      //   headers: { 'Content-Type': 'multipart/form-data'}
      // } // 添加请求头
      // this.axios
      //   .post(
      //     'http://qa.fortrun.cn:9201/adv/picture/upload',
      //     param,
      //     config
      //   )
      //   .then(response => {
      //     console.log(response.data.data)
      //     this.imgurl = response.data.data
      //   })
      this.updateMsg({
        file:param,
        onsuccess: body => {
          console.log(body)
          // if (body.data) {
          //   console.log(body)
          //  // this.imgurl = response.data
          // } else {
          // }
        }
      })
    },
    lianjie (e, num) {
      this.introContent = false
      this.chaolian = true

      this.contentType = num
      console.log(this.contentType)
    },
    tuIntroduce (e, num) {
      this.introContent = true
      this.chaolian = false
      this.contentType = num
      console.log(this.contentType)
    },
    // 保存
    SaveContentForm (formname) {
      if (
        (this.editor.getContent().length === 0 &&
          this.esAdvertisingForm.superURL.length !== 0) ||
        (this.editor.getContent().length !== 0 &&
          this.esAdvertisingForm.superURL.length === 0)
      ) {
        this.$refs[formname].validate(valide => {
          if (valide) {
            this.saveAdver({
              body:{
                type: this.officialId,
                    name: this.esAdvertisingForm.advertisingName,
                    picture: '1.jpg',
                    location: this.addressId,
                    contentType: this.contentType,
                    url: this.esAdvertisingForm.superURL,
                    contents: this.editor.getContent(),
                    sort: this.esAdvertisingForm.sort
              },
              onsuccess: body => {
              console.log(body)
              }
            })
            // this.axios
            //   .post('http://qa.fortrun.cn:9201/adv/add', {
            //     type: this.officialId,
            //     name: this.esAdvertisingForm.advertisingName,
            //     picture: this.imgurl,
            //     location: this.addressId,
            //     contentType: this.contentType,
            //     url: this.esAdvertisingForm.superURL,
            //     contents: this.editor.getContent(),
            //     sort: this.esAdvertisingForm.sort
            //   })
            //   .then(res => {
            //     // console.log(res);
            //     if (res.status === 200) {
            //       this.$message({
            //         type: 'success',
            //         message: '创建广告成功!'
            //       })
            //       this.$router.push({ name: 'advertising' })
            //     }
            //   })
          }
        })
      } else {
        this.$message({
          type: 'error',
          message: '内容类型必须填写只能选择一种'
        })
      }
    },
    // 取消
    CancelContentForm () {
      this.$router.push({ name: 'advertising' })
    }
  },
  destroyed () {
    // 将editor进行销毁
    // this.editor.destroy()
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
</style>
