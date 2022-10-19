<template>
  <div class="home">
    <el-container>
      <el-header class="home-header">
        <div class="home-header-logo">
          <h1>
            <!-- <img src="@/assets/images/ilogo.png" style="height: 100%" alt=""> -->
            疫情物资调度
          </h1>
        </div>
        <div class="home-header-Info">
          <div class="user_avatar_search user_avatar_i"  @click="$router.push('/products')">
            <i class="el-icon-search"></i>
          </div>
          <div class="user_avatar_bell user_avatar_i"  @click="$router.push('/logs')">
            <el-tooltip
              class="item"
              effect="light"
              transition="el-fade-in-linear"
              placement="bottom"
            >
              <div slot="content">
                <span v-if="messageNum != 0">你有{{ messageNum }}则新的消息未查看哦！</span>
                <span v-else>暂时没有需要查阅的邮件！</span>
              </div>
              <el-badge v-if="messageNum!=0" :value="emailNum" class="item" type="primary">
                <i class="el-icon-bell"></i>
              </el-badge>
              <el-badge v-else is-dot class="item">
                <i class="el-icon-bell"></i>
              </el-badge>
            </el-tooltip>
          </div>
          <div class="user_avatar_message user_avatar_i" @click="$router.push('/loginLog')">
            <el-tooltip
              class="item"
              effect="light"
              transition="el-fade-in-linear"
              placement="bottom"
            >
              <div slot="content">
                <span v-if="emailNum != 0">你有{{ emailNum }}封未读邮件！</span>
                <span v-else>暂时没有需要查阅的邮件！</span>
              </div>
              <el-badge v-if="emailNum!=0" :value="emailNum" class="item" type="primary">
                <i class="el-icon-message"></i>
              </el-badge>
              <el-badge v-else is-dot class="item" type="primary">
                <i class="el-icon-message"></i>
              </el-badge>
            </el-tooltip>
          </div>
          <el-dropdown>
            <el-avatar class="user_avatar_img" style="cursor: pointer">
              <img src="@/assets/images/user.jpeg" alt />
            </el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span
                  class="el-icon-s-home"
                  @click="$router.push({ name: 'home' })"
                  >系统首页</span
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <span class="el-icon-s-tools" @click="systemSetting"
                  >系统设置</span
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="loginout" class="el-icon-caret-right"
                  >退出登录</span
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside
          :width="isCollapse ? '64px' : '200px'"
          style="min-height: 100vh; background-color: #272c33"
        >
          <!--展开/收起-->
          <div class="toggle_box" @click="toggleCollapse">|||</div>
          <!--@open="handleOpen"
              @close="handleClose"-->
          <!-- :default-active="activePath" -->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#001529"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            :collapse-transition="false"
            :unique-opened="true"
            :router="true"
          >
            <!--菜单树（组件）-->
            <MenuTree :menuList="this.MenuList"></MenuTree>
          </el-menu>
        </el-aside>
        <el-main class="mainRouter">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MenuTree from "./homeChild/MenuTree";
