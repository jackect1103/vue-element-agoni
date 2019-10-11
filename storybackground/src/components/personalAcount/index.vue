<template>
  <div id="box">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
      ref="formLabelAlign"
    >
      <!-- 头像 -->
      <el-form-item label="用户头像:">
        <el-input v-model="formLabelAlign.imageUrl" v-if="false"></el-input>
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
            v-if="formLabelAlign.imageUrl"
            :src="formLabelAlign.imageUrl"
            class="avatar"
            style="height:120px"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 用户名 -->
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <!-- 出生日期 -->
      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              :placeholder="formLabelAlign.birthday"
              v-model="formLabelAlign.birthday"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <!-- 性别 -->
      <el-form-item label="性别">
        <el-radio-group v-model="formLabelAlign.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 注册时间 -->
      <el-form-item label="注册时间">
        <span>{{ formLabelAlign.registerTime}}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formLabelAlign')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "personlAcount",
  components: {},
  props: ["limit"],
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        imageUrl: "",
        name: "Agoni",
        sex: "男",
        birthday: new Date().toLocaleString(),
        registerTime: new Date().toLocaleString()
      },
      dialogVisible: false,
      disabled: false
    };
  },
  methods: {
    // 提交数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.formLabelAlign);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleChange(file, fileList) {
      this.formLabelAlign.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeUpload(file) {
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