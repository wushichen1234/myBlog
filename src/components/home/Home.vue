<template>
  <div>
    <div class="home-main">
      <!-- 首页左侧（主要内容）区域 -->
      <div class="home-main-left">
        <div class="home-main-left-item" @click="turnToDetail(item)" v-for="(item,i) in blogDetailList" :key="i">
          <div class="left">
            <!-- <img src="../../assets/images/avatar.jpg"> -->
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
    <Pagination :total="total" @home="getCurrentPage"/>
  </div>
</template>

<script>
import Right from '../../components/right/Right.vue'
import Pagination from '../pagination/Pagination.vue'

export default {
  name: 'Home',
  components: {
    Right,
    Pagination
  },
  async created() {
    // const {data:res} = await this.$http.get('/blogDetail/selectBlog')
    // this.blogDetailList = res
    // console.log(this.blogDetailList)
    const {data: res} = await this.$http.get('/blogDetail/blogTotal')
    this.totalResult = res

    this.getBlogDetailList(0)
  },
  data() {
    return {
      blogDetailList: [],
      totalResult: 0
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
      // console.log(item)
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
        currentPage: currentPage
      }
      const {data: res1} = await this.$http.get('/blogDetail/selectBlogByPage', {params: params})
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
.home-main {
  display: flex;
  // justify-content: space-around;
}

.home-main-left {
  width: 60%;
  // height: 500px;
  // background-color: #FFF;
  // background-color: green;
  margin-top: 30px;
  margin-left: 100px;
  margin-right: 40px;

  .home-main-left-item {
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

  .home-main-left-item:last-child {
    margin-bottom: 0;
  }

  .home-main-left-item:hover {
    cursor: pointer;
  }
}


</style>