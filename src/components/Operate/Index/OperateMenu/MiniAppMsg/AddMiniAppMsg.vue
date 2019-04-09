<template>
  <div>
    <div class="module-wrapper">
      <div class="content_systemAdd">
          <div class="system-info">
            <div class="info-content">
              <div class="content-msg">
                <span>appID</span>
                <el-input class="el-right" v-model="appId" name="appId" v-validate="'required'"
                          :class="{'is-danger': errors.has('appId') }" placeholder="请输入appID"></el-input>
                <span class="help is-danger" v-show="errors.has('appId')">appId不能为空!</span>
              </div>
              <div class="content-msg">
                <span>template ID</span>
                <el-input class="el-right" v-model="templateId" name="templateId" v-validate="'required'"
                                :class="{'is-danger': errors.has('templateId') }" placeholder="请输入templateID"></el-input>
                <span class="help is-danger" v-show="errors.has('templateId')">templateID不能为空!</span>
              </div>
              <div class="content-msg">
                <span>template name</span>
                <el-input class="el-right" v-model="templateName" name="templateName" v-validate="'required'"
                                :class="{'is-danger': errors.has('templateName') }" placeholder="请输入template name"></el-input>
                <span class="help is-danger" v-show="errors.has('templateName')">templateName不能为空!</span>
              </div>
              <div class="content-btn">
                <el-button @click.native="nextStep">添加</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import '../../../../../assets/styles/system/index.less';

  export default {
    name: 'AddMiniAppMsg',
    data() {
      return {
        appId: '',
        templateId: '',
        templateName: ''
      }
    },
    methods: {
      ...mapActions([
        'addMiniAppMsg',
        'goto'
      ]),
      nextStep() {
        this.$validator.validateAll().then(result => {
          result && this.regist();
        });
      },
      regist() {
        this.addMiniAppMsg({
          app_id: this.appId,
          template_id: this.templateId,
          template_name: this.templateName,
          onsuccess: body => {
            this.goto(-1);
          }
        })
      }
    },
    mounted() {
      
    }
  }
</script>
<style scoped lang="less">
    .content-btn {
      width: 100%;
      margin-top: 53px;
      text-align: center;
      .el-button {
        width: 173px;
        line-height: 18px;
        background-color: #39C240;
        border-color: #39C240;
        border-radius: 0;
        color: #ffffff;
      }
    }
</style>
