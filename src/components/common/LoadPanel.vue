<template>
  <div class="lond-zone" v-loading="loading.doing" >
    <div v-if="showMessage" class="message" >{{$t(loading.message)}}</div>
    <slot></slot>
    <div style="margin-top: 10px;">
      <i class="el-icon-house icon" @click="toIndex">{{$t('other.btn.index')}}</i>
      <i class="el-icon-refresh icon" @click="inform">{{$t('other.btn.reflash')}}</i>
    </div>
  </div>
</template>
<script>
import StringUtils from '../../entities/StringUtils';

export default {
  name: 'load-panel',
  props: {
    loading: {
      type: Object,
      default: () => ({
        doing: false,
        success: false,
        message: '',
      }),
    },
  },
  computed: {
    showMessage() {
      return StringUtils.nonEmptyString(this.loading.message) && !this.loading.success;
    },
  },
  methods: {
    inform() {
      this.$emit('inform');
    },
    toIndex() {
      this.$router.push('/');
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.icon{
  cursor: pointer;
  margin-right: 10px;
}
.message{
  margin-bottom: 10px;
}
</style>
