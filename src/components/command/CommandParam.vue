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
    <div style="display:inline-block;" v-for="para in cparams" :key="para.index">
      <!-- <div>{{para}}</div> -->
      <el-popover
        placement="top"
        trigger="hover"
        :content="para.value">
        <el-tag
          slot="reference"
          closable
          @dblclick.native="doubleClick"
          draggable="true"

          type="info">
          {{para.value}}
        </el-tag>
      </el-popover>
    </div>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
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
  data() {
    return {
      cparams: [],
      inputValue: null,
      inputVisible: false,
    };
  },
  methods: {
    oneclick() {
      console.log('one click');
    },
    doubleClick() {
      console.log('double click');
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => this.$refs.saveTagInput.$refs.input.focus());
    },
    handleInputConfirm() {
      if (this.inputValue) {
        this.cparams.push({ value: this.inputValue });
      }
      this.inputVisible = false;
      this.inputValue = '';
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
