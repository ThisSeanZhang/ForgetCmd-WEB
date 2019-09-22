<template>
  <div>
    <div v-for="param in params" :key="param.cpid">
      <div class="param-brief">{{param.paramName}}</div>
      <div class="param-input">
        <el-input
          class="param-value"
          placeholder="请输入内容"
          v-model="param.value"
          clearable>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'common-param',
  props: {
    params: {
      type: Array,
    },
  },
};
</script>
<style lang="scss" scoped>
.param-value, .param-desc{
  display: inline-block;
}
.param-brief{
  width: 80px;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.param-input{
  margin-left: 80px;
}
</style>
