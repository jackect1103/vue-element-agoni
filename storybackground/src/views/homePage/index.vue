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
            <el-dropdown-item>
              <router-link to="/personalAcount" tag="span">个人中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout">
              <span>退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ managerName }}</span>
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
import { getStore,removeStore,setStore } from "../../utils/storage";
export default {
  name: "homePage",
  components: {
    AsideBg
  },
  data() {
    return {
      managerName: ""
    };
  },
  activated() {
    this.managerName = getStore("managerInfon").managerName;
  },
  methods: {
    logout() {
      this.$axios
        .get("api2/users/adminLogOut")
        .then(res => {
          var status = res.data.status;
          if (status == 0) {
            removeStore('managerInfon');
            setStore('login',false);
            this.$router.push("/login");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
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
.el-dropdown-menu__item span {
  display: inline-block;
  width: 100%;
  height: inherit;
  text-align: center;
}
</style>
