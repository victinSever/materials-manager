<template>
  <div class="productCategorys">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物资管理</el-breadcrumb-item>
      <el-breadcrumb-item>物资类别</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="animate__animated animate__backInUp">
      <h2 style="margin-bottom: 10px">物资类别管理</h2>
      <p style="margin-bottom: 30px; font-size: 12px; color: #ccc">
        你可以对物资菜单树进行增添和删除，请谨慎使用！一旦删除，该目录下所有信息将彻底删除！
      </p>
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        :highlight-current="true"
        empty-text="你的数据跑丢了"
        :indent="50"
        icon-class="el-icon-s-home"
        :expand-on-click-node="false"
        :props="defaultProps"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span class="el-icon-s-home">{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click="() => append(data)">
              添加
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ProductCategorys",
  data() {
    const data = [];
    return {
      data: JSON.parse(JSON.stringify(data)),
      defaultProps: {
        //树形控件的属性绑定对象
        children: "list", //设置通过children属性展示子节点信息
        label: "name", //通过label设置树形节点文本展示

      },
    };
  },

  mounted() {
    this.loadTip();
    this.getCategorys();
  },

  methods: {
    //页面提示
    loadTip() {
      this.$notify({
        type: "success",
        dangerouslyUseHTMLString: true,
        message: `<p style="color:#777">你可以对物资菜单树进行增添和删除，请谨慎使用！<br>一旦删除，该目录下所有信息将彻底删除！</p>`,
      });
    },
    //加载数据
    async getCategorys() {
      try {
        const res = await this.$http.get("materials/show_type");
        if (res.status === 200) {
          this.data = res.data.data.show_type.list;
        }
      } catch (err) {
        this.$message.error("获取信息失败！" + err);
      }       
    },

    //添加提示
    append(data) {
      this.$prompt("请输入类别名称：", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.+$/, //不能为空
        inputErrorMessage: "类别格式不正确",
        type: "info",
      })
        .then((value) => {         
          const newChild = { id: id++, label: value.value, children: [] };
          if (!data.children) {
            this.$set(data, "children", []);
          }
          data.children.push(newChild);
          this.$message.success("成功添加类别：" + value.value);
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "取消输入" + err,
          });
        });
    },

    //删除提示
    remove(node, data) {
      this.$confirm("您确定要删除该类别? 删除后不可返回！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex((d) => d.id === data.id);
          children.splice(index, 1);
          this.$message.success("删除成功！");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped lang="less">
.el-card {
  margin-top: 15px;
  background: url(https://cms.pixso.cn/images/home/role-bg.png) no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding-right: 8px;
}
</style>