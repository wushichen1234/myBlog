<template>
  <div>
    <div class="detail-main">
      <!-- 详情页左侧（主要内容）区域 -->
      <div class="detail-main-left">
        <!-- 文章详情区 -->
        <div class="detail-main-top">
          <!-- 文章标题 -->
          <h1>{{ params.blog_title }}</h1>
          <!-- 文章日期、评论数、浏览数 -->
          <div class="detail-main-top-detail">
            <span><i class="iconfont icon-calendar"></i>{{ params.blog_createtime }}</span><span>|</span>
            <span><i class="iconfont icon-liuyan"></i>{{ params.blog_commentcount }}条评论</span><span>|</span>
            <span><i class="iconfont icon-open-eyes"></i>{{ params.blog_viewcount }} views</span><span>|</span>
            <span><i class="iconfont icon-leibie"></i>{{ params.blog_type }}</span>
          </div>
          <!-- 文章内容 -->
          <div class="detail-main-top-content" v-html="content"></div>
          <!-- <div class="detail-main-top-content">
            <p>学会如何去爱？这篇文章更多的记录我在情感上的成长，学会了怎么样去爱一个人，知道自己想要什么，女人和男人是有区别的，女性是需要呵护与疼的。自己确实很多地方做的不好，记录在小昔爱情录中。</p>
            <p>最近开车有听《后来》这首歌曲，有几句是后来我总算学会了如何去爱，有些人一旦错过就不在。以前听这首歌没多大感觉，现在听会有一些伤感。我最喜欢的一首歌《透明》，每次听都挺有感觉的。</p>
            <p>感觉今年在情感方面成长很多，要学会尊重女性，自己不要那么自私，只考虑自己的安全感，更多应给予女人安全感。今年也没有接触女性，更多的是在沉淀自己，今年会偶尔有一些伤感。男人努力赚钱还不是为了一个家，有个懂你互相理解、互相依靠的人可遇不可求，需要时间去了解彼此。我会感觉爱情比事业更为重要，有一些遗憾，有一个心动的人是很难遇到的，不管结果如何，努力了就不会留遗憾，遵从自己内心的感受。如果你看到这篇文章，放心啦我已经很佛系了，只是记录自己的情感上的成长，对你也是很感恩的。</p>
            <p>人生只有一次，不想自己留下遗憾。如果说学校恋爱是单纯的，那我去年遇到的女孩就是心动，我们现在很少联系，最近突然顿悟了好多，记录下自己的不足以后改正，我发现我进入不了你的世界了，好难过。</p>
            <p>我们现在有彼此的微信，我的原则是不能影响到你的生活。我写过一篇文章，不能多看，看了又会想起很多，确实对你有好感。我现在也很佛系，你说你答应我，你考完试和我见面一次，如果你肯当然很开心哈，如果你不肯我也会尊重你的，其实就是简简单单聊聊天说说话，开心的见一次面，毕竟很久不见。朋友之间见一面，不会有非分之想，一切交给时间。想见面，是想正式给你道歉一下，为之前不成熟的行为。</p>
            <p>我们认识时间不长，我恋爱不多接触女孩子很少，第二次见面好像花了将近500，一副没见过世面的我，花这么多，我的天，因为我平时很少花钱。现在一想，以后如果是喜欢的女孩，花多少都是值得的，毕竟有个人和你一起生活，一起面对很多，彼此信任。</p>
          </div> -->
        </div>
        <hr/>
        <!-- 文章评论区 -->
        <div class="detail-main-bottom">
          <p>添加留言</p>
          <el-input
              type="textarea"
              class="textarea"
              :rows="5"
              placeholder="随便说一句吧"
              v-model.trim="commentTextarea"
              :maxlength="100"
              resize="none"
          >
          </el-input>
          <el-input
              v-model.trim="nickName"
              placeholder="请输入你的昵称"
              class="nichen"
              :maxlength="10"
              prefix-icon="iconfont icon-nicheng"
          >
          </el-input>
          <div class="hb">
            <h1>本文共{{ params.blog_commentcount }}条评论</h1>
            <el-button type="primary" @click="submitComment">立即留言</el-button>
          </div>
          <div style="height: 1px; background-color: #CCC;"></div>
          <div class="content-item" v-for="(item,i) in commentList" :key="i">
            <div class="content-item-top">
              <div class="content-item-top-detail">
                <i><span style="color: red;">{{ item.nickname }}</span>&nbsp;<span style="color: #CCC;">{{ item.create_time }}</span></i><br/>
                <span>{{ item.blog_comment }}</span>
              </div>
            </div>
            <div class="content-item-bottom">
              <el-button type="danger" size="mini">回复</el-button>
            </div>
          </div>
          <!-- 	<div class="content-item">
              <div class="content-item-top">
                <div class="content-item-top-detail">
                  <i><span style="color: red;">代码骑士</span>&nbsp;<span style="color: #CCC;">2022/09/17 12:57</span></i><br />
                  <span>没想到这么多年了，你的网站还在更新。</span>
                </div>
              </div>
              <div class="content-item-bottom">
                <el-button type="danger" size="mini">回复</el-button>
              </div>
            </div>
            <div class="content-item">
              <div class="content-item-top">
                <div class="content-item-top-detail">
                  <i><span style="color: red;">代码骑士</span>&nbsp;<span style="color: #CCC;">2022/09/17 12:57</span></i><br />
                  <span>没想到这么多年了，你的网站还在更新。</span>
                </div>
              </div>
              <div class="content-item-bottom">
                <el-button type="danger" size="mini">回复</el-button>
              </div>
            </div> -->

        </div>
      </div>
      <!-- 详情页右侧区域 -->
      <Right/>
    </div>
  </div>
