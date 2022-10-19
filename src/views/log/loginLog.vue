<template>
  <div class="loginLog">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>日志记录</el-breadcrumb-item>
      <el-breadcrumb-item>登录日志</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      v-if="tableData.length"
      class="animate__animated animate__bounceInRight"
      style="margin-top: 20px"
    >
      <el-row>
        <el-col :span="22" :offset="1">
          <h1 style="text-align: center; margin-top: 10px">登录日志</h1>
          <el-table
            :data="tableData"
            style="width: 100%; margin-top: 40px"
            border
          >
            <el-table-column
              label="序号"
              type="index"
              align="center"
              width="80px"
            ></el-table-column>
            <el-table-column prop="userName" label="登陆用户"></el-table-column>
            <el-table-column
              prop="recent_login"
              label="最近登陆时间"
            ></el-table-column>
          </el-table>

          <!--分页-->
          <el-pagination
            v-if="showPagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.pageNum"
            :page-sizes="[10, 15, 20, 50]"
            :page-size="this.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.total"
            style="margin-top: 20px"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>

    <el-empty
      v-else
      description="暂时没有记录"
      class="animate__animated animate__rollIn"
      :image-size="200"
    ></el-empty>
  </div>
</template>

<script>
export default {
  name: "LoginLog",
  data() {
    return {
      total: 0,
      tableData: [],
      pageSize: 10,
      pageNum: 1,
      showPagination: true,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const { data: res } = await this.$http.get(
        `/user/searchUserLogVo/${this.pageNum}/${this.pageSize}`
      );
      this.tableData = res.data.userLog.records;
      this.total = res.data.userLog.total;
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getData();
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage;
      this.getData();
    },
  },
};
</script>

<style scoped>
</style>