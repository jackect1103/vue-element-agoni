<template>
  <div class="articleBox">
    <el-form label-width="120px" :model="formLabelAlign">
      <el-form-item label="文章ID:">
        <span>{{formLabelAlign.id }}</span>
      </el-form-item>
      <el-form-item label="文章标题:">
        <el-input v-model="formLabelAlign.title"></el-input>
      </el-form-item>
      <el-form-item label="文章图片:">
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
      <el-form-item label="文章作者:">
        <el-input v-model="formLabelAlign.author"></el-input>
      </el-form-item>
      <el-form-item label="文章类别:">
        <el-select v-model="formLabelAlign.chapter" placeholder="请选择文章类别">
          <el-option label="书讯" value="newBooks"></el-option>
          <el-option label="童书" value="ChildrensBooks"></el-option>
          <el-option label="活动" value="activity"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章简介:">
        <el-input type="textarea" v-model="formLabelAlign.content" :rows="5"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "updateArticle",
  data() {
    return {
      formLabelAlign: {},
    };
  },
  mounted() {
    this.formLabelAlign = this.$route.query.date;
    console.log("1" + this.formLabelAlign.img);
  },
  methods: {
    onSubmit() {
      console.log("2" + this.formLabelAlign.img);
    },

    handleChange(file, fileList) {
      this.formLabelAlign.img = URL.createObjectURL(file.raw);
    },

    beforeUpload(file) {
      return true;
    }
  }
};
</script>
<style lang='css' scoped>
.articleBox {
  width: 60%;
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