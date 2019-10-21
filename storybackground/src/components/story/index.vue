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
            <el-form-item label="小说图片：">
              <img
                class="avatar"
                v-if="props.row.storyImg"
                v-lazy="props.row.storyImg"
                style="height:120px;width:200px"
                :alt="props.row.storyImg"
              />
              <span v-else>该小说没上传图片</span>
            </el-form-item>
            <el-form-item label="小说名作者：">
              <span>{{ props.row.author }}</span>
            </el-form-item>
            <el-form-item label="小说gender：">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="小说ID：">
              <span>{{ props.row._id }}</span>
            </el-form-item>
            <el-form-item label="小说分类：">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="小说章节：">
              <span>共{{ props.row.chanpter }}章</span>
            </el-form-item>
            <el-form-item label="小说上线时间：">
              <span>{{ props.row.commitDate }}</span>
            </el-form-item>
            <el-form-item label="小说简介：">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="小说ID" prop="_id"></el-table-column>
      <el-table-column label="小说名称" prop="name"></el-table-column>
      <el-table-column label="小说作者" prop="author"></el-table-column>
      <el-table-column label="小说类别" prop="category"></el-table-column>
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
    <!-- 分页 -->
    <pagination ref="mychild" :pagesizes="[2,3,4,5,6]" :dateSource="bgDate" @showDate="showDate" />
  </div>
</template>


<script>
import pagination from "@/components/pagination";
export default {
  name: "showStory",
  components: {
    pagination
  }, 
  data() {
    return {
      tableData: [],
      bgDate: [],
      search: ""
      // bgDate: [
      //   {
      //     id: "0",
      //     category: "言情",
      //     gender: "女孩",
      //     name: "偏执总裁替嫁妻",
      //     author: "拈花拂柳",
      //     chanpter: "152",
      //     date: new Date().toLocaleString(),
      //     desc:
      //       "秦六月，这次，你跑不掉了！十八年前的那笔账是不是该算一下了？”宗铭皓将秦六月压在了墙壁之上，邪气一笑：“用一辈子偿还，怎样？”秦六月惊慌失措的看着这个霸气如魔王的男子，实在想不起来她十八年前到底欠"
      //   }
      // ],
    };
  },
  mounted() {
    this.getAllStory();
  },
  methods: {
    getAllStory() {
      this.$axios.get("api2/users/getAllStroy").then(res => {
        var storyDatas = res.data.data.storyDatas;
        this.bgDate = storyDatas;
        console.log(this.bgDate.length);
      });
    },
    // 跳转到修改界面
    handleEdit(index, row) {
      // this.$router.push();
    },
    // 显示界面数据(点击分页按钮)
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
            .post("api2/users/deleteStory", { _id: row._id })
            .then(res => {
              if (res.data.msg) {
                this.$message({
                  type: "success",
                  message: "删除小说成功!"
                });
                this.getAllStory();
                // 通过this.$refs.mychild来调用子组件的方法
                this.$refs.mychild.handleDelete();
              } else {
                this.$message({
                  type: "waring",
                  message: "删除小说失败!"
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
.block {
  margin-top: 25px;
}
</style>