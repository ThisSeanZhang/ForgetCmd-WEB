<template>
  <div class="cmd-panel">
    <div class="cmd-main">
      <div class="cmd-info">
        <CommandInfo :cmd="inCmd" />
      </div>
      <el-scrollbar style="height: 90%;">
        <div>{{$t('page.commandPanel.param')}}:</div>
        <CommandParam
          :paramDef="inCmd.params"
          :paramVal="paramVal"
          v-on:upParamVal="upParamVal($event)" />
        <div>{{$t('page.commandPanel.option')}}:</div>
        <OptionPanel :options="inCmd.options"  :optionDef="inCmd.options" :optionVal="optionVal" />
      </el-scrollbar>
    </div>
    <CommandExhibit class="cmd-exhibit" :cmd="inCmd" :options="optionVal" :params="paramVal" />
  </div>
</template>
<script>
import CommandInfo from './CommandInfo.vue';
import OptionPanel from '../option/OptionPanel.vue';
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
    // 命令参数存储的值
    paramVal: {
      type: Array,
      default: () => [],
    },
    // 命令选项存储的值
    optionVal: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CommandInfo, OptionPanel, CommandParam, CommandExhibit,
  },
  data() {
    return {
      cmdSuccessLoad: false,
    };
  },
  methods: {
    upParamVal(value) {
      console.log(`总页面${JSON.stringify(value)}`);
      this.$emit('upParamVal', value);
    },
  },
  created() {
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
