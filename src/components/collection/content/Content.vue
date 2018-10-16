<template>
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
      <el-table-column type="index" :index="typeIndex" label="编号" width="50">
      </el-table-column>
      <el-table-column prop="categoryName" label="类别" width="100">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="100">
      </el-table-column>
      <el-table-column prop="pictures" label="封面图片"  width="120">
        <template slot-scope="scope">
          <img :src="scope.row.pictures[picIndex].url" alt="" class="imgsize">
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
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
      :page-sizes="[5, 10, 15, 20]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
export default {
  data() {
    return {
      selectClassify: 1,
      total: 0,
      page: 1,
      picIndex: 0,
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
  mounted() {
    this.initList();
    this.getallclassify();
  },
  methods: {
    ...mapActions([
      'getContent'

    ]),
    //总分类列表
    getallclassify() {
      this.axios
        .get("http://qa.fortrun.cn:8121/discoveryCatalog/all")
        .then(res => {
          // console.log(res.data.data);
          if (res.status == 200) {
            this.showClassify = res.data.data;
          }
        });
    },
    // 内容列表
    initList() {
      this.loading = true;
      this.getContent({
        page: this.pagenum,
        pageSize: this.pagesize,
        name: this.writeName,
        catalogId: this.selectClassify,
        onsuccess: body => {
          console.log(body)
          if (body) {
            this.loading = false;
            this.contentList = body.data.items;
            this.total =  body.data.totalNum;
            this.showitems = body.data.items;
            console.log(this.showitems)
            this.showitems.forEach(items => {
              this.showpictures = items.pictures;
            });
            this.showpictures.forEach((res, index) => {
              console.log(res)
              if (res.isCover === "y") {
                this.picIndex = Number(index);
              }
            });
          }
        }
      })
      // this.loading = true;
      // this.axios
      //   .post(
      //     `http://qa.fortrun.cn:8121/discoveryContent/page/${
      //       this.pagenum
      //     }?pageSize=${this.pagesize}&catalogId=${this.selectClassify}&name=${
      //       this.writeName
      //     }`
      //   )
      //   .then(res => {
      //     if (res.status == 200) {
      //       // console.log(res);
      //       this.loading = false;
      //       this.contentList = res.data.data.items;
      //       this.total = res.data.data.totalNum;
      //       this.showitems = res.data.data.items;
      //       this.showitems.forEach(items => {
      //         this.showpictures = items.pictures;
      //       });
      //       this.showpictures.forEach((res, index) => {
      //         if (res.isCover === "y") {
      //           this.picIndex = Number(index);
      //         }
      //       });
      //     }
      //   });
    },
    //分页开始方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.initList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.page = val;
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
      // console.log(this.$store.state.editContentData);
      this.$router.push({
        name: "editContent"
      });
    },
    deleteContent(row) {
      // console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(row.id);
          this.axios
            .post(
              `http://qa.fortrun.cn:8121/discoveryContent/delete?id=${row.id}`
            )
            .then(res => {
              // console.log(res);
              if (res.status === 200) {
                this.initList();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
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
</style>
