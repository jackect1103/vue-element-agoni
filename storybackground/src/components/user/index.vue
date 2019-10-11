<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="birthday" label="出生日期" width="180"></el-table-column>
      <el-table-column prop="createDate" label="注册时间"></el-table-column>

      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="warning" @click="freeze(scope.$index, scope.row)">未冻结</el-button>
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
      bgDate: [
        {
          id: "01",
          userName: "jackect",
          gender: "男",
          birthday: "2000-1-1",
          createDate: new Date().toLocaleString()
        },
        {
          id: "02",
          userName: "rain",
          gender: "男",
          birthday: "2000-1-1",
          createDate: new Date().toLocaleString()
        },
        {
          id: "03",
          userName: "agoni",
          gender: "男",
          birthday: "2000-1-1",
          createDate: new Date().toLocaleString()
        },
        {
          id: "04",
          userName: "jack",
          gender: "男",
          birthday: "2000-1-1",
          createDate: new Date().toLocaleString()
        },
        {
          id: "05",
          userName: "agoni",
          gender: "男",
          birthday: "2000-1-1",
          createDate: new Date().toLocaleString()
        }
      ]
    };
  },
  methods: {
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
          console.log(row.id);
          // 通过this.$refs.mychild来调用子组件的方法
          this.$refs.mychild.handleDelete(row.id);
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
</style>