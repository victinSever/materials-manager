import Vue from 'vue'
import VueRouter from 'vue-router'

// 登陆
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/home/Home.vue'

// 系统模块
import Welcome from '../views/home/homeChild/Welcome.vue'
import Users from '../views/systemman/Users.vue'
import Atttachments from '../views/systemman/Attachments.vue'

// 健康模块
import Map from '../views/health/Map.vue'
import FindData from '../views/health/findData.vue'

//业务模块
import StockList from '../views/businessman/stockList.vue'
import Products from '../views/businessman/products.vue'
import ProductCategorys from '../views/businessman/productCategorys.vue'
import Stocks from '../views/businessman/Stocks.vue'
import Operate from '../views/businessman/operate.vue'

import Consumers from '../views/businessman/consumers.vue'
import Suppliers from '../views/businessman/suppliers.vue'

// 日志模块
import LoginLog from '../views/log/loginLog.vue'
import Logs from '../views/log/logs.vue'

//其他模块
import Blog from '../views/other/blog.vue'



Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: "雪中送炭 - 雪中送炭"
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            title: "雪中送炭 - 管理员注册"
        }
    },
    {
        path: '/home',
        component: Home,
        name: 'home',
        redirect: '/welcome',
        children: [{
                path: '/welcome', //主页
                name: 'welcome',
                component: Welcome,
                meta: {
                    title: "雪中送炭 - 主页"
                }
            },
            {
                path: '/users', //用户信息
                component: Users,
                meta: {
                    title: "雪中送炭 - 用户"
                }
            },
            {
                path: '/attachments', //附件信息
                component: Atttachments,
                meta: {
                    title: "雪中送炭 - 附件"
                }
            },

            {
                path: '/stockList', //物资类别
                component: StockList,
                meta: {
                    title: "雪中送炭 - 物资调度记录"
                }
            },
            {
                path: '/products', //物资类别
                component: Products,
                meta: {
                    title: "雪中送炭 - 物资资料"
                }
            },
            {
                path: '/productCategorys', //物资类别
                component: ProductCategorys,
                meta: {
                    title: "雪中送炭 - 类别管理"
                }
            },
            {
                path: '/stocks', //物资库存
                component: Stocks,
                meta: {
                    title: "雪中送炭 - 库存管理"
                }
            },
            {
                path: '/operate', //物资发放
                component: Operate,
                meta: {
                    title: "雪中送炭 - 调度操作"
                }
            },

            {
                path: '/consumers', //物资去处
                component: Consumers,
                meta: {
                    title: "雪中送炭 - 物资去处"
                }
            },
            {
                path: '/suppliers', //物资来源
                component: Suppliers,
                meta: {
                    title: "雪中送炭 - 物资来源"
                }
            },

            {
                path: '/map', //疫情地图
                component: Map,
                meta: {
                    title: "雪中送炭 - 疫情地图概览"
                }
            },
            {
                path: '/findData', //查看情况
                component: FindData,
                meta: {
                    title: "雪中送炭 - 查看情况"
                }
            },

            {
                path: '/loginLog', //登录日志
                component: LoginLog,
                meta: {
                    title: "雪中送炭 - 登录日志"
                }
            },
            {
                path: '/logs', //操作日志
                component: Logs,
                meta: {
                    title: "雪中送炭 - 操作日志"
                }
            },
            {
                path: '/blog', //关于我们
                component: Blog,
                meta: {
                    title: "雪中送炭 - 关于我们"
                }
            },

        ]
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

//为路由对象加上导航守卫
router.beforeEach((to, from, next) => {
    document.title = to.meta.title; //设置标题
    if (to.path === '/login' || to.path === '/register') {
        next()
    } else {
        //从sessionStorage获取token
        const tokenStr = window.sessionStorage.getItem('token');
        if (!tokenStr) {
            next('/login')
        } else {
            next()
        }
    }
})

export default router