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
    <el-form-item label="文章图片">
      <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        :limit="1"
        :on-remove='handleRemove'
        :on-change="handleAvatarupload"
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail" :src="ruleForm.imageUrl" alt />
          <span class="el-upload-list__item-actions">
            <!-- 放大 -->
            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
              <i class="el-icon-zoom-in"></i>
            </span>
            <!-- 删除 -->
            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="ruleForm.imageUrl" alt />
      </el-dialog>
    </el-form-item>
    <!-- 文章类别 -->
    <el-form-item label="文章类别" prop="chapter">
      <el-select v-model="ruleForm.chapter" placeholder="请选择文章类别">
        <el-option label="书讯" value="BookNews"></el-option>
        <el-option label="童书" value="ChildrensBooks"></el-option>
        <el-option label="活动" value="activity"></el-option>
      </el-select>
    </el-form-item>
    <!-- 文章日期 -->
    <el-form-item label="文章发表时间" prop="date">
      <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期"></el-date-picker>
    </el-form-item>
    <!-- 文章作者 -->
    <el-form-item label="文章作者" prop="author">
      <el-input v-model="ruleForm.author"></el-input>
    </el-form-item>
    <!-- 文章简介 -->
    <el-form-item label="文章简介" prop="intro">
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
  name: "addArticle",
  props: ["limit"],
  data() {
    return {
      // 存储数据
      ruleForm: {
        title: "",
        imageUrl: "",
        chapter: "",
        date: "",
        author: "",
        intro: ""
      },
      // 数据规则
      rules: {
        title: [
          { required: true, message: "请输入文章名称", trigger: "blur" },
          { min: 1, max: 35, message: "长度在 1 到 35 个字符", trigger: "blur" }
        ],
        chapter: [
          { required: true, message: "请选择文章文章类别", trigger: "change" }
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
          { required: true, message: "请输入文章作者", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请填写文章简介", trigger: "blur" }]
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
    handleRemove(file, fileList) {
      this.ruleForm.imageUrl = '';
    },
    handlePictureCardPreview(file) {
      this.ruleForm.imageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarupload(file) {
      this.ruleForm.imageUrl = file.url;
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