<template>
  <div class="logs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>日志记录</el-breadcrumb-item>
      <el-breadcrumb-item>操作日志</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      class="animate__animated animate__bounceInLeft"
      style="minheight: 90vh"
      v-if="tableData.length !== 0"
    >

      <el-row>
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
          <el-table-column prop="state" label="状态" width="100">
            <template v-slot:default="scope">
              <el-tag
                size="mini"
                type="danger"
                effect="plain"
                v-if="scope.row.state == 1"
                >未出库</el-tag
              >
              <el-tag
                size="mini"
                type="success"
                effect="plain"
                v-if="scope.row.state == 2"
                >配货成功</el-tag
              >
              <el-tag
                size="mini"
                type="success"
                effect="plain"
                v-if="scope.row.state == 3"
                >出库成功</el-tag
              >
              <el-tag
                size="mini"
                type="warning"
                effect="plain"
                v-if="scope.row.state == 4"
                >运输中</el-tag
              >
              <el-tag
                size="mini"
                effect="plain"
                type="success"
                v-if="scope.row.state == 5"
                >配送完成</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="dispatchType" label="调度类型" width="100">
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
          <el-table-column
            prop="id"
            label="调度单号"
            width="180"
          ></el-table-column>

          <el-table-column
            prop="content"
            label="物资调度描述"
            width="180"
          ></el-table-column>
          <el-table-column prop="level" label="紧急程度" width="100">
            <template v-slot:default="scope">
              <el-rate show-score disabled v-model="scope.row.level"></el-rate>
            </template>
          </el-table-column>
          <el-table-column
            prop="storehouseName"
            label="调度仓库"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="materialsName"
            label="物资名称"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="type"
            label="物资类型"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="sum"
            label="总数"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="unite"
            label="单位"
            width="100"
          ></el-table-column>

          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-popover placement="right" width="400" trigger="hover">
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
                icon="el-icon-delete"
                :underline="false"
                @click="deleteOne(scope.row)"
                >删除</el-link
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 对话框显示 -->+-
        <el-dialog
          title="入库信息单填写"
          :visible.sync="dialogFormVisible"
          :append-to-body="true"
          width="1000px"
        >
          <AddInRecord
            :inRecordCategorys="inRecordCategorys"
            @closeDialog="closeDialog"
          />
        </el-dialog>

        <!--分页-->
        <el-pagination
          v-if="showPagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.queryMap.pageNum"
          :page-sizes="[10, 15, 20, 50]"
          :page-size="this.queryMap.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </el-row>
    </el-card>

    <el-empty
      v-else
      description="暂时没有记录"
      class="animate__animated animate__zoomInDown"
      :image-size="200"
    ></el-empty>
  </div>
</template>

<script>
export default {
  name: "logs",
  data() {
    return {
      total: 0,
      tableData: [],
      pageSize: 10,
      pageNum: 1,
      showPagination: true,
      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.getLogs();
  },
  methods: {
    getLogs() {
      // this.tableData = this.$store.state.logs;
      // this.tableData = [{
      //   OpeName: '入库操作',
      //   OpeTime: new Date().toLocaleString(),
      //   list: [{
      //     name: '口罩',
      //     count: 5000,
      //   }]
      // }]
    },
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getLogs();
    },
    handleCurrentChange(newPage) {
      this.queryMap.pageNum = newPage;
      this.getLogs();
    },
  },
};
</script>

<style scoped>
</style>