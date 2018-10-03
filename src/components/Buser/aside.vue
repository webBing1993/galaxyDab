<template>
  <div class="aside">
    <el-row :gutter="20" >
      <el-col :span="4">
        <div class="grid-content bg-aside">
          <el-row class="tac">
            <el-col :span="12">
              <h4>组织管理</h4>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">酒店组织</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">复创</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-document"></i>
                  <span slot="title">其他</span>
                </el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="12">
              <h4>用户管理</h4>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="3">
                  <i class="el-icon-document"></i>
                  <span slot="title">其他</span>
                </el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="12">
              <h4>权限管理</h4>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">酒店组织</span>
                </el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="12">
              <h4>角色模板管理</h4>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="3">
                  <i class="el-icon-document"></i>
                  <span slot="title">其他</span>
                </el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="12">
              <h4>角色管理</h4>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="3">
                  <i class="el-icon-document"></i>
                  <span slot="title">其他</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: 'Home',
        data () {
            const data = [{
                id: 1,
                label: '集团一',
                children: [{
                    id: 4,
                    label: '酒店一',
                    children: [{
                        id: 9,
                        label: '部门一'
                    }, {
                        id: 10,
                        label: '部门二'
                    }]
                }]
            }, {
                id: 2,
                label: '集团二',
                children: [{
                    id: 5,
                    label: '城市一',
                    children: [{
                        id: 9,
                        label: '酒店一'
                    }, {
                        id: 10,
                        label: '酒店二'
                    }]
                }, {
                    id: 6,
                    label: '酒店'
                }]
            }, {
                id: 3,
                label: '集团三',
                children: [{
                    id: 7,
                    label: '酒店一'
                }, {
                    id: 8,
                    label: '酒店二'
                }]
            }];
            return {
                data4: JSON.parse(JSON.stringify(data)),
                data5: JSON.parse(JSON.stringify(data))
            }
        },
        methods:{
            append(data) {
                const newChild = { id: id++, label: 'testtest', children: [] };
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },

            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },

            // renderContent(h, { node, data, store }) {
            //     return (
            //         <span class="custom-tree-node">
            //         <span>{node.label}</span>
            //     <span>
            //     <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
            //     <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            //     </span>
            //     </span>);
            // }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" scoped>


</style>
