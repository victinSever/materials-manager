<template>
  <div class="attach">
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>附件管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图-->
    <el-card>
      <el-form ref="attformref" label-width="80px">
        <el-form-item label="图片路径">
          <el-input v-model="queryMap.path" placeholder="输入图片路径查询"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select placeholder="请选择" clearable v-model="queryMap.suffix">
            <el-option label="jpg/JPG" value=".jpg"></el-option>
            <el-option label="png/PNG" value=".png"></el-option>
            <el-option label="gif/GIF" value=".gif"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" @click="centerDialogVisible=true">
            上传
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </el-form-item>
      </el-form>

      <!--上传窗口-->
      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="40%" center>
        <el-upload
          class="upload-demo"
          drag
          action="https://www.zykhome.club:8081/upload/image"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">上传到服务器</el-button>
        </span>
      </el-dialog>

      <!--附件-->
      <el-row :gutter="10">
        <el-col :span="6" v-for="item in annexLists" :key="item.id" class="grid-content">
          <el-image
            style="width: 150px; height: 150px"
            :src="'https://www.zykhome.club/'+item.path"
            :preview-src-list="srcList"
          ></el-image>
          <el-link icon="el-icon-delete" @click="deleteImg(item.id)">删除</el-link>
        </el-col>
      </el-row>

      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.queryMap.pageNum"
        :page-sizes="[10, 15, 20, 50]"
        :page-size="this.queryMap.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Attachments",
  data() {
    return {
      total: 0,
      queryMap: {},
      annexLists: [],
      srcList: [],
      centerDialogVisible: false,
    };
  },
  created() {
    this.getImgLists();
  },
  methods: {
    //删除附件
    async deleteImg(id) {
      const { data: res } = await this.$http.delete("upload/delete/" + id);
      console.log(res);
      if (res.code !== 100) {
        return this.$message.error("删除附件失败");
      } else {
        return this.$message, success("删除附件成功");
      }
    },

    //请求附件数据
    async getImgLists() {
      const { data: res } = await this.$http.get("upload/findImageList", {
        params: this.queryMap,
      });
      if (res.code !== 200) {
        return this.$message.error("请求附件数据失败");
      } else {
        this.total = res.data.total;
        this.annexLists = res.data.list;
        this.srcList = res.data.list.map((item) => {
          return "https://www.zykhome.club/" + item.path;
        });
      }
      console.log(res);
    },

    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getImgLists();
    },
    handleCurrentChange(newPage) {
      this.queryMap.pageNum = newPage;
      this.getImgLists();
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
.el-form-item {
  margin-bottom: 0px !important;
}
.el-row {
  margin-bottom: 35px;
}
.el-col {
  margin-top: 35px;
}
.grid-content {
  display: flex;
  flex-direction: column;
}
.el-link {
  display: inline-block;
  width: 150px;
  text-align: center;
  margin-top: 0px;
}
</style>