<template>
  <div id="app">
    <Index v-if="this.$route.path.indexOf('admin') == -1"/>
    <Index1 v-else/>
  </div>
</template>

<script>

import Index from './components/Index.vue'
import Index1 from './components/admin/Index.vue'
// import Login from './components/admin/login/Login.vue'

export default {
  name: 'app',
  components: {
    Index,
    Index1
  },
  created() {
    // console.log(this.$route.path.indexOf('admin')!==-1)
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html, body, #app {
  /* background-color: #CCC; */
  height: 100%;
}
</style>
