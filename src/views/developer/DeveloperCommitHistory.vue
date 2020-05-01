<template>
<div>
  <div>
    <i class="el-icon-delete" @click="changeTab" ></i>
  </div>
  <CommitsTable v-on:reviewCmd="review($event)" v-if="!cmdTab" />
  <div v-else v-loading="loading.doing" class="command-list">
    <el-scrollbar v-if="loading.success" style="height: inherit;" >
      <CommandListCommitPanel v-on:reviewCmd="review($event)"
        v-for="(cmd, index) in cmds" :key="index" :cmd="cmd" >
      </CommandListCommitPanel>
    </el-scrollbar>
    <div v-else @click="fetchCommandsInfo">
      <i class="el-icon-refresh" ></i>
      重新加载
    </div>
  </div>
</div>
</template>
<script>
import { ajax, wantNothing } from '@/api/fetch';
import Commit from '@/entities/CommandCommit';
import CommitsTable from '../../components/commits/CommitsTable.vue';
// import Command from '@/entities/Command';
// import CommitPanel from '@/components/commits/CommitPanel.vue';
// import CommandPanel from '@/components/command/CommandPanel.vue';
import CommandListCommitPanel from '../../components/commits/CommandListCommitPanel.vue';

export default {
  name: 'developer-commit-history',
  components: {
    CommitsTable, CommandListCommitPanel,
  },
  data() {
    return {
      addLogs: [],
      paramVal: [],
      optionVal: [],
      currentIndex: null,
      cmdTab: true,
      cmds: [],
      reviewCmd: new Commit({}).toCommand(),
      loading: {
        doing: false,
        success: false,
      },
    };
  },
  watch: {
    cmdTab(n) {
      if (n) {
        this.fetchCommandsInfo();
      }
    },
  },
  computed: {
    currentLang() {
      return this.$i18n.locale || 'zh';
    },
  },
  methods: {
    changeTab() {
      console.log(this.cmdTab);
      this.cmdTab = !this.cmdTab;
    },
    fetchCommandsInfo() {
      const request = {
        url: '/commits/cmds',
        method: 'GET',
      };
      ajax(request, this.loading).then((resp) => {
        console.log(resp.data.data);
        this.cmds = resp.data.data;
      }).catch(wantNothing);
    },
    review(cmd) {
      this.reviewCmd = cmd;
      this.paramVal = [];
      this.optionVal = [];
    },
    confirmLog(row) {
      console.log(row);
    },
    upParamVal(paramVal) {
      this.paramVal = paramVal;
    },
  },
  created() {
    this.fetchCommandsInfo();
  },
};
</script>
<style lang="scss" scoped>
.developer-commit-history{
  flex: 1;
  display: flex;
}
.commit {
  width: 50%;
}
.box-card{
  margin: 10px 0px;
}
.command-list-head{
  display: flex;
  justify-content: space-between;
}
.item-list{
  height: 100%;
  flex: 1;
  max-width: 50%;
}
.command-list{
  height: 100%;
}
.exhibit-cmd{
  flex: 1;
  max-width: 50%;
}
</style>
