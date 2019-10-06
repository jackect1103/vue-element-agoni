<template>
  <el-container>
    <el-header>Agoni小说网站后台，欢迎：Agoni</el-header>
    <el-container>
      <el-aside width="200px">
        <AsideBg />
      </el-aside>
      <el-main>
          <router-view></router-view> 
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideBg from "@/components/aside";
export default {
  name: "homePage",
  components: {
    AsideBg
  },
  data() {
    return {};
  },
};
</script>
<style lang='css' scoped>
.el-header {
  background-color: #333;
  color: #333;
  padding-left: 5% !important;
  box-sizing: border-box;
  line-height: 60px;
  color: #fff;
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
  min-height: 100%;
}

.el-main {
  background-color: #E5E5E5;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>