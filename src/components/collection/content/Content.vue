<template>
  <div class="allContent">
    <div>
     <el-row>
      <el-button type="success" class="establish" @click="establishContent">创建内容</el-button>
      <div class="searchname">
        <el-select v-model="selectClassify" placeholder="请选择分类">
          <el-option v-for="(item, index) in showClassify" :key="index" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-input placeholder="请输入名称" v-model="writeName" class="writeName" clearable>
        </el-input>
        <el-button type="success" class="search" @click="initList">搜索</el-button>
      </div>
     </el-row>
     <el-table class="margin-20" v-loading="loading" :data="contentList" border style="width: 100%">
       <template slot="empty">
         <div class="tupian">
           <img src="../../../assets/img/1.png">
           <div style="text-align: center">暂无内容</div>
         </div>
       </template>
       <el-table-column type="index" :index="typeIndex" label="编号" width="50">
      </el-table-column>
      <el-table-column prop="categoryName" label="类别" width="100">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="100">
      </el-table-column>
      <el-table-column prop="pictures" label="封面图片" width="120">
        <template slot-scope="scope">
          <img :src="getCoverImg(scope.row.pictures) || '' " alt="" class="imgsize">
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column prop="description" label="介绍">
           <template slot-scope="scope">
           <div v-html="scope.row.description"></div>
          </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="50">
      </el-table-column>
      <el-table-column label="操作" width="100px">
        <template slot-scope="scope">
          <el-button @click="editContent(scope.row)" type="text" size="small">
            编辑
          </el-button>
          <el-button class="deleteall" @click="deleteContent(scope.row)" type="text" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total!=0">
    </el-pagination>
    </div>
  </div>
</template>
<script>
  import { CodeToText } from "element-china-area-data";
  import {mapActions} from 'vuex'
  import global from '../../common'
export default {
  data() {
    return {
      service:'',
      city:'',
      xian:'',
      totaladdress:'',
      selectClassify: '',
      total: 0,
      page: 1,
      picIndex:'',
      pagesize: 5,
      showitems: [],
      loading: false,
      showpictures: [],
      pagenum: 1,
      showClassify: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      contentList: [],
      loading: false,
      value: "",
      writeName: ""
    };
  },
  methods: {
    ...mapActions([
      'getContent',
      'deleteClassify',
      'findAllClassify'

    ]),
    //总分类列表
    getallclassify() {
      this.findAllClassify({
        onsuccess:(body)=>{
          // console.log(body.data)
          this.showClassify = body.data;
        }
      })
    },
    // 内容列表
    initList() {
      var that = this
      that.loading = true;
      that.getContent({
        page: that.pagenum,
        pageSize: that.pagesize,
        name: that.writeName,
        catalogId: that.selectClassify,
        onsuccess: body => {
           console.log(body)
          if (body) {
            this.loading = false;
            this.contentList = body.data.items;
            this.total =  body.data.totalNum;
            this.contentList.forEach(item=>{
              item.description2 = item.description;
              item.description = item.description.replace(/(\n)/g, "");
              item.description =  item.description.replace(/(\t)/g, "");
              item.description =  item.description.replace(/(\r)/g, "");
              item.description =  item.description.replace(/<\/?[^>]*>/g, "");
              item.description =  item.description.replace(/\s*/g, "");
              item.description = item.description.substr(0,20) + '...'
              item.address2 = item.address
              var city= CodeToText[item.cityCode.substring(0,4)+'00']
              if (city=='市辖区'){
                city=''
              }
              item.address=CodeToText[item.cityCode.substring(0,2)+'0000']+city+CodeToText[item.cityCode]+item.address

            })
          }
        }
      })
    },
    getCoverImg(pictures) {
      let coverImg = '';
      pictures.forEach((picture) => {
        if (picture.isCover === 'y') {
          coverImg = picture.url;
        }
      })


      return coverImg;
    },
    //分页开始方法
    handleSizeChange(val) {

      this.pagesize = val;
      global.setContextData('conPagesize',this.pagesize)
      this.initList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.page = val;
      global.setContextData('conPagenum',this.pagenum)
      this.initList();
    },
    typeIndex(index) {
      return index + (this.page - 1) * this.pagesize + 1;
    },
    establishContent() {
      this.$router.push({
        name: "establish"
      });
    },
    editContent(row) {
      this.$store.commit("getEditConData", row);
      this.$router.push({
        name: "editContent"
      });
    },
    deleteContent(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteClassify({
            id:row.id,
            onsuccess: body => {
              // console.log(body)
              if (body) {

                this.initList();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created(){
    this.pagenum = global.getContextData('conPagenum') || 1
    this.pagesize = global.getContextData('conPagesize') || 5
  },
  mounted() {
    this.initList();
    this.getallclassify();
  },

};
</script>
<style lang="less" scoped>
  .allContent{
    position:relative;
    .el-row {
      position: relative;
      margin-bottom: 20px;

      .establish {
        background: #00cd78 !important;
      }

      .searchname {
        position: absolute;
        top: 0px;
        right: 20px;

        .search {
          background: #2574ed !important;
        }

        .writeName {
          width: 200px;
        }
      }
    }

    .imgsize {
      width: 100px;
      height: 100px;
    }
    .deleteall {
      color: red;
    }
    .tupian{
      position:absolute;
      left:50%;
      top:20%;
      transform:translate(-20%,-50%);

    }
  }
  /deep/ .el-table__empty-block {
    min-height: 400px;
  }

</style>
