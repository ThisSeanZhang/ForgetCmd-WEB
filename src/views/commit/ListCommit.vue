<template>
  <el-container>
    <el-header>
      <CMDHeader></CMDHeader>
    </el-header>
    <el-main>
      <!-- <CommitPanel :commit="commit" :originCmd="originCmd" class="commit" /> -->
      <div class="exhibit-cmd">
        <CommandPanel
        class="cmd-perview"
        :inCmd='reviewCmd'
        :paramVal='paramVal'
        :optionVal='optionVal'
        v-on:upParamVal="upParamVal($event)" />
      </div>
      <div class="item-list">
        <i class="el-icon-delete" @click="changeTab" ></i>
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
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>
<script>
import { ajax, wantNothing } from '@/api/fetch';
import Commit from '@/entities/CommandCommit';
import CommitsTable from '@/components/commits/CommitsTable.vue';
// import Command from '@/entities/Command';
// import CommitPanel from '@/components/commits/CommitPanel.vue';
import CommandPanel from '@/components/command/CommandPanel.vue';
import CMDHeader from '@/components/header/Header.vue';
import CommandListCommitPanel from '@/components/commits/CommandListCommitPanel.vue';

export default {
  name: 'list-commit',
  components: {
    CommitsTable, CMDHeader, CommandPanel, CommandListCommitPanel,
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
.el-container {
  height: 100%;
}
.el-main {
  display: flex;
  overflow: visible;
  height: calc(100% - 120px);
  .item-list{
    flex: 1;
  }
  .exhibit-cmd{
    flex: 1;
  }
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
}
.command-list{
  height: 100%;
}
</style>
