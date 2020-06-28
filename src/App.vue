<template>
  <div id="app">
    <!-- <el-scrollbar class="main-scrollbar"> -->
    <router-view style="flex: 1;"/>
    <!-- </el-scrollbar> -->
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'app',
  created() {
    const isPro = Object.is(process.env.NODE_ENV, 'development');
    const baseUrl = isPro ? '/test' : '/api';
    axios.defaults.baseURL = baseUrl;
    console.log(this.$router);
  },
};
</script>

<style lang="scss">
#app, body, html{
  height: 100%;
  margin: 0px;
  scrollbar-width: none;
  display: flex;
  width: 100%;
}
.el-scrollbar__wrap{
  overflow-x: hidden!important;
  margin-bottom: 0px!important;
}
.el-dialog__wrapper::-webkit-scrollbar {display:none}
.el-scrollbar__wrap::-webkit-scrollbar {display:none}
// .main-scrollbar{
//   height: 100%;
//   .el-scrollbar__wrap{
//     margin-bottom: 0px!important;
//     margin-right: 0px!important;
//     scrollbar-width: none;
//     .el-scrollbar__view{
//       height: 100%;
//     }
//   }
// }
</style>
