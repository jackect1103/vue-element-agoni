<template>
  <div class="bg">
    <el-row>
      <el-col :span="8" :offset="3">
        <div id="bgBox">
          <el-form
            :model="manager"
            ref="numberValidateForm"
            label-width="150px"
            class="demo-ruleForm"
          >
            <!-- 用户名 -->
            <el-form-item
              label="managerName"
              prop="managerName"
              :rules="[
      { required: true, message: '用户名不能为空'}, ]"
            >
              <el-input
                type="text"
                v-model.number="manager.managerName"
                autocomplete="off"
                placeholder="managerName"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
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
            <!-- 确认密码 -->
            <el-form-item
              label="confirmPassword"
              prop="password"
              :rules="[
      { required: true, message: '确认密码不能为空'},
    ]"
            >
              <el-input
                type="password"
                v-model.number="manager.confirmPassword"
                autocomplete="off"
                placeholder="confirmPassword"
              ></el-input>
            </el-form-item>
            <!-- 按钮健 -->
            <el-form-item>
              <el-button type="primary" @click="submitForm('numberValidateForm')">sign upin</el-button>
              <el-button type="info" @click="resetForm('numberValidateForm')">reset</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="7" :offset="1">
        <div class="left">
          <h1>Sign-up Form</h1>
          <p>One needs 3 things to be truly happy living in the world: some thing to do, some one to love, some thing to hope for.</p>
          <p>No matter how bad your heart has been broken, the world doesn’t stop for your grief. The sun comes right back up the next day.</p>
          <el-button type="info">
            <router-link to="/login" tag="span">I have a acount</router-link>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      manager: {
        managerName: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (this.manager.password === this.manager.confirmPassword) {
          this.$axios
            .post("/api2/users/adminRegister", {
              managerName: this.manager.managerName,
              password: this.manager.password
            })
            .then(res => {
              var status = res.data.status;
              if (status == 0) {
                this.$message({
                  message: "注册成功",
                  type: "success"
                });
                this.$router.push("/login");
              } else {
                this.$message({
                  message: "注册失败",
                  type: "warning"
                });
              }
            });
        } else {
          this.$message.error("密码不一致！");
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
  margin-top: -15px;
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