<template>
  <div class="header">
    <!-- 博客个人标题 -->
    <h1 @click="returnToIndex">Englishman</h1>
    <!-- 博客导航条 -->
    <div class="header-nav">
      <div v-for="(item,i) in navList" :key="i">
        <router-link :to='item.cate_path'>{{ item.cate_name }}</router-link>
      </div>
    </div>
    <!-- 搜索栏 -->
    <el-input v-model.trim="searchContent" placeholder="请输入内容" class="searchInput"></el-input>
    <el-button type="primary" icon="el-icon-search" class="searchButton" @click="searchByKeyword"></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchContent: '',
      // 导航栏信息
      navList: []
    }
  },
  async created() {
    const {data: res} = await this.$http.get('/blogCate/selectBlogCate')
    this.navList = res
    // console.log(this.navList)
  },
  methods: {
    returnToIndex() {
      this.$router.push('/')
    },
    async searchByKeyword() {
      // console.log('根据关键字查询')
      let params = {
        keyword: this.searchContent
      }
      if (this.searchContent == '') {
        return
      }

      this.$router.push({
        path: '/search',
        query: {keyword: this.searchContent}
      })

      this.searchContent = ''
      // location.reload()
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 80px;
  background-color: #666666;
  display: flex;

  h1 {
    line-height: 80px;
    margin-left: 100px;
  }

  h1:hover {
    cursor: pointer;
  }

  .header-nav {
    margin-left: 100px;
    line-height: 80px;
    display: flex;

    div {
      width: 120px;
      margin-right: 20px;
      // background-color: green;
      text-align: center;

      a {
        font-size: 20px;
        color: #fff;
        text-decoration: none;
      }

      .router-link-active {
        color: red;
      }
    }

    div:hover {
      background-color: grey;
      cursor: pointer;
      border-bottom: 1px solid #fff;
    }

  }

  .searchInput {
    width: 220px;
    line-height: 80px;
    margin-left: 100px;
  }

  .el-button {
    // width: 40px;
    height: 40px;
    margin-left: 5px;
    margin-top: 20px;

    // .el-icon-search {

    // }
  }
}
</style>