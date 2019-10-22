<template>
  <div id="app">
    <el-scrollbar class="main-scrollbar">
      <router-view/>
    </el-scrollbar>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'app',
  created() {
    const isPro = Object.is(process.env.NODE_ENV, 'development');
    const baseUrl = isPro ? 'api' : '/';
    axios.defaults.baseURL = baseUrl;
  },
};
</script>

<style lang="scss">
#app, body, html{
  height: 100%;
  margin: 0px;
}
.el-scrollbar__wrap::-webkit-scrollbar {display:none}
.main-scrollbar{
  height: 100%;
  .el-scrollbar__wrap{
    margin-bottom: 0px!important;
    margin-right: 0px!important;
    .el-scrollbar__view{
      height: 100%;
    }
  }
}
</style>
