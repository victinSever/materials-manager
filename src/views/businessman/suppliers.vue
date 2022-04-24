<template>
  <div class="suppliers">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物资流向</el-breadcrumb-item>
      <el-breadcrumb-item>物资来源</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="rowech">
      <el-row :gutter="20" class="linerow">
        <el-col :span="12">
          <el-card>
            <div id="chart_stockOrgin" style="width: 100%; height: 400px"></div>
          </el-card>
        </el-col>
        <el-col :span="12" style="margin-top: 15px">
          <el-card>
            <div id="chart_goods" style="width: 100%; height: 400px"></div>
          </el-card>
        </el-col>
      </el-row>

      <el-row class="barrow">
        <el-card>
          <el-col :span="24">
            <div id="chart_community" style="width: 100%; height: 875px"></div
          ></el-col>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Suppliers",
  data() {
    return {
      echart1: {
        legendData: [
          "政府援助",
          "企业援助",
          "基金援助",
          "个人援助",
          "其他援助",
        ],
        seriesData: [],
      },
      echart2: {
        legendData: [],
        seriesData: [],
      },
      echart3: {
        legendData: [],
        seriesData: [],
      },
    };
  },
  created() {
    this.initFirstData();
    this.initSecondData();
    this.initThirdtData();
  },
  mounted() {
    this.initFirstTable();
    this.initSecondTable();
    this.initThirdTable();
  },
  methods: {
    //第一个表
    initFirstTable() {
      var chartDom = document.getElementById("chart_stockOrgin");
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "物资来源占比",
          subtext: "一天内统计数据",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "right",
        },
        series: [
          {
            name: "来源大类",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 5,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",

              label: {
                show: true,
                fontSize: "30",

                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.echart1.seriesData,
          },
        ],
      };

      option && myChart.setOption(option);
    },

    //第二个表
    initSecondTable() {
      var chart_goods = this.$echarts.init(
        document.getElementById("chart_goods")
      );
      var option;

      option = {
        title: {
          text: "入库仓库占比",
          subtext: "一天内统计数据",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "单日仓库进货量",
            type: "pie",
            radius: "50%",
            data: this.echart2.seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && chart_goods.setOption(option);
    },

    //第三个表：社区
    initThirdTable() {
      var myChart = this.$echarts.init(
        document.getElementById("chart_community")
      );
      var option;
      option = {
        title: {
          text: "单个物资增加统计",
          subtext: "单日统计数据",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20,
          data: this.echart3.legendData,
        },
        series: [
          {
            name: "物资名称",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: this.echart3.seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },

    //获取第一个表的数据
    async initFirstData() {
      try {
        const res1 = await this.$http.get("records/countTodayInPercentage");
        if (res1.status === 200) {
          res1.data.forEach((item, index) => {
            this.echart1.seriesData.push({
              value: item,
              name: this.echart1.legendData[index],
            });
          });
          this.initFirstTable();
        }
      } catch (err) {
        this.$message.error("物资来源类型数据获取失败！" + err);
      }
    },

    //第二个表
    async initSecondData() {
      try {
        const res = await this.$http.post("materials/proportion");
        if (res.status === 200) {
          const a = res.data.data.proportion;
          a.forEach((item) => {
            this.echart2.legendData.push(item.name);
            this.echart2.seriesData.push({
              value: item.total,
              name: item.name,
            });
          });
          this.initSecondTable();
        }
      } catch (err) {
        this.$message.error("物资占比数据获取失败！" + err);
      }
    },

    //第三个表
    async initThirdtData() {
      //第三个表
      try {
        const data = new FormData();
        data.append("storeName", "蔡家物流园");
        const res = await this.$http.post("materials/add_proportion", data);
        if (res.status === 200) {
          const a = res.data.data.add_proportion;
          a.forEach((element) => {
            this.echart3.legendData.push(element.name);
            this.echart3.seriesData.push({
              name: element.name,
              value: element.total,
            });
          });
          this.initThirdTable();
        }
      } catch (err) {
        this.$message.error("数据获取失败！" + err);
      }
    },
  },
};
</script>

<style scoped lang='less'>
#chart_stockOrgin,
#chart_goods,
#chart_community {
  background: url(https://cms.pixso.cn/images/home/role-bg.png) no-repeat;
  background-position: -100 0;
  background-size: 150% 150%;
  z-index: 2;
}
.rowech {
  display: flex;
}
.el-card {
  background-color: #fcfcfc;
}
.el-row {
  margin-top: 15px;
}
.linerow {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.barrow {
  flex: 1;
}
.el-col-12 {
  width: 98% !important;
}
.el-form {
  display: flex;
}
</style>