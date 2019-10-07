<template>
  <el-container style="height: 650px;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu>
        <AsideBg />
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right;">
        <span style="float:left;">欢迎来到agoni小说网后台</span>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px;color:#fff"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <transition name="el-fade-in-linear">
          <router-view></router-view>
        </transition>
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
  }
};
</script>
<style scoped>
.el-header {
  background-color: #303133;
  color: #fff;
  line-height: 60px;
  font-size: 16px !important;
}

.el-aside {
  color: #333;
}
.el-menu {
  height: 100%;
}
</style>
