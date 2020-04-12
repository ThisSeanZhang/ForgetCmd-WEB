<template>
  <div style="width: 100%; padding: 10px;">
    <!-- {{JSON.stringify(getCommandHis(commandName))}} -->
    <!-- {{snaps[commandName]}} -->
    <CommandExhibitCard style="margin-bottom: 10px;"
      :snap='snap'
      :index='index'
      v-on:delThis="removeByIndex({ commandName, index })"
      v-for="(snap, index) in getCommandHis(commandName)" :key="snap.createTime" />
  </div>
</template>
<script>
// import Commit from '@/entities/CommandCommit';
// import Command from '../entities/Command';
import { mapGetters, mapActions } from 'vuex';
import CommandExhibitCard from '../command/CommandExhibitCard.vue';

/**
 * 需要得知对当前左侧命令的版本号  如果一致，那么直接进行还原，不一致择需要打开新页面  加载对应版本的命令
 */
export default {
  name: 'command-history',
  components: { CommandExhibitCard },
  data() {
    return {
      paramVal: [],
      optionVal: [],
      // commit: Commit.CreateFackCommit(),
      // cmd: null,
    };
  },
  props: {
    commandName: {
      type: String,
      default: () => '',
    },
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
    // cmd() {
    //   return this.commit.toCommand();
    // },
    ...mapGetters('CommandHistory', ['snaps', 'getCommandHis']),
  },
  methods: {
    upParamVal(paramVal) {
      this.paramVal = paramVal;
    },
    ...mapActions('CommandHistory', ['removeByIndex']),
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
  width: 50%;
}
.box-card{
  width: 100%;
}
</style>
