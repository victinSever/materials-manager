import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
        recentLogin: [],
        logs: []
    },
    mutations: {
        setUserInfo(state, userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo)); //将传递的数据先保存到localStorage中
            state.userInfo = userInfo; // 之后才是修改state中的状态
        },
        addLogs(state, data) {
            state.logs.push(data);
        },
        //七天的登陆信息
        setRecentLogin(state, data) {
            state.recentLogin = data;
        },
    },
    actions: {},
    modules: {}
})