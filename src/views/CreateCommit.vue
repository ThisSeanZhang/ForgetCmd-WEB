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
      <CommitPanel :commit="commit" class="commit" />
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>
<script>
import Commit from '../entities/CommandCommit';
// import Command from '../entities/Command';
import CommitPanel from '../components/commits/CommitPanel.vue';
import CommandPanel from '../components/command/CommandPanel.vue';

export default {
  name: 'create-commit',
  components: { CommitPanel, CommandPanel },
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
  width: 50%;
}
</style>
