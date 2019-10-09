<template>
  <div class="bg">
    <el-row>
      <el-col :span="8" :offset='4'>
        <div class="left">
          <h1>Your Login</h1>
          <p>One needs 3 things to be truly happy living in the world: some thing to do, some one to love, some thing to hope for.</p>
          <p>No matter how bad your heart has been broken, the world doesn’t stop for your grief. The sun comes right back up the next day.</p>
        </div>
      </el-col>
      <el-col :span="8" >
        <div id="bgBox">
          <el-form :model="user" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
              label="userName"
              prop="name"
              :rules="[
      { required: true, message: '用户名不能为空'},
    ]"
            >
              <el-input type="text" v-model.number="user.name" autocomplete="off" placeholder="UserName"></el-input>
            </el-form-item>
            <el-form-item
              label="password"
              prop="password"
              :rules="[
      { required: true, message: '密码不能为空'},
    ]"
            >
              <el-input type="password" v-model.number="user.password" autocomplete="off" placeholder="Password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('numberValidateForm')">sign in</el-button>
              <el-button type='info' @click="resetForm('numberValidateForm')">reset</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      user: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert(valid);
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
.el-row{
  padding-top:15%;
  box-sizing: border-box;
}
input{
  border:none;
  background-color: transparent;
}
.el-form-item{
  margin-bottom:40px;
}
.left{
  margin-top:-30px;
}
.left h1{
  margin-bottom:15px;
  font-size:30px;
}
.left p{
  margin-bottom:10px;
  line-height:30px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>