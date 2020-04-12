<template>
  <div class="lond-zone" v-loading="loading.doing" >
    <div>
      失败了
    </div>
    <div>
      <i class="el-icon-refresh"></i>回到主页
      <i class="el-icon-refresh" @click="callBack"></i>重试
    </div>
  </div>
</template>
<script>
export default {
  name: 'load-panel',
  props: {
    callBack: {
      type: Function,
      default: () => () => {},
    },
    loading: {
      type: Object,
      default: () => ({
        doing: false,
        success: false,
      }),
    },
  },
};
</script>
<style lang="scss" scoped>
.lond-zone{
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
