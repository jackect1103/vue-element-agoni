<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="编号" width="180"></el-table-column>
    <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
    <el-table-column prop="gender" label="性别"></el-table-column>
    <el-table-column prop="birthday" label="出生日期" width="180"></el-table-column>
    <el-table-column prop="createDate" label="注册时间"></el-table-column>

    <el-table-column fixed="right" label="操作" width="200">
      <template>
        <el-button>未冻结</el-button>
        <el-button>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script>
export default {
  name: "user",
  components: {},
  data() {
    return {
      tableData: [
        {
          id: "1730316",
          userName: "agoni",
          gender: "男",
          birthday: "2000-1-1",
          createDate: new Date().toLocaleString()
        },{
          id: "1730316",
          userName: "agoni",
          gender: "男",
          birthday: "2000-1-1",
          createDate: new Date().toLocaleString()
        },{
          id: "1730316",
          userName: "agoni",
          gender: "男",
          birthday: "2000-1-1",
          createDate: new Date().toLocaleString()
        }
      ]
    };
  },
};
</script>
<style lang='' scoped>
</style>