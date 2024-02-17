<template>
  <div class="block">
    <el-pagination
        layout="prev,pager,next"
        :total="total * 10"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      required: true
    }
  },
  created() {
    // console.log(this.total)
  },
  methods: {
    handleCurrentChange(currentPage) {
      // console.log(currentPage)
      // console.log(this.$route.path)
      if (this.$route.path == '/home') {
        this.$emit('home', currentPage)
      } else if (this.$route.path == '/life') {
        this.$emit('life', currentPage)
      } else if (this.$route.path == '/love') {
        this.$emit('love', currentPage)
      } else if (this.$route.path == '/tech') {
        this.$emit('tech', currentPage)
      } else if (this.$route.path == '/memory') {
        this.$emit('memory', currentPage)
      } else if (this.$route.path == '/search') {
        this.$emit('search', currentPage)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.block {
  // height: 200px;
  // background-color: antiquewhite;
  margin-top: 20px;
  position: relative;

  .el-pagination {
    // margin-left: 760px;
    // position: absolute;
    // right: 10%;
    text-align: center;
  }
}

</style>