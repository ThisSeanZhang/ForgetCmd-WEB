<template>
  <div class="cmd-panel">
    <div class="cmd-main">
      <div class="cmd-info">
        <CommandInfo :improve="improve" :cmd="inCmd" />
      </div>
      <!-- <el-scrollbar style="height: 90%;"> -->
      <div class="cmd-param">
        <div>{{$t('page.commandPanel.param')}}:</div>
        <CommandParam
          :paramDef="inCmd.params"
          :paramVal="paramVal"
          v-on:upParamVal="upParamVal($event)" />
      </div>
      <div class="cmd-option">
        <div>{{$t('page.commandPanel.option')}}:</div>
        <OptionPanel style="height: calc(100% - 21px);"
        :options="inCmd.options"  :optionDef="inCmd.options" :optionVal="optionVal" />
      </div>
      <!-- </el-scrollbar> -->
    </div>
    <CommandExhibit class="cmd-exhibit" :cmd="inCmd"
    :createHist="createHist"
    :createSnap="createSnap"
    :options="optionVal" :params="paramVal" />
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
    improve: {
      type: Boolean,
      default: () => false,
    },
    createHist: {
      type: Boolean,
      default: () => false,
    },
    createSnap: {
      type: Boolean,
      default: () => false,
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
  display: flex;
  flex-direction: column;
}
.cmd-param{
  height: 69px;
  height: max(69px, 18%);
}
.cmd-option{
  height: calc(90% - 69px);
  height: calc(90% - max(69px, 18%));
}
.cmd-exhibit{
  height: 30%;
}
</style>
