<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-button type="primary" @click="addRole">添加角色</el-button>
      <el-input v-model.trim="rolename" placeholder="请输入角色名称" style="width: 220px; margin-left: 775px;"></el-input>
      <el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="search"></el-button>
      <el-table
          :data="tableData"
          class="box-table"
          border
          style="width: 100%"
      >
        <el-table-column
            label="#"
            type="index"
            width="50"
        >
        </el-table-column>
        <el-table-column
            prop="role_name"
            label="角色名称"
            width="280"
        >
        </el-table-column>
        <el-table-column
            prop="role_description"
            label="角色描述"
            width="280"
        >
        </el-table-column>

        <!-- 补充创建日期列 -->
        <el-table-column
            prop="create_time1"
            label="创建日期"
            width="180"
        >
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.role_name == '超级管理员' ? true: false">编辑
            </el-button>
            <el-popconfirm
                style="margin-left: 10px;"
                title="确定要删除这一行权限信息吗？"
                @confirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button
                  size="mini"
                  type="danger"
                  slot="reference"
                  :disabled="scope.row.role_name == '超级管理员' ? true: false">删除
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
          title="新增角色信息"
          :visible.sync="formShow"
          width="30%"
          :before-close="handleClose"
      >
        <el-form ref="ruleForm" :model="form" :rules="rules" class="form" label-width="80px">
          <el-form-item label="角色名称" prop="role_name">
            <el-input v-model="form.role_name" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="role_description">
            <el-input v-model="form.role_description" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="角色权限" prop="role_auth">
            <el-select v-model="form.role_auth" multiple placeholder="角色权限">
              <el-option label="用户管理" value="用户管理" disabled></el-option>
              <el-option label="权限管理" value="权限管理" disabled></el-option>
              <el-option label="博文信息" value="博文信息"></el-option>
              <el-option label="博文信息(图片)" value="博文信息(图片)"></el-option>
              <el-option label="博文内容" value="博文内容"></el-option>
              <el-option label="评论管理" value="评论管理"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
				   <el-button @click="cancelForm('ruleForm')">取 消</el-button>
				   <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
				</span>
      </el-dialog>

      <el-dialog
          title="编辑角色信息"
          :visible.sync="formShow1"
          width="30%"
          :before-close="handleClose1"
      >
        <el-form ref="ruleForm1" :model="form1" :rules="rules1" class="form1" label-width="80px">
          <el-form-item label="角色名称" prop="role_name">
            <el-input v-model="form1.role_name" style="width: 300px;" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="role_description">
            <el-input v-model="form1.role_description" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="角色权限" prop="role_auth">
            <el-select v-model="form1.role_auth" multiple placeholder="角色权限">
              <el-option label="用户管理" value="用户管理" disabled></el-option>
              <el-option label="权限管理" value="权限管理" disabled></el-option>
              <el-option label="博文信息" value="博文信息"></el-option>
              <el-option label="博文信息(图片)" value="博文信息(图片)"></el-option>
              <el-option label="博文内容" value="博文内容"></el-option>
              <el-option label="评论管理" value="评论管理"></el-option>
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
  name: 'Right',
  async created() {
    // this.$router.push('/admin/main')
    const res = await this.$http.get('/blogAdminRole/selectBlogAdminRole')
    // console.log(res)
    this.tableDataTotal = res.data.length

    let params = {
      currentPage: this.currentPage,
      pageSize: this.pageSize
    }
    const res1 = await this.$http.get('/blogAdminRole/selectBlogAdminRoleByPage', {params: params})
    this.tableData = res1.data

  },
  data() {
    var checkRoleName = async (rule, value, callback) => {
      let params = {
        role_name: value
      }
      const res = await this.$http.get('/blogAdminRole/selectBlogAdminRoleName', {params: params})
      // console.log(res)
      if (!value) {
        return callback(new Error('角色名称不能为空'))
      } else if (res.data == true) {
        return callback(new Error('角色名称已存在'))
      } else {
        callback()
      }
    }
    return {
      rolename: '',
      tableData: [],
      // 初始当前页
      currentPage: 1,
      // 初始页容量
      pageSize: 1,
      // 页容量选择
      pageSizesChoose: [1, 2, 5, 10],
      tableDataTotal: 0,
      formShow: false,
      formShow1: false,
      form: {
        role_name: '',
        role_description: '',
        role_auth: ''
      },
      form1: {
        role_name: '',
        role_description: '',
        role_auth: ''
      },
      rules: {
        role_name: [
          {validator: checkRoleName, trigger: 'blur'}
        ],
        role_description: [
          {required: true, message: '请输入角色描述', trigger: 'blur'}
        ],
        role_auth: [
          {required: true, message: '请输入角色权限', trigger: 'change'}
        ]
      },
      rules1: {
        role_name: [
          // {validator: checkRoleName,trigger: 'blur'}
        ],
        role_description: [
          {required: true, message: '请输入角色描述', trigger: 'blur'}
        ],
        role_auth: [
          {required: true, message: '请输入角色权限', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    addRole() {
      // console.log('添加角色')
      this.formShow = true
    },
    async search() {
      // console.log('按角色搜索')
      // console.log(this.rolename)
      if (this.rolename == '') {
        this.$message.error('输入为空！')
        return
      }
      let params = {
        role_name: this.rolename
      }
      const res = await this.$http.get('/blogAdminRole/selectBlogAdminRoleByName', {params: params})
      if (res.status == 200) {
        this.tableData = res.data
        this.tableDataTotal = res.data.length
        this.currentPage = 1
        this.pageSize = 1
        this.pageSizesChoose = [1]
      }
    },
    handleEdit(index, row) {
      // console.log(index, row);
      // console.log(row.role_auth)
      this.formShow1 = true
      this.form1.role_name = row.role_name
      this.form1.role_description = row.role_description
      this.form1.role_auth = row.role_auth

      this.form1.id = row.id

    },
    // handleDelete(index, row) {
    // 	console.log(index, row);
    // },
    async handleSizeChange(val) {
      this.pageSize = val
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      const res1 = await this.$http.get('/blogAdminRole/selectBlogAdminRoleByPage', {params: params})
      this.tableData = res1.data
    },
    async handleCurrentChange(val) {
      this.currentPage = val
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      const res1 = await this.$http.get('/blogAdminRole/selectBlogAdminRoleByPage', {params: params})
      this.tableData = res1.data
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
          for (let i = 0; i < this.form1.role_auth.length; i++) {
            if (this.form1.role_auth[i] == '用户管理') {
              this.form1.role_auth_user = 1
              break;
            } else {
              this.form1.role_auth_user = 0
            }
          }

          for (let i = 0; i < this.form1.role_auth.length; i++) {
            if (this.form1.role_auth[i] == '权限管理') {
              this.form1.role_auth_right = 1
              break;
            } else {
              this.form1.role_auth_right = 0
            }
          }

          for (let i = 0; i < this.form1.role_auth.length; i++) {
            if (this.form1.role_auth[i] == '博文信息') {
              this.form1.role_auth_detail = 1
              break;
            } else {
              this.form1.role_auth_detail = 0
            }
          }

          for (let i = 0; i < this.form1.role_auth.length; i++) {
            if (this.form1.role_auth[i] == '博文信息(图片)') {
              this.form1.role_auth_detailimg = 1
              break;
            } else {
              this.form1.role_auth_detailimg = 0
            }
          }

          for (let i = 0; i < this.form1.role_auth.length; i++) {
            if (this.form1.role_auth[i] == '博文内容') {
              this.form1.role_auth_content = 1
              break;
            } else {
              this.form1.role_auth_content = 0
            }
          }

          for (let i = 0; i < this.form1.role_auth.length; i++) {
            if (this.form1.role_auth[i] == '评论管理') {
              this.form1.role_auth_comment = 1
              break;
            } else {
              this.form1.role_auth_comment = 0
            }
          }
          // console.log(this.form1)
          const res = await this.$http.post('/blogAdminRole/updateBlogAdminRole', this.form1)
          if (res.status == 200) {
            this.$message.success('提交成功！')
            this.$refs[formName].resetFields()
            this.formShow = false
          }
          location.reload()
        } else {
          this.$message.error('修改失败！')
          return false;
        }
      })
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.formShow = false
    },
    cancelForm(formName) {
      this.$refs[formName].resetFields()
      this.formShow = false
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          for (let i = 0; i < this.form.role_auth.length; i++) {
            if (this.form.role_auth[i] == '用户管理') {
              this.form.role_auth_user = 1
              break;
            } else {
              this.form.role_auth_user = 0
            }
          }

          for (let i = 0; i < this.form.role_auth.length; i++) {
            if (this.form.role_auth[i] == '权限管理') {
              this.form.role_auth_right = 1
              break;
            } else {
              this.form.role_auth_right = 0
            }
          }

          for (let i = 0; i < this.form.role_auth.length; i++) {
            if (this.form.role_auth[i] == '博文信息') {
              this.form.role_auth_detail = 1
              break;
            } else {
              this.form.role_auth_detail = 0
            }
          }

          for (let i = 0; i < this.form.role_auth.length; i++) {
            if (this.form.role_auth[i] == '博文信息(图片)') {
              this.form.role_auth_detailimg = 1
              break;
            } else {
              this.form.role_auth_detailimg = 0
            }
          }

          for (let i = 0; i < this.form.role_auth.length; i++) {
            if (this.form.role_auth[i] == '博文内容') {
              this.form.role_auth_content = 1
              break;
            } else {
              this.form.role_auth_content = 0
            }
          }

          for (let i = 0; i < this.form.role_auth.length; i++) {
            if (this.form.role_auth[i] == '评论管理') {
              this.form.role_auth_comment = 1
              break;
            } else {
              this.form.role_auth_comment = 0
            }
          }

          //console.log(this.form)
          const res = await this.$http.post('/blogAdminRole/insertBlogAdminRole', this.form)
          //console.log(res)
          if (res.status == 200) {
            this.$message.success('提交成功！')
            this.$refs[formName].resetFields()
            this.formShow = false
          }
          location.reload()
        } else {
          this.$message.error('提交失败！')
          return false
        }
      })
    },
    async handleDelete(index, row) {
      let params = {
        id: row.id
      }
      const res = await this.$http.get('/blogAdminRole/deleteBlogAdminRoleById', {params: params})
      if (res.status == 200) {

        // 在删除某个角色后还应该删除该角色下对应用户（可以考虑在用户表里用role_id用级联）
        // ///////////////////////////////////////////////////////////////////////

        this.$message.success('删除成功！')
      }
      location.reload()
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
  // height: 600px;
  margin: 30px auto;

  .box-table {
    margin-top: 20px;
  }

  .box-pagination {
    margin-top: 20px;
  }
}
</style>