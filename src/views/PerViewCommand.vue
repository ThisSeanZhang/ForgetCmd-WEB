<template>
  <el-container>
    <el-header>
      <div class="search-bar"><SelectSearchBar v-on:currentSelect="hendleSelectCmd($event)"/></div>
    </el-header>
    <el-main v-if="cmdSuccessLoad">
      <div class="cmd-info">
        <CommandInfo :cmd="cmd" />
      </div>
      <div>命令参数：</div>
      <CommandParam :params="params" />
      <div>命令选项：</div>
      <CommandOption :options="options" />
    </el-main>
    <el-footer><CommandExhibit :cmd="cmd" :options="options" :params="params" /></el-footer>
  </el-container>
</template>
<script>
import SelectSearchBar from '@/components/search/SelectSearchBar.vue';
import CommandInfo from '@/components/command/CommandInfo.vue';
import CommandOption from '@/components/command/CommandOption.vue';
import CommandParam from '@/components/command/CommandParam.vue';
import CommandExhibit from '@/components/command/CommandExhibit.vue';
import { wantNothing } from '../api/fetch';
import Command from '../entities/Command';
import CmdParam from '../entities/CmdParam';
import Option from '../entities/Option';

export default {
  name: 'perview-cmd',
  components: {
    SelectSearchBar, CommandInfo, CommandOption, CommandParam, CommandExhibit,
  },
  data() {
    return {
      cmd: new Command({}),
      params: [],
      options: [],
      cmdSuccessLoad: false,
    };
  },
  methods: {
    updateParams(params) {
      this.params = params;
    },
    updateOption(options) {
      this.options = options;
    },
    hendleSelectCmd(cid) {
      this.$router.push(`/cmds/${cid}`);
    },
    findCommandById(cid) {
      this.cmdSuccessLoad = false;
      Command.findLogCid(cid).then((resp) => {
        this.cmd = new Command(resp.data.data);
        this.params = JSON.parse(resp.data.data.cmdParams).map(param => new CmdParam(param));
        this.options = JSON.parse(resp.data.data.cmdOptions).map(param => new Option(param));
        this.cmdSuccessLoad = true;
      }).catch((error) => {
        this.cmdSuccessLoad = false;
        wantNothing(error);
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
.cmd-info{
  margin-bottom: 10px;
}
.el-footer{
  height: 300px!important;
  overflow-y: auto;
}
</style>
