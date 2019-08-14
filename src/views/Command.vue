<template>
  <el-container>
    <el-header>
      <div class="search-bar"><SelectSearchBar v-on:currentSelect="hendleSelectCmd($event)"/></div>
    </el-header>
    <el-main><CommandInfo :cmd="cmd" /></el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
import SelectSearchBar from '@/components/search/SelectSearchBar.vue';
import CommandInfo from '@/components/command/CommandInfo.vue';
import { ajax, wantNothing } from '../api/fetch';
import Command from '../entities/Command';

export default {
  name: 'command',
  components: { SelectSearchBar, CommandInfo },
  data() {
    return {
      cmd: new Command({}),
    };
  },
  methods: {
    hendleSelectCmd(cid) {
      this.$router.push(`/cmds/${cid}`);
    },
    findCommandById(cid) {
      const request = {
        method: 'GET',
        url: `cmds/${cid}`,
      };
      console.log(request);
      ajax(request).then((resp) => {
        this.cmd = new Command(resp.data.data);
        // this.loading = false;
        console.log(resp.data);
        // this.options = resp.data.data;
      }).catch((error) => {
        // this.loading = false;
        wantNothing(error);
        // this.options = [];
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log(to.params.cid);
      vm.findCommandById(to.params.cid);
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to.params.cid);
    this.findCommandById(to.params.cid);
    // console.log(to, from, next);
    next();
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
