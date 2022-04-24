<template>
  <div class="loginLog">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>日志记录</el-breadcrumb-item>
      <el-breadcrumb-item>登录日志</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card v-if="tableData.length"></el-card>

    <el-empty v-else description="暂时没有记录" class="animate__animated animate__rollIn" :image-size="200"></el-empty>
  </div>
</template>

<script>
export default {
  name: "LoginLog",
  data() {
    return {
      tableData: []
    };
  },
};
</script>

<style scoped>

</style>