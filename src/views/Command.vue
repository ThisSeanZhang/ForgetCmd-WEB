<template>
  <el-container>
    <el-header>
      <div class="search-bar"><SelectSearchBar/></div>
    </el-header>
    <el-main></el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
// import {
//   value as Wapper, watch, onMounted,
// } from 'vue-function-api';
import {
  value as Wapper, watch,
} from 'vue-function-api';
import SelectSearchBar from '@/components/search/SelectSearchBar.vue';
// import CommandInfo from '@/components/command/CommandInfo.vue';
export default {
  components: { SelectSearchBar },
  beforeRouteUpdate (to, from, next) {
    // this.setCurrentPid(to.params.pid)
    console.log(to, from, next);
    next();
  },
  setup(_,{ root }) {
    // beforeRouteUpdate((to, from, next) => {
    //   // this.setCurrentPid(to.params.pid)
    //   console.log(to, from, next);
    //   next();
    // });
    watch(() => root,
    (o, n) => {
      console.log(o);
      console.log(n)
    })
    return {};
  },
};
</script>
<style style="scss" scoped>
.search-bar{
  width: 50%;
}
.el-header{
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
}
.el-main, .el-footer {
  width: 700px;
  /* margin: auto; */
}
.el-main, .el-container {
  height: 100%;
}
.main-search {
  width: 100%!important;
  background-color: aquamarine;
}
</style>
