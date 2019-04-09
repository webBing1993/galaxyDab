<template>
  <div>
    <div class="module-wrapper">
      <div class="content_system">
        <div class="data_title">
          <el-button type="success" @click.native="addMiniAppMsg">+添加小程序消息模板</el-button>
        </div>
        <table-miniappmsg :list="list" :page="page" :size="size" @edit="edit"></table-miniappmsg>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

      <el-dialog
        title="修改消息模板"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <div class="system-dialog">
          <div class="dialog_item">
            <span>appID</span>
            <el-input class="el-right" v-model="appId" name="appId" v-validate="'required'"
                      :class="{'is-danger': errors.has('appId') }" placeholder="请输入appId"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('appId')">appId不能为空!</span>
          <div class="dialog_item">
            <span>template ID</span>
            <el-input class="el-right" v-model="templateId" name="templateId" v-validate="'required'"
                      :class="{'is-danger': errors.has('templateId') }" placeholder="请输入templateId"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('templateId')">templateId不能为空!</span>
          <div class="dialog_item">
            <span>templateName</span>
            <el-input class="el-right" v-model="templateName" name="templateName" v-validate="'required'"
                      :class="{'is-danger': errors.has('templateName') }" placeholder="请输入templateName"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('templateName')">templateName不能为空!</span>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hideDialog">取 消</el-button>
          <el-button type="danger" @click="remove">删 除</el-button>
          <el-button type="primary" @click="submitDialog">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import '../../../../../assets/styles/system/index.less';

  export default {
    name: 'MiniAppList',
    data() {
      return {
        showDialog: false,
        list: [],
        page: 1,
        size: 20,
        total: 0,
        id: '',
        appId: '',
        templateId: '',
        templateName: ''
      }
    },
    methods: {
      ...mapActions([
        'getMiniAppMsgList',
        'modifyMiniAppMsg',
        'removeMiniAppMsg',
        'goto'
      ]),
      addMiniAppMsg() {
        this.goto({
          name: 'AddMiniAppMsg'
        })
      },
      edit(obj) {
        this.showDialog = true;

        this.id = obj.id;
        this.appId = obj.app_id;
        this.templateId = obj.template_id;
        this.templateName = obj.template_name;
      },
      hideDialog() {
        this.showDialog = false;
      },
      submitDialog() {
        this.$validator.validateAll().then(result => {
          result && this.modify();
        });
      },
      handleSizeChange(val) {
        this.size = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      modify() {
        this.modifyMiniAppMsg({
          id: this.id,
          app_id: this.appId,
          template_id: this.templateId,
          template_name: this.templateName,
          onsuccess: body => {
            this.showDialog = false;
            this.getList();
          }
        })
      },
      remove() {
        this.removeMiniAppMsg({
          id: this.id,
          onsuccess: body => {
            this.showDialog = false;
            this.getList();
          }
        })
      },
      getList() {
        this.getMiniAppMsgList({
          page: this.page.toString(),
          size: this.size.toString(),
          onsuccess: (body, headers) => {
            headers['x-current-page'] ? this.page = +headers['x-current-page'] : null;
            headers['x-total'] ? this.total = +headers['x-total'] : null;

            this.list = body.data;
          }
        })
      }
    },
    mounted() {
      this.getList();
    }
  }
</script>
<style scoped lang="less">
.el-dialog__footer {
          padding: 10px 20px 28px;
          .dialog-footer {
            text-align: center;
            .el-button {
              width: 25%;
              border-radius: 0;
              line-height: 18px;
              margin: 0;
              &:nth-child(1) {
                margin-right: 5%;
              }
              &:nth-child(2) {
                margin-right: 5%;
                background-color: #D0011B;
                border-color: #D0011B;
                color: #ffffff;
              }
              &:nth-child(3) {
                background-color: #39C240;
                border-color: #39C240;
                color: #ffffff;
              }
            }
            .el-button--primary {
              background-color: transparent;
              border: solid 1px #979797;
              color: #4A4A4A;
            }
          }
        }
</style>
