<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column fixed prop="id" label="书号" width="120"></el-table-column>
    <el-table-column prop="category" label="类别" width="120"></el-table-column>
    <el-table-column prop="gender" label="性别" width="120"></el-table-column>
    <el-table-column prop="name" label="名字" width="150"></el-table-column>
    <el-table-column prop="author" label="作者" width="100"></el-table-column>
    <el-table-column prop="chanpter" label="章节 " width="100"></el-table-column>
    <el-table-column prop="date" label="日期" width="200"></el-table-column>

    <el-table-column fixed="right" label="操作" width="200">
      <template>
        <el-button>查看</el-button>
        <el-button>编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script>
export default {
  name: "showStory",
  components: {},
  data() {
    return {
      tableData: [
        {
          id: "1730316",
          category: "玄幻",
          gender: "男孩",
          name: "末世机械战车",
          author: "恶魔没睡醒",
          chanpter: "152",
          date: new Date().toLocaleString()
        },
        {
          id: "1730316",
          category: "玄幻",
          gender: "男孩",
          name: "末世机械战车",
          author: "恶魔没睡醒",
          chanpter: "152",
          date: new Date().toLocaleString()
        },
        {
          id: "1730316",
          category: "玄幻",
          gender: "男孩",
          name: "末世机械战车",
          author: "恶魔没睡醒",
          chanpter: "152",
          date: new Date().toLocaleString()
        }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {}
};
</script>
<style lang='' scoped>
</style>