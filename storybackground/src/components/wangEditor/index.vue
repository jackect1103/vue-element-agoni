<template>
  <div id="wangeditor">
    <div ref="editorElem"></div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "editorElem",
  data() {
    return {
      editor: null,
      editorContent: ""
    };
  },
  props: ["catchData", "content"], // 接收父组件的方法
  watch: {
    content() {
      this.editor.txt.html(this.content);
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
      this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
    };
    this.editor.customConfig.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
  }
};
</script>
<style lang="css" scoped>
#wangeditor {
  width: 50rem;
}
</style>