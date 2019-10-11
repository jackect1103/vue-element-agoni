<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pagesizes"
      :page-size="sizeChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dateSource.length"
      :date='dateSource'
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  components: {},
  /**
   * pagesizes==>[2, 3, 4, 5, 6]
   * dateSource ==> 数据源
   */
  props: ["pagesizes","dateSource"],
  data() {
    return {
      tableData: [], //存取组件渲染的数据
      bgDate: this.dateSource, //存取数据源
      //默认每页条数
      sizeChange: 3,
      // 当前页数，支持 .sync 修饰符
      currentPage: 1,
    };
  },
  mounted() {
    this.showPagination(this.currentPage);
    console.log(this.dateSource)
  },
  methods: {
    // 每页条数
    handleSizeChange(val) {
      this.sizeChange = val;
      this.handleCurrentChange(this.currentPage);
      console.log(`每页 ${this.sizeChange} 条`);
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.showPagination(val);
      console.log(`当前页: ${val} ${this.currentPage}`);
    },
    // 页面数范围
    showPagination(curPage) {
      this.tableData = [];
      var bgLen = this.bgDate.length;
      var left = this.sizeChange * (curPage - 1);
      var right = this.sizeChange * curPage;
      for (var i = 0; i < bgLen; i++) {
        if (i >= left && i < right) {
          this.tableData.push(this.bgDate[i]);
        }
      }
      // 触发父组件的方法
      this.$emit('showDate', this.tableData)
    },
    // 删除item项
    handleDelete(id) {
      var newArray = [];
      // 使用array过滤方法
      newArray = this.bgDate.filter(item => {
        if (item.id != id) {
          return item;
        }
      });
      console.log(newArray);
      this.bgDate = newArray;
      this.showPagination(this.currentPage);
      /**
       *
       * 作用：从后面开始删除数
       * 判断页面的数据是否没有，如果没有就自动跳转到前一页
       *
       **/
      if (
        Math.ceil(newArray.length / this.sizeChange) != this.currentPage &&
        this.currentPage != 1
      ) {
        this.handleCurrentChange(this.currentPage - 1);
      }
    }
  }
};
</script>
<style lang='' scoped>
</style>