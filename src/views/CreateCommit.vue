<template>
  <el-container>
    <el-header>
      <CMDHeader></CMDHeader>
    </el-header>
    <el-main
      v-loading="loading.doing"
    >
      <CommandPanel
        v-if="loading.success && !loading.doing"
        class="cmd-perview"
        :inCmd='cmd'
        :paramVal='paramVal'
        :optionVal='optionVal'
        v-on:upParamVal="upParamVal($event)" />
      <CommitPanel v-if="loading.success && !loading.doing"
        :commit="commit" :originCmd="originCmd" class="commit" />
      <LoadPanel v-bind:loading="loading"
        v-else class="cmd-perview" v-on:inform="getCommandById" />
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>
<script>
import { ajax, wantNothing } from '@/api/fetch';
import CMDHeader from '@/components/header/Header.vue';
import Commit from '../entities/CommandCommit';
import Command from '../entities/Command';
import CommitPanel from '../components/commits/CommitPanel.vue';
import CommandPanel from '../components/command/CommandPanel.vue';
import LoadPanel from '../components/common/LoadPanel.vue';

// 直接修改不会刷新页面
export default {
  name: 'create-commit',
  components: {
    CommitPanel, CommandPanel, CMDHeader, LoadPanel,
  },
  data() {
    return {
      paramVal: [],
      optionVal: [],
      commit: new Commit({}),
      originCmd: new Command({}),
      loading: {
        doing: false,
        success: false,
      },
    };
  },
  watch: {
    cid() {
      this.getCommandById();
    },
  },
  computed: {
    cid() {
      return this.$route.params.cid;
    },
    cmd() {
      return this.commit.toCommand();
    },
    request() {
      return {
        method: 'GET',
        url: `cmds/${this.cid}`,
      };
    },
  },
  methods: {
    upParamVal(paramVal) {
      this.paramVal = paramVal;
    },
    getCommandById() {
      if (!this.cid) {
        // this.loading.success = false;
        // this.loading.doing = true;
        // this.originCmd = new Command({});
        // this.commit = new Commit({});
        // setTimeout(() => {
        this.loading.success = true;
        this.loading.doing = false;
        // }, 5);
        return;
      }
      ajax(this.request, this.loading).then((resp) => {
        this.originCmd = Command.fromObj(resp.data.data);
        // console.log(this.originCmd);
        this.commit = new Commit(JSON.parse(JSON.stringify(this.originCmd)));
        // console.log(this.commit);
      }).catch(wantNothing);
    },
  },
  created() {
    // TODO 如果有ID的话需要获取相比较的cmd， commit 也要使用cmd进行初始化
    // console.log(this.$route.params);
    // this.cid = this.$route.params.cid;
    this.getCommandById();
  },
  // beforeRouteUpdate(to, from, next) {
  //   this.cid = to.params.cid;
  //   next();
  // },
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
  width: 50%;
}
</style>
