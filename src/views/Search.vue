<template>
  <el-container>
    <el-header>
      <CMDHeader></CMDHeader>
    </el-header>
    <el-main>
      <div class="search-bar-wapper">
        <div><h1>{{$t('page.index.title')}}</h1></div>
        <SelectSearchBar v-on:currentSelect="hendleSelectCmd($event)"/>
      </div>
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>
<script>
import SelectSearchBar from '@/components/search/SelectSearchBar.vue';
import CMDHeader from '@/components/header/Header.vue';

export default {
  name: 'search',
  components: { SelectSearchBar, CMDHeader },
  methods: {
    hendleSelectCmd(cid) {
      this.$router.push(`/cmds/${cid}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-main, .el-container {
  height: 100%;
}
.el-main{
  display: flex;
  justify-content:center;
}
.search-bar-wapper{
  /* height: 100%; */
  width: 50%;
  padding-bottom: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
