<template>
  <div class="stocks">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物资管理</el-breadcrumb-item>
      <el-breadcrumb-item>库存维护</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="rowech">
      <el-row :gutter="20" class="linerow">
        <el-col :span="12" style="margin-bottom: 5px">
          <el-card>
            <span>仓库名称：</span>
            <el-select v-model="stockName" placeholder="全部仓库">
              <el-option
                v-for="item in stocks"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card>
            <div id="barEchart" style="width: 100%; height: 400px"></div>
          </el-card>
        </el-col>
        <el-col :span="12" style="margin-top: 15px">
          <el-card>
            <div id="preEchart" style="width: 100%; height: 400px"></div>
          </el-card>
        </el-col>
      </el-row>

      <el-row class="barrow">
        <el-card>
          <el-col :span="24">
            <el-form ref="form" :model="queryMap" label-width="20px">
              <el-form-item>
                <el-input
                  clearable
                  @clear="search"
                  v-model="queryMap.name"
                  placeholder="物资名称"
                ></el-input>
              </el-form-item>
              <el-form-item style="margin-right: 30px">
                <el-button
                  size="mini"
                  type="primary"
                  @click="search"
                  icon="el-icon-search"
                  >查询</el-button
                >
              </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column
                label="图片"
                align="center"
                width="80"
                padding="0px"
              >
                <template slot-scope="scope">
                  <el-popover placement="right" trigger="hover">
                    <img
                      :src="scope.row.file"
                      style=" width: 200px"
                      alt=""
                    />
                    <img
                      slot="reference"
                      :src="scope.row.path"
                      alt=""
                      style="height: 21px; width: 21px; cursor: pointer"
                    />
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="140"
              ></el-table-column>
              <el-table-column
                prop="specification"
                label="规格"
              ></el-table-column>
              <el-table-column prop="quantity" label="库存"> </el-table-column>
              <el-table-column prop="unite" label="单位"></el-table-column>
              <el-table-column
                prop="storeName"
                label="库存地址"
              ></el-table-column>
            </el-table>
          </el-col>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stocks",
  data() {
    return {
      queryMap: {
        start: 1,
        limit: 100,
        name: "",
        storeName: "",
        level: "",
        level2: "",
      },
      total: 0,
      barData: [], //条形统计图数据
      preData: [], //饼状统计图数据
      barxAxisData: [],
      tableData: [],
      legendData: [],
      seriesData: [],
      selected: {},
      categorys: [],
      categorykeys: [],
      stockName: "大学城西永微电园临街仓库",
      stocks: [],
    };
  },
  created() {
    this.getData();
    this.getCategorys();
    this.getStockName();
    this.getStock();
  },
  mounted() {
    this.getbarEchart();
    this.getpreEchart();
  },
  watch: {
    stockName(){
      this.getData();
        this.getStock();
    }      
  },
  methods: {
    //查询
    search() {
      this.getData();
    },

    //查询仓库物资占比
    async getStock() {
      const data = new FormData();
      data.append("storeName", this.stockName);
      const res = await this.$http.post("materials/storeProportion", data);
      if (res.status !== 200) {
        this.$message.error("获取数据失败");
      } else {
        const data = res.data.data.proportion;
        this.barData = data.map((item) => {
          return item.total;
        });
        this.barxAxisData = data.map((item) => {
          return item.name;
        });

        this.legendData = [];
        this.selected = {};
        this.seriesData = [{}];
        var $this = this;
        //构建饼图的数据对象
        data.forEach(function (e) {
          $this.legendData.push(e.name);
          $this.seriesData.push({ name: e.name, value: e.total });
        });

        //重新绘制统计图
        this.getbarEchart();
        this.getpreEchart();
      }
    },

    //获取仓库
    async getStockName() {
      const res = await this.$http.get("storehouse/searchAllStorehouseName");
      this.stocks = res.data.data.storehouse.reverse();
    },

    //获取仓库数据
    async getData() {
      this.queryMap.storeName = this.stockName;
      const res = await this.$http.get("materials/selectByConditional",{
        params: this.queryMap
      })
      if (res.status !== 200) {
        return this.$message.error("获取数据失败");
      } else {
        //柱状图数据
        this.total = res.data.length;
        this.tableData = res.data;
        console.log(res.data);
      }
    },

    //获取类别数据
    //初始化类别数据
    async getCategorys() {
      try {
        const res = await this.$http.get("materials/show_type");
        if (res.status === 200) {
          const data = res.data.data.show_type.list;

          //递归生成前端所需的生成树
          const maps = (data) => {
            return data.map((item) => {
              let obj = {
                value: item.name,
                label: item.name,
              };
              if (item.hasOwnProperty("list")) {
                if (item.list) obj.children = maps(item.list);
              }
              return obj;
            });
          };

          this.categorys = maps(data);
        }
      } catch (err) {
        this.$message.error("获取信息失败！" + err);
      }
    },

    //条形统计图
    getbarEchart() {
      var barArt = this.$echarts.init(document.getElementById("barEchart"));
      var baroption = {
        title: {
          text: "库存统计图",
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: { readOnly: false }, //  缩放
            magicType: { type: ["bar","line"] }, ///　　折线  直方图切换
            restore: {}, // 重置
            saveAsImage: {}, // 导出图片
          },
        },
        tooltip: {},
        legend: {
          data: [this.stockName],
        },
        xAxis: {
          data: this.barxAxisData,
           showMaxLable:true,//显示最大值
        },
        yAxis: {},
        series: [
          {
            name: this.stockName,
            type: "line",
            barMinWidth: 2,
            showBackground: true,
            data: this.barData,
            itemStyle: {
              normal: {
                //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                color: function (params) {
                  // build a color map as your need.
                  var colorList = [
                    "#0780cf ",
                    "#fa6d1d ",
                    "#ac2026 ",
                    "#701866 ",
                    "#d22e8d ",
                    "#FE8463",
                    "#a195c5 ",
                    "#FAD860",
                    "#F3A43B",
                    "#60C0DD",
                    "#D7504B",
                    "#a195c5  ",
                    "#F4E001",
                    "#F0805A",
                    "#63b2ee",
                  ];
                  return colorList[params.dataIndex];
                }, //以下为是否显示，显示位置和显示格式的设置了
                label: {
                  show: true,
                  position: "top",
                  formatter: "{b}\n{c}",
                },
              },
            },
          },
        ],
      };
      barArt.setOption(baroption);
    },

    //饼状统计图
    getpreEchart() {
      var preArt = this.$echarts.init(document.getElementById("preEchart"));
      var preOption = {
        title: {
          text: "库存占比图",
          left: "left",
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}, // 导出图片
          },
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
          data: this.legendData,
          selected: this.selected,
        },
        series: [
          {
            name: "物资名称",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: this.seriesData,
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
      preArt.setOption(preOption);
    },
  },
};
</script>

<style scoped>
.rowech {
  display: flex;
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