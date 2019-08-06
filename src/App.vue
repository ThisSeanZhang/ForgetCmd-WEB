<template>
  <div id="app">
    <el-container>
    <el-header>Header</el-header>
    <el-main><router-view style="height:100%;"/></el-main>
    <el-footer>Footer</el-footer>
  </el-container>
  </div>
</template>
<script>
export default {
  name: 'app',
};
</script>

<style>
#app, body, html{
  height: 100%;
  margin: 0px;
}
.el-main, .el-container{
  height: 100%;
}
</style>
