<template>
  <div class="StoryBox">
    <el-form label-width="120px" :model="formLabelAlign">
      <!-- 小说ID -->
      <el-form-item label="小说ID:">
        <span>{{formLabelAlign._id }}</span>
      </el-form-item>
      <!-- 小说标题 -->
      <el-form-item label="小说名称:">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <!-- 小说图片 -->
      <el-form-item label="小说图片:"> 
        <el-switch v-model="value" active-text="本地上传" inactive-text="链接上传"></el-switch>
        <!-- 本地上传 -->
        <div v-if="value">
          <el-input v-model="formLabelAlign.storyImg" v-if="false"></el-input>
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
              v-if="formLabelAlign.storyImg"
              :src="formLabelAlign.storyImg"
              class="avatar"
              style="height:120px"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <!-- 连接上传 -->
        <div v-else>
          <el-input placeholder="请输入图片链接" v-model="formLabelAlign.storyImg" clearable></el-input>
        </div>
      </el-form-item>
      <!-- 小说作者 -->
      <el-form-item label="小说作者:">
        <span>{{ formLabelAlign.author}}</span>
      </el-form-item>
      <!-- 小说主演 -->
      <el-form-item label="小说主演:">
        <span>{{ formLabelAlign.role}}</span>
      </el-form-item>
      <!-- 小说类别 -->
      <el-form-item label="小说类别:">
        <el-select v-model="formLabelAlign.category" placeholder="请选择小说类别">
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
      <!-- 发布时间 -->
      <el-form-item label="发布时间">
        <span>{{ formLabelAlign.commitDate}}</span>
      </el-form-item>
      <!-- 小说简介 -->
      <el-form-item label="小说简介:">
        <el-input type="textarea" v-model="formLabelAlign.desc" :rows="5"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "updateStory",
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
        .post("api2/users/updateNavel", this.formLabelAlign)
        .then(res => {
          var status = res.data.status;
          if (status == 0) {
            this.$router.push("/showStory");
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
      this.formLabelAlign.StoryImg = URL.createObjectURL(file.raw);
    },

    beforeUpload(file) {
      return true;
    }
  }
};
</script>
<style lang='css' scoped>
.StoryBox {
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