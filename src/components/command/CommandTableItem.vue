<template>
<div>
  <div>
    <div>{{cmd.commandName}}</div>
    <div>
      <span class="head-arrow">
        <i @click="expand = !expand"
          :class="expand ? 'el-icon-arrow-down' : 'el-icon-arrow-left'"></i>
      </span>
    </div>
  </div>
  <el-collapse-transition  >
    <div v-show="expand">
      {{cmd}}
    </div>
  </el-collapse-transition>
</div>
</template>
<script>
import Command from '../../entities/Command';

export default {
  name: 'command-table-item',
  props: {
    cmd: {
      type: Command,
      default: () => new Command({}),
    },
  },
  data() {
    return {
      expand: false,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>
