<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博文管理</el-breadcrumb-item>
      <el-breadcrumb-item>博文信息（图片）</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div>
        博客标题：
        <el-input v-model.trim="text"
                  placeholder="请输入博客标题"
                  style="width: 220px;
							    margin-left: 10px;"
                  @blur="showImg"
        >
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        博客图片：
        <!-- action="#" -->
        <!-- :http-request="imgUpload" -->
        <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL + '/blogAdminDetail/upload/img' "
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="button-group">
        <el-button type="primary" @click="resetInfo">重置</el-button>
        <el-button type="primary" style="margin-left: 20px;" @click="submitInfo">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Photo',
  data() {
    return {
      text: '',
      imageUrl: '',
      coverphoto: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // console.log(res)
      this.coverphoto = res
      // console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw);
      // this.imageUrl = this.$http.defaults.baseURL + "/upload/" + res
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return isJPG && isLt5M;
    },
    async showImg() {
      // console.log('失去焦点后显示图片')

      let params = {
        blog_title: this.text
      }
      const res = await this.$http.get('/blogAdminDetail/selectBlogAdminDetailPhoto', {params: params})
      // console.log(res)
      // this.imageUrl = res.data
      if (res.data == '') {
        // this.imageUrl = ''
        // this.coverphoto = ''
        return
      }
      this.imageUrl = this.$http.defaults.baseURL + "/upload/" + res.data
      this.coverphoto = res.data
    },
    // imgUpload(f){
    // 	// console.log(f.file)
    // 	var reader = new FileReader()
    // 	reader.readAsDataURL(f.file)
    // 	// 一定要用箭头函数（不能用function函数，让里面的this指向Vue实例）
    // 	reader.onload = () => {
    // 		// console.log(reader.result)
    // 		this.imageUrl = reader.result
    // 	}
    // 	// console.log(this.imageUrl)
    // },
    resetInfo() {
      this.text = ''
      this.imageUrl = ''
      this.coverphoto = ''
    },
    async submitInfo() {
      if (this.text == '') {
        this.$message.error('博客标题不能为空！')
        return
      } else if (this.imageUrl == '' || this.coverphoto == '') {
        this.$message.error('博客图片不能为空！')
        return
      }
      let data = {
        blog_coverphoto: this.coverphoto,
        blog_title: this.text
      }
      const res = await this.$http.post('/blogAdminDetail/updateBlogAdminDetailPhoto', data)
      // console.log(res)
      if (res.status == 200 && res.data == 1) {
        this.$message.success('编辑成功！')
        // this.imageUrl = ''
        // this.coverphoto = ''
        // this.text = ''
        return
      }

      this.$message.error('博客标题不存在，请先填写博文信息！')

    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  // background-color: yellow;
  width: 500px;
  margin-left: 45px;
  margin-top: 20px;
}

/deep/ .box-card {
  width: 1200px;
  margin: 30px auto;

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    // margin-top: 20px;
    margin-left: 90px;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 35px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }

  .button-group {
    // background-color: yellow;
    margin-top: 30px;
    margin-left: 140px;
  }
}
</style>