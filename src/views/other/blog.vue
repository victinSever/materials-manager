<template>
  <div>
    <h1>关于我们</h1>

    <h2>前端开发</h2>
    <div class="session">
      <h3>Description</h3>
      <p>雪中送炭 - 基于Vue+elementUI的疫情物资资管理系统</p>
    </div>
    <div class="session">
      <h3>依赖</h3>
      <p>主要有Vue-router，element-ui，less，less-loader，animate.css，echarts</p>
    </div>
    <div class="session">
      <h3>已完成的功能</h3>
      <p>出入库，修改物资状态，信息查看，地图查看，登录注册，验证码，动态可视化展示（部分）</p>
    </div>
    <div class="session npm">
      <h3>Project setup</h3>
      <p>npm install</p>
    </div>
    
    <div class="session npm">
      <h3>Compiles and hot-reloads for development</h3>
      <p>npm run serve</p>
    </div>

    <div class="session npm">
      <h3>Compiles and minifies for production</h3>
      <p>npm run build</p>
    </div>

     <div class="session npm">
      <h3>Customize configuration</h3>
      <p>See Configuration Reference</p>
    </div>

     <div class="session">
      <h3>模块</h3>
      <p>登陆模块 登陆 注册 系统模块 欢迎 用户 附件 业务模块 调用信息查询 物资信息查询 库存信息管理 调用操作 入库操作 出库操作 疫情模块 全国疫情概览 健康模块 日志模块 登入日志 操作日志</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyBlog",
};
</script>

<style scoped lang="less">
h1 {
  color: rgb(39, 179, 230);
  margin-bottom: 40px;
}
h1 ,h2{
  margin-left: 20px;
}

.session {
  margin: 30px 0;
  padding-left: 20px;
}

.npm p{
  background-color: #faf5f5;
  padding: 10px 0;
  text-indent: 1em;
}

h3 {
  margin: 10px 0;
}
</style>