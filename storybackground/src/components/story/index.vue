<template>
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.author.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="小说名称：">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="小说gender：">
              <span>{{ props.row.gender }}</span>
            </el-form-item>
            <el-form-item label="小说ID：">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="小说分类：">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="小说章节：">
              <span>共{{ props.row.chanpter }}章</span>
            </el-form-item>
            <el-form-item label="小说上线时间：">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <el-form-item label="小说简介：">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="小说ID" prop="id"></el-table-column>
      <el-table-column label="小说名称" prop="name"></el-table-column>
      <el-table-column label="小说简介" prop="desc"></el-table-column>
      <!-- 操作删除 -->
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入小说书名/作者搜索" />
        </template>
        <template slot-scope="scope">
          <el-button type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click="open(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 4, 5, 6]"
        :page-size="sizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="curDate.length"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
export default {
  name: "showStory",
  components: {},
  data() {
    return {
      tableData: [],
      curDate: [
        {
          id: "0",
          category: "玄幻",
          gender: "男孩",
          name: "末世机械战车",
          author: "恶魔没睡醒",
          chanpter: "152",
          date: new Date().toLocaleString()
        },
        {
          id: "1",
          category: "玄幻",
          gender: "男孩",
          name: "末世机械战车",
          author: "恶魔没睡醒",
          chanpter: "152",
          date: new Date().toLocaleString()
        },
        {
          id: "2",
          category: "玄幻",
          gender: "男孩",
          name: "末世机械战车",
          author: "恶魔没睡醒",
          chanpter: "152",
          date: new Date().toLocaleString()
        },
        {
          id: "3",
          category: "玄幻",
          gender: "男孩",
          name: "末世机械战车",
          author: "恶魔没睡醒",
          chanpter: "152",
          date: new Date().toLocaleString()
        },
        {
          id: "4",
          category: "玄幻",
          gender: "男孩",
          name: "末世机械战车",
          author: "恶魔没睡醒",
          chanpter: "152",
          date: new Date().toLocaleString()
        },
        {
          id: "5",
          category: "玄幻",
          gender: "男孩",
          name: "末世机械战车",
          author: "恶魔没睡醒",
          chanpter: "152",
          date: new Date().toLocaleString()
        }
      ],
      //每页条数
      sizeChange: 3,
      // 当前页数，支持 .sync 修饰符
      currentPage: 1,
      search: ""
    };
  },
  mounted() {
    this.showPagination(this.currentPage);
  },
  methods: {
    // 每页条数
    handleSizeChange(val) {
      this.sizeChange = val;
      this.handleCurrentChange(this.currentPage);
      // console.log(`每页 ${this.sizeChange} 条`);
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.showPagination(val);
      // console.log(`当前页: ${val} ${this.currentPage}`);
    },
    // 切换页
    showPagination(curPage) {
      this.tableData = [];
      var bgLen = this.curDate.length;
      var left = this.sizeChange * (curPage - 1);
      var right = this.sizeChange * curPage;
      for (var i = 0; i < bgLen; i++) {
        if (i >= left && i < right) {
          this.tableData.push(this.curDate[i]);
        }
      }
    },
    // 编辑
    handleEdit(index, row) {
      this.$router.push("/updateArticle");
    },
    // 删除
    handleDelete(id) {
      var newArray = [];
      this.curDate.forEach(item => {
        if (item.id != id) {
          newArray.push(item);
        }
      });
      this.curDate = newArray;
      this.showPagination(this.currentPage);
      // 判断页面的数据是否没有，如果没有就自动跳转到前一页
      if (Math.ceil(newArray.length / this.sizeChange) != this.currentPage) {
        this.handleCurrentChange(this.currentPage - 1);
      }
    },
    // 弹出框
    open(index, row) {
      this.$confirm("此操作将永久删除此数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.handleDelete(row.id);
          this.$message({
            type: "success",
            message: "删除成功!"
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
<style lang='css' scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>