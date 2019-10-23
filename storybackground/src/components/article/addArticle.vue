<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="150px"
    class="demo-ruleForm"
  >
    <!-- 文章标题 -->
    <el-form-item label="文章标题" prop="title">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>
    <!-- 文章图片 -->
    <el-form-item label="文章图片:">
      <el-switch v-model="value" active-text="本地上传" inactive-text="链接上传"></el-switch>
      <div v-if="value">
        <el-input v-model="ruleForm.articleyImg" v-if="false"></el-input>
        <el-upload
          class="avatar-uploader"
          ref="upload"
          :show-file-list="false"
          action="/index/upload"
          :before-upload="beforeUpload"
          :on-change="handleChange"
          :auto-upload="false"
          :data="ruleForm"
        >
          <img
            v-if="ruleForm.articleyImg"
            :src="ruleForm.articleyImg"
            class="avatar"
            style="height:120px"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <!-- 连接上传 -->
      <div v-else>
        <el-input placeholder="请输入图片链接" v-model="ruleForm.articleyImg" clearable></el-input>
      </div>
    </el-form-item>
    <!-- 文章类别 -->
    <el-form-item label="文章类别" prop="category">
      <el-select v-model="ruleForm.category" placeholder="请选择文章类别">
        <el-option label="书讯" value="BookNews"></el-option>
        <el-option label="童书" value="ChildrensBooks"></el-option>
        <el-option label="活动" value="activity"></el-option>
      </el-select>
    </el-form-item>
    <!-- 文章作者 -->
    <el-form-item label="文章作者" prop="author">
      <el-input v-model="ruleForm.author"></el-input>
    </el-form-item>
    <!-- 文章简介 -->
    <el-form-item label="文章简介" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "addArticle",
  props: ["limit"],
  data() {
    return {
      // 存储数据
      ruleForm: {},
      // 数据规则
      rules: {
        title: [
          { required: true, message: "请输入文章名称", trigger: "blur" },
          { min: 1, max: 35, message: "长度在 1 到 35 个字符", trigger: "blur" }
        ],
        category: [
          { required: true, message: "请选择文章文章类别", trigger: "change" }
        ],
        author: [
          { required: true, message: "请输入文章作者", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写文章简介", trigger: "blur" }]
      },
      dialogVisible: false,
      disabled: false,
      value: true
    };
  },
  methods: {
    // 提交数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("api2/users/addArticle", this.ruleForm).then(res => {
            var status = res.data.status;
            console.log(status);
            if (status == 0) {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.$router.push("/showArticle");
            } else {
              this.$message({
                message: res.data.msg,
                type: "waring"
              });
            }
          });
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
    handleChange(file, fileList) {
      this.ruleForm.articleyImg = URL.createObjectURL(file.raw);
    },

    beforeUpload(file) {
      return true;
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