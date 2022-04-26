<template>
  <div class="map">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>健康模块</el-breadcrumb-item>
      <el-breadcrumb-item>全国疫情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <el-tabs type="card" class="tabs">
            <el-tab-pane label="疫情概览" name="first">
              <el-table :data="info" style="width: 100%" border>
                <el-table-column prop="date" label="名称" width="180"></el-table-column>
                <el-table-column prop="name" label="数量" width="180"></el-table-column>
                <el-table-column prop="address" label="较昨日"></el-table-column>
                <el-table-column prop="address" label="时间"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="TOP10城市" name="second" style="display: block">
              <el-table height="400" border :data="top10" style="width: 100%;font-size: 10px;">
                <el-table-column prop="name" label="城市名称" width="180"></el-table-column>
                <el-table-column prop="ename" label="English"></el-table-column>
                <el-table-column prop="jwsrNum" label="确诊人数" width="180">
                  <template slot-scope="scope">
                    <el-tag v-text="scope.row.jwsrNum+'人'" size="mini" type="danger" effect="plain"></el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="xinguanmap" style="height:455px"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-table
            :data="tableData"
            style="width: 100%"
            :default-sort="{prop: 'date', order: 'descending'}"
            height="550"
          >
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table :data="scope.row.city" style="width: 100%">
                  <el-table-column prop="name" label="城市/区" width="200"></el-table-column>

                  <el-table-column sortable label="现存确诊" prop="econNum"></el-table-column>
                  <el-table-column sortable label="累计确诊" prop="cureNum"></el-table-column>
                  <el-table-column sortable label="疑似" prop="susNum"></el-table-column>
                  <el-table-column sortable label="死亡" prop="deathNum"></el-table-column>
                  <el-table-column sortable label="现存无症状" prop="asymptomNum"></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="省份" sortable width="180"></el-table-column>
            <el-table-column prop="econNum" label="现存确诊" sortable width="180"></el-table-column>
            <el-table-column prop="value" label="累计确诊" sortable></el-table-column>
            <el-table-column prop="susNum" label="疑似" sortable></el-table-column>
            <el-table-column prop="deathNum" label="死亡" sortable></el-table-column>
            <el-table-column prop="asymptomNum" label="现存无症状" sortable></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import jsonp from "jsonp";
const option = {
  title: {
    text: "疫情地图",
    subtext: "疫情地图",
  },
  tooltip: {},
  series: [
    {
      name: "确诊人数",
      type: "map", //展示的是地图还是line线形图还是bar柱状
      map: "china",
      data: [],
      label: {
        //鼠标移动到地图显示的文字和样式
        show: true,
        color: "#fff",
        fontSize: 10,
      },
      roam: true, //为true就是地图既可以平移也可以缩放
      zoom: 1.2, //控制地图的放大缩小
      itemStyle: {
        areaColor: "#83b5e7",
        borderColor: "yellow", //边框颜色
      },
      /*     控制鼠标滑过之后的背景色和字体颜色*/
      emphasis: {
        label: {
          color: "#fff",
          fontsize: 12,
        },
        itemStyle: {
          areaColor: "#83b5e7",
        },
      },
    },
  ],
  visualMap: {
    type: "piecewise", //设置为分段型
    show: true,
    pieces: [
      { min: 10000 }, // 不指定 max，表示 max 为无限大（Infinity）。
      { min: 1000, max: 9990 },
      { min: 100, max: 999 },
      { min: 10, max: 99 },
      { min: 1, max: 9 },
    ],
    inRange: {
      symbol: "rect",
      color: ["#ffc0b1", "#e70520"],
    },
    itemWidth: 20,
    itemHeight: 10,
  },

  tooltip: {
    trigger: "item", //数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
  },
};

export default {
  name: "Map",
  data() {
    return {
      info: [],
      tableData: [], //底下第三个窗口的数据
      top10: [],
    };
  },
  mounted() {
    this.getData();
    this.mychart = this.$echarts.init(document.getElementById("xinguanmap"));
    this.mychart.setOption(option);
  },
  methods: {
    getData() {
      jsonp(
        "https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427", //接口
        {},
        (err, data) => {
          if (!err) {
            let list = data.data.list.map((item) => ({
              name: item.name,
              value: item.value,
            }));
            this.top10 = data.data.jwsrTop
            option.series[0].data = list; //将list数据移到echart中的data当中
            this.tableData = data.data.list;
            this.mychart.setOption(option);
          }
        }
      );
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-top: 25px;
}
</style>