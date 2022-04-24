<template>
  <div class="addOutRrcord">
    <el-row>
      <el-col
        :span="22"
        :offset="1"
        style="margin-top: 20px"
        class="animate__animated animate__backInLeft"
      >
        <h2 style="margin-bottom: 10px">填写出库信息</h2>
        <el-card class="goodsCategory">
          <el-form
            :model="outRecordInf"
            :rules="outRecordInfRules"
            ref="inRecordInf"
            label-width="140px"
            class="form food_form"
          >
            <el-form-item label="出库原因" prop="reason">
              <el-input
                v-model="outRecordInf.reason"
                type="textarea"
                style="width: 585px"
                placeholder="描述物资的出库原因"
              ></el-input>
            </el-form-item>

            <el-form-item label="操作员信息" prop="phone">
              <span style="margin-left: 20px">用户名</span
              ><el-tag type="info" style="margin: 0 20px 0 5px">{{
                outRecordInf.userName
              }}</el-tag>
              <span style="margin: 0 5px 0 20px">手机号</span>
              <el-input
                style="width: 300px"
                v-model="outRecordInf.phone"
                placeholder="输入手机号"
              ></el-input>
            </el-form-item>

            <el-form-item label="紧急程度" prop="level" style="display: block">
              <el-select
                v-model="outRecordInf.level"
                placeholder="请选择"
                style="width: 100px"
              >
                <el-option label="低级" :value="0"></el-option>
                <el-option label="中级" :value="1"></el-option>
                <el-option label="高级" :value="2"></el-option>
                <el-option label="即刻" :value="3"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="出库目的点" prop="comminity">
              <el-select
                v-model="outRecordInf.comminity"
                placeholder="请选择"
                style="width: 100px"
              >
                <el-option
                  v-for="item in communitys"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="方式" prop="way" style="display: block">
              <el-select
                v-model="outRecordInf.way"
                placeholder="请选择"
                style="width: 100px"
              >
                <el-option label="车载" :value="0"></el-option>
                <el-option label="空运" :value="1"></el-option>
                <el-option label="轮渡" :value="2"></el-option>
                <el-option label="人力" :value="3"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="物资库种类数">
              <el-tag>{{ selectStock.length }}</el-tag>
            </el-form-item>

            <el-form-item label=" ">
              <el-button type="primary" @click="submitInRecordInf()"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col
        :span="22"
        :offset="1"
        class="animate__animated animate__backInRight"
      >
        <h2 style="margin-bottom: 10px">已选择物资</h2>
        <el-card>
          <el-col :span="22" :offset="1">
            <!-- <el-input-number
            :min="0"
            :max="1000000"
            style="width: 150px"
            @click="addNum(scope.row)"
          ></el-input-number> -->
          <el-table
              :data="selectStock"
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
              :fit="true"
            >
              <el-table-column type="expand">
                暂未加载其他信息
              </el-table-column>
              <el-table-column label="名称" prop="name"></el-table-column>
              <el-table-column label="类型" prop="type"></el-table-column>
              <el-table-column label="仓库" prop="storeName"></el-table-column>
              <el-table-column label="数量" prop="quantity"></el-table-column>
              <el-table-column label="单位" prop="unite"></el-table-column>
              <el-table-column
                label="型号"
                prop="specification"
              ></el-table-column>
              <el-table-column label="已选择数量" prop="seleted"></el-table-column>
            </el-table>
          </el-col>
        </el-card>
      </el-col>
      <el-col
        :span="22"
        :offset="1"
        style="margin-top: 20px"
        class="animate__animated animate__backInRight"
      >
        <h2 style="margin-bottom: 10px">选择出库的物资</h2>
        <el-card class="goodsCategory">
          <el-col :span="22" :offset="1">
            <p>
              <span class="titleTag">全部分类</span>
              <span v-for="item in tags" :key="item" class="tagsname">{{
                item
              }}</span>
            </p>
            <p>
              <span class="titleTag">名称检索</span>
              <el-input
                v-model="queryMap.name"
                placeholder="请选择"
                style="width: 350px"
              >
              </el-input>
            </p>
            <p>
              <span class="titleTag">仓库</span>
              <el-select
                v-model="queryMap.storeName"
                placeholder="请选择"
                clearable
                style="width: 350px"
              >
                <el-option
                  v-for="item in stocks"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span class="titleTag">类型</span>
              <el-cascader
                v-model="type"
                :options="categorys"
                clearable
                style="width: 350px"
              ></el-cascader>
            </p>
          </el-col>

          <el-col :span="22" :offset="1">
            <el-table
              :data="tableData"
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
              :fit="true"
            >
              <el-table-column type="expand">
                暂未加载其他信息
              </el-table-column>
              <el-table-column label="名称" prop="name"></el-table-column>
              <el-table-column label="类型" prop="type"></el-table-column>
              <el-table-column label="仓库" prop="storeName"></el-table-column>
              <el-table-column label="数量" prop="quantity"></el-table-column>
              <el-table-column label="单位" prop="unite"></el-table-column>
              <el-table-column
                label="型号"
                prop="specification"
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" @click="addNum(scope.row)"
                    >选择</el-button
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
              style="margin-top: 20px"
            ></el-pagination>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "addOutRrcord",
  data() {
    return {
      total: 0,
      //选择的标签
      queryMap: {
        start: 1,
        limit: 10,
        name: "",
        storeName: "",
        level: "",
        level2: "",
      },
      tags: [],
      stocks: [],
      categorys: [],
      tableData: [],
      communitys: [], //社区名称，获取 100
      categorys: [], //种类
      type: [], //选择的类型

      //选择的仓库
      selectInf: {
        selectCount: 0,
      },
      selectStock: [],

      outRecordInf: {
        reason: "", //原因
        userName: "",
        phone: "",
        level: "", //紧急程度
        comminity: "",
        way: "",
      }, //入库信息
      outRecordInfRules: {
        dispatchType: [
          { required: true, message: "请选择物资来源", trigger: "blur" },
        ],
        reason: [
          { required: true, message: "请描述入库原因", trigger: "blur" },
        ],
        stock: [
          { required: true, message: "请选择目标入库仓库", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        level: [
          { required: true, message: "请选择物资需求等级", trigger: "blur" },
        ],
        comminity: [
          { required: true, message: "请选择物资出库目的地", trigger: "blur" },
        ],
        way: [{ required: true, message: "请选择方式", trigger: "blur" }],
      },
    };
  },

  //监视数据变化
  watch: {
    type: {
      handler() {
        this.search();
      },
    },
    "queryMap.name": {
      handler() {
        this.search();
      },
    },
    "queryMap.storeName": {
      handler() {
        this.search();
      },
    },
    "selectInf.selectCount": {
      handler(data) {
        this.addNum(data);
      },
    },
  },

  created() {
    this.outRecordInf.userName = localStorage.getItem("userName");
  },
  mounted() {
    this.getCommunity();
    this.search();
    this.getStockName();
    this.getCategorys();
  },
  methods: {
    //addNum
    addNum(data) {
      console.log(data);
      this.selectStock.unshift(data);
    },

    //获取信息
    getInf() {
      this.queryMap.start = 1;
      this.queryMap.level = "";
      if (this.type.length !== 0)
        this.queryMap.level = this.type[this.type.length - 1];
    },

    //根据标签查询
    async search() {
      this.getInf();
      const res = await this.$http.get("materials/selectByConditional", {
        params: this.queryMap,
      });
      this.tableData = res.data;
      this.getTotal();
    },

    //查询物资总数
    async getTotal() {
      const data = JSON.parse(JSON.stringify(this.queryMap));
      delete data.start;
      delete data.limit;
      const res = await this.$http.get("materials/selectByConditionalCount", {
        params: data,
      });
      this.total = res.data;
    },

    //获取仓库
    async getStockName() {
      const res = await this.$http.get("storehouse/searchAllStorehouseName");
      this.stocks = res.data.data.storehouse.reverse();
    },

    //获取社区
    async getCommunity() {
      const res = await this.$http.get("communities/getCommunityNames", {
        params: {
          start: 1,
          limit: 100,
        },
      });
      this.communitys = res.data;
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

    handleSizeChange(newSize) {
      this.queryMap.limit = newSize;
      this.search();
    },
    handleCurrentChange(newPage) {
      this.queryMap.start = newPage;
      this.search();
    },
  },
};
</script>

<style lang="less" scoped>
.goodsCategory {
  p {
    height: 40px;
    line-height: 40px;
    margin: 10px 0;

    .titleTag {
      display: inline-block;
      color: rgb(182, 181, 181);
      width: 100px;
    }
  }
}

.el-col {
  margin-top: 20px;
  margin-bottom: 20px;
}

.el-card {
  background: url(https://cms.pixso.cn/images/home/role-bg.png) no-repeat;
  background-size: 150% 100%;
}
</style>
