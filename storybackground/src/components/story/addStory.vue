<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="150px"
    class="demo-ruleForm"
  >
    <!-- 小说名称 -->
    <el-form-item label="小说名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <!-- 小说图片 -->
    <el-form-item label="小说图片" prop="imageUrl">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <!-- 小说类别 -->
    <el-form-item label="小说类别" prop="chapter">
      <el-select v-model="ruleForm.chapter" placeholder="请选择小说类别">
        <el-option label="玄幻" value="Fantasy"></el-option>
        <el-option label="都市" value="urban"></el-option>
        <el-option label="武侠" value="knightErrant"></el-option>
        <el-option label="文学" value="literature"></el-option>
        <el-option label="穿越" value="passThrough"></el-option>
        <el-option label="悬疑" value="suspense"></el-option>
        <el-option label="历史" value="history"></el-option>
        <el-option label="游戏" value="game"></el-option>
      </el-select>
    </el-form-item>
    <!-- 小说类型性别  -->
    <el-form-item label="小说类型性别" prop="gender">
      <el-select v-model="ruleForm.gender" placeholder="请选择小说类型性别">
        <el-option label="男孩" value="boy"></el-option>
        <el-option label="女孩" value="girl"></el-option>
      </el-select>
    </el-form-item>
    <!-- 小说日期 -->
    <el-form-item label="小说上线时间" prop="date">
      <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期"></el-date-picker>
    </el-form-item>
    <!-- 小说作者 -->
    <el-form-item label="小说作者" prop="author">
      <el-input v-model="ruleForm.author"></el-input>
    </el-form-item>
    <!-- 小说简介 -->
    <el-form-item label="小说简介" prop="intro">
      <el-input type="textarea" v-model="ruleForm.intro"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "addStory",
  data() {
    return {
      // 存储数据
      ruleForm: {
        name: "",
        imageUrl: "",
        chapter: "",
        gender: "",
        date: "",
        author: "",
        intro: ""
      },
      // 数据规则
      rules: {
        name: [
          { required: true, message: "请输入小说名称", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        chapter: [
          { required: true, message: "请选择小说类别", trigger: "change" }
        ],
        gender: [
          { required: true, message: "请选择小说类型性别", trigger: "change" }
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        author: [
          { required: true, message: "请输入小说作者", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请填写小说简介", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取图片
    handleAvatarSuccess(res, file) {
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
    },
    // 图片大小及限制图片大小
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style lang='css' scoped>
.el-form {
  width: 60%;
  margin: 0 auto;
}
/* 图片 */
.avatar-uploader .el-upload {
  border: 1px dashed #000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #000;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>