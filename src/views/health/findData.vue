<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>健康模块</el-breadcrumb-item>
      <el-breadcrumb-item>查看情况</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="22" :offset="1" style="margin-top: 20px;">
      <el-card>
        <div id="myChart" style="width: 100%; height: 600px;"></div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
    name:'findData',
    mounted() {
    this.test();
  },
  methods: {
    test() {
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      var option;

      function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        while (value < 0) {
          value = value + Math.random() * 21 - 10;
        }
        return {
          name: now.toString(),
          value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
            Math.round(value),
          ],
        };
      }
      let data = [];
      let now = new Date(2019, 11, 1); //从2019,12.1
      let oneDay = 24 * 3600 * 1000;
      let value = 1;
      for (var i = 0; i < 1000; i++) {
        data.push(randomData());
      }
      option = {
        title: {
          text: "全球疫情数量增长可视化曲线（始于2019.12.01）",
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return (
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear() +
              " : " +
              params.value[1]
            );
          },
          axisPointer: {
            animation: false,
          },
        },
        xAxis: {
          type: "time",
          name: "时间",
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          name: "万人",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "随机数据",
            type: "line",
            showSymbol: false,
            data: data,
          },
        ],
      };
      setInterval(function () {
        data.shift();
        data.push(randomData());
        myChart.setOption({
          series: [
            {
              data: data,
            },
          ],
        });
      }, 100);

      option && myChart.setOption(option);
    },
  },
}
</script>

<style scoped>
.el-card {
  margin-top: 20px;
  background: #fff url(https://cms.pixso.cn/images/home/role-bg.png) no-repeat;
  background-size: 150% 200%;
  background-position: -500px -800px;
}
</style>