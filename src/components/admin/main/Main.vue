<template>
  <div style="height: 100%;">
    <!-- 后台管理系统的导航栏 -->
    <div class="header">
      <h1>Englishman 后台管理系统</h1>
      <p>{{name}}，你好！</p>
      <el-button type="primary" @click="logOut">退出登录</el-button>
    </div>
    <!-- 后台管理系统的左侧和右侧 -->
    <div class="main">
      <div class="main-left">
        <!-- <div class="collapse">|||</div>
        <div class="main-left-item"><i class="iconfont icon-yonghuguanli"></i> 用户管理</div>
        <div class="main-left-item"><i class="iconfont icon-quanxian"></i> 权限管理</div> -->
        <!-- :default-active=" $route.path == '/admin/main/' ? '/admin/main' : $route.path" -->
        <el-menu
            router
            :default-active="$route.path"
            background-color="#808A87"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
          <!-- :index="role_auth_user == 1 ? '/admin/main' : '/admin/main/error'" -->
          <el-menu-item :index="role_auth_user == 1 ? '/admin/main/user' : '/admin/main/error'">
            <i class="iconfont icon-yonghuguanli"></i>&nbsp;&nbsp;
            <span slot="title">用户管理</span>
          </el-menu-item>
          <!-- <el-menu-item index="2" @click="gotoRight"> -->
          <el-menu-item :index="role_auth_right == 1 ? '/admin/main/right' : '/admin/main/error2'">
            <i class="iconfont icon-quanxian"></i>&nbsp;&nbsp;
            <span slot="title">权限管理</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-blog"></i>&nbsp;&nbsp;
              <span>博文管理</span>
            </template>
            <el-menu-item :index="role_auth_detail == 1 ? '/admin/main/detail' : '/admin/main/error3'">博文信息
            </el-menu-item>
            <el-menu-item :index="role_auth_detailimg == 1 ? '/admin/main/detail/photo' : '/admin/main/error4'">
              博文信息（图片）
            </el-menu-item>
            <el-menu-item :index="role_auth_content == 1 ? '/admin/main/content' : '/admin/main/error5'">博文内容
            </el-menu-item>
          </el-submenu>
          <!-- :index=" name != 'admin' ? '/admin/main/comment': '' " -->
          <el-menu-item :index="role_auth_comment == 1 ? '/admin/main/comment' : '/admin/main/error6'">
            <i class="iconfont icon-comments"></i>&nbsp;&nbsp;
            <span slot="title">评论管理</span>
          </el-menu-item>
        </el-menu>

      </div>
      <div class="main-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  async created() {
    // console.log(this.$route.params.name)
    // console.log(sessionStorage.getItem('name'))
    let name = sessionStorage.getItem('name')
    // console.log(name)
    if (name) {

    } else {
      if (this.$route.params.name == null) {
        this.$router.push('/admin')
      }
      name = this.$route.params.name
      sessionStorage.setItem('name', name)
    }
    this.name = name
    // this.name = this.$params.query.name
    // if(this.name == undefined){
    // 	this.$router.push('/admin')
    // }

    // console.log(this.name == "undefined")

    if (this.name == "undefined") {
      this.$router.push('/admin')
    }

    let params = {
      name: this.name
    }
    const res = await this.$http.get('/blogAdminRole/selectBlogAdminRoleLoginByName', {params: params})
    if (res.status == 200) {

      this.role_auth_user = res.data.role_auth_user
      this.role_auth_right = res.data.role_auth_right
      this.role_auth_detail = res.data.role_auth_detail
      this.role_auth_detailimg = res.data.role_auth_detailimg
      this.role_auth_content = res.data.role_auth_content
      this.role_auth_comment = res.data.role_auth_comment

    }

    // console.log(this.role_auth_user)
    // console.log(this.role_auth_right)
    // console.log(this.role_auth_detail)
    // console.log(this.role_auth_detailimg)
    // console.log(this.role_auth_content)
    // console.log(this.role_auth_comment)

    // console.log(this.$route.path)
  },
  // watch:{
  // 	'$route.path':{
  // 		deep: true,
  // 		immediate: true,
  // 		async handler(){
  // 			// console.log('路径改变了')
  // 			let params = {
  // 				name: this.name
  // 			}
  // 			const res = await this.$http.get('/blogAdminRole/selectBlogAdminRoleLoginByName',{params: params})
  // 			if(res.status == 200){

  // 				this.role_auth_user = res.data.role_auth_user
  // 				this.role_auth_right = res.data.role_auth_right
  // 				this.role_auth_detail = res.data.role_auth_detail
  // 				this.role_auth_detailimg = res.data.role_auth_detailimg
  // 				this.role_auth_content = res.data.role_auth_content
  // 				this.role_auth_comment = res.data.role_auth_comment

  // 			}
  // 			// console.log(this.role_auth_user)
  // 			// console.log(this.role_auth_right)
  // 			// console.log(this.role_auth_detail)
  // 			// console.log(this.role_auth_detailimg)
  // 			// console.log(this.role_auth_content)
  // 			// console.log(this.role_auth_comment)
  // 		}
  // 	}
  // },
  data() {
    return {
      name: '',
      // role_auth_user: 0,
      // role_auth_right: 0,
      // role_auth_detail: 0,
      // role_auth_detailimg: 0,
      // role_auth_content: 0,
      // role_auth_comment: 0,
      role_auth_user: 1,
      role_auth_right: 1,
      role_auth_detail: 1,
      role_auth_detailimg: 1,
      role_auth_content: 1,
      role_auth_comment: 1
    }
  },
  methods: {
    logOut() {
      sessionStorage.removeItem('name')
      this.$router.push('/admin')
    },
    // gotoUser(){
    // 	this.$router.push('/admin/main')
    // },
    // gotoRight(){
    // 	this.$router.push('/admin/main/right')
    // },
    // gotoBlogDetail(){
    // 	this.$router.push('/admin/main/detail')
    // }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 80px;
  background-color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: white;
    font-size: 30px;
    margin-left: 25px;
  }

  p {
    color: white;
    font-size: 16px;
    margin-left: 800px;
  }

  .el-button {
    height: 50%;
    margin-right: 25px;
  }
}

.main {
  height: 100%;
  display: flex;

  .main-left {
    width: 15%;
    height: 100%;
    background-color: #808A87;

    .el-menu {
      border-right: 0;

      .el-menu-item {
        // margin-left: 0!important;
        // padding-left: 60px!important;
        // width: 100%;
        height: 60px;
      }
    }

    /deep/ .el-submenu {
      .el-submenu__title {
        height: 60px;
      }

      .el-menu-item {
        height: 60px;
        // margin-left: 20px;
        // margin-left: 0!important;
        padding-left: 60px !important;
        // color: green!important;
      }
    }

  }

  .main-right {
    width: 85%;
    height: 100%;
    // background-color: lightgreen;
  }
}

</style>