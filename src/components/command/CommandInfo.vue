<template>
  <div>
    <div class="cmd-info">
      <span>&gt;: {{cmd.commandName}}</span>
      <div>
        何时启用:<span>{{cmd.whenEnable ? cmd.whenEnable : '未知'}}</span>
        何时弃用:<span>{{cmd.whenDeprecated ? cmd.whenDeprecated : '未弃用'}}</span>
      </div>
    </div>
    <div class="cmd-description">{{briefDesc}}</div>
    <div class="cmd-description">{{cmd.description}}</div>
    <!-- <div>{{cmd}}</div> -->
  </div>
</template>
<script>
import Command from '../../entities/Command';

export default {
  name: 'command-info',
  props: {
    cmd: Command,
  },
  data() {
    return {
      currentLang: 'zh',
    };
  },
  computed: {
    briefDesc: {
      get() {
        return this.cmd.briefDesc ? this.cmd.briefDesc[this.currentLang] : '';
      },
      set(val) {
        this.cmd.briefDesc[this.currentLang] = val;
      },
    },
  },
};
</script>
<style style="scss" scoped>
.cmd-info{
  display: flex;
  justify-content: space-between;
}
.cmd-description{
  border-left: 3px solid;
  padding-left: 10px;
}
</style>
