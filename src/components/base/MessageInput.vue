<template>
<div style="position: relative;">
  <div class="each-item">
    <div class="item-label">{{label}}</div>
    <div class="item-value">
      <slot v-bind:error="error"></slot>
    </div>
  </div>
  <transition name="el-zoom-in-top">
    <div v-if="error" class="message">{{message}}</div>
  </transition>
</div>
</template>
<script>
// import StringUtils from '../../entities/StringUtils';
export default {
  name: 'message-input',
  props: {
    value: {
      type: String,
      default: () => '',
    },
    label: {
      type: String,
      default: () => '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    allowEmpty: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      message: '',
    };
  },
  computed: {
    target: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    error() {
      const value = this.target || '';
      if (this.allowEmpty && value === '') {
        this.$emit('status', true);
        return false;
      }
      // if (!this.target) {
      //   this.$emit('status', false);
      //   return false;
      // }
      // if (this.target || StringUtils.isEmptyString(this.target)) return false;
      // this.rules.forEach((r) => {
      //   console.log(r);
      //   console.log(this.target.match(r.regx));
      // });
      const violation = this.rules.find(r => !value.match(r.regx));
      this.$emit('status', !violation);
      if (!violation) return false;
      this.updateMessage(violation.message);
      return true;
    },
  },
  methods: {
    updateMessage(message) {
      console.log('message', message);
      this.message = this.$t(message);
    },
  },
};
</script>
<style lang="scss" scoped>
.message {
  // position: absolute;
  // font-size: 12px;
  color: #F56C6C;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  // left: 70px;
  right: 0px;
}
.fc-input {
  height: calc(100% - 15px);
  margin-bottom: 15px;
}
.each-item{
  display: flex;
  margin-bottom: 20px;
  min-height: 28px;
  // height: 45px;
}
.item-label{
  width: 60px;
  padding: 0px 10px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-value{
  display: flex;
  flex: 1;
  align-items: center;
  height: 100%;
  justify-content: space-between;
}
</style>
