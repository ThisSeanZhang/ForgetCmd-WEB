<template>
  <div>{{cmd}}</div>
</template>
<script>
import Command from '../../entities/Command';

export default {
  props: {
    cmd: Command,
  },
  setup(cmd) {
    return {
      cmd,
    };
  },
};
</script>
