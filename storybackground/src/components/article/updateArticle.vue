<template>
  <div class="articleBox">
    <el-form label-width="120px" :model="formLabelAlign">
      <!-- 文章ID -->
      <el-form-item label="文章ID:">
        <span>{{formLabelAlign._id }}</span>
      </el-form-item>
      <!-- 文章标题 -->
      <el-form-item label="文章标题:">
        <el-input v-model="formLabelAlign.title"></el-input>
      </el-form-item>
      <!-- 文章图片 -->
      <el-form-item label="文章图片:">
        <el-switch v-model="value" active-text="本地上传" inactive-text="链接上传"></el-switch>
        <!-- 本地上传 -->
        <div v-if="value">
          <el-input v-model="formLabelAlign.articleyImg" v-if="false"></el-input>
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
              v-if="formLabelAlign.articleyImg"
              :src="formLabelAlign.articleyImg"
              class="avatar"
              style="height:120px"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <!-- 连接上传 -->
        <div v-else>
          <el-input placeholder="请输入图片链接" v-model="formLabelAlign.articleyImg" clearable></el-input>
        </div>
      </el-form-item>
      <!-- 文章类别 -->
      <el-form-item label="文章类别:">
        <el-select v-model="formLabelAlign.category" placeholder="请选择文章类别">
          <el-option label="书讯" value="newBooks"></el-option>
          <el-option label="童书" value="ChildrensBooks"></el-option>
          <el-option label="活动" value="activity"></el-option>
        </el-select>
      </el-form-item>
      <!-- 发布时间 -->
      <el-form-item label="发布时间">
        <span>{{ formLabelAlign.date}}</span>
      </el-form-item>
      <!-- 文章简介 -->
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
      value: true
    };
  },
  mounted() {
    this.formLabelAlign = this.$route.query.data;
    for (const key in this.formLabelAlign) {
      console.log(key + ":" + this.formLabelAlign[key]);
    }
  },
  methods: {
    onSubmit() {
      this.$axios
        .post("api2/users/updArticle", this.formLabelAlign)
        .then(res => {
          var status = res.data.status;
          if (status == 0) {
            this.$router.push("/showArticle");
            this.$message({
              message: res.data.msg,
              type: "success"
            });
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
    },

    handleChange(file, fileList) {
      this.formLabelAlign.articleyImg = URL.createObjectURL(file.raw);
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