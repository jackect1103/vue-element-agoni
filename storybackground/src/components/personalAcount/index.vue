<template>
  <div id="box">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
      ref="formLabelAlign"
    >
      <!-- 头像 -->
      <el-form-item label="用户图片:">
        <el-input v-model="formLabelAlign.img" v-if="false"></el-input>
        <el-upload
          class="avatar-uploader"
          ref="upload"
          :show-file-list="false"
          action="/index/upload"
          :before-upload="beforeUpload"
          :on-change="handleChange"
          :auto-upload="false"
          :data="formLabelAlign"
        >
          <img
            v-if="formLabelAlign.img"
            :src="formLabelAlign.img"
            class="avatar"
            style="height:120px"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <!-- 用户名 -->
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.managerName"></el-input>
      </el-form-item>
      <!-- 出生日期 -->
      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="出生日期"
              v-model="formLabelAlign.birthday"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <!-- 性别 -->
      <el-form-item label="性别">
        <span v-if="formLabelAlign.gender">I am a {{ formLabelAlign.gender }}</span>
        <el-radio-group v-else v-model="sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 注册时间 -->
      <el-form-item label="注册时间">
        <span>{{ formLabelAlign.registerDate}}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formLabelAlign')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getStore } from "../../utils/storage";
export default {
  name: "personlAcount",
  components: {},
  props: ["limit"],
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {},
      sex: "男",
      dialogVisible: false,
      disabled: false
    };
  },
  mounted() {
    this.formLabelAlign = JSON.parse(getStore("managerInfon"));
    console.log(this.formLabelAlign.gender);
  },
  methods: {
    // 提交数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formLabelAlign.gender == "undefined") {
            this.formLabelAlign.gender = this.sex;
          }
          this.$axios
            .post("api2/users/adminUpdate", {
              infoms: this.formLabelAlign
            })
            .then(res => {
              var status = res.data.status;
              if (status == 0) {
                this.$message({
                  message: "修改信息成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: "修改信息失败",
                  type: "waring"
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleChange(file, fileList) {
      console.log(file.raw);
      this.formLabelAlign.img = URL.createObjectURL(file.raw);
      console.log(this.formLabelAlign.img);
    },

    beforeUpload(file) {
      console.log(file);
      return true;
    }
  }
};
</script>
<style lang='css' scoped>
#box {
  width: 50%;
}
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #ccc;
}
.el-button--primary {
  width: 150px;
}
</style>