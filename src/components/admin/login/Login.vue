<template>
  <div class="login-home">
    <!-- 后台管理系统登陆页面
   <router-link to="/admin/main">跳转</router-link> -->

    <div class="login-main">
      <div class="login-avatar"></div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="70px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" :show-password="true"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  created() {
    sessionStorage.clear()
  },
  data() {
    return {
      loginForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 6, message: '长度在 6 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert('submit!');
          const res = await this.$http.get('/blogAdminLogin/selectBlogAdminLogin', {params: this.loginForm})

          if (res.data.res == false) {
            this.$message.error('登录失败！')
          } else {
            this.$message({
              type: 'success',
              message: '登录成功！'
            })
            sessionStorage.setItem('token', res.data.token)
            this.$router.push({
              name: 'Welcome',
              params: {name: this.loginForm.name}
            })
          }
        } else {
          this.$message.error('登录失败！')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}

</script>

<style lang="less" scoped>
.login-home {
  height: 100%;
  background-color: pink;
  position: relative;

  .login-main {
    width: 500px;
    height: 300px;
    background-color: rgba(255, 255, 255, .5);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;

    .login-avatar {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      // top: 25%;
      transform: translate(-50%, -50%);
      background: url('../../../assets/images/avatar.jpg') no-repeat;
      background-size: 100% 100%;
      background-attachment: fixed;
      z-index: 999;
    }

    .el-form {
      padding: 110px 70px;
    }

    .btn {
      margin-left: 35px;
    }
  }
}

</style>