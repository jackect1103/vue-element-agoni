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
    <el-form-item label="小说图片:">
      <el-switch v-model="value" active-text="本地上传" inactive-text="链接上传"></el-switch>
      <div v-if="value">
        <el-input v-model="ruleForm.storyImg" v-if="false"></el-input>
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
            v-if="ruleForm.storyImg"
            :src="ruleForm.storyImg"
            class="avatar"
            style="height:120px"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <!-- 连接上传 -->
      <div v-else>
        <el-input placeholder="请输入图片链接" v-model="ruleForm.storyImg" clearable></el-input>
      </div>
    </el-form-item>
    <!-- 小说作者 -->
    <el-form-item label="小说作者" prop="author">
      <el-input v-model="ruleForm.author" clearable></el-input>
    </el-form-item>
    <!-- 小说主角 -->
    <el-form-item label="小说主角" prop="role">
      <el-input v-model="ruleForm.role" clearable></el-input>
    </el-form-item>
    <!-- 小说类别 -->
    <el-form-item label="小说类别" prop="category">
      <el-select v-model="ruleForm.category" placeholder="请选择小说类别">
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
    <el-form-item label="小说类型性别" prop="sex">
      <el-select v-model="ruleForm.sex" placeholder="请选择小说类型性别">
        <el-option label="男孩" value="boy"></el-option>
        <el-option label="女孩" value="girl"></el-option>
      </el-select>
    </el-form-item>
    <!-- 小说简介 -->
    <el-form-item label="小说简介" prop="desc" placeholder="小说简介">
      <el-input type="textarea" v-model="ruleForm.desc" autosize clearable></el-input>
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
      ruleForm: {},
      // 数据规则
      rules: {
        name: [
          { required: true, message: "请输入小说名称", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        category: [
          { required: true, message: "请选择小说类别", trigger: "change" }
        ],
        sex: [
          { required: true, message: "请选择小说类型性别", trigger: "change" }
        ],
        author: [
          { required: true, message: "请输入小说作者", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写小说简介", trigger: "blur" }]
      },
      value: true
    };
  },
  methods: {
    // 提交数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("api2/users/addStory", this.ruleForm).then(res => {
            var status = res.data.status;
            console.log(status);
            if (status == 0) {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.$router.push('/showStory');
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
      this.ruleForm.storyImg = URL.createObjectURL(file.raw);
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