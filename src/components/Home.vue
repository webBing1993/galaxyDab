<<<<<<< HEAD
<template>
  <div class="buser_app">
    <nav>
      <h1>生态酒店基础服务平台</h1>
      <div class="tabs">
        <div class="tab"
             @click="toggleTab('Home')">
          <a>B端用户管理</a>
        </div>
        <div class="tab"
             @click="toggleTab('Whome')">
          <a>配置管理</a>
        </div>
      </div>
    </nav>
    <div class="first_wrap">
      <router-view></router-view>
    </div>

  </div>

</template>

<script>
import Home from "@/components/Home";
import Whome from "@/views/Whome";
export default {
  name: "Home",
  data() {
    const data = [
      {
        id: 1,
        label: "集团一",
        children: [
          {
            id: 4,
            label: "酒店一",
            children: [
              {
                id: 9,
                label: "部门一"
              },
              {
                id: 10,
                label: "部门二"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "集团二",
        children: [
          {
            id: 5,
            label: "城市一",
            children: [
              {
                id: 9,
                label: "酒店一"
              },
              {
                id: 10,
                label: "酒店二"
              }
            ]
          },
          {
            id: 6,
            label: "酒店"
          }
        ]
      },
      {
        id: 3,
        label: "集团三",
        children: [
          {
            id: 7,
            label: "酒店一"
          },
          {
            id: 8,
            label: "酒店二"
          }
        ]
      }
    ];
    return {
      data4: JSON.parse(JSON.stringify(data)),
      data5: JSON.parse(JSON.stringify(data))
    };
  },
  components: {
    // 声明子组件
    Home,
    Whome
  },
  methods: {
    toggleTab: function(tab) {
      if (tab === "Home") {
        this.$router.push({ path: "/buser/hotelOrg" });
      } else {
        this.$router.push({ name: "Whome" });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.buser_app {
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: relative;
  nav {
    position: fixed;
    height: 4.5rem;
    width: 100%;
    background-color: #f5f8f8;
    margin-bottom: 1rem;
    display: block;

    h1 {
      text-align: left;
      float: left;
      padding-top: 1rem;
      margin-left: 8rem;
      width: 25%;
    }
    .tabs {
      position: absolute;
      width: 20%;
      left: 40%;
      top: 3rem;
    }
    .tab {
      a {
        font-size: 16px;
        color: #000;
      }
      &:hover {
      }
    }
    .tab:first-child {
      float: left;
    }
    .tab:nth-child(2) {
      float: right;
    }
  }
  .first_wrap {
    margin-top: 5.5rem;
    width: 100%;
    height: 88%;
    /*overflow: scroll;*/
    /*height:500px ;*/
    background: #eaedf0;
  }
}
</style>
=======
<template>  <div class="buser_app">    <nav>      <h1>生态酒店基础服务平台</h1>      <div class="tab">        <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="bottom">          <el-tab-pane label="B端用户管理" name="first"></el-tab-pane>          <el-tab-pane label="配置管理" name="second"></el-tab-pane>        </el-tabs>      </div>    </nav>    <div class="first_wrap">      <router-view></router-view>    </div>  </div></template><script>    export default {        name: 'Home',        data () {            const data = [{                id: 1,                label: '集团一',                children: [{                    id: 4,                    label: '酒店一',                    children: [{                        id: 9,                        label: '部门一'                    }, {                        id: 10,                        label: '部门二'                    }]                }]            }, {                id: 2,                label: '集团二',                children: [{                    id: 5,                    label: '城市一',                    children: [{                        id: 9,                        label: '酒店一'                    }, {                        id: 10,                        label: '酒店二'                    }]                }, {                    id: 6,                    label: '酒店'                }]            }, {                id: 3,                label: '集团三',                children: [{                    id: 7,                    label: '酒店一'                }, {                    id: 8,                    label: '酒店二'                }]            }];            return {                activeName:'first',                data4: JSON.parse(JSON.stringify(data)),                data5: JSON.parse(JSON.stringify(data))            }        },        methods:{            handleClick(){            }            // renderContent(h, { node, data, store }) {            //     return (            //         <span class="custom-tree-node">            //         <span>{node.label}</span>            //     <span>            //     <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>            //     <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>            //     </span>            //     </span>);            // }        }    }</script><!-- Add "scoped" attribute to limit CSS to this component only --><style scoped lang="less">  .buser_app{    width: 100%;    height: 100%;    overflow: scroll;    nav{      position:fixed;      height: 4.5rem;      width: 100%;      background-color: #f5f8f8;      margin-bottom: 1rem;      display: block;      h1{        text-align: left;        float: left;        padding-top: 1rem;        margin-left: 8rem;        width: 25%;      }      .tab{        position: relative;        float: left;        top: 1.5rem;        /*margin-top: 2rem;*/        margin-left: 6rem;        .el-tabs{          .el-tabs__content{            visibility: hidden;          }          #tab-first{            .el-tabs__item{              font-size: 18px;              margin-bottom: 0;            }          }        }      }    }    .first_wrap{      margin-top: 5.5rem;      width: 100%;      height: 88%;      /*overflow: scroll;*/      /*height:500px ;*/      background: #eaedf0;    }  }</style>
>>>>>>> 9483c4063517aac9e428d98d4b57e7ad5e87f1c1
