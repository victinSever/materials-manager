<template>
  <div class="products">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物资管理</el-breadcrumb-item>
      <el-breadcrumb-item>物资资料</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="animate__animated animate__backInLeft">
      <el-form ref="formRef" :model="queryMap" label-width="80px">
        <el-form-item label="物资名称" prop="name">
          <el-input v-model="queryMap.name"></el-input>
        </el-form-item>

        <el-form-item label="物资类型">
          <el-cascader
            v-model="type"
            :options="categorys"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="仓库" label-width="50px">
          <el-select v-model="queryMap.storeName" placeholder="全部仓库" clearable>
            <el-option v-for="item in stocks" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="20px" style="margin-left: 50px">
          <el-button type="primary" icon="el-icon-search" @click="search()"
            >查询</el-button
          >
          <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="#" type="index" align="center" width="80px"></el-table-column>
        <el-table-column prop="name" label="物资名称"></el-table-column>
        <el-table-column prop="type" label="物资类型"></el-table-column>
        <el-table-column prop="storeName" label="仓库名称"></el-table-column>
        <el-table-column prop="quantity" label="库存数量"></el-table-column>
        <el-table-column prop="unite" label="库存单位"></el-table-column>
        <el-table-column prop="specification" label="规格"></el-table-column>
        <el-table-column prop="storeName" label="仓库"></el-table-column>
        <el-table-column prop="reduceNum" label="近期调用数量" width="120px"></el-table-column>
        <el-table-column label="操作" width="200px;">
          <template slot-scope="scope">
            <el-popover placement="right" width="400" trigger="hover">
              <image
                style="width: 100px; height: 100px"
                :src="scope.row.path"
                alt="该物资未上传图片"
              >
              </image>
              <el-link
                :underline="false"
                icon="el-icon-view"
                style="margin: 0 15px"
                slot="reference"
                >图片</el-link
              >
            </el-popover>
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
        :current-page="this.queryMap.start"
        :page-sizes="[10, 15, 20, 50]"
        :page-size="this.queryMap.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
        style="margin-top: 20px;"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Products",
  data() {
    return {
      total: 0,
      tableData: [],
      queryMap: {
        start: 1,
        limit: 10,
        name: "",
        storeName: "",
        level: "",
        level2: "",
      },
      categorys: [],
      stocks: [],
      type: [],
    };
  },
  created() {
    this.getStockName();
    this.getCategorys();
    this.getoutStockslist();
  },

  methods: {
    //查询
    search() {
      this.queryMap.start = 1;
      this.queryMap.level = "";
      if(this.type.length!==0)
        this.queryMap.level = this.type[this.type.length-1];     
      this.getoutStockslist();
    },

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

    //获取仓库
    async getStockName() {
      const res = await this.$http.get("storehouse/searchAllStorehouseName");
      this.stocks = res.data.data.storehouse.reverse();
    },

    //请求表格数据
    async getoutStockslist() {
      try {
        const res = await this.$http.get("materials/selectByConditional", {
          params: this.queryMap,
        });
        if (res.status !== 200) {
          return this.$message.error("获取数据失败");
        } else {
          this.tableData = res.data;
          this.getTotal();
        }
      } catch (err) {
        this.$message.error("输出获取出错：" + err);
      }
    },

    //查询物资总数
    async getTotal(){
      const data =  JSON.parse(JSON.stringify(this.queryMap));
      delete(data.start);
      delete(data.limit);
      const res = await this.$http.get("materials/selectByConditionalCount",{params: data});
      this.total = res.data;
    },

    //重置操作信息
    resetForm() {
      this.$refs.formRef.resetFields();
      this.queryMap.level = "";
      this.type = [];
      this.getoutStockslist();
    },

    //删除单个数据
    deleteOne(data) {
      console.log(data);
      let that = this;
      this.$confirm(
        `此操作将永久删除id为${data.id}的物资库存，是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          that.$message({
            type: "success",
            message: "该类物资删除成功! id：" + data.id,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleSizeChange(newSize) {
      this.queryMap.limit = newSize;
      this.getoutStockslist();
    },
    handleCurrentChange(newPage) {
      this.queryMap.start = newPage;
      this.getoutStockslist();
    },
  },
};
</script>

<style scoped>
.el-card {
  margin-top: 15px;
}
.el-form {
  display: flex;
}
.danhao {
  color: blue;
}
</style>