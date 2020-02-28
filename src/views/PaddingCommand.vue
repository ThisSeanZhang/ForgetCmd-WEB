<template>
  <el-container>
    <el-header>
      添加命令
    </el-header>
    <el-main>
      <CommandPanel
        class="cmd-perview"
        :inCmd='cmd'
        :paramVal='paramVal'
        :optionVal='optionVal'
        v-on:upParamVal="upParamVal($event)" />
      <CommandHistory :commandName="cmd.commandName" />
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>
<script>
import Commit from '../entities/CommandCommit';
// import Command from '../entities/Command';
import CommandPanel from '../components/command/CommandPanel.vue';
import CommandHistory from '../components/history/CommandHistory.vue';

export default {
  name: 'padding-command',
  components: { CommandPanel, CommandHistory },
  data() {
    return {
      paramVal: [],
      optionVal: [],
      commit: Commit.CreateFackCommit(),
      // cmd: null,
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
  },
  computed: {
    cmd() {
      return this.commit.toCommand();
    },
  },
  methods: {
    upParamVal(paramVal) {
      this.paramVal = paramVal;
    },
  },
  created() {
    // 根据路由获取
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
