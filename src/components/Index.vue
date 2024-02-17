<template>
  <div class="index">
    <Header/>

    <router-view :key="$route.fullPath"></router-view>

    <!-- <Pagination /> -->
    <Footer/>

  </div>
</template>

<script>
import Header from './header/Header1.vue'
import Footer from './footer/Footer1.vue'
// import Pagination from './pagination/Pagination.vue'

export default {
  name: 'Index',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>
.index {
  // background-color: yellow;
  background: url('../assets/images/1.jpg') no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}

</style>