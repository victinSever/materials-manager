<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物资管理</el-breadcrumb-item>
      <el-breadcrumb-item>物资调度记录</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card
      class="animate__animated animate__bounceInLeft"
      style="minheight: 90vh"
    >
      <el-form ref="formRef" :model="queryMap" class="serchBox">
        <el-form-item label="物资名称" label-width="80px" prop="materialsName">
          <el-input
            v-model="queryMap.materialsName"
            placeholder="输入物资名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="入库/出库" prop="isPut" label-width="100px">
          <el-select v-model="queryMap.isPut" style="width: 100px" clearable>
            <el-option label="入库" :value="1"></el-option>
            <el-option label="出库" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调度类型" label-width="100px" prop="dispatchType">
          <el-select
            v-model="queryMap.dispatchType"
            style="width: 120px"
            clearable
          >
            <el-option label="政府发放" :value="1"></el-option>
            <el-option label="企业资助" :value="2"></el-option>
            <el-option label="基金援助" :value="3"></el-option>
            <el-option label="个人援助" :value="4"></el-option>
            <el-option label="其他类型" :value="5"></el-option>
            <el-option label="政府领取" :value="6"></el-option>
            <el-option label="医院领取" :value="7"></el-option>
            <el-option label="社区领取" :value="8"></el-option>
            <el-option label="个人援助" :value="9"></el-option>
            <el-option label="防疫隔离带领取" :value="10"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="state" label-width="80px">
          <el-select v-model="queryMap.state" style="width: 120px" clearable>
            <el-option label="未出库" :value="1"></el-option>
            <el-option label="配货成功" :value="2"></el-option>
            <el-option label="出库成功" :value="3"></el-option>
            <el-option label="运输中" :value="4"></el-option>
            <el-option label="配送完成" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="20px" style="margin-left: 20px">
          <el-button type="primary" icon="el-icon-search" @click="search()"
            >查询</el-button
          >
          <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
        </el-form-item>

        <el-tooltip
          class="item"
          style="position: absolute; right: 50px; top: 20px; font-size: 22px"
          effect="dark"
          content="物资调度"
          placement="left"
        >
          <el-button
            class="animate__animated animate__heartBeat"
            icon="el-icon-position"
            type="info"
            circle
            @click="$router.push('/operate')"
          ></el-button>
        </el-tooltip>
      </el-form>
      <el-row v-if="tableData.length">
        <el-table :data="tableData" :fit="true" :stripe="true" border>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="操作员" label-width="80px">
                  <span>{{ props.row.userName }}</span>
                </el-form-item>
                <el-form-item label="联系方式" label-width="80px">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="运输方式" label-width="80px">
                  <span>{{ props.row.way }}</span>
                </el-form-item>
                <el-form-item label="调度时间" label-width="80px">
                  <span>{{ props.row.createTime }}</span>
                </el-form-item>
                <el-form-item label="物资类型" label-width="80px">
                  <span>{{ props.row.type }}</span>
                </el-form-item>
                <el-form-item label="总数" label-width="80px">
                  <span>{{ props.row.sum }}</span>
                </el-form-item>
                <el-form-item label="单位" label-width="80px">
                  <span>{{ props.row.unite }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column label="#" type="index" width="50"></el-table-column>
          <el-table-column prop="isPut" label="入库/出库" width="100">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.isPut === 1">入库</el-tag>
              <el-tag type="warning" v-if="scope.row.isPut === 0">出库</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态">
            <template v-slot:default="scope">
              <el-tag
                size="mini"
                type="danger"
                effect="plain"
                v-if="scope.row.state == -2"
                >异常</el-tag
              >
              <el-tag
                size="mini"
                type="danger"
                effect="plain"
                v-if="scope.row.state == -1"
                >手动关闭</el-tag
              >
              <el-tag
                size="mini"
                type="danger"
                effect="plain"
                v-if="scope.row.state == 0"
                >未出库</el-tag
              >
              <el-tag
                size="mini"
                type="success"
                effect="plain"
                v-if="scope.row.state == 1"
                >配货成功</el-tag
              >
              <el-tag
                size="mini"
                type="success"
                effect="plain"
                v-if="scope.row.state == 2"
                >出库成功</el-tag
              >
              <el-tag
                size="mini"
                type="warning"
                effect="plain"
                v-if="scope.row.state == 3"
                >运输中</el-tag
              >
              <el-tag
                size="mini"
                effect="plain"
                type="success"
                v-if="scope.row.state == 4"
                >配送完成</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="dispatchType" label="调度类型">
            <template v-slot:default="scope">
              <el-tag
                size="mini"
                type="info"
                effect="plain"
                v-if="scope.row.dispatchType == 1"
                >政府发放</el-tag
              >
              <el-tag
                size="mini"
                type="info"
                effect="plain"
                v-if="scope.row.dispatchType == 2"
                >企业资助</el-tag
              >
              <el-tag
                size="mini"
                type="info"
                effect="plain"
                v-if="scope.row.dispatchType == 3"
                >基金援助</el-tag
              >
              <el-tag
                size="mini"
                type="info"
                effect="plain"
                v-if="scope.row.dispatchType == 4"
                >个人援助</el-tag
              >
              <el-tag
                size="mini"
                effect="plain"
                type="info"
                v-if="scope.row.dispatchType == 5"
                >其他类型</el-tag
              >
              <el-tag
                size="mini"
                type="info"
                effect="plain"
                v-if="scope.row.dispatchType == 6"
                >政府领取</el-tag
              >
              <el-tag
                size="mini"
                type="info"
                effect="plain"
                v-if="scope.row.dispatchType == 7"
                >医院领取</el-tag
              >
              <el-tag
                size="mini"
                type="info"
                effect="plain"
                v-if="scope.row.dispatchType == 8"
                >社区领取</el-tag
              >
              <el-tag
                size="mini"
                type="info"
                effect="plain"
                v-if="scope.row.dispatchType == 9"
                >个人领取</el-tag
              >
              <el-tag
                size="mini"
                effect="plain"
                type="info"
                v-if="scope.row.dispatchType == 10"
                >隔离带领取</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="id" label="调度单号"></el-table-column>

          <el-table-column
            prop="content"
            label="物资调度描述"
          ></el-table-column>
          <el-table-column prop="level" label="紧急程度">
            <template v-slot:default="scope">
              <el-rate show-score disabled v-model="scope.row.level"></el-rate>
            </template>
          </el-table-column>
          <el-table-column
            prop="storehouseName"
            label="调度仓库"
          ></el-table-column>
          <el-table-column
            prop="materialsName"
            label="物资名称"
          ></el-table-column>

          <el-table-column label="操作" width="270">
            <template slot-scope="scope">
              <el-popover placement="top" width="200" trigger="hover">
                <!-- <h2>{{scope.row.id}}</h2> -->
                <span>暂时没有更多细节</span>
                <el-link
                  :underline="false"
                  icon="el-icon-view"
                  style="margin: 0 15px"
                  slot="reference"
                  >更多</el-link
                >
              </el-popover>
              <el-link
                icon="el-icon-phone"
                :underline="false"
                @click="sureUpdateState(scope.row)"
                >修改状态</el-link
              >
              <el-link
                icon="el-icon-delete"
                :underline="false"
                @click="deleteOne(scope.row)"
                >删除</el-link
              >
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.queryMap.pageNum"
          :page-sizes="[10, 15, 20, 50]"
          :page-size="this.queryMap.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total"
          style="margin-top: 20px"
        ></el-pagination>
      </el-row>
      <el-empty v-else description="未找到记录" :image-size="150"></el-empty>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "stockList",
  data() {
    return {
      total: 0,
      tableData: [],
      queryMap: {
        pageNum: 1,
        pageSize: 10,
        state: "",
        materialsName: "",
        dispatchType: "",
        isPut: "",
      }, //query参数传递
      dialogFormVisible: false,
      formLabelWidth: "120px",
      inRecordCategorys: [
        {
          value: "0",
          label: "全部类型",
        },
        {
          value: "1",
          label: "政府发放",
        },
        {
          value: "2",
          label: "企业捐助",
        },
        {
          value: "3",
          label: "基金援助",
        },
        {
          value: "4",
          label: "个人援助",
        },
        {
          value: "5",
          label: "其他援助",
        },
      ], //入库的类型
    };
  },
  mounted() {
    this.getoutStockslist();
  },

  methods: {
    //确认修改状态
    sureUpdateState(data){
      if(localStorage.getItem('role') !== '管理员'){
        return this.$message.warning("你的管理员权限不足！");
      }
      let str = `您确定要修改该状态? 状态依次变化为：未出库(0)->配货成功(1)->出库成功(2)->运输中(3)->配送完成(4)，你修改的单号为${data.id}的状态为${data.state}`;
      this.$confirm(str, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.updateOne(data);
          this.$message.success("修改成功！");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },

    //修改状态
    async updateOne(data) {
      let url = "";
      switch (data.state) {
        case 0:
          url = "records/checkDone";
          break;
        case 1:
          url = "records/checkOut";
          break;
        case 2:
          url = "records/finish";
          break;
        case 3:
          url = "records/finish";
          break;
        default: {
          return this.$message.warning("此类状态不能更改！");
        }
      }
      try {
        const res = await this.$http.post(url, [data.id]);
        if(res.status === 200){
          location.reload(); //刷新
          this.$message.success(
          "状态更改成功！单号为：" + data.id + "，现在状态：" + data.state
        );
        }
      } catch (err) {
        this.$message.warning("出错了！");
      }
    },

    //转数据
    dateChangeTo() {
      const params = {
        start: this.queryMap.pageNum,
        limit: this.queryMap.pageSize,
        state: this.queryMap.state,
        materialsName: this.queryMap.materialsName,
        dispatchType: this.queryMap.dispatchType,
        isPut: this.queryMap.isPut,
      };
      return params;
    },

    //查询
    async search() {
      // this.queryMap.pageNum = 1;
      const res = await this.$http.get("records/selectByConditional", {
        params: this.dateChangeTo(),
      });
      if (res.status !== 200) {
        return this.$message.error("获取列表失败");
      } else {
        this.tableData = res.data;
        this.getTotal();
        this.$forceUpdate();
      }
    },

    //请求表格数据
    async getoutStockslist() {
      const res = await this.$http.get("records/list", {
        params: {
          start: this.queryMap.pageNum,
          limit: this.queryMap.pageSize,
        },
      });
      if (res.status !== 200) {
        this.showTable = false;
        return this.$message.error("获取列表失败");
      } else {
        this.showTable = true;
        this.tableData = res.data.list;
        this.total = res.data.totalCount;
      }
    },

    //查询物资总数
    async getTotal() {
      const data = JSON.parse(JSON.stringify(this.queryMap));
      delete data.start;
      delete data.limit;
      const res = await this.$http.get("records/selectByConditionalCount", {
        params: data,
      });
      this.total = res.data;
    },

    //重置操作信息
    resetForm() {
      this.$refs.formRef.resetFields();
      document.getElementsByTagName("input")[0].focus();
    },

    //删除单个数据
    deleteOne(data) {
      console.log(data);
      let that = this;
      this.$confirm(
        `此操作将永久删除单号为${data.id}的记录，是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          that.$message.warning("暂不支持记录删除！");
        })
        .catch(() => {
          this.$message.info("已取消");
        });
    },

    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.search();
    },
    handleCurrentChange(newPage) {
      this.queryMap.pageNum = newPage;
      this.search();
    },
  },
};
</script>

<style scoped lang="less">
.el-card {
  margin-top: 20px;
}
.serchBox {
  display: flex;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.el-form-item__label {
  color: #99a9bf !important;
}
.demo-table-expand .el-form-item {
  margin-left: 50px;
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
  font-weight: bold;
  color: #99a9bf;

  label {
    color: #99a9bf !important;
  }
}
.el-link {
  margin: 0 10px;
}
</style>