<template>
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()) || data.author.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="title" label="文章标题" width="180"></el-table-column>
      <el-table-column prop="img" label="文章图片" width="180">
        <template scope="scope">
          <img :src="scope.row.img" width="150" height="100" class="img" />
        </template>
      </el-table-column>
      <el-table-column prop="author" label="文章作者" width="100"></el-table-column>
      <el-table-column prop="content" label="文章内容" width="230"></el-table-column>
      <!-- 注册时间 -->
      <el-table-column label="注册时间" width="100">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <!-- 操作删除 -->
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入文章标题搜索" />
        </template>
        <template slot-scope="scope">
          <el-button type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click="open(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 4, 5, 6]"
        :page-size="sizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="bgDate.length"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
export default {
  name: "user",
  data() {
    return {
      // 前台数据
      tableData: [],
      // 后台数据
      bgDate: [
        {
          id: 0,
          title: "李洱：对汉语文学来讲，库切比马尔克斯重要得多",
          author: "agoni",
          img:
            "http://n.sinaimg.cn/book/275/w165h110/20190902/9c90-ieaiqii2235801.jpg",
          content:
            "人民文学出版社将库切的经典作品一网打尽，将陆续在“库切文集”中出版。文集将于2020年出齐，并且为了弥补之前版本不统一的遗憾，也为了让库切在新版本展现新的风貌，这套文集不仅是献给库切读者的惊",
          createDate:
            new Date().getMonth() + 1 + "月" + new Date().getDate() + "号"
        },
        {
          id: 1,
          title: "《王亭之谈食》分享会：香港“食神”谈美食忆往事",
          author: "agoni",
          img:
            "http://n.sinaimg.cn/book/275/w165h110/20190830/66d0-icxmqsv6831311.jpg",
          content:
            "王亭之，香港“食神”级人物，食界引路人之一，多款食制的创立者及幕后推手。《王亭之谈食》，一部写在传统饮食文化潮起潮落时代的批评小品，一述中餐饮食砧炉盘盏间的趣秘。文笔风趣，且见性情。劝诫垂范",
          createDate:
            new Date().getMonth() + 1 + "月" + new Date().getDate() + "号"
        },
        {
          id: 2,
          title: "莫砺锋教授谈“唐诗苑的入门与探幽”：读诗最后就是读人",
          author: "jackect",
          img:
            "http://n.sinaimg.cn/book/275/w165h110/20190818/18ed-icmpfwz7239191.jpg",
          content:
            "莫先生曾说：“唐诗犹如一座气象万千的深山，我曾通读过存世的全部唐诗，对唐诗这座大山的进山路径和景点方位比较熟悉。我想做那个站在山口向游客指点进山路径和解说沿途风景的导游。”自称为“导游”是莫",
          createDate: new Date().getMonth() + 1 + "月"
        },
        {
          id: 3,
          title: "第十届茅盾文学奖揭晓：李洱徐则臣梁晓声等五位作家获奖",
          author: "agoni",
          img:
            "http://n.sinaimg.cn/book/275/w165h110/20190816/bbe7-ichcymv8853214.jpg",
          content:
            "第十届茅盾文学奖评奖办公室今天公布了本届茅盾文学奖的获奖作品，分别是：《人世间》（梁晓声）、《牵风记》（徐怀中）、《北上》（徐则臣）、《主角》（陈彦）和《应物兄》（李洱）。",
          createDate:
            new Date().getMonth() + 1 + "月" + new Date().getDate() + "号"
        },
        {
          id: 4,
          title: "长居六十年笔耕四十载：南京人叶兆言立《南京传》",
          author: "agoni",
          img:
            "http://n.sinaimg.cn/book/275/w165h110/20190815/210d-ichcymv2131515.jpg",
          content:
            "在这部集其四十年写作大成的《南京传》中，叶兆言以史为纲爬梳剔抉南京历史：从公元211年孙权迁治秣陵，到1949年百万雄师过大江，历经东吴霸业、六朝金粉、南唐偏安、明清隆替、民国风云，南京如何",
          createDate:
            new Date().getMonth() + 1 + "月" + new Date().getDate() + "号"
        },
        {
          id: 5,
          title: "李洱：对汉语文学来讲，库切比马尔克斯重要得多",
          author: "rain",
          img:
            "http://n.sinaimg.cn/book/275/w165h110/20190902/9c90-ieaiqii2235801.jpg",
          content:
            "人民文学出版社将库切的经典作品一网打尽，将陆续在“库切文集”中出版。文集将于2020年出齐，并且为了弥补之前版本不统一的遗憾，也为了让库切在新版本展现新的风貌，这套文集不仅是献给库切读者的惊",
          createDate:
            new Date().getMonth() + 1 + "月" + new Date().getDate() + "号"
        },
        {
          id: 6,
          title: "《王亭之谈食》分享会：香港“食神”谈美食忆往事",
          author: "agoni",
          img:
            "http://n.sinaimg.cn/book/275/w165h110/20190830/66d0-icxmqsv6831311.jpg",
          content:
            "王亭之，香港“食神”级人物，食界引路人之一，多款食制的创立者及幕后推手。《王亭之谈食》，一部写在传统饮食文化潮起潮落时代的批评小品，一述中餐饮食砧炉盘盏间的趣秘。文笔风趣，且见性情。劝诫垂范",
          createDate:
            new Date().getMonth() + 1 + "月" + new Date().getDate() + "号"
        },
        {
          id: 7,
          title: "莫砺锋教授谈“唐诗苑的入门与探幽”：读诗最后就是读人",
          author: "agoni",
          img:
            "http://n.sinaimg.cn/book/275/w165h110/20190818/18ed-icmpfwz7239191.jpg",
          content:
            "莫先生曾说：“唐诗犹如一座气象万千的深山，我曾通读过存世的全部唐诗，对唐诗这座大山的进山路径和景点方位比较熟悉。我想做那个站在山口向游客指点进山路径和解说沿途风景的导游。”自称为“导游”是莫",
          createDate: new Date().getMonth() + 1 + "月"
        },
        {
          id: 8,
          title: "第十届茅盾文学奖揭晓：李洱徐则臣梁晓声等五位作家获奖",
          author: "agoni",
          img:
            "http://n.sinaimg.cn/book/275/w165h110/20190816/bbe7-ichcymv8853214.jpg",
          content:
            "第十届茅盾文学奖评奖办公室今天公布了本届茅盾文学奖的获奖作品，分别是：《人世间》（梁晓声）、《牵风记》（徐怀中）、《北上》（徐则臣）、《主角》（陈彦）和《应物兄》（李洱）。",
          createDate:
            new Date().getMonth() + 1 + "月" + new Date().getDate() + "号"
        },
        {
          id: 9,
          title: "长居六十年笔耕四十载：南京人叶兆言立《南京传》",
          author: "agoni",
          img:
            "http://n.sinaimg.cn/book/275/w165h110/20190815/210d-ichcymv2131515.jpg",
          content:
            "在这部集其四十年写作大成的《南京传》中，叶兆言以史为纲爬梳剔抉南京历史：从公元211年孙权迁治秣陵，到1949年百万雄师过大江，历经东吴霸业、六朝金粉、南唐偏安、明清隆替、民国风云，南京如何",
          createDate:
            new Date().getMonth() + 1 + "月" + new Date().getDate() + "号"
        }
      ],
      //每页条数
      sizeChange: 3,
      // 当前页数，支持 .sync 修饰符
      currentPage: 1,
      search: ""
    };
  },
  mounted() {
    this.showPagination(this.currentPage);
  },
  methods: {
    // 每页条数
    handleSizeChange(val) {
      this.sizeChange = val;
      this.handleCurrentChange(this.currentPage);
      console.log(`每页 ${this.sizeChange} 条`);
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.showPagination(val);
      console.log(`当前页: ${val} ${this.currentPage}`);
    },
    // 页面数范围
    showPagination(curPage) {
      this.tableData = [];
      var bgLen = this.bgDate.length;
      var left = this.sizeChange * (curPage - 1);
      var right = this.sizeChange * curPage;
      for (var i = 0; i < bgLen; i++) {
        if (i >= left && i < right) {
          this.tableData.push(this.bgDate[i]);
        }
      }
    },
    // 编辑
    handleEdit(index, row) {
      this.$router.push("/updateArticle");
    },
    // 删除
    handleDelete(id) {
      var newArray = [];
      // 使用array过滤方法
      newArray = this.bgDate.filter(item => {
        if (item.id != id) {
          return item;
        }
      });
      this.bgDate = newArray;
      this.showPagination(this.currentPage);
      // 判断页面的数据是否没有，如果没有就自动跳转到前一页
      if (Math.ceil(newArray.length / this.sizeChange) != this.currentPage) {
        this.handleCurrentChange(this.currentPage - 1);
      }
    },
    // 弹出框
    open(index, row) {
      this.$confirm("此操作将永久删除此数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.handleDelete(row.id);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped>
.cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.block {
  margin-top: 25px;
}
.el-table__row {
  height: 80px !important;
}
</style>