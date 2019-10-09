<template>
  <div>
    <el-form :model="formInline" class="demo-form-inline">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="标题：">{{formInline.title || $route.query.date.title}}</el-form-item>&nbsp;
        <el-form-item label="类别：">
          <el-select v-model="formInline.category" placeholder="选择类别">
            <el-option label="书讯" value="shanghai"></el-option>
            <el-option label="童书" value="beijing"></el-option>
            <el-option label="活动" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">submit</el-button>
        </el-form-item>
      </el-form>
      <editor :catchData="catchData" :content="formInline.content"></editor>
    </el-form>
  </div>
</template>

<script>
import editor from '@/components/wangEditor'
export default {
  name: "updateArticle",
  components: {
    editor
  },
  data() {
    return {
      formInline: {}
    };
  },
  mounted() {
    this.formInline = this.$route.query.date;
    console.log(this.$route.query.date);
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang='' scoped>
</style>