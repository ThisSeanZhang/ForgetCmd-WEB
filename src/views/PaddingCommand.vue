<template>
  <el-container>
    <el-header>
      <CMDHeader></CMDHeader>
    </el-header>
    <el-main>
      <CommandPanel
        v-if="cmdLoading.success"
        v-loading="cmdLoading.doing"
        class="cmd-perview"
        :inCmd='cmd'
        :paramVal='paramVal'
        :optionVal='optionVal'
        v-on:upParamVal="upParamVal($event)" />
      <LoadPanel v-bind:loading="cmdLoading"
        v-else class="cmd-perview" v-bind:callBack="getCommandById" />
      <CommandHistory
        v-if="cmdLoading.success"
        v-loading="cmdLoading.doing"
        :commandName="cmd.commandName" />
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>
<script>
// import Commit from '../entities/CommandCommit';
import { ajax, wantNothing } from '@/api/fetch';
import Command from '../entities/Command';
import CommandPanel from '../components/command/CommandPanel.vue';
import CommandHistory from '../components/history/CommandHistory.vue';
import LoadPanel from '../components/common/LoadPanel.vue';
import CMDHeader from '@/components/header/Header.vue';

export default {
  name: 'padding-command',
  components: {
    CommandPanel, CommandHistory, LoadPanel, CMDHeader,
  },
  data() {
    return {
      paramVal: [],
      optionVal: [],
      cmd: new Command({}),
      cid: null,
      cmdLoading: {
        doing: false,
        success: false,
      },
    };
  },
  watch: {
    // commit: {
    //   handler(nval, oval) {
    //     console.log(nval, oval);
    //     this.cmd = this.commit.toCommand();
    //     console.log(JSON.stringify(this.cmd));
    //   },
    //   deep: true,
    // },
    cid() {
      this.getCommandById();
    },
  },
  computed: {
    request() {
      return {
        method: 'GET',
        url: `cmds/${this.cid}`,
      };
    },
  },
  methods: {
    getCommandById() {
      if (!this.cid) {
        this.cmdLoading.success = false;
        return;
      }
      ajax(this.request, this.cmdLoading).then((resp) => {
        this.cmd = Command.fromObj(resp.data.data);
      }).catch(wantNothing);
    },
    upParamVal(paramVal) {
      this.paramVal = paramVal;
    },
  },
  created() {
    // 根据路由获取
    this.getCommandById();
    this.cid = this.$route.params.cid;
  },
  beforeRouteUpdate(to, from, next) {
    this.cid = to.params.cid;
    // console.log(to, from, next)
    next();
  },
};
</script>
<style lang="scss" scoped>
.el-main, .el-container {
  height: 100%;
}
.el-main {
  display: flex;
  overflow: visible;
}
.commit {
  width: 50%;
}
.cmd-perview {
  min-width: 50%;
}
</style>