export default {
  name: "Home",
  data() {
    return {
      isCollapse: false, //控制左侧导航展开和伸缩
      MenuList: [
        {
          id: 1,
          parentId: 0,
          menuName: "系统管理",
          url: "",
          icon: "el-icon-setting",
          orderNum: 1,
          open: 1,
          disabled: false,
          perms: null,
          type: 0,
          children: [
            {
              id: 253,
              parentId: 1,
              menuName: "欢迎页面",
              url: "/welcome",
              icon: "el-icon-star-off",
              orderNum: 1,
              open: 0,
              disabled: false,
              perms: "welcome:view",
              type: 0,
              children: [],
            },
            {
              id: 226,
              parentId: 1,
              menuName: "用户管理",
              url: "/users",
              icon: "el-icon-user",
              orderNum: 2,
              open: 0,
              disabled: false,
              perms: "users",
              type: 0,
              children: [],
            },
            {
              id: 321,
              parentId: 1,
              menuName: "附件管理",
              url: "/attachments",
              icon: "el-icon-picture-outline",
              orderNum: 2,
              open: 1,
              disabled: false,
              perms: "",
              type: 0,
              children: [],
            },
            {
              id: 4,
              parentId: 1,
              menuName: "菜单权限",
              url: "/menus",
              icon: "el-icon-help",
              orderNum: 3,
              open: 0,
              disabled: true,
              perms: null,
              type: 0,
              children: [],
            },
            {
              id: 319,
              parentId: 1,
              menuName: "公告管理",
              url: "/notices",
              icon: "el-icon-s-flag",
              orderNum: 4,
              open: 0,
              disabled: true,
              perms: "",
              type: 0,
              children: [],
            },
          ],
        },
        {
          id: 312,
          parentId: 0,
          menuName: "业务管理",
          url: null,
          icon: "el-icon-s-goods",
          orderNum: 2,
          open: 0,
          disabled: false,
          perms: null,
          type: 0,
          children: [
            {
              id: 229,
              parentId: 312,
              menuName: "物资管理",
              url: "",
              icon: "el-icon-date",
              orderNum: 1,
              open: 1,
              disabled: false,
              perms: "el-icon-date",
              type: 0,
              children: [
                {
                  id: 267,
                  parentId: 229,
                  menuName: "物资资料",
                  url: "/products",
                  icon: "el-icon-goods",
                  orderNum: 2,
                  open: 0,
                  disabled: false,
                  perms: "",
                  type: 0,
                  children: [],
                },
                {
                  id: 230,
                  parentId: 229,
                  menuName: "物资记录",
                  url: "/stockList",
                  icon: "el-icon-date",
                  orderNum: 1,
                  open: 1,
                  disabled: false,
                  perms: "el-icon-date",
                  type: 0,
                  children: [],
                },
                {
                  id: 316,
                  parentId: 229,
                  menuName: "物资库存",
                  url: "/stocks",
                  icon: "el-icon-tickets",
                  orderNum: 5,
                  open: 0,
                  disabled: false,
                  perms: "",
                  type: 0,
                  children: [],
                },
                {
                  id: 268,
                  parentId: 229,
                  menuName: "物资类别",
                  url: "/productCategorys",
                  icon: "el-icon-star-off",
                  orderNum: 2,
                  open: 0,
                  disabled: false,
                  perms: "",
                  type: 0,
                  children: [],
                },
                {
                  id: 270,
                  parentId: 229,
                  menuName: "物资调度",
                  url: "/operate",
                  icon: "el-icon-goods",
                  orderNum: 5,
                  open: 1,
                  disabled: false,
                  perms: "",
                  type: 0,
                  children: [],
                },
              ],
            },
            {
              id: 311,
              parentId: 312,
              menuName: "物资流向",
              url: null,
              icon: "el-icon-edit",
              orderNum: 3,
              open: 0,
              disabled: false,
              perms: null,
              type: 0,
              children: [
                {
                  id: 310,
                  parentId: 311,
                  menuName: "物资去处",
                  url: "/consumers",
                  icon: "el-icon-edit",
                  orderNum: 1,
                  open: 0,
                  disabled: false,
                  perms: "",
                  type: 0,
                  children: [],
                },
                {
                  id: 269,
                  parentId: 311,
                  menuName: "物资来源",
                  url: "/suppliers",
                  icon: "el-icon-coordinate",
                  orderNum: 5,
                  open: 0,
                  disabled: false,
                  perms: "",
                  type: 0,
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 303,
          parentId: 0,
          menuName: "健康报备",
          url: "",
          icon: "el-icon-platform-eleme",
          orderNum: 3,
          open: 0,
          disabled: false,
          perms: "",
          type: 0,
          children: [
            {
              id: 273,
              parentId: 303,
              menuName: "全国疫情",
              url: "/map",
              icon: "el-icon-s-opportunity",
              orderNum: 1,
              open: 1,
              disabled: false,
              perms: "map:view",
              type: 0,
              children: [],
            },
            {
              id: 305,
              parentId: 303,
              menuName: "查看情况",
              url: "/findData",
              icon: "el-icon-c-scale-to-original",
              orderNum: 2,
              open: 1,
              disabled: false,
              perms: null,
              type: 0,
              children: [],
            },
          ],
        },
        {
          id: 295,
          parentId: 0,
          menuName: "其他管理",
          url: "",
          icon: "el-icon-s-marketing",
          orderNum: 5,
          open: 0,
          disabled: false,
          perms: "",
          type: 0,
          children: [
            {
              id: 297,
              parentId: 295,
              menuName: "监控管理",
              url: "",
              icon: "el-icon-warning",
              orderNum: 1,
              open: 0,
              disabled: true,
              perms: "",
              type: 0,
              children: [
                {
                  id: 298,
                  parentId: 297,
                  menuName: "SQL监控",
                  url: "/druid",
                  icon: "el-icon-view",
                  orderNum: 1,
                  open: 0,
                  disabled: true,
                  perms: null,
                  type: 0,
                  children: [],
                },
              ],
            },
            {
              id: 341,
              parentId: 295,
              menuName: "个人博客",
              url: "/blog",
              icon: "el-icon-view",
              orderNum: 1,
              open: 0,
              disabled: false,
              perms: "",
              type: 0,
              children: [],
            },
          ],
        },
        {
          id: 5,
          parentId: 0,
          menuName: "日志管理",
          url: "/logs",
          icon: "el-icon-camera",
          orderNum: 6,
          open: 0,
          disabled: false,
          perms: null,
          type: 0,
          children: [
            {
              id: 271,
              parentId: 5,
              menuName: "登入日志",
              url: "/loginLog",
              icon: "el-icon-date",
              orderNum: 1,
              open: 0,
              disabled: false,
              perms: "login:log",
              type: 0,
              children: [],
            },
            {
              id: 307,
              parentId: 5,
              menuName: "操作日志",
              url: "/logs",
              icon: "el-icon-edit",
              orderNum: 1,
              open: 1,
              disabled: false,
              perms: "",
              type: 0,
              children: [],
            },
          ],
        },
      ], //菜单栏数据
      activepath: "", //点击二级菜单获取的下标
      messageNum: 0, //消息数量
      emailNum: 0, //邮件数量
    };
  },
  components: {
    MenuTree,
  },
  created() {
    // this.getMenuLists();
    // this.activepath = window.sessionStorage.getItem("activepath");
  },
  methods: {
    //获取左侧菜单栏数据
    async getMenuLists() {
      const { data: res } = await this.$http.get("user/findMenu");
      if (res.code !== 200) {
        return this.$message.error("获取左侧菜单栏数据失败");
      } else {
        this.menulist = res.data;
      }
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    //退出登录
    loginout() {
      this.$router.push("/login");
      sessionStorage.clear(); //清除缓存
    },
    //系统设置
    systemSetting() {
      this.$message.warning("该功能未开放！");
    },
  },
};
</script>

<style scoped>
@keyframes animate {
  0% {
    background-size: 100% 100%;
  }
  20% {
    background-size: 110% 110%;
  }
  40% {
    background-size: 130% 100%;
  }
  80% {
    background-size: 150% 130%;
  }
  90% {
    background-size: 150% 130%;
  }
  100% {
    background-size: 115% 125%;
  }
}

.mainRouter {
  background: #fff url(https://cms.pixso.cn/images/home/role-bg.png) no-repeat;
  background-size: 150% 150%;
  animation: animate 5s linear 0 infinite alternate;
}

.home-header {
  background-color: #272c33;
  overflow: hidden;
}
.home-header-logo {
  float: left;
}

.home-header-logo h1 {
  font-family: "";
  letter-spacing: 2px;
}
.home-header-Info {
  float: right;
  display: flex;
  align-items: center;
  height: 60px;
  padding-right: 30px;
}
.home-header-logo h1 {
  color: blanchedalmond;
  height: 60px;
  line-height: 60px;
  padding: 0;
  margin: 0;
}

.el-aside {
  transition: 0.4s;
}
.el-menu {
  border-right: none !important;
  background: #272c33 !important;
}
.el-submenu__title {
  background: #272c33 !important;
}
.collapse_button {
  background: #28283b;
  color: white;
  text-align: center;
  letter-spacing: 2px;
  padding: 5px 0;
  cursor: pointer;
}
.collapse_button span {
  padding-left: 12px;
}
.user_avatar_i {
  width: 50px;
  font-size: 23px;
  color: #fff;
  cursor: pointer;
}

.user_avatar_i:hover {
  color: skyblue;
}
.user_avatar_i span {
  color: red;
  font-size: 10px;
  position: absolute;
  text-align: center;
  display: inline-grid;
  font-weight: 900;
}

/*侧边栏*/
.el-aside {
  background-color: #001529;
  color: #333;
  line-height: 200px;
}

.el-aside .el-menu {
  border-right: none;
}

/*展开/收起*/

.toggle_box {
  background-color: #001529;
  font-size: 15px;
  font-weight: bold;
  line-height: 24px;
  color: #ffffff;
  letter-spacing: 0.2em;
  text-align: center;
  cursor: pointer;
}
.el-aside .collage {
  text-align: center;
  background: #2d3436;
  color: white;
}
</style>