<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-popconfirm
          style="margin-left: 10px;"
          title="确定要清空评论信息吗？"
          @confirm="clearComment"
      >
        <el-button type="primary" size="mini" slot="reference" style="height: 40px; font-size: 13px;">清空评论</el-button>
      </el-popconfirm>

      <el-input v-model.trim="comment" placeholder="请输入博客标题" style="width: 220px; margin-left: 775px;"></el-input>
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
            prop="blog_title"
            label="博客标题"
            width="180"
        >
        </el-table-column>
        <el-table-column
            prop="blog_comment"
            label="评论内容"
            width="180"
        >
        </el-table-column>
        <el-table-column
            prop="nickname"
            label="评论人昵称"
            width="180"
        >
        </el-table-column>
        <el-table-column
            prop="create_time"
            label="创建时间"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <!-- style="margin-left: 20px;" -->
            <el-popconfirm
                style="margin-left: 10px;"
                title="确定要删除这一行评论信息吗？"
                @confirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button
                  size="mini"
                  type="danger"
                  slot="reference">删除
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

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  async created() {
    const res = await this.$http.get('/blogAdminComment/blogAdminCommentCount')
    this.tableDataTotal = res.data

    let params = {
      currentPage: this.currentPage,
      pageSize: this.pageSize
    }
    const res1 = await this.$http.get('/blogAdminComment/selectBlogAdminCommentByPage', {params: params})
    this.tableData = res1.data
  },
  data() {
    return {
      comment: '',
      tableData: [
        {
          blog_title: '学会如何去爱？',
          blog_comment: '没想到这么多年了，你的网站还在更新1。',
          nickname: '代码骑士1',
          create_time: '2022-10-23 11:03:49'
        },
        {
          blog_title: 'xm',
          blog_comment: 'haha',
          nickname: 'xiaoming',
          create_time: '2022-11-7 11:46:00'
        },
      ],
      tableDataTotal: 0,
      // 初始当前页
      currentPage: 1,
      // 初始页容量
      pageSize: 5,
      // 页容量选择
      pageSizesChoose: [1, 2, 5, 10]
    }
  },
  methods: {
    async clearComment() {
      // const res = await this.$http.delete('/blogAdminComment/deleteBlogAdminCommentAll')
      // console.log(res)

      // 清空所有评论
      const res = await this.$http.delete('/blogAdminComment/deleteBlogAdminCommentAll')
      // console.log('清空所有评论')
      if (res.status == 200) {
        await this.$http.get('/blogAdminComment/updateBlogAdminCommentAll')
        this.$message.success('清空成功！')
        location.reload()
      }

    },
    async search() {
      // console.log('查询' + this.comment)
      if (this.comment == '') {
        this.$message.error('输入内容为空！')
        return
      }
      let params = {
        keyword: this.comment
      }
      const res = await this.$http.get('/blogAdminComment/selectBlogAdminCommentByKeyWord', {params: params})
      if (res.status == 200) {
        this.tableDataTotal = res.data.length
        this.currentPage = 1
        this.pageSize = 1
        let params1 = {
          keyword: this.comment,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        const res1 = await this.$http.get('/blogAdminComment/selectBlogAdminCommentByKeyWordAndPage', {params: params1})
        this.tableData = res1.data
      }
    },
    // 每行评论信息点击编辑后的行为
    // handleEdit(index, row) {
    //     console.log(index, row);
    // },
    // 每行评论信息点击后删除的行为
    async handleDelete(index, row) {

      // 若先删除评论信息后，再修改对应评论区的评论数量的话，根据写的sql语句，可能无法修改评论数量
      // 所以还是应该先修改评论区的评论数量再删除评论信息

      // 1. 先修改对应博文内容下的评论区数量
      let params = {
        blog_detail_id: row.blog_detail_id
      }
      const res = await this.$http.get('/blogAdminComment/updateBlogAdminDetailCommentCount', {params: params})
      if (res.status == 200) {
        // 2. 再删除该条对应的评论信息
        let params1 = {
          id: row.id
        }
        this.$http.get('/blogAdminComment/deleteBlogAdminCommentById', {params: params1})
      }
      location.reload()

      // 1. 先删除该条对应的评论信息
      //    let params = {
      // 	id: row.id
      // }
      // const res = await this.$http.get('/blogAdminComment/deleteBlogAdminCommentById',{params: params})
      // if(res.status == 200){
      // 	// 2. 再修改对应博文内容下的评论区评论数量
      // 	let params1 = {
      // 		blog_detail_id: row.blog_detail_id
      // 	}
      // 	const res1 = await this.$http.get('/blogAdminComment/updateBlogAdminDetailCommentCount',{params: params1})
      // 	// console.log(res1)
      // 	// let obj = JSON.parse(sessionStorage.getItem('paramsData'))
      // 	// obj.blog_commentcount--;
      // 	// sessionStorage.setItem('paramsData',JSON.stringify(obj))
      // 	this.$message.success('删除成功！')
      // }
      // location.reload()
    },
    // 选择每页多少条的选项卡后（一定有变化）后显示

    // 补充？ 判断有没有搜索的关键字参数来判断怎样的分页方式

    async handleSizeChange(val) {
      this.pageSize = val
      if (this.comment == '') {
        let params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        const res1 = await this.$http.get('/blogAdminComment/selectBlogAdminCommentByPage', {params: params})
        this.tableData = res1.data
      } else {
        let params1 = {
          keyword: this.comment,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        const res1 = await this.$http.get('/blogAdminComment/selectBlogAdminCommentByKeyWordAndPage', {params: params1})
        this.tableData = res1.data
      }
    },
    // 选择当前页后（一定有变化）后显示
    async handleCurrentChange(val) {
      this.currentPage = val
      if (this.comment == '') {
        let params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        const res1 = await this.$http.get('/blogAdminComment/selectBlogAdminCommentByPage', {params: params})
        this.tableData = res1.data
      } else {
        let params1 = {
          keyword: this.comment,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        const res1 = await this.$http.get('/blogAdminComment/selectBlogAdminCommentByKeyWordAndPage', {params: params1})
        this.tableData = res1.data
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

  .box-table {
    margin-top: 20px;
  }

  .box-pagination {
    margin-top: 20px;
  }
}
</style>