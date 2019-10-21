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
        <el-radio-group v-model="formLabelAlign.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 注册时间 -->
      <el-form-item label="注册时间">
        <span>{{ formLabelAlign.registerDate}}</span>
      </el-form-item>
      <el-form-item label="您的格言">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="formLabelAlign.motto"
        ></el-input>
      </el-form-item>
      <!-- submit -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('formLabelAlign')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getStore, setStore } from "../../utils/storage";
export default {
  name: "personlAcount",
  components: {},
  props: ["limit"],
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {},
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
          this.$axios
            .post("api2/users/adminUpdate", this.formLabelAlign)
            .then(res => {
              var status = res.data.status;
              if (status == 0) {
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
                setStore("managerInfon", this.formLabelAlign);
              } else {
                this.$message({
                  message: res.data.msg,
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