<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博文管理</el-breadcrumb-item>
      <el-breadcrumb-item>博文内容</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div>
        博客标题：
        <el-input
            v-model.trim="text"
            placeholder="请输入博客标题"
            style="width: 220px; margin-left: 10px;"
            @blur="showContent"
        >
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        博客内容（展示）：
        <article v-html="this.render1" style="margin-top: 10px;"/>
        <!-- 	<el-input
              type="textarea"
            :rows="15"
            placeholder="请输入博客内容"
            v-model.trim="textarea"
            resize="none"
          >
          </el-input> -->
      </div>
      <div style="margin-top: 15px;">
        博客内容（编辑）：<br/>
        <!-- :toolbars = "toolbars" -->
        <mavon-editor
            v-model="textarea"
            ref="md"
            @change="changeData"
        />
      </div>
      <!-- 	<div style="margin-top: 20px;">
          热门文章：<el-switch
                v-model="value"
                active-color="#0000FF"
                inactive-color="#CCCCCC"
                   >
               </el-switch>
        </div> -->
      <div class="button-group">
        <el-button type="primary" @click="resetInfo">重置</el-button>
        <el-button type="primary" style="margin-left: 20px;" @click="submitInfo">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data() {
    return {
      // 输入的博客标题
      text: '',
      // 输入的博客内容（text形式）
      textarea: '',
      // 输入的博客内容（html形式）
      render: '',
      // 获得对应博客标题下的博客内容
      render1: '',
      // 获得对应博客标题下的博文信息的id
      id: 0,
      value: false,
      // toolbars: {
      // 	bold: true, // 粗体
      //    italic: true, // 斜体
      //    header: true, // 标题
      //    underline: true, // 下划线
      //    strikethrough: true, // 中划线
      //    mark: true, // 标记
      //    superscript: true, // 上角标
      //    subscript: true, // 下角标
      //    quote: true, // 引用
      //    ol: true, // 有序列表
      //    ul: true, // 无序列表
      //    link: true, // 链接
      //    imagelink: true, // 图片链接
      //    code: true, // code
      //    table: true, // 表格
      //    fullscreen: true, // 全屏编辑
      //    readmodel: true, // 沉浸式阅读
      //    htmlcode: true, // 展示html源码
      //    help: true, // 帮助
      //    /* 1.3.5 */
      //    undo: true, // 上一步
      //    redo: true, // 下一步
      //    trash: true, // 清空
      //    save: true, // 保存（触发events中的save事件）
      //    /* 1.4.2 */
      //    navigation: true, // 导航目录
      //    /* 2.1.8 */
      //    alignleft: true, // 左对齐
      //    aligncenter: true, // 居中
      //    alignright: true, // 右对齐
      //    /* 2.2.1 */
      //    subfield: true, // 单双栏模式
      //    preview: true, // 预览
      // }
      // toolbars: {
      // 	bold: true, // 粗体
      // 	italic: true, // 斜体
      // 	header: true, // 标题
      // 	underline: true, // 下划线
      // 	mark: true, // 标记
      // 	superscript: true, // 上角标
      // 	quote: true, // 引用
      // 	ol: true, // 有序列表
      // 	link: true, // 链接
      // 	imagelink: true, // 图片链接
      // 	help: true, // 帮助
      // 	code: true, // code
      // 	subfield: true, // 是否需要分栏
      // 	fullscreen: true, // 全屏编辑
      // 	readmodel: true, // 沉浸式阅读
      // 	/* 1.3.5 */
      // 	undo: true, // 上一步
      // 	trash: true, // 清空
      // 	save: true, // 保存（触发events中的save事件）
      // 	/* 1.4.2 */
      // 	navigation: true, // 导航目录
      // }
    }
  },
  methods: {
    resetInfo() {
      this.text = ''
      this.textarea = ''
      this.render1 = ''
      this.render = ''
    },
    // 提交后的行为
    async submitInfo() {
      if (this.text == '') {
        this.$message.error('博客标题不能为空！')
        return
      } else if (this.textarea == '') {
        this.$message.error('博客内容不能为空！')
        return
      }

          // 根据 id 和 render1 判断博客内容是新增还是编辑（修改）
      // 如果 id 为 0，说明博客标题不存在，也就是该条博客信息都没有，直接提示退出
      else if (this.id == 0) {
        this.$message.error('博客标题不存在，请先填写博文信息！')
      }
      // 如果 id 不为 0，但是render1 为空，说明博客内容是要新增
      else if (this.id != 0 && this.render1 == '') {
        // console.log('该条博客内容是需要新增')
        let data = {
          blog_detail_id: this.id,
          blog_content: this.render
        }
        const res = await this.$http.post('/blogAdminContent/insertBlogAdminContentByDetailId', data)
        if (res.data = 1 && res.status == 200) {
          this.$message.success('添加博客内容成功！')

          // 给render1赋最新的值
          let params = {
            blog_title: this.text
          }
          const res1 = await this.$http.get('/blogAdminContent/selectBlogAdminContentByTitle', {params: params})
          this.render1 = res1.data

          return
        }
        // console.log(res,'新增成功')

      }
      // 否则（id不为 0，render1也不为空）博客内容是要修改
      else if (this.id != 0 && this.render1 != '') {
        // console.log('该条博客内容是需要修改')
        let data = {
          blog_title: this.text,
          blog_content: this.render
        }
        const res = await this.$http.post('/blogAdminContent/updateBlogAdminContentByTitle', data)
        if (res.data == 1 && res.status == 200) {
          this.$message.success('修改博客内容成功！')

          // 给render1赋最新的值
          let params = {
            blog_title: this.text
          }
          const res1 = await this.$http.get('/blogAdminContent/selectBlogAdminContentByTitle', {params: params})
          this.render1 = res1.data

          return
        }
        // console.log(res,'修改成功')

      }

    },
    // 博客标题（文本框）失去焦点后的行为
    async showContent() {
      // console.log('根据博客标题展示博客内容')
      // 如果对应的博客标题有博客内容，就显示出来

      let params = {
        blog_title: this.text
      }
      const res = await this.$http.get('/blogAdminContent/selectBlogAdminContentByTitle', {params: params})
      this.render1 = res.data
      // console.log(this.render1 == '')

      // 统一获得 对应的博客标题的 那条博客信息的id
      const res1 = await this.$http.get('/blogAdminContent/selectBlogAdminDetailIdByTitle', {params: params})
      this.id = res1.data
    },
    // 最后要提交的博客内容的html格式
    changeData(value, render) {
      // value中是文本值，render是渲染出的html文本
      // console.log(value)
      // console.log(render)
      this.render = render
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

.box-card {
  width: 1200px;
  margin: 30px auto;

  // .el-textarea{
  // 	width: 800px;
  // 	margin-top: 10px;
  // 	margin-left: 90px;
  // }

  .v-note-wrapper {
    margin-top: 20px;
  }

  .el-switch {
    margin-left: 10px;
  }

  .button-group {
    // background-color: yellow;
    margin-top: 30px;
    margin-left: 140px;
  }
}
</style>