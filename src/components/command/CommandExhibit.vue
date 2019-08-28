<template>
  <div>
    <div>命令预览</div>
    <div>{{cmd.commandName}}&nbsp;\</div>
    <div>
      <div v-for="option in options"
      :key="option.oid">
      -{{option.briefName + ' ' + option.value + '\\'}}
      </div>
    </div>
    <div>
      <div v-for="(param, index) in params" :key="param.cpid">{{param.value}}
        <span v-if="index === params.length">&nbsp;\</span>
      </div>
    </div>
  </div>
</template>
<script>
import Command from '../../entities/Command';
// import Option from '../../entities/Option';
// import CmdParam from '../../entities/CmdParam';

export default {
  name: 'command-exhibit',
  props: {
    cmd: {
      type: Command,
    },
    options: {
      type: Array,
      default: () => [],
    },
    params: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
    };
  },
  created() {
    console.log(this.params, this.options);
  },
};
</script>
