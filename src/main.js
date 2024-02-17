import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

/* 引入iconfont */
import './assets/iconfont/iconfont.css'

import mavonEditor from 'mavon-editor';
import "mavon-editor/dist/css/index.css";

import router from './router/index.js'

import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:9090'
axios.defaults.baseURL = 'https://www.wscenglishman1.com:9090'

axios.interceptors.request.use(
    config => {
        if (sessionStorage.getItem('token')) {
            config.headers.token = sessionStorage.getItem('token')
        }
        // console.log(config)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    res => {
        // console.log("res",res)
        // console.log(res.data)
        if (res.data.code === '50000') {
            // console.log('token过期了')
            // this.$router.push('/admin')
            alert('无权限，请先登录！')
            router.push('/admin')
        }
        return res
    },
    err => {
        return Promise.reject(err)
    }
)

Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
