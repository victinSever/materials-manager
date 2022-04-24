<template>
  <div class="addInRrcord">
    <el-row>
      <!-- 入库信息单填写 -->
      <el-col
        :span="22"
        :offset="1"
        style="margin-top: 20px"
        class="animate__animated animate__backInLeft"
      >
        <h2 style="margin: 10px 0">填写入库信息</h2>
        <el-card shadow="hover">
          <el-col :span="20" :offset="2">
            <h2 style="margin-bottom: 20px; text-align: center">
              入库信息单描述
            </h2>
            <el-form
              :model="inRecordInf"
              :rules="inRecordInfRules"
              ref="inRecordInf"
              label-width="140px"
              class="form food_form"
            >
              <el-form-item prop="dispatchType" label="调度类型" width="100">
                <el-select v-model="inRecordInf.dispatchType" clearable>
                  <el-option
                    v-for="item in dispatchTypes"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="目标仓库" prop="stock">
                <el-select v-model="inRecordInf.stock" placeholder="请选择">
                  <el-option
                    v-for="item in stocks"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="入库原因" prop="reason">
                <el-input
                  v-model="inRecordInf.reason"
                  type="textarea"
                  style="width: 585px"
                  placeholder="描述物资的调入原因"
                ></el-input>
              </el-form-item>

              <el-form-item label="操作员信息" prop="phone">
                <el-input
                  style="width: 215px"
                  v-model="inRecordInf.phone"
                  placeholder="输入手机号"
                ></el-input>
                <span style="margin-left: 20px">用户名</span
                ><el-tag type="info" style="margin: 0 20px 0 5px">{{
                  inRecordInf.userName
                }}</el-tag>
              </el-form-item>

              <el-form-item
                label="紧急程度"
                prop="level"
                style="display: block"
              >
                <el-select v-model="inRecordInf.level" placeholder="请选择">
                  <el-option label="低级" :value="0"></el-option>
                  <el-option label="中级" :value="1"></el-option>
                  <el-option label="高级" :value="2"></el-option>
                  <el-option label="即刻" :value="3"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="物资库种类数">
                <el-tag>{{ tableData.length }}</el-tag>
              </el-form-item>

              <el-form-item label=" ">
                <el-button type="primary" @click="submitInRecordInf()"
                  >提交</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-card>
      </el-col>

      <!-- 已添加物资 -->
      <el-col
        :span="22"
        :offset="1"
        v-if="tableData.length != 0"
        style="margin-top: 20px"
        class="animate__animated animate__backInUp"
      >
        <el-card>
          <h2 style="margin-bottom: 20px">已添加物资</h2>
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column
              label="序号"
              type="index"
              width="80px"
              align="center"
            ></el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="name"
              label="物资名称"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="count"
              label="数量"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="unit"
              label="单位"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="size"
              label="型号"
              align="center"
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-popover
                  placement="right"
                  width="400"
                  trigger="hover"
                  class="popoverClass"
                >
                  <h3>
                    <span>物资种类：</span
                    ><span
                      style="font-size: 14px"
                      v-for="(p, index) in scope.row.type"
                      :key="index"
                      >{{ index == 0 ? p : "/" + p }}
                    </span>
                  </h3>
                  <h3>
                    <span>物资状态：</span
                    ><span style="font-size: 14px">{{ scope.row.status }}</span>
                  </h3>
                  <h3>
                    <span>样式图：</span>
                    <el-image
                      v-if="scope.row.imgUrl"
                      style="width: 100px; height: 100px"
                      :src="scope.row.imgUrl"
                    >
                    </el-image>
                    <span v-else style="font-size: 14px">暂无</span>
                  </h3>
                  <el-link
                    :underline="false"
                    icon="el-icon-view"
                    style="margin: 0 15px"
                    slot="reference"
                    >明细</el-link
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
        </el-card>
      </el-col>
      <el-col
        :span="22"
        :offset="1"
        style="margin-top: 20px"
        class="animate__animated animate__backInUp"
      >
        <el-card shadow="hover">
          <el-col :span="20" :offset="2">
            <h2 style="margin-bottom: 20px; text-align: center">
              物资资料填写
            </h2>
            <el-form
              :model="queryMap"
              :rules="queryMapRules"
              :inline="true"
              ref="queryMap"
              label-width="140px"
              class="form food_form"
            >
              <el-form-item label="物资名称" prop="name">
                <el-input
                  v-model="queryMap.name"
                  style="width: 218px"
                  maxlength="40"
                  placeholder="名称"
                ></el-input>
              </el-form-item>

              <el-form-item label="物资种类" prop="type">
                <el-cascader
                  v-model="queryMap.type"
                  :options="categorys"
                  :props="{ expandTrigger: 'hover' }"
                  clearable
                ></el-cascader>
              </el-form-item>

              <el-form-item label="物资型号" prop="size">
                <el-input
                  v-model="queryMap.size"
                  style="width: 218px"
                  placeholder="描述型号"
                ></el-input>
              </el-form-item>

              <el-form-item label="物资单位" prop="unit">
                <el-input
                  v-model="queryMap.unit"
                  style="width: 215px"
                  placeholder="单位"
                ></el-input>
              </el-form-item>

              <el-form-item label="物资状态" prop="status">
                <el-select v-model="queryMap.status" placeholder="请选择">
                  <el-option label="缺少" :value="0"></el-option>
                  <el-option label="适中" :value="1"></el-option>
                  <el-option label="充足" :value="2"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="物资数量" prop="count">
                <el-input-number
                  v-model="queryMap.count"
                  :min="0"
                  :max="1000000"
                ></el-input-number>
              </el-form-item>

              <el-form-item
                label="样式图片"
                prop="imgUrl"
                style="display: block"
              >
                <div class="upload">
                  <input
                    type="file"
                    accept="image/*"
                    @change="uploadImg"
                    id="uploadInput"
                    name="picture"
                    alt=""
                    multiple
                  />
                </div>
              </el-form-item>

              <el-form-item label=" ">
                <el-button type="primary" @click="add()">添加该物资</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "addInRrcord",
  data() {
    return {
      categorys: [], //种类
      queryMap: {
        name: "",
        id: "",
        type: [],
        count: 0,
        stock: "", //仓库
        status: "", //状态：0不足，1适中，2充足
        imgUrl: null,
        unit: "", //单位
        size: "", //模式，型号
      }, //填写单
      queryMapRules: {
        name: [{ required: true, message: "请输入物资名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择物资类型", trigger: "blur" }],
        stock: [{ required: true, message: "请选择目标仓库", trigger: "blur" }],
        count: [{ required: true, message: "数量不能为0", trigger: "blur" }],
        status: [
          { required: true, message: "请选择物资状态", trigger: "blur" },
        ],
        size: [
          {
            required: true,
            message: "请输入物资型号，该型号用于描述物资的具体信息",
            trigger: "blur",
          },
        ],
        unit: [
          { required: true, message: "请输入物资计量单位", trigger: "blur" },
        ],
      }, //填写规则
      tableData: [], //仓库数组
      inRecordInf: {
        dispatchType: "", //来源
        stock: "", //目标仓库
        reason: "", //原因
        userName: "",
        phone: "",
        level: "", //紧急程度
      }, //入库信息
      inRecordInfRules: {
        dispatchType: [
          { required: true, message: "请选择物资来源", trigger: "blur" },
        ],
        reason: [
          { required: true, message: "请描述入库原因", trigger: "blur" },
        ],
        stock: [
          { required: true, message: "请选择目标入库仓库", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号应为11位", trigger: "blur" },
        ],
        level: [
          { required: true, message: "请选择物资需求等级", trigger: "blur" },
        ],
      },
      stocks: [], //库存名字
      dispatchTypes: [], //援助类型
    };
  },

  created() {
    //将session信息存在信息单中
    this.inRecordInf.userName = localStorage.getItem("userName");
  },
  mounted() {
    this.getStockName();
    this.getCategorys();
    this.getDispatchType();
  },
  methods: {
    //获取仓库
    async getStockName() {
      const res = await this.$http.get("storehouse/searchAllStorehouseName");
      this.stocks = res.data.data.storehouse;
    },

    //获取物资信息
    // async searchAllStorehouse(){
    //   const res = await this.$http.get('storehouse/searchAllStorehouse');
    //   console.log(res);
    // },

    //获取调度类型
    async getDispatchType() {
      const res = await this.$http.get("records/getDispatchType");
      this.dispatchTypes = res.data;
    },

    //每个物资添加额外的入库信息
    addExtraInf() {
      const data = [];
      this.tableData.forEach((item) => {
        data.push({
          materialsName: item.name,
          type: item.type[item.type.length - 1],
          level: this.inRecordInf.level + "",
          sum: item.count + "",
          phone: this.inRecordInf.phone,
          state: "0", //未入库
          storehouseName: this.inRecordInf.stock + "",
          userName: this.inRecordInf.userName,
          way: "",
          communityName: "",
          content: this.inRecordInf.reason,
          specification: item.size,
          unite: item.unit,
          isPut: 1 + "", //入库
          dispatchType: this.inRecordInf.dispatchType,
        });
      });
      console.log(data);
      return data;
    },

    //发送信息
    async sendData(data, index) {
      try {
        const res = await this.$http.post("record/pop", data);
        if (res.status === 200) {
          //成功后，添加日志
          this.$emit("addLogs", this.inRecordInf);
          this.$store.commit("addLogs", {
            opeName: "入库操作",
            OpeTime: new Date().toLocaleString(),
            list: data,
          });

          //清空
          this.inRecordInf.dispatchType = "";
          this.inRecordInf.stock = "";
          this.inRecordInf.reason = "";
          this.inRecordInf.level = 0;
          this.tableData = [];
        }
      } catch (err) {
        this.$message.error(
          "第" + (index + 1) + "条记录生成记录失败！错误：" + err
        );
        return 1;
      }
      return 0;
    },

    //提交信息数组
    submitInRecordInf() {
      this.$refs["inRecordInf"].validate((valid) => {
        if (!valid) {
          this.$message.error("提交失败！");
        } else if (this.tableData.length === 0) {
          this.$message.error("你还没有添加物资仓库！");
        } else {
          const data = this.addExtraInf(); //每个物资添加额外的入库信息
          console.log("信息", data);

          //每一个信息发送一次
          let flag = 0;
          data.forEach((item, index) => {
            let a = this.sendData(item, index); //发送信息
            if (a === 1) flag = 1;
          });

          if (flag === 0) {
            //关闭弹窗
            this.$emit("closeDialog", false);
            this.$message.success("提交成功！");
          }
        }
      });
    },

    //将queryMap的临时数据装在数组仓库中显示
    addToTableData(data) {
      this.tableData.unshift(data);
      this.queryMap = {
        name: "",
        id: "",
        type: [],
        orgin: [],
        count: 0,
        stock: "", //仓库
        status: "", //状态：0不足，1适中，2充足
        imgUrl: null,
        unit: "", //单位
        size: "", //模式，型号
      };
    },

    //将单个物资添加到临时仓库
    add() {
      this.$refs["queryMap"].validate((valid) => {
        if (!valid) {
          this.$message.error("添加失败！");
        } else if (this.queryMap.count == 0) {
          this.$message.error("数量不能为0！");
        } else {
          console.log(this.queryMap);
          this.addToTableData(this.queryMap);
          this.$message.success("添加成功！");
        }
      });
    },

    //删除一个
    deleteOne(data) {
      this.tableData = this.tableData.filter((item) => {
        return item.id != data.id;
      });
      console.log(this.tableData);
    },

    //初始化类别数据
    async getCategorys() {
      try {
        const res = await this.$http.get("materials/show_type");
        if (res.status === 200) {
          const data = res.data.data.show_type.list;
          let i = 0;

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

    //加载图片
    uploadImg(event) {
      let file = document.getElementById("uploadInput");
      var img = document.getElementById("picture"); //获得用户上传的图片节点
      var reader = new FileReader();
      // 转换成功后的操作，img.src即为转换后的DataURL
      reader.onload = function (e) {
        if (reader.readyState === 2) {
          //加载完毕后赋值
          img.src = e.target.result;
        }
      };
      reader.readAsDataURL(file.files[0]);
      this.queryMap.imgUrl = file.files[0];
    },
  },
};
</script>

<style lang="less" scoped>
.addInRrcord {
  background: url(https://cms.pixso.cn/images/home/role-bg.png) no-repeat;
}

.el-card {
  background: url(https://cms.pixso.cn/images/home/role-bg.png) no-repeat;
  background-size: 150% 100%;
}

.el-card:nth-child(2) {
  background-size: 100% 100%;
}

.upload {
  img {
    // border: 1px dashed #dae1e7;
    border-radius: 8px;
    border-radius: 10px;
    width: 100px;
    height: 100px;
  }
}
.el-select-dropdown__item {
  margin-bottom: 5px;
}

.popoverClass {
  h3 {
    color: #ccc;
    font-family: "仿宋";
  }

  span {
    font-family: "kaiti";
  }
}
</style>
