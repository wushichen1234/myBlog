<template>
  <div class="detail-main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博文管理</el-breadcrumb-item>
      <el-breadcrumb-item>博文信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button type="primary" @click="addBlogDetail">添加信息</el-button>
      <el-input v-model.trim="title" placeholder="请输入博客标题" style="width: 220px; margin-left: 775px;"></el-input>
      <el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="search"></el-button>
      <el-table
          :data="tableData"
          class="box-table"
          :border="true"
          style="width: 100%"
      >
        <el-table-column
            label="#"
            type="index"
            width="50"
        >
        </el-table-column>
        <el-table-column
            prop="blog_title"
            label="博客标题"
            width="180"
        >
        </el-table-column>
        <el-table-column
            prop="blog_preface"
            label="博客前言"
            width="180"
        >
        </el-table-column>
        <el-table-column
            prop="blog_createtime"
            label="创建时间"
        >
        </el-table-column>
        <el-table-column
            prop="blog_commentcount"
            label="评论数"
        >
        </el-table-column>
        <el-table-column
            prop="blog_viewcount"
            label="浏览量"
        >
        </el-table-column>
        <el-table-column
            prop="blog_type"
            label="博文类型"
        >
        </el-table-column>
        <el-table-column
            prop="isHot"
            label="热门文章"
        >
          <template slot-scope="scope">
            <el-switch
                :value="scope.row.isHot == 0 ? false: true"
                active-color="#0000FF"
                inactive-color="#CCCCCC"
                @change="changeStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                class="btn"
                @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>

            <el-popconfirm
                style="margin-left: 10px;"
                title="确定要删除这一行博文信息吗？"
                @confirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button
                  size="mini"
                  class="btn"
                  type="danger"
                  slot="reference"
              >删除
              </el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          class="box-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizesChoose"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataTotal">
      </el-pagination>

      <el-dialog
          title="新增博文信息"
          :visible.sync="formShow"
          width="30%"
          :before-close="handleClose"
      >
        <el-form ref="ruleForm" :model="form" :rules="rules" class="form" label-width="80px">
          <el-form-item label="博客标题" prop="blog_title">
            <el-input v-model="form.blog_title" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="博客前言" prop="blog_preface">
            <el-input v-model="form.blog_preface" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="评论数" prop="blog_commentcount">
            <el-input v-model.number="form.blog_commentcount" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="浏览量" prop="blog_viewcount">
            <el-input v-model.number="form.blog_viewcount" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="博文类型" prop="blog_type">
            <el-select v-model="form.blog_type" placeholder="博文类型">
              <el-option label="生活感悟" value="生活感悟"></el-option>
              <el-option label="情感日记" value="情感日记"></el-option>
              <el-option label="技术类" value="技术类"></el-option>
              <el-option label="美好记忆" value="美好记忆"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
				    <el-button @click="cancelForm('ruleForm')">取 消</el-button>
				    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
				 </span>
      </el-dialog>

      <el-dialog
          title="修改博文信息"
          :visible.sync="formShow1"
          width="30%"
          :before-close="handleClose1"
      >
        <el-form ref="ruleForm1" :model="form1" :rules="rules1" class="form1" label-width="80px">
          <el-form-item label="博客标题" prop="blog_title">
            <el-input v-model="form1.blog_title" style="width: 300px;" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="博客前言" prop="blog_preface">
            <el-input v-model="form1.blog_preface" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="评论数" prop="blog_commentcount">
            <el-input v-model.number="form1.blog_commentcount" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="浏览量" prop="blog_viewcount">
            <el-input v-model.number="form1.blog_viewcount" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="博文类型" prop="blog_type">
            <el-select v-model="form1.blog_type" placeholder="博文类型">
              <el-option label="生活感悟" value="生活感悟"></el-option>
              <el-option label="情感日记" value="情感日记"></el-option>
              <el-option label="技术类" value="技术类"></el-option>
              <el-option label="美好记忆" value="美好记忆"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
			      <el-button @click="cancelForm1('ruleForm1')">取 消</el-button>
			      <el-button type="primary" @click="submitForm1('ruleForm1')">确 定</el-button>
			   </span>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    var checkTitle = async (rule, value, callback) => {
      let params = {
        blog_title: value
      }
      const res = await this.$http.get('/blogAdminDetail/isBlogAdminDetailTitle', {params: params})
      // console.log(res)
      if (!value) {
        return callback(new Error('博客标题不能为空'))
      } else if (value.length < 1 || value.length > 30) {
        return callback(new Error('长度在 1 到 30 个字符'))
      } else if (res.data == true) {
        return callback(new Error('博客标题已存在'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      title: '',
      currentPage: 1,
      pageSizesChoose: [1, 2, 5, 10],
      pageSize: 5,
      tableDataTotal: 0,
      formShow: false,
      formShow1: false,
      form: {
        blog_title: '',
        blog_preface: '',
        blog_commentcount: 0,
        blog_viewcount: 0,
        blog_type: ''
      },
      form1: {
        blog_title: '',
        blog_preface: '',
        blog_commentcount: 0,
        blog_viewcount: 0,
        blog_type: ''
      },
      rules: {
        blog_title: [
          {validator: checkTitle, trigger: 'blur'}
          // { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        blog_preface: [
          {required: true, message: '请输入博客前言', trigger: 'blur'},
          {min: 3, max: 60, message: '长度在 3 到 60 个字符', trigger: 'blur'}
        ],
        blog_commentcount: [
          {required: true, message: '请输入评论数', trigger: 'blur'},
          {type: 'number', message: '评论数必须为数字值'}
        ],
        blog_viewcount: [
          {required: true, message: '请输入浏览量', trigger: 'blur'},
          {type: 'number', message: '浏览量必须为数字值'}
        ],
        blog_type: [
          {required: true, message: '请选择博文类型', trigger: 'change'},
        ]
      },
      rules1: {
        blog_title: [
          {required: true, message: '请输入博客标题', trigger: 'blur'},
          {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
        ],
        blog_preface: [
          {required: true, message: '请输入博客前言', trigger: 'blur'},
          {min: 3, max: 60, message: '长度在 3 到 60 个字符', trigger: 'blur'}
        ],
        blog_commentcount: [
          {required: true, message: '请输入评论数', trigger: 'blur'},
          {type: 'number', message: '评论数必须为数字值'}
        ],
        blog_viewcount: [
          {required: true, message: '请输入浏览量', trigger: 'blur'},
          {type: 'number', message: '浏览量必须为数字值'}
        ],
        blog_type: [
          {required: true, message: '请选择博文类型', trigger: 'change'},
        ]
      }
    }
  },
  async created() {
    const res = await this.$http.get('/blogAdminDetail/selectBlogAdminDetailTotal')
    this.tableDataTotal = res.data

    let params = {
      currentPage: this.currentPage,
      pageSize: this.pageSize
    }
    const res1 = await this.$http.get('/blogAdminDetail/selectBlogAdminDetailByPage', {params: params})
    this.tableData = res1.data
  },
  methods: {
    handleEdit(index, row) {
      // console.log(index,row)
      console.log(row.blog_commentcount, row.blog_viewcount)
      this.formShow1 = true
      this.form1.blog_title = row.blog_title
      this.form1.blog_preface = row.blog_preface
      this.form1.blog_commentcount = row.blog_commentcount
      this.form1.blog_viewcount = row.blog_viewcount
      this.form1.blog_type = row.blog_type

      this.form1.id = row.id
    },
    async handleDelete(index, row) {
      // console.log(index,row)
      // console.log(row.id)
      let params = {
        id: row.id
      }
      // 在 Navicat 中，在blog_content表中设置blog_detail_id字段为外键，引用的是blog_detail表中的id字段
      // 并规定了在删除时是级联删除（CASCADE），也就是在删除了对应的博文信息内容后也就自动删掉了对应的博文内容
      const res = await this.$http.get('/blogAdminDetail/deleteBlogAdminDetail', {params: params})
      if (res.status == 200) {
        this.$message.success('删除成功！')
      }
      location.reload()
    },
    addBlogDetail() {
      this.formShow = true
    },
    async search() {
      //console.log('search')
      if (this.title == '') {
        this.$message.error('输入为空！')
        return
      }
      let params = {
        blog_title: this.title
      }
      const res = await this.$http.get('/blogAdminDetail/selectBlogAdminDetailByTitle', {params: params})
      if (res.status == 200) {
        this.tableData = res.data
        this.tableDataTotal = res.data.length
        this.currentPage = 1
        this.pageSize = 1
        this.pageSizesChoose = [1]
      }
    },
    // 页面容量改变的重新加载
    async handleSizeChange(pageSize) {
      this.pageSize = pageSize
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      const res = await this.$http.get('/blogAdminDetail/selectBlogAdminDetailByPage', {params: params})
      this.tableData = res.data
    },
    // 当前页面改变的重新加载
    async handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      const res = await this.$http.get('/blogAdminDetail/selectBlogAdminDetailByPage', {params: params})
      this.tableData = res.data
    },
    cancelForm(formName) {
      this.$refs[formName].resetFields()
      this.formShow = false
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.formShow = false
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // console.log(this.form)
          const res = await this.$http.post('/blogAdminDetail/insertBlogAdminDetail', this.form)
          if (res.status == 200) {
            this.$message.success('提交成功！')
            this.$refs[formName].resetFields()
            this.formShow = false
          }
          location.reload()
        } else {
          this.$message.error('提交失败！')
          return false;
        }
      })
    },
    handleClose1() {
      this.$refs.ruleForm1.resetFields()
      this.formShow1 = false
    },
    cancelForm1(formName) {
      this.$refs[formName].resetFields()
      this.formShow1 = false
    },
    submitForm1(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post('/blogAdminDetail/updateBlogAdminDetail', this.form1)
          if (res.status == 200) {
            this.$message.success('修改成功！')
            this.$refs[formName].resetFields()
            this.formShow1 = false
          }
          location.reload()
        } else {
          this.$message.error('修改失败！')
          return false;
        }
      })
    },
    async changeStatus(row) {
      // console.log(row.isHot)
      if (row.isHot == 1) {
        row.isHot = 0
        let params = {
          id: row.id,
          isHot: 0
        }
        const res = await this.$http.get('/blogAdminDetail/updateBlogAdminDetailIsHot', {params: params})
        // console.log(res)
      } else {
        row.isHot = 1
        let params = {
          id: row.id,
          isHot: 1
        }
        const res = await this.$http.get('/blogAdminDetail/updateBlogAdminDetailIsHot', {params: params})
        // console.log(res)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// .detail-main {
//   // height: 100%;
// }

.el-breadcrumb {
  // background-color: yellow;
  width: 500px;
  margin-left: 45px;
  margin-top: 20px;
}

.box-card {
  width: 1200px;
  margin: 30px auto;

  .box-table {
    margin-top: 20px;

    /deep/ .cell {
      padding-left: 0;
      padding-right: 0;
    }

    // .btn {
    //   // width: 60px;
    // }
  }

  .box-pagination {
    margin-top: 20px;
  }

  // /deep/ .el-dialog__footer {
  //   // margin-top: -20px;
  // }
}
</style>