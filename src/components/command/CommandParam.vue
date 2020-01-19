<template>
  <div>
    <div v-for="param in params" :key="param.cpid">
      <el-popover
        placement="right"
        width="200"
        trigger="hover"
        :content="param.description"
        >
        <div class="per-option" slot="reference">
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
      </el-popover>
    </div>
    <div v-for="para in paras" :key="para.index">
      <div>{{para}}</div>
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
    paras: {
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
.per-option{
  margin-bottom: 10px;
}
</style>
