<template>
  <div class="welcome">
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>欢迎</el-breadcrumb-item>
    </el-breadcrumb>

    <!---->
    <el-row :gutter="20">
      <el-col :span="13">
        <el-card class="userInfo">
          <div class="userInfo-top">
            <span>用户信息</span>
            <el-button
              type="primary"
              class="el-icon-s-custom"
              size="mini"
              plain
              @click="openUserCenter"
              >用户中心</el-button
            >
            <el-button
              type="primary"
              class="el-icon-share"
              size="mini"
              plain
              @click="getCode"
              >获取源码</el-button
            >
          </div>
          <el-divider></el-divider>
          <div class="userInfo-bottom">
            <el-image
              style="width: 80px; height: 80px"
              :src="imgurl"
            ></el-image>
            <el-table
              :data="tableInfo"
              border
              :fit="true"
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
              style="width: 400px"
            >
              <el-table-column
                prop="account"
                label="用户账号"
              ></el-table-column>
              <el-table-column
                prop="userName"
                label="用户昵称"
              ></el-table-column>
              <el-table-column
                prop="department"
                label="所属部门"
              ></el-table-column>
              <el-table-column prop="role" label="管理员等级"></el-table-column>
            </el-table>
          </div>
        </el-card>

        <!-- 图片化快捷入口 -->
        <el-card class="materMan">
          <!--物资管理-->
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content Material-information">
                <router-link to="/products">
                  <img src="../../../assets/images/1.svg" width="60.8px;" alt />
                </router-link>
                <div>物资资料</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content Material-inventory">
                <router-link to="/stocks">
                  <img src="../../../assets/images/2.svg" width="60.8px;" alt />
                </router-link>
                <div>物资库存</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content Material-storage">
                <router-link to="/stockList">
                  <img src="../../../assets/images/3.svg" width="60.8px;" alt />
                </router-link>
                <div>物资记录</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content Material-distribution">
                <router-link to="/operate">
                  <img src="../../../assets/images/4.svg" width="60.8px;" alt />
                </router-link>
                <div>物资调度</div>
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!--用户登录报表-->
        <el-card class="userEcharts">
          <div
            id="loginReport"
            style="width: 600px; height: 250px; margin: 10px auto"
          ></div>
        </el-card>
      </el-col>

      <!-- 日历 -->
      <el-col :span="11">
        <el-card class="rili">
          <el-calendar v-model="rili"></el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import echarts from "echarts";
export default {
  name: "Welcome",
  data() {
    return {
      imgurl: require("@/assets/images/33.png"),
      userInfo: [],
      tableInfo: [],
      yData: [], //图表y轴全部数据
      rili: new Date(),
    };
  },
  created() {
    this.getUserInfo();
    this.getTableInfo();
    console.log(this.$store.state);
  },
  mounted() {
    this.getEcharts();
  },
  methods: {
    //获取用户信息
    async getUserInfo(username) {
      //获取本地session
      // 模拟数据
      // 模拟x轴线数据
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();
      const res = [];
      for (let i = 0; i < 7; i++) {
        if (i == 0) res.push("今日");
        else if (i == 1) res.push("昨日");
        else res.push(month + "月" + day + "日");

        if (day == 1) {
          month--;
          day = 30;
        } else day--;
      }
      res.reverse();
      this.xData = res;

      // 模拟y轴线数据

      //全部
      let da = [];
      da = Array.from(localStorage.getItem("recent_login")).reverse();
      da = da.filter((item) => {
        return item != ",";
      });
      this.yData = da;
    },

    //获取表格里的用户数据
    getTableInfo() {
      this.userInfo.account = localStorage.getItem("account");
      this.userInfo.userName = localStorage.getItem("userName");
      this.userInfo.password = localStorage.getItem("password");
      this.userInfo.department = localStorage.getItem("department");
      this.userInfo.role = localStorage.getItem("role");
      this.tableInfo.push(this.userInfo);
    },
    
    //获取源码
    getCode() {
      let win = window.open("", "", "");
      win.document.write(document.documentElement.outerText);
      win.document.title = "页面文本";
      win.focus();
    },

    //用户中心
    openUserCenter() {
      this.$message.warning("暂时未开放用户个人模块！");
    },

    //获取图表数据
    getEcharts() {
      this.$echarts.init(document.getElementById("loginReport")).setOption({
        title: {
          text: "近7日管理员登录统计",
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: { readOnly: false },
            magicType: { type: ["bar", "line"] },
            restore: {},
            saveAsImage: {},
          },
          itemSize: 14,
        },
        tooltip: {},
        legend: {
          data: ["账号登陆个数"],
        },
        xAxis: {
          data: this.xData,
        },
        yAxis: {},
        series: [
          {
            name: "账号登陆个数",
            type: "bar",
            data: this.yData,
          }
        ],
      });
    },
    
  },
};
</script>

<style scoped lang="less">
.el-row {
  margin-top: 15px;
}
.userInfo {
  background: #fff url(../../../assets/images/role-bg.png) no-repeat;
  background-size: 150% 150%;
  background-position: -100px -150px;
}

.userInfo-top {
  span {
    float: left;
  }

  .el-button {
    float: right;
    margin-right: 10px;
  }
}
.userInfo-top {
  overflow: hidden;
}

.userInfo-bottom {
  overflow: hidden;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  .el-table {
    margin-left: 50px;
    border-radius: 10px;
  }
}
.grid-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.grid-content div {
  font-size: 12px;
  margin-top: 10px;
}
.materMan {
  margin-top: 15px;
  background: #fff url(../../../assets/images/role-bg.png) no-repeat;
  background-size: 150% 150%;
  background-position: -100px -150px;

  .el-col:hover {
    background-color: aliceblue;
  }
}
.userEcharts {
  margin-top: 15px;
  background: #fff url(../../../assets/images/role-bg.png) no-repeat;
  background-size: 150% 150%;
}
.is-selected {
  color: #1989fa;
}

.rili {
  background: #fff url(../../../assets/images/role-bg.png) no-repeat;
  background-size: 150% 150%;
  background-position: -100px -150px;
}
</style>