</template>

<script>
import Right from '../../components/right/Right.vue'

export default {
  name: 'Detail',
  components: {
    Right
  },
  async created() {
    // vue中使用params传参，刷新页面后params参数丢失
    // 配合sessionStorage实现刷新页面后数据不丢失，使用sessionStorage，页面关闭后自动删除
    let params = ''
    if (this.$route.params.item) {
      // 浏览某篇博客浏览数加一
      let params1 = {
        id: this.$route.params.item.id
      }
      const res = await this.$http.get('/blogDetail/updateBlogViewCount', {params: params1})
      if (res.status == 200) {
        this.$route.params.item.blog_viewcount++
      }

      params = this.$route.params.item
      sessionStorage.setItem('paramsData', JSON.stringify(this.$route.params.item))
    } else {
      params = JSON.parse(sessionStorage.getItem('paramsData'))
    }

    // console.log(this.$route.params.item)

    // let paramsData = sessionStorage.getItem('paramsData')
    // let params = ''
    // // console.log(paramsData)
    // if(paramsData){
    // 	params = JSON.parse(sessionStorage.getItem('paramsData'))
    // }else{
    // 	params = this.$route.params.item
    // 	sessionStorage.setItem('paramsData',JSON.stringify(params))
    // }
    this.params = params
    // console.log(this.params.id)

    let params1 = {
      blogDetailId: this.params.id
    }
    const {data: res} = await this.$http.get('/blogContent/selectBlogContent', {params: params1})
    this.content = res.blog_content

    let params2 = {
      id: this.params.id
    }
    const {data: res1} = await this.$http.get('/blogComment/selectBlogComment', {params: params2})
    this.commentList = res1

  },
  data() {
    return {
      params: '',
      content: '',
      commentList: '',
      commentTextarea: '',
      nickName: ''
    }
  },
  methods: {
    async submitComment() {
      if (this.commentTextarea == '' || this.nickName == '') {
        this.$message.error('留言或昵称未填！')
        return
      }
      let data = {
        blog_detail_id: this.params.id,
        blog_comment: this.commentTextarea,
        nickname: this.nickName
      }
      const res = await this.$http.post('/blogComment/insertBlogComment', data)
      if (res.status == 200) {
        this.$message({
          type: 'success',
          message: '留言成功！'
        })
        let params = {
          id: this.params.id
        }
        this.$http.get('/blogDetail/updateBlogCommentCount', {params: params})
        let obj = JSON.parse(sessionStorage.getItem('paramsData'))
        obj.blog_commentcount++;
        sessionStorage.setItem('paramsData', JSON.stringify(obj))
        setTimeout(() => {
          location.reload()
        }, 1000)
        // sessionStorage.getItem()
      }


      // console.log(res)
      // console.log(this.commentTextarea)
      // console.log(this.nickName)
    }
  }
}
</script>

<style lang="less" scoped>
.detail-main {
  display: flex;

  .detail-main-left {
    width: 60%;
    background-color: #FFF;
    margin-top: 30px;
    margin-left: 100px;
    margin-right: 40px;

    .detail-main-top {
      // height: 500px;
      // background-color: aqua;
      // 解决上边距重叠问题：给父元素添加overflow: hidden
      overflow: hidden;

      h1 {
        margin-top: 30px;
        text-align: center;
        font-weight: 500;
        font-size: 26px;
      }

      .detail-main-top-detail {
        margin-top: 10px;
        line-height: 25px;
        height: 25px;
        // background-color: red;
        text-align: center;

        span {
          margin-left: 20px;
          color: #CCC;

          i {
            margin-right: 5px;
          }
        }
      }

      .detail-main-top-content {
        // height: 300px;
        // background-color: greenyellow;
        padding: 0 20px;
        margin-top: 20px;
      }

    }

    .detail-main-bottom {
      // height: 300px;
      // background-color: skyblue;
      padding: 0 20px;
      overflow: hidden;

      p {
        margin-top: 20px;
        color: skyblue;
      }

      .textarea {
        margin-top: 10px;
      }

      .nichen {
        margin-top: 10px;
      }

      .hb {
        // height: 100px;
        margin-top: 10px;
        margin-bottom: 10px;
        // background-color: aliceblue;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
          font-size: 16px;
        }
      }

      .content-item {
        // height: 200px;
        // background-color: antiquewhite;
        // margin-bottom: 20px;
        border-bottom: 1px dotted #CCC;

        .content-item-top {
          height: 100px;
          // background-color: blanchedalmond;
          padding: 0 40px;
          overflow: hidden;

          .content-item-top-detail {
            margin-top: 25px;
          }
        }

        // .content-item-top:first-child{
        // 	border-top: 2px dotted #CCC;
        // }
        .content-item-bottom {
          height: 50px;
          // background-color: aquamarine;
          // border-bottom: 2px dotted #CCC;
          .el-button {
            margin-left: 815px;
          }
        }
      }

    }
  }
}
</style>
<!--  ----------------------------------------------------------------------------------------博文全局样式（后面可能要改） -->
<style lang="less">
.detail-main-top-content p {
  text-indent: 2em;
  margin-bottom: 20px;

  img {
    width: 400px;
    display: block;
    margin: 0 auto;
  }
}
</style>