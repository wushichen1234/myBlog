<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-input v-model.trim="username" placeholder="请输入用户名称" style="width: 220px; margin-left: 775px;"></el-input>
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
            prop="create_time"
            label="创建日期"
            width="180"
        >
        </el-table-column>
        <el-table-column
            prop="name"
            label="用户名"
            width="180"
        >
        </el-table-column>
        <el-table-column
            prop="password"
            label="密码"
            width="180"
        >
        </el-table-column>
        <el-table-column
            prop="role_name"
            label="用户角色"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.id == 1 ? true : false">编辑
            </el-button>
            <el-popconfirm
                style="margin-left: 10px;"
                title="确定要删除这一行用户信息吗？"
                @confirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button
                  size="mini"
                  type="danger"
                  slot="reference"
                  :disabled="scope.row.id == 1 ? true: false"
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
          title="新增用户信息"
          :visible.sync="formShow"
          width="30%"
          :before-close="handleClose"
      >
        <el-form ref="ruleForm" :model="form" :rules="rules" class="form" label-width="80px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="用户角色" prop="role">
            <el-select v-model="form.role" placeholder="角色名称">
              <el-option
                  v-for="(item,i) in roleList"
                  :key="item.id"
                  :label="item.role_name"
                  :value="item.role_name">
              </el-option>
              <!-- <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option> -->
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
				   <el-button @click="cancelForm('ruleForm')">取 消</el-button>
				   <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
				</span>
      </el-dialog>

      <el-dialog
          title="修改用户信息"
          :visible.sync="formShow1"
          width="30%"
          :before-close="handleClose1"
      >
        <el-form ref="ruleForm1" :model="form1" :rules="rules1" class="form1" label-width="80px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form1.name" style="width: 300px;" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form1.password" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="用户角色" prop="role">
            <el-select v-model="form1.role" placeholder="角色名称">
              <!-- <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option> -->
              <el-option
                  v-for="(item,i) in roleList"
                  :key="item.id"
                  :label="item.role_name"
                  :value="item.role_name">
              </el-option>
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
  name: 'User',
  async created() {
    const res = await this.$http.get('/blogAdminUser/blogAdminUserCount')
    this.tableDataTotal = res.data
    // console.log(this.tableDataTotal)

    let params = {
      currentPage: this.currentPage,
      pageSize: this.pageSize
    }
    const res1 = await this.$http.get('/blogAdminUser/selectBlogAdminUserByPage', {params: params})
    this.tableData = res1.data

    // 获取角色信息显示在用户角色的选择框里
    const res2 = await this.$http.get('/blogAdminRole/selectBlogAdminRole')
    this.roleList = res2.data
  },
  data() {
    var checkName = async (rule, value, callback) => {
      let params = {
        name: value
      }
      const res = await this.$http.get('/blogAdminUser/validateBlogAdminName', {params: params})
      // console.log(res)
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else if (value.length < 3 || value.length > 6) {
        return callback(new Error('长度在 3 到 6 个字符'))
      } else if (res.data == true) {
        return callback(new Error('用户名已存在'))
      } else {
        callback()
      }
    };
    var checkName1 = async (rule, value, callback) => {
      // let params = {
      // 	name: value
      // }
      // const res = await this.$http.get('/blogAdminUser/validateBlogAdminName',{params: params})
      // console.log(res)
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else if (value.length < 3 || value.length > 6) {
        return callback(new Error('长度在 3 到 6 个字符'))
      } else {
        callback()
      }
    };
    return {
      tableData: [],
      tableDataTotal: 0,
      form: {
        name: '',
        password: '',
        role: ''
      },
      form1: {
        name: '',
        password: '',
        role: ''
      },
      rules: {
        // name: [
        // 	{ required: true, message: '请输入用户名', trigger: 'blur' },
        // 	{ min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        // ],
        name: [
          {validator: checkName, trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 6, message: '长度在 6 个字符', trigger: 'blur'}
        ],
        role: [
          {required: true, message: '请选择用户角色', trigger: 'change'}
        ]
      },
      rules1: {
        name: [
          {validator: checkName1, trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 6, message: '长度在 6 个字符', trigger: 'blur'}
        ],
        role: [
          {required: true, message: '请选择用户角色', trigger: 'change'}
        ]
      },
      formShow: false,
      formShow1: false,
      username: '',
      // 初始当前页
      currentPage: 1,
      // 初始页容量
      pageSize: 2,
      // 页容量选择
      pageSizesChoose: [1, 2, 5, 10],
      roleList: []
    }
  },
  methods: {
    aa() {
      console.log('aa')
    },
    // 选择每页多少条的选项卡后（一定有变化）后显示
    async handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      const res1 = await this.$http.get('/blogAdminUser/selectBlogAdminUserByPage', {params: params})
      this.tableData = res1.data
    },
    // 选择当前页后（一定有变化）后显示
    async handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      const res1 = await this.$http.get('/blogAdminUser/selectBlogAdminUserByPage', {params: params})
      this.tableData = res1.data
    },
    // 点击某一行编辑按钮后
    async handleEdit(index, row) {
      // console.log(index, row);
      this.formShow1 = true
      this.form1.name = row.name
      this.form1.password = row.password
      this.form1.role = row.role_name
      this.form1.id = row.id
      // console.log(this.form1)
    },
    // 点击某一行删除按钮后
    async handleDelete(index, row) {
      // console.log(row.id)
      let params = {
        id: row.id
      }
      const res = await this.$http.get('/blogAdminUser/deleteBlogAdminUser', {params: params})
      if (res.status == 200) {
        this.$message.success('删除成功！')
      }
      location.reload()
    },
    addUser() {
      this.formShow = true
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 根据角色名称获得该条角色id，便于获得后面添加时用的参数
          let params = {
            role_name: this.form.role
          }
          const res1 = await this.$http.get('/blogAdminRole/selectBlogAdminRoleIdByName', {params: params})
          this.form.role_id = res1.data

          // console.log(this.form)

          const res = await this.$http.post('/blogAdminUser/insertBlogAdminLogin', this.form)
          // console.log(res)
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
      });
      // this.formShow = false
    },
    cancelForm(formName) {
      this.$refs[formName].resetFields()
      this.formShow = false
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.formShow = false
    },
    submitForm1(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {

          let params = {
            role_name: this.form1.role
          }
          const res1 = await this.$http.get('/blogAdminRole/selectBlogAdminRoleIdByName', {params: params})
          this.form1.role_id = res1.data

          // console.log(this.form1)
          const res = await this.$http.get('/blogAdminUser/updateBlogAdminUser', {params: this.form1})
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
      });
      // this.formShow = false
    },
    cancelForm1(formName) {
      this.$refs[formName].resetFields()
      this.formShow1 = false
    },
    handleClose1() {
      this.$refs.ruleForm1.resetFields()
      this.formShow1 = false
    },
    async search() {
      // console.log(this.username)
      if (this.username == '') {
        this.$message.error('输入为空！')
        return
      }
      let params = {
        name: this.username
      }
      const res = await this.$http.get('/blogAdminUser/selectBlogAdminUserByKeyword', {params: params})
      if (res.status == 200) {
        this.tableData = res.data
        this.tableDataTotal = res.data.length
        this.currentPage = 1
        this.pageSize = 1
        this.pageSizesChoose = [1]
      }
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
  position: relative;

  .box-table {
    margin-top: 20px;
  }

  .box-pagination {
    margin-top: 20px;
  }

}
</style>