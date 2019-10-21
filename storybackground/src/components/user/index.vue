<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="_id" label="编号" width="180"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="birthday" label="出生日期" width="150"></el-table-column>
      <el-table-column prop="registerDate" label="注册时间"></el-table-column>

      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="warning"
            @click="freeze(scope.$index, scope.row)"
          >{{ scope.row.freeze ? '冻结':'未冻结' }}</el-button>
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
  name: "user",
  components: {
    pagination
  },
  data() {
    return {
      tableData: [],
      bgDate: []
    };
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      this.$axios.get("api2/users/getAllUser").then(res => {
        var result = res.data.data.result;
        this.bgDate = result;
      });
    },
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
            .post("api2/users/removeUser ", { _id: row._id })
            .then(res => {
              var status = res.data.status;
              console.log("status", res.data);
              if (status == 0) {
                this.getAllUsers();
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
                // 通过this.$refs.mychild来调用子组件的方法
                this.$refs.mychild.handleDelete();
              } else {
                this.$message({
                  type: "waring",
                  message: res.data.msg
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
    },
    // 冻结
    freeze(index, row) {
      this.$axios
        .post("api2/users/freezeUser", {
          _id: row._id
        })
        .then(res => {
          var status = res.data.status;
          if (status) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
          } else {
            this.$message({
              type: "waring",
              message: res.data.msg
            });
          }
        });
    }
  }
};
</script>
<style lang='css' scoped>
</style>