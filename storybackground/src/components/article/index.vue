<template>
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column prop="title" label="文章标题" width="180"></el-table-column>
      <el-table-column prop="img" label="文章图片" width="180">
        <template scope="scope">
          <img :src="scope.row.articleyImg" width="150" height="100" class="img" />
        </template>
      </el-table-column>
      <el-table-column prop="category" label="文章类别" width="100"></el-table-column>
      <el-table-column prop="content" label="文章内容" width="230"></el-table-column>
      <!-- 注册时间 -->
      <el-table-column label="注册时间" width="100">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.data }}</span>
        </template>
      </el-table-column>
      <!-- 操作删除 -->
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入文章标题搜索" />
        </template>
        <template slot-scope="scope">
          <el-button type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click="open(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination ref="mychild" :pagesizes="[2,3,4,5]" :dateSource="bgDate" @showDate="showDate" />
  </div>
</template>


<script>
import pagination from "@/components/pagination";
export default {
  name: "showArticle",
  components: {
    pagination
  },
  data() {
    return {
      // 前台数据
      tableData: [],
      bgDate: [],
      search: "",
      deleteId: 0
    };
  },
  mounted() {
    this.getAllArticle();
  },
  methods: {
    // 获取所有文章
    getAllArticle() {
      this.$axios.get("api2/users/getAllArticle").then(res => {
        var articleDatas = res.data.data.articleDatas;
        this.bgDate = articleDatas;
        console.log(this.bgDate.length);
      });
    },
    // 跳转到修改界面
    handleEdit(index, row) {
      this.$router.push({
        path: "/updateArticle",
        query: {
          data: row
        }
      });
    },
    // 显示界面数据
    showDate(response) {
      this.tableData = response;
    },
    // 弹出框
    open(index, row) {
      this.$confirm("此操作将永久删除此数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("api2/users/deleteArticle", { _id: row._id })
            .then(res => {
              var status = res.data.status;
              console.log("status", res.data);
              if (status == 0) {
                this.$message({
                  type: "success",
                  message: "删除文章成功!"
                });
                this.getAllArticle();
                // 通过this.$refs.mychild来调用子组件的方法
                this.$refs.mychild.handleDelete();
              } else {
                this.$message({
                  type: "waring",
                  message: "删除文章失败!"
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
<style scoped>
.cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.block {
  margin-top: 25px;
}
.el-table__row {
  height: 80px !important;
}
</style>