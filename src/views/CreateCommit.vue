<template>
  <el-container>
    <el-header>
      <CMDHeader></CMDHeader>
    </el-header>
    <el-main>
      <CommandPanel
        class="cmd-perview"
        :inCmd='cmd'
        :paramVal='paramVal'
        :optionVal='optionVal'
        v-on:upParamVal="upParamVal($event)" />
      <CommitPanel :commit="commit" :originCmd="originCmd" class="commit" />
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>
<script>
import Commit from '../entities/CommandCommit';
import Command from '../entities/Command';
import CommitPanel from '../components/commits/CommitPanel.vue';
import CommandPanel from '../components/command/CommandPanel.vue';
import CMDHeader from '@/components/header/Header.vue';

export default {
  name: 'create-commit',
  components: { CommitPanel, CommandPanel, CMDHeader },
  data() {
    return {
      paramVal: [],
      optionVal: [],
      commit: Commit.CreateFackCommit(),
      originCmd: new Command({ commandName: 'docker', params: [{ index: 0, description: { zh: 'aaaa' } }] }),
    };
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
    // TODO 如果有ID的话需要获取相比较的cmd， commit 也要使用cmd进行初始化
    console.log(this.$route.params);
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
