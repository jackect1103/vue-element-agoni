<template>
  <div class="bg">
    <el-row>
      <el-col :span="8" :offset="4">
        <div class="left">
          <h1>Your Login</h1>
          <p>One needs 3 things to be truly happy living in the world: some thing to do, some one to love, some thing to hope for.</p>
          <p>No matter how bad your heart has been broken, the world doesn’t stop for your grief. The sun comes right back up the next day.</p>
          <el-button type="info">
            <router-link to="/register" tag="span">Creat New Acount</router-link>
          </el-button>
        </div>
      </el-col>

      <el-col :span="9">
        <div id="bgBox">
          <el-form
            :model="manager"
            ref="numberValidateForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="managerName"
              prop="managerName"
              :rules="[
      { required: true, message: '用户名不能为空'},
    ]"
            >
              <el-input
                type="text"
                v-model.number="manager.managerName"
                autocomplete="off"
                placeholder="UserName"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="password"
              prop="password"
              :rules="[
      { required: true, message: '密码不能为空'},
    ]"
            >
              <el-input
                type="password"
                v-model.number="manager.password"
                autocomplete="off"
                placeholder="Password"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('numberValidateForm')">sign in</el-button>
              <el-button type="info" @click="resetForm('numberValidateForm')">reset</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { setStore, getStore } from "../../utils/storage";
export default {
  name: "login",
  data() {
    return {
      manager: {
        managerName: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.manager.managerName + ":" + this.manager.password);
          var login = JSON.parse(getStore("login"));
          if (!login) {
            this.$axios
              .post("/api2/users/adminLogin", {
                managerName: this.manager.managerName,
                password: this.manager.password
              })
              .then(res => {
                var status = res.data.status;
                console.log(res.data.data.managerInfon);
                if (status == 0) {
                  setStore("managerInfon", res.data.data.managerInfon);
                  setStore("login", true);
                  this.$message({
                    message: "登陆成功",
                    type: "success"
                  });
                  this.$router.push("/showStory");
                } else {
                  this.$message({
                    message: "登陆失败",
                    type: "warning"
                  });
                }
              });
          } else {
            this.$router.push('/showStory');
            this.$message({
              message: "当前已经登录",
              type: "success"
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang='css' scoped>
.bg {
  width: 100%;
  height: 100%;
  background: url("../../assets/BG.jpg") no-repeat 100%;
  background-size: 100%;
  overflow: hidden;
}
.el-row {
  padding-top: 15%;
  box-sizing: border-box;
}
input {
  border: none;
  background-color: transparent;
}
.el-form-item {
  margin-bottom: 40px;
}
.left {
  margin-top: -65px;
}
.left h1 {
  margin-bottom: 15px;
  font-size: 30px;
}
.left p {
  margin-bottom: 10px;
  line-height: 30px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
</style>