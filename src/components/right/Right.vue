<template>

  <div class="home-main-right">

    <div class="home-main-right-top">
      <h1>关于</h1>
      <div style="border-bottom: 1px solid black; margin-top: 10px;"></div>
      <!-- 自我介绍 -->
      <div class="myInfo">
        <!-- 自我介绍左侧图标 -->
        <div class="myInfo-left">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
        <!-- 自我介绍右侧介绍 -->
        <div class="myInfo-right">
          Englishman是一个非常阳光向上的男孩，有许许多多兴趣爱好，也有许许多多小伙伴陪我一起玩，也欢迎大家来到我的网站。
        </div>
      </div>
      <div style="border-bottom: 1px dotted black; margin-top: 10px;"></div>
      <!-- 博文、阅读、评论的布局 -->
      <div class="collect-main">
        <!-- 博文 -->
        <div class="collect-item">
          <!-- 数量 -->
          <div class="collect-item-count">{{ blogTotal }}</div>
          <!-- 内容 -->
          <div class="collect-item-content">博文</div>
        </div>
        <!-- 阅读 -->
        <div class="collect-item">
          <!-- 数量 -->
          <div class="collect-item-count">{{ blogViewTotal }}</div>
          <!-- 内容 -->
          <div class="collect-item-content">阅读</div>
        </div>
        <!-- 评论 -->
        <div class="collect-item">
          <!-- 数量 -->
          <div class="collect-item-count">{{ blogCommentTotal }}</div>
          <!-- 内容 -->
          <div class="collect-item-content">评论</div>
        </div>
      </div>
      <div style="border-bottom: 1px dotted black;"></div>
      <!-- 我的联系方式 -->
      <div class="contact-main">
        <!-- 微信联系方式 -->
        <div class="contact-main-item">
          <i class="iconfont icon-wechat-" style="color: lawngreen; font-size: 20px;"></i>
          <p>微信</p>
          <p>18101930232</p>
        </div>
        <!-- QQ联系方式 -->
        <div class="contact-main-item">
          <i class="iconfont icon-qq" style="color: skyblue; font-size: 20px;"></i>
          <p>QQ</p>
          <p>1423449690</p>
        </div>
      </div>
    </div>

    <div class="home-main-right-bottom">
      <div class="home-main-right-bottom-top">
        <div class="home-main-right-bottom-item" style="background-color: #fff;" ref="hotblog" @click="findHotBlog">
          <i class="el-icon-reading"></i>热门文章
        </div>
        <div class="home-main-right-bottom-item" ref="timeblog" @click="findTimeBlog">
          <i class="el-icon-notebook-1"></i>最新文章
        </div>
        <div class="home-main-right-bottom-item" ref="randblog" @click="findRandBlog">
          <i class="el-icon-notebook-2"></i>随机文章
        </div>
      </div>
      <div class="home-main-right-bottom-center" v-for="(item,i) in blogHotList" :key="i" v-if="blogHotListShow"
           @click="turnToDetail(item)">
        {{ item.blog_title }}
      </div>
      <div class="home-main-right-bottom-center" v-for="(item,j) in blogTimeList" :key="j" v-if="blogTimeListShow"
           @click="turnToDetail(item)">
        {{ item.blog_title }}
      </div>
      <div class="home-main-right-bottom-center" v-for="(item,i) in blogRandList" :key="i" v-if="blogRandListShow"
           @click="turnToDetail(item)">
        {{ item.blog_title }}
      </div>
    </div>

    <div class="home-main-right-last">
      <h1>本站介绍</h1>
      <div style="border-bottom: 1px solid black; margin-top: 10px;"></div>
      <div class="home-main-right-last-info">
        <p>建站时间：2022.10</p>
        <p>
          前端技术：
        <ul style="list-style: none; text-indent: 2em;">
          <li>开发框架：Vue2</li>
          <li>开发框架： Vue-Cli4x</li>
          <li>组件库：Element-UI</li>
          <li>语法扩展：Less</li>
          <li>打包工具：WebPack</li>
          <li>代码规范：ESLint、Prettier</li>
        </ul>
        </p>
        <p>
          后端技术：
        <ul style="list-style: none; text-indent: 2em;">
          <li>主语言：Java</li>
          <li>开发框架： Springboot</li>
          <li>组件库：Element-UI</li>
          <li>数据库：MySQL</li>
          <li>文件存储：云服务（宝塔面板）</li>
        </ul>
        </p>
        <p>
          本站技术：本站记录个人工作开发中遇到的问题以及解决方法
        </p>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Right',
  async created() {
    const {data: res} = await this.$http.get('/blogDetail/selectBlogByIsHot')
    this.blogHotList = res
    // console.log(this.blogHotList)

    const {data: res1} = await this.$http.get('/blogDetail/selectBlogByRand')
    this.blogRandList = res1
    // console.log(this.blogRandList)

    const {data: res2} = await this.$http.get('/blogDetail/selectBlogByTime')
    this.blogTimeList = res2
    // console.log(this.blogTimeList)

    // 博文总数
    const res3 = await this.$http.get('/blogDetail/blogTotal')
    // console.log(res3)
    this.blogTotal = res3.data
    // 阅读（浏览）总数
    const res4 = await this.$http.get('/blogDetail/selectBlogViewCount')
    // console.log(res4)
    this.blogViewTotal = res4.data
    // 评论总数
    const res5 = await this.$http.get('/blogDetail/selectBlogCommentCount')
    // console.log(res5)
    this.blogCommentTotal = res5.data

  },
  data() {
    return {
      // 热门文章
      blogHotList: [],
      // 随机文章
      blogRandList: [],
      // 最新文章
      blogTimeList: [],
      // 热门文章显示
      blogHotListShow: true,
      // 随机文章显示
      blogRandListShow: false,
      // 最新文章显示
      blogTimeListShow: false,
      // 博文总数
      blogTotal: 0,
      // 阅读（浏览）总数
      blogViewTotal: 0,
      // 评论总数
      blogCommentTotal: 0
    }
  },
  methods: {
    findHotBlog() {
      // console.log('热门文章')
      this.blogHotListShow = true
      this.blogRandListShow = false
      this.blogTimeListShow = false
      this.$refs.hotblog.style.backgroundColor = '#fff'
      this.$refs.randblog.style.backgroundColor = '#F5F5F5'
      this.$refs.timeblog.style.backgroundColor = '#F5F5F5'
    },
    findTimeBlog() {
      // console.log('最新文章')
      this.blogHotListShow = false
      this.blogRandListShow = false
      this.blogTimeListShow = true
      this.$refs.hotblog.style.backgroundColor = '#F5F5F5'
      this.$refs.randblog.style.backgroundColor = '#F5F5F5'
      this.$refs.timeblog.style.backgroundColor = '#fff'
    },
    findRandBlog() {
      // console.log('随机文章')
      this.blogHotListShow = false
      this.blogRandListShow = true
      this.blogTimeListShow = false
      this.$refs.hotblog.style.backgroundColor = '#F5F5F5'
      this.$refs.randblog.style.backgroundColor = '#fff'
      this.$refs.timeblog.style.backgroundColor = '#F5F5F5'
    },
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
    }
  }
}
</script>

