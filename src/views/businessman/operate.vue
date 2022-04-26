<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物资管理</el-breadcrumb-item>
      <el-breadcrumb-item>物资调度</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="rowBox">
      <el-col
        :span="10"
        :offset="1"
        class="enter animate__animated animate__bounceInLeft"
      >
        <el-card shadow="hover" style="height: 60vh; margin: 10vh 0">
          <h2 @click="chooseAndShow" class="h1">物资入库操作 <span>>></span></h2>          
          <div v-if="!showChoose">
            <h3>操作介绍：</h3>
            <p><span>1</span>填写单个物资资料卡片</p>
            <p><span>2</span>填写公共资料信息补充</p>
            <p><span>3</span>提交</p>
          </div>
        </el-card>
      </el-col>
      <el-col
        :span="10"
        :offset="1"
        class="
          enter
          animate__animated animate__bounceInRight animate__backOutRight
        "
      >
        <el-card shadow="hover" style="height: 60vh; margin: 10vh 0">
          <h2 @click="chooseAndShow" class="h2">物资出库操作 <span>>></span></h2>
          <div v-if="!showChoose">
            <h3>操作介绍：</h3>
            <p><span>1</span>选择出库物资信息</p>
            <p><span>2</span>填写出库补充信息</p>
            <p><span>3</span>提交</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-col v-if="showChoose">
      <AddInRecord v-if="showInRecord" :inRecordCategorys="inRecordCategorys" />
      <AddOutRecord v-else :inRecordCategorys="inRecordCategorys" />
    </el-col>

    <el-button v-if="showChoose" class="backToOrgin animate__animated animate__flip animate__fadeOutDown" type="primary" @click="backToOrgin" circle
      >返回</el-button
    >
  </div>
</template>

<script>
import AddInRecord from "@/components/addInRrcord.vue";
import AddOutRecord from "@/components/addOutRecord.vue";
export default {
  name: "outStocks",
  data() {
    return {
      showChoose: false,
      showInRecord: true,
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
  components: {
    AddInRecord,AddOutRecord
  },
  methods: {
    chooseAndShow(e) {
      document.querySelectorAll(".enter > .el-card").forEach((item) => {
        item.style.margin = "20px 0";
        item.style.height = "8vh";
        item.style.borderRadius = "20px";
      });

      if(e.target.classList.contains('h1')) this.showInRecord = true;
      else this.showInRecord = false;

      this.showChoose = true;
      this.$forceUpdate();
    },

    backToOrgin(){
      document.querySelectorAll(".enter > .el-card").forEach((item) => {
        item.style.margin = "10vh 0";
        item.style.height = "60vh";
        item.style.borderRadius = "0";
      });
      this.showChoose = false;
      this.$forceUpdate();
    }
  },
};
</script>

<style scoped lang="less">
.el-card {
  margin-top: 15px;
}
.el-form {
  display: flex;
}
.danhao {
  color: blue;
}

.enter .el-card {
  background: url(https://cms.pixso.cn/images/revision-home/circle-bg-pre.png) no-repeat;
  background-size: 150% 150%;
  transition: 1s;

  h2 {
    cursor: pointer;
    transition: 0.8s;
    span {
      float: right;
      margin-right: 50px;
      transition: 0.8s;
    }
  }

  div{
    margin-top: 50px;

    h3{
      color: skyblue;
      font-family: 'kaiti';
    }
    p{
      margin: 10px 0;
      height: 25px;
      line-height: 25px;  
      transition: .8s;    

      span{
        display: inline-block;
        text-align: center;
        margin-right: 10px;
        width: 25px;
        height: 100%;
        border-radius: 50%;
        color: #fff;
        background: radial-gradient(skyblue,rgb(59, 160, 227));
        transition: .8s;
      }
    }
  }
}

.enter .el-card:hover {
  // background: url(https://cms.pixso.cn/images/home/role-bg.png) no-repeat;
  // background: url(https://cms.pixso.cn/images/revision-home/circle-bg-pre.png) no-repeat;
  background-size: 250% 200%;
  // background-position: 200px 200px;

  h2 {
    color: rgb(9, 104, 112);
    span {
      color: rgb(12, 146, 146);
      margin-right: 10px;
    }
  }

  div{
    p{
      letter-spacing: 2px;
      span{
        margin-right: 15px;       
      }
    }
  }
}

.backToOrgin {
  position: fixed;
  bottom: 100px;
  right: 50px;
  height: 60px;
  width: 60px;
  transition: .4s;
}

.backToOrgin:hover{
  transform: translateY(-20px);
  background-color: rgb(113, 213, 250);
}
</style>