<template>
  <CommandPanel :inCmd="cmd"
    :paramVal="paramVal"
    v-on:upParamVal="upParamVal($event)"
    style="width: 50%;">
  </CommandPanel>
</template>
<script>
import CommandPanel from '@/components/command/CommandPanel.vue';
import Command from '../entities/Command';

export default {
  name: 'temp',
  components: {
    CommandPanel,
  },
  data() {
    return {
      cmd: null,
      paramVal: [{ value: 'aaa', index: 0 }, { value: 'bbb', index: 1 }],
    };
  },
  methods: {
    upParamVal(value) {
      console.log(`调用层${JSON.stringify(value)}`);
      this.paramVal = value;
    },
  },
  created() {
    this.cmd = new Command.CreateFackCmd();
  },
};
</script>
