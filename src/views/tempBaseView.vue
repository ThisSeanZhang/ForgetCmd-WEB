<template>
  <CommandPanel style="width: 50%;"></CommandPanel>
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
      cmd: new Command({}),
    };
  },
};
</script>
