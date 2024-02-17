<template>
  <div>
    <div class="search-main">
      <!-- 首页左侧（主要内容）区域 -->
      <div class="search-main-left">
        <!-- 搜索结果标签 -->
        <div class="searchResultCard">
          <div class="searchCenter">
            <h1>搜索结果：{{ keyword }}</h1>
          </div>
        </div>
        <div class="search-main-left-item" @click="turnToDetail(item)" v-for="(item,i) in blogDetailList" :key="i">
          <div class="left">
            <!-- <img src="../../assets/images/avatar.jpg"> -->
            <!-- <img :src="item.blog_coverphoto"> -->
            <img :src="$http.defaults.baseURL + '/upload/' + item.blog_coverphoto" />
          </div>
          <div class="right">
            <h1>{{ item.blog_title }}</h1>
            <p>{{ item.blog_preface }}</p>
            <div class="right-info">
              <i class="iconfont icon-time"></i><span>{{ item.blog_createtime }}</span>
              <i class="iconfont icon-liuyan"></i><span>{{ item.blog_commentcount }}</span>
              <i class="iconfont icon-open-eyes"></i><span>{{ item.blog_viewcount }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 首页右侧区域 -->
      <Right/>
    </div>
    <Pagination :total="total" @search="getCurrentPage"/>
  </div>
</template>

<script>
import Right from '../right/Right.vue'
import Pagination from '../pagination/Pagination.vue'

export default {
  name: 'SearchList',
  components: {
    Right,
    Pagination
  },
  async created() {

    this.keyword = this.$route.query.keyword

    let params = {
      keyword: this.keyword
    }
    const {data: res} = await this.$http.get('/blogDetail/selectBlogByKeywordTotal', {params: params})
    this.totalResult = res
    // console.log(this.totalResult)

    this.getBlogDetailList(0)

  },
  data() {
    return {
      blogDetailList: [],
      totalResult: 0,
      // 搜索的关键字
      keyword: ''
    }
  },
  computed: {
    total() {
      return Math.ceil(this.totalResult / 5)
    }
  },
  methods: {
    turnToDetail(item) {
      // console.log('跳转到博客详情页面')
      this.$router.push({
        name: 'Detail',
        query: {
          id: item.id
        },
        params: {
          item: item
        }
      })
    },
    async getBlogDetailList(currentPage) {
      let params = {
        currentPage: currentPage,
        keyword: this.keyword
      }
      const {data: res1} = await this.$http.get('/blogDetail/selectBlogByKeyword', {params: params})
      this.blogDetailList = res1

    },
    getCurrentPage(currentPage) {
      // console.log(currentPage)
      this.getBlogDetailList((currentPage - 1) * 5)
    }
  }
}
</script>

<style lang="less" scoped>
.search-main {
  display: flex;
  // justify-content: space-around;
}

.search-main-left {
  width: 60%;
  // height: 500px;
  // background-color: #FFF;
  // background-color: green;
  margin-top: 30px;
  margin-left: 100px;
  margin-right: 40px;

  .searchResultCard {
    width: 50%;
    height: 60px;
    // background-color: #F5F5F5;
    background-color: #FF9912;
    // box-shadow:0px 6px 20px rgba(0, 0, 0, 0.19);
    margin-bottom: 20px;
    position: relative;

    &:hover {
      cursor: pointer;
      box-shadow: 0px 6px 20px #FF9912;
      // box-shadow: 0px 12px 36px rgba(0,0,0,.1);
      // transform: translateX(10px);
    }

    .searchCenter {
      width: 50%;
      height: 50%;
      // line-height: 100px;
      // text-align: center;
      background-color: #fff;
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      // 设置文字水平垂直居中
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .search-main-left-item {
    // width: 100px;
    height: 200px;
    // line-height: 150px;
    background-color: #F5F5F5;
    border-radius: 10px;
    margin-bottom: 20px;
    position: relative;
    display: flex;
    // justify-content: space-around;
    .left {
      width: 200px;
      // background-color: red;
      margin-left: 100px;

      img {
        position: absolute;
        top: 15%;
        width: 150px;
        height: 150px;
        // border-radius: 15px;
      }
    }

    .right {
      width: 500px;
      height: 150px;
      margin-top: 40px;
      // background-color: skyblue;
      margin-left: 80px;

      h1 {
        font-size: 20px;
      }

      p {
        margin-top: 30px;
      }

      .right-info {
        font-size: 13px;
        color: #808A87;
        margin-top: 30px;

        span {
          margin-right: 10px;
        }
      }
    }
  }

  .search-main-left-item:last-child {
    margin-bottom: 0;
  }

  .search-main-left-item:hover {
    cursor: pointer;
  }
}


</style>