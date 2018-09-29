<!--酒店组织对应区域，第三级包裹-->
<template>
  <div class="third_wrap">
    <div class="treeWrap">
      <div class="orgTitle">
        <span class="catalogue">搜索</span>
        <el-input placeholder="输入关键字进行筛选"
                  v-model="filterText">
        </el-input>
      </div>
      <div style="margin-top:1rem">
        <el-tree class="filter-tree"
                 :data="data3"
                 :props="defaultProps"
                 default-expand-all
                 :expand-on-click-node="false"
                 :filter-node-method="filterNode"
                 :check-on-click-node="true"
                 :highlight-current="true"
                 ref="tree2"
                 @node-click="handleNodeClick"
                 @check="bbb">
          <!--@check-change="choseNode(item,node,aaa)"-->
          <span class="custom-tree-node"
                slot-scope="{node, data}">
            <span>{{ node.label }}</span>
            <span>
              <el-button size="mini"
                         @click="() => append(data)"
                         v-show="node===checkedNode">
                +
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="rightWrap">
      <router-view></router-view>
    </div>
    <!--新增弹窗-->
    <div id="orgDialog">
      <el-dialog title="新增"
                 :visible.sync="showAddNew"
                 width="40%"
                 :custom-class="orgDialogClass">
        <div>
          <span class="right">名称：</span>
          <el-input v-model="input"
                    placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span class="right">类型：</span>
          <el-select v-model="value"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="bottomContent"
             v-if="value=='group'">
          <h4>集团信息</h4>
          <div class="item">
            <span class="right">企业名称：</span>
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">账户编码：</span>
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">企业简称：</span>
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">企业官网：</span>
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">联系人姓名：</span>
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">联系人职务：</span>
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">联系人电话：</span>
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
        </div>
        <!--添加酒店-->
        <div class="bottomContent"
             v-if="value=='hotel'">
          <h4>酒店信息</h4>
          <div class="item">
            <span class="right">所属品牌：</span>
            <el-select v-model="value"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <span class="right">门店类型：</span>
            <el-select v-model="value"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <span class="right">门店名称：</span>
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">门店编码：</span>
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">企业微信id：</span>
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
          <div class="item address">
            <span class="right">门店地址：</span>
            <el-select v-model="value"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <span class="right">详细地址：</span>
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">地址编码：</span>
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">前台电话：</span>
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">联系人姓名：</span>
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">联系人职务：</span>
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <span class="right">联系人电话：</span>
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click.native="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      filterText: '',
      input: '',

      data3: [
        {
          "name": "权限列表",
          "subPermissions": [
            {
              "permissionId": "1",
              "name": "第一权限",
              "tag": "root:one",
              "icon": null,
              "description": null,
              "nodeType": "MENU",
              "sortCode": null,
              "subPermissions": [
                {
                  "name": "第一权限子权限",
                  "tag": "root:one:one",
                  "icon": null,
                  "description": null,
                  "nodeType": "URL",
                  "sortCode": null,
                  "subPermissions": [],
                  "permissionId": "3"
                }
              ],
            },
            {
              "permissionId": "2",
              "name": "第二权限",
              "tag": "root:two",
              "icon": null,
              "description": null,
              "nodeType": "MENU",
              "sortCode": null,
              "subPermissions": [
                {
                  "permissionId": "3",
                  "name": "第二权限子权限",
                  "tag": "root:one:one",
                  "icon": null,
                  "description": null,
                  "nodeType": "URL",
                  "sortCode": null,
                  "subPermissions": [],
                },
                {
                  "permissionId": "3",
                  "name": "第二权限子权限",
                  "tag": "root:one:one",
                  "icon": null,
                  "description": null,
                  "nodeType": "URL",
                  "sortCode": null,
                  "subPermissions": [
                    {
                      "name": "第二权限子权限的子权限",
                      "tag": "root:one:one",
                      "icon": null,
                      "description": null,
                      "nodeType": "URL",
                      "sortCode": null,
                      "subPermissions": [],
                      "permissionId": "3"
                    }
                  ],
                }
              ],
            }, {
              "name": "第三权限",
              "tag": "root:two",
              "icon": null,
              "description": null,
              "nodeType": "MENU",
              "sortCode": null,
              "subPermissions": [],
              "permissionId": "2"
            }]
        }
      ],
      defaultProps: {
        children: 'subPermissions',
        label: 'name'
      },
      checkedNode: {},
      showAddNew: false,
      orgDialogClass: 'dialogOrg',
      options: [{
        value: 'group',
        label: '集团'
      }, {
        value: 'hotel',
        label: '酒店'
      }, {
        value: '选项3',
        label: '部门'
      }, {
        value: '选项4',
        label: '旅业'
      }],
      value: ''
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val);
    }
  },

  methods: {
    bbb (qq, ww) {
      console.log('qq:', qq)
      console.log('ww:', ww)
    },
    choseNode (item, node, aaa) {
      console.log('item:', item);
      console.log('node:', node);
      console.log('aaa:', aaa);
    },

    //树节点点击
    // handleNodeClick(data,node,comp){
    //     this.checkedNode=node;
    //     console.log('data:',data)
    //     console.log('node:',node)
    //     console.log('comp:',comp)
    // },
    filterNode (value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    append (data) {
      this.showAddNew = true
      // const newChild = { permissionId:1, name: 'testtest', subPermissions: [] };
      // if (!data.subPermissions) {
      //     this.$set(data, 'subPermissions', []);
      // }
      // data.subPermissions.push(newChild);

    },
    remove (node, data) {
      const parent = node.parent;
      const children = parent.data.subPermissions || parent.data;
      const index = children.findIndex(d => d.permissionId === data.permissionId);
      children.splice(index, 1);
    },
  }
}
</script>

<style lang="less" >
.third_wrap {
}
.el-button--mini {
  padding: 2px 10px;
  text-align: center;
}
.el-button--primary {
  background: #0eb4eb;
  border: 1px solid #0eb4eb;
}
.third_wrap {
  #orgDialog {
    .dialogOrg {
      text-align: left;
      .right {
        display: inline-block;
        text-align: right;
        width: 5.5rem;
      }
      .el-input {
        width: 60%;
        margin-bottom: 1rem;
      }
      .el-select {
        width: 25%;
        .el-input {
          width: 100%;
        }
      }
    }
  }
}
</style>
