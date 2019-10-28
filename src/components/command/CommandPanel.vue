<template>
  <div>
    <div>
      <div class="cmd-info">
        <CommandInfo :cmd="cmd" />
      </div>
      <div>命令参数：</div>
      <CommandParam :params="params" />
      <div>命令选项：</div>
      <CommandOption :options="options" />
    </div>
    <div><CommandExhibit :cmd="cmd" :options="options" :params="params" /></div>
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
  },
  components: {
    CommandInfo, CommandOption, CommandParam, CommandExhibit,
  },
  data() {
    return {
      cmd: null,
      params: [],
      options: [],
      cmdSuccessLoad: false,
    };
  },
  methods: {
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
  },
};
</script>
<style style="scss" scoped>
</style>
