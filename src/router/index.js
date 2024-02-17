import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../components/home/Home'
const Home = () => import('../components/home/Home')
// import Life from '../components/life/Life'
const Life = () => import('../components/life/Life')
// import Love from '../components/love/Love'
const Love = () => import('../components/love/Love')
// import Tech from '../components/tech/Tech'
const Tech = () => import('../components/tech/Tech')
// import Memory from '../components/memory/Memory'
const Memory = () => import('../components/memory/Memory')
// import Detail from '../components/detail/Detail'
const Detail = () => import('../components/detail/Detail')
// import Search from '../components/search/SearchList'
const Search = () => import('../components/search/SearchList')

import Login from '../components/admin/login/Login'
import Main from '../components/admin/main/Main'
import User from '../components/admin/user/User'
import Right from '../components/admin/right/Right'
import BlogDetail from '../components/admin/detail/Detail'
import Photo from '../components/admin/detail/Photo'
import Content from '../components/admin/content/Content'
import Comment from '../components/admin/comment/Comment'

import Welcome from '../components/admin/hello/Hello'

import Error from '../components/admin/error/Error'
import Error2 from '../components/admin/error/Error2'
import Error3 from '../components/admin/error/Error3'
import Error4 from '../components/admin/error/Error4'
import Error5 from '../components/admin/error/Error5'
import Error6 from '../components/admin/error/Error6'

// 解决Vue路由重复跳转报错 
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
    return routerPush.call(this, location).catch(err => {
    })
};

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/life',
        component: Life
    },
    {
        path: '/love',
        component: Love
    },
    {
        path: '/tech',
        component: Tech
    },
    {
        path: '/memory',
        component: Memory
    },
    {
        path: '/detail',
        name: 'Detail',
        component: Detail
    },
    {
        path: '/search',
        component: Search
    },
    {
        path: '/admin',
        component: Login
    },
    {
        path: '/admin/main',
        component: Main,
        children: [
            {path: '', name: 'Welcome', component: Welcome},
            {path: 'user', name: 'User', component: User},
            {path: 'right', name: 'Right', component: Right},
            {path: 'detail', component: BlogDetail},
            {path: 'detail/photo', component: Photo},
            {path: 'content', component: Content},
            {path: 'comment', component: Comment},
            {path: 'error', component: Error},
            {path: 'error2', component: Error2},
            {path: 'error3', component: Error3},
            {path: 'error4', component: Error4},
            {path: 'error5', component: Error5},
            {path: 'error6', component: Error6},
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/' || to.path === '/home' || to.path === '/life' || to.path === '/love' || to.path === '/tech' || to.path === '/memory' || to.path === '/detail' || to.path === '/search' || to.path === '/admin') {
        next()
    } else {
        let token = sessionStorage.getItem('token')
        if (token == null || token == '') {
            alert('无权限，请先登录！')
            return next('/admin')
        } else {
            next()
        }
    }
})

export default router