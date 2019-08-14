<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <div class="search-bar-wapper">
        <div><h1>忘记命令怎么使用了(っ °Д °;)っ让我来帮帮你吧[]~(￣▽￣)~*</h1></div>
        <SelectSearchBar v-on:currentSelect="hendleSelectCmd($event)"/>
      </div>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
import SelectSearchBar from '@/components/search/SelectSearchBar.vue';

export default {
  name: 'search',
  components: { SelectSearchBar },
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
