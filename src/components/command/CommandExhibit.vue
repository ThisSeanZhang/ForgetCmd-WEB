<template>
  <div>
    <div>命令预览</div>
    <div>{{cmd.commandName}}&nbsp;\</div>
    <div>
      <div v-for="option in options" :key="option.oid">
        <div v-if="option.isMultip()">
          <div v-for="(p, index) in option.value.filter(p => p.selected)" :key="index" >
            {{buildHyphen(option) + option.briefName + ' ' + p.value + ' \\'}}
          </div>
        </div>
        <div v-else>
          {{buildHyphen(option) + option.briefName + ' ' + option.value + ' \\'}}
        </div>
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
  methods: {
    buildHyphen(option) {
      if (option.briefName === option.fullName) {
        return '--';
      }
      return '-';
    },
  },
  created() {
    console.log(this.params, this.options);
  },
};
</script>
