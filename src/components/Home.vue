<template>
  <div class="buser_app">
    <nav>
      <h2><img src="../assets/img/logo.png" /> 智慧酒店·微前台</h2>
      <div class="tab ">
        <el-tabs v-model="activeName" class="tab_style" @tab-click="handleClick" tab-position="bottom">
          <el-tab-pane label="B端用户管理" name="first"></el-tab-pane>
          <el-tab-pane label="配置管理" name="second"></el-tab-pane>
        </el-tabs>
      </div>
    </nav>
    <div class="first_wrap">
      <router-view></router-view>
    </div>
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
        activeName:'first',
        data4: JSON.parse(JSON.stringify(data)),
        data5: JSON.parse(JSON.stringify(data))
      }
    },
    methods:{
      handleClick(tab){
        if(tab.label=='B端用户管理'){
          this.$router.push({name:'hotelOrg'})

        }else{
          this.$router.push({name:'hotelList'})
        }

      }

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
<style scoped lang="less">
  .buser_app{
    width: 100%;
    height: 100%;
    overflow: scroll;
    nav{
      position:fixed;
      height: 3.5rem;
      width: 100%;
      background-color: #ffffff;
      margin-bottom: 1rem;
      display: block;
      h2{
        display: flex;
        justify-content: center;
        background-color: #22d178;
        font-size: 15px;
        text-align: left;
        float: left;
        padding-top: 15px;
        width: 15%;
        height: 100%;
        color: #ffffff;
        img{
          display: inline-block;
          width: 25px;
          height: 20px;
          margin-right: 10px;
        }
      }
      .tab{
        position: relative;
        float: left;
        top: 0.5rem;
        /*margin-top: 2rem;*/
        margin-left: 30rem;
        .el-tabs{
          .el-tabs__content{
            visibility: hidden;
          }
          #tab-first{
            .el-tabs__item{
              font-size: 18px;
              margin-bottom: 0;
            }
          }


        }
        .tab_style{
          .el-tabs__nav-wrap::after{
            background-color: #F5F8FA;
          }
        }

      }
    }
    .first_wrap{
      margin-top:4.5rem;
      width: 100%;
      height: 88%;
      /*overflow: scroll;*/
      /*height:500px ;*/
      background: #F5F8FA;

    }

  }


</style>