<style lang="less" scoped>
.home-main-right {
  width: 22%;
  // height: 1000px;
  // background-color: #FFFFCD;
  margin-top: 30px;
  padding-left: 10px;
  padding-right: 10px;

  .home-main-right-top {
    background-color: #F5F5F5;
  }

  h1 {
    color: #00FFFF;
    font-size: 20px;
  }

  .myInfo {
    display: flex;
    justify-content: space-around;
    // background-color: aqua;
    margin-top: 10px;

    .myInfo-left {
      font-size: 10px;
    }

    .myInfo-right {
      margin-left: 20px;
    }
  }

  .collect-main {
    display: flex;
    justify-content: space-around;

    .collect-item {
      width: 70px;
      height: 70px;
      // background-color: red;
      margin-left: 20px;
      text-align: center;

      .collect-item-count {
        margin-top: 15px;
        // margin-left: 15px;

      }

      // .collect-item-content {
      //   // margin-left: 15px;
      // }
    }

    .collect-item:hover {
      // background-color: #F5F5F5;
      cursor: pointer;
    }
  }

  .contact-main {
    // background-color: palevioletred;
    display: flex;
    justify-content: space-around;

    .contact-main-item {
      width: 120px;
      height: 80px;
      // background-color: green;
      text-align: center;
      margin-top: 15px;
    }
  }

  .home-main-right-bottom {
    .home-main-right-bottom-top {
      margin-top: 20px;
      background-color: #F5F5F5;
      display: flex;
      justify-content: space-between;

      .home-main-right-bottom-item {
        width: 112px;
        height: 60px;
        line-height: 60px;
        // background-color: red;
        text-align: center;
        // margin-left: 20px;
      }

      .home-main-right-bottom-item:hover {
        cursor: pointer;
        background-color: #fff;
      }
    }

    .home-main-right-bottom-center {
      line-height: 50px;
      background-color: #fff;
      text-indent: 1em;
      border-bottom: 1px solid #F5F5F5;
    }

    .home-main-right-bottom-center:hover {
      cursor: pointer;
    }
  }

  .home-main-right-last {
    background-color: #F5F5F5;
    margin-top: 20px;
    // height: 500px;
    .home-main-right-last-info {
      margin-top: 10px;
      // background-color: red;
    }
  }

}


</style>