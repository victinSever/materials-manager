<template>
  <div class="users">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-col :span="22" :offset="1">
        <h1 style="text-align: center;;margin-top: 40px;">用户信息记录</h1>
        <el-table :data="tableData" style="width: 100%; margin-top: 40px" border>
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column prop="account" label="账户"></el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="department" label="部门"></el-table-column>
        <el-table-column prop="role" label="账号角色"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="recent_login" label="最近登陆时间"></el-table-column>
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

    
  </div>
</template>

<script>
export default {
  name: "Users",
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
    this.searchAllUser();
  },
  methods: {
    async searchAllUser() {
      const { data: res } = await this.$http.get(
        `/user/searchAllUser/${this.pageNum}/${this.pageSize}`
      );
      this.tableData = res.data.records;
      this.total = res.data.total;
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.searchAllUser();
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage;
      this.searchAllUser();
    },
  },
};
</script>

<style scoped>
</style>