<template>
  <el-menu default-active="1" background-color="#545c64" text-color="#fff">
    <!-- 使用<el-scrollbar>来设置滚动条 -->
    <el-scrollbar style="height:100%">
      <!-- 数据分析 -->
      <el-menu-item index="1">
        <i class="iconfont icon-data"></i>
        <router-link tag="span" to="/dataAnalysis">数据分析</router-link>
      </el-menu-item>
      <!-- 展示所有小说 -->
      <el-menu-item index="2">
        <i class="iconfont icon-tubiao1shuxiaoshuo"></i>
        <router-link tag="span" to="/showStory">展示所有小说</router-link>
        <!-- 2 -->
      </el-menu-item>
      <!--添加小说  -->
      <el-menu-item index="3">
        <i class="iconfont icon-tianjia"></i>
        <router-link tag="span" to="/addStory">添加小说</router-link>
      </el-menu-item>
      <!-- 展示所有文章 -->
      <el-menu-item index="4">
        <i class="iconfont icon-guanliwenzhang"></i>
        <router-link tag="span" to="/showArticle">展示所有文章</router-link>
      </el-menu-item>
      <!-- 添加文章 -->
      <el-menu-item index="5">
        <i class="iconfont icon-tianjiaadd143"></i>
        <router-link tag="span" to="/addArticle">添加文章</router-link>
      </el-menu-item>
      <!-- 展示所有用户 -->
      <el-menu-item index="6">
        <i class="iconfont icon-UserSettings"></i>
        <router-link tag="span" to="/user">展示所有用户</router-link>
      </el-menu-item>
    </el-scrollbar>
  </el-menu>
</template>

<script>
export default {
  name: "AsideBg",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang='css' scoped>
.iconfont{
  margin-right:15px;
}
</style>