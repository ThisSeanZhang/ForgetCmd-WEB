<template>
  <div class="cmd-panel">
    <div class="cmd-main">
      <div class="cmd-info">
        <CommandInfo :cmd="cmd" />
      </div>
      <el-scrollbar style="height: 90%;">
        <div>命令参数：</div>
        <CommandParam
          :params="params"
          :paramDef="paramDef"
          :paramVal="paramVal"
          v-on:upParamVal="upParamVal($event)"
          :paras="paras" />
        <div>命令选项：</div>
        <CommandOption :optionVal="optionVal" :options="options" />
      </el-scrollbar>
    </div>
    <div class="cmd-exhibit">
      <CommandExhibit :cmd="cmd" :options="options" :params="params" />
    </div>
  </div>
</template>
<script>
import CommandInfo from './CommandInfo.vue';
import CommandOption from './CommandOption.vue';
import CommandParam from './CommandParam.vue';
import CommandExhibit from './CommandExhibit.vue';
// import { wantNothing } from '../api/fetch';
import Command from '../../entities/Command';
// import CmdParam from '../../entities/CmdParam';
// import Option from '../../entities/Option';

export default {
  name: 'command-panel',
  props: {
    inCmd: {
      type: Command,
      default: () => new Command({}),
    },
    // 命令的定义
    paramDef: {
      type: Array,
      default: () => [],
    },
    // 命令存储用户使用的特定值
    paramVal: {
      type: Array,
      default: () => [],
    },
    optionVal: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CommandInfo, CommandOption, CommandParam, CommandExhibit,
  },
  data() {
    return {
      cmd: null,
      params: [],
      paras: [],
      options: [],
      cmdSuccessLoad: false,
    };
  },
  methods: {
    upParamVal(value) {
      console.log(`总页面${JSON.stringify(value)}`);
      this.$emit('upParamVal', value);
    },
    updateParams(params) {
      this.params = params;
    },
    updateOption(options) {
      this.options = options;
    },
    hendleSelectCmd(cid) {
      this.$router.push(`/cmds/${cid}`);
    },
  },
  created() {
    this.cmd = this.inCmd;
    this.options = this.inCmd.options;
    this.params = this.inCmd.params;
    this.paras = this.inCmd.paras;
  },
};
</script>
<style style="scss" scoped>
.cmd-panel{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cmd-info{
  min-height: 10%;
}
.cmd-main{
  height: 70%;
}
.cmd-exhibit{
  height: 30%;
}
</style>
