<template>
  <div>
    <div class="showDate">
      <p>当前时间：{{ date }}</p>
      <div style="display: flex; margin-top: 20px; height: 100px;">
        <div class="transition-box">
          <i class="iconfont icon-duxiaoshuo"></i>
          <span>小说总数 512</span>
        </div>
        <div class="transition-box">
          <i class="iconfont icon-16"></i>
          <span>文章总数 210</span>
        </div>
        <div class="transition-box">
          <i class="iconfont icon-yonghu"></i>
          <span>用户数量 1530</span>
        </div>
      </div>
    </div>
    <!-- 显示饼图 -->
    <div class="pieDate">
      <p>数据比例图</p>
      <div class="showPic">
        <div id="category" :style="{width: '300px', height: '300px'}"></div>
        <div id="gender" :style="{width: '300px', height: '300px'}"></div>
        <div id="age" :style="{width: '300px', height: '300px'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dataAnalysis",
  components: {},
  data() {
    return {
      date: "",
      genderDate: {
        showDate: [{ value: 335, name: "男孩" }, { value: 310, name: "女孩" }],
        title: "按男女分类"
      },
      ageDate: {
        showDate: [
          { value: 335, name: "00" },
          { value: 450, name: "90" },
          { value: 335, name: "80" },
          { value: 192, name: "70" },
          { value: 335, name: "60" },
          { value: 174, name: "50" }
        ],
        title: "小说读者年龄段"
      },
      categoryDate: {
        showDate: [
          { value: 335, name: "玄幻" },
          { value: 310, name: "都市" },
          { value: 274, name: "武侠" },
          { value: 235, name: "文学" },
          { value: 400, name: "穿越" },
          { value: 274, name: "悬疑" },
          { value: 235, name: "历史" },
          { value: 400, name: "游戏" }
        ],
        title: "小说类别"
      }
    };
  },
  mounted() {
    this.nowDate();
    // 基于准备好的dom，初始化echarts实例
    /**
     * 由于一个组件加载多个echarts会导致加载速度慢甚至浏览器崩溃
     * 所以在获取到数据之前，先执行loading方法
     * 参考资料
     * eg：https://www.wandouip.com/t5i143248/
     */
    // this.myChart = this.$echarts.init(document.getElementById("category"));
    // this.gender = this.$echarts.init(document.getElementById("gender"));
    // this.age = this.$echarts.init(document.getElementById("age"));
    // this.loading;
    // this.initDrawDevEchart;
  },
  computed: {
    initDrawDevEchart() {
      this.myChart.hideLoading();
      // this.gendere.hideLoading();
      this.setOption(this.myChart, this.categoryDate);
      // this.setOption(this.gendere, this.genderDate);
    },
    // 当数据还没收到时执行加载方法
    loading: {
      get: function() {
        this.setOption(this.myChart);
        // this.setOption(this.gendere);
      },
      set(e) {}
    }
  },
  methods: {
    //  显示当前时间
    nowDate() {
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month = nowDate.getMonth() + 1;
      var day = nowDate.getDate();
      var h = nowDate.getHours();
      var m = nowDate.getMinutes();
      var d = nowDate.getSeconds();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      this.date = year + "-" + month + "-" + day + " " + h + ":" + m + ":" + d;
      setInterval(this.nowDate, 1000);
    },
    // 设置数据
    setOption(obj, allDate = {}) {
      obj.setOption({
        backgroundColor: "#2c343c",
        title: {
          text: allDate.title,
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "访问来源:后台数据",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: allDate.showDate,
            roseType: "radius",
            label: {
              normal: {
                textStyle: {
                  color: "#fff"
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "#fff"
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              normal: {
                color: function(params) {
                  //自定义颜色
                  var colorList = [
                    "pink",
                    "purple",
                    "#fda100",
                    "skyblue",
                    "blue",
                    "#67C23A",
                    "#E6A23C",
                    "#F56C6C"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      });
      obj.showLoading({
        text: "统计中，请稍候...",
        maskColor: "rgba(3,3,8,0.5)",
        textColor: "#fff"
      });
    }
  }
};
</script>
<style lang='css' scoped>
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #ffa060;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
.transition-box:nth-child(2) {
  background-color: #7dc428;
}
.transition-box:nth-child(3) {
  background-color: #61d1ff;
}
.iconfont {
  margin-right: 10px;
}
/* 饼图 */
.pieDate {
  margin-top: 25px;
}
.pieDate p {
  font-size: 20px;
  color: #303133;
}
.showPic {
  margin-top: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>