import Vue from 'vue'
import VueRouter from 'vue-router'

// 登陆
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
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



Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: "物资管理系统 - 登陆"
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            title: "管理员注册"
        }
    },
    {
        path: '/home',
        component: Home,
        name: 'home',
        // redirect: '/welcome',
        children: [{
                path: '/welcome', //主页
                name: 'welcome',
                component: Welcome,
                meta: {
                    title: "物资管理系统 - 主页"
                }
            },
            {
                path: '/users', //用户信息
                component: Users,
                meta: {
                    title: "用户"
                }
            },
            {
                path: '/attachments', //附件信息
                component: Atttachments,
                meta: {
                    title: "附件"
                }
            },

            {
                path: '/stockList', //物资类别
                component: StockList,
                meta: {
                    title: "物资调度记录"
                }
            },
            {
                path: '/products', //物资类别
                component: Products,
                meta: {
                    title: "物资资料"
                }
            },
            {
                path: '/productCategorys', //物资类别
                component: ProductCategorys,
                meta: {
                    title: "类别管理"
                }
            },
            {
                path: '/stocks', //物资库存
                component: Stocks,
                meta: {
                    title: "库存管理"
                }
            },
            {
                path: '/operate', //物资发放
                component: Operate,
                meta: {
                    title: "调度操作"
                }
            },

            {
                path: '/consumers', //物资去处
                component: Consumers,
                meta: {
                    title: "物资去处"
                }
            },
            {
                path: '/suppliers', //物资来源
                component: Suppliers,
                meta: {
                    title: "物资来源"
                }
            },

            {
                path: '/map', //疫情地图
                component: Map,
                meta: {
                    title: "疫情地图概览"
                }
            },
            {
                path: '/findData', //查看情况
                component: FindData,
                meta: {
                    title: "查看情况"
                }
            },

            {
                path: '/loginLog', //登录日志
                component: LoginLog,
                meta: {
                    title: "登录日志"
                }
            },
            {
                path: '/logs', //操作日志
                component: Logs,
                meta: {
                    title: "操作日志"
                }
            },

        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//为路由对象加上导航守卫
router.beforeEach((to, from, next) => {
    // document.title = to.meta.title; //设置标题
